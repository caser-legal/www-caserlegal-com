'use client';

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  HarmBlockThreshold,
  HarmCategory,
  type Content,
  type EnhancedGenerateContentResponse,
} from 'firebase/ai';
import { ATTICUS_SYSTEM_PROMPT, MAX_PREPARED_PROMPT_LENGTH } from '@/lib/atticus';

export const ATTICUS_MODELS = {
  flash: 'gemini-2.5-flash',
  flashLite: 'gemini-2.5-flash-lite',
} as const;

const MAX_HISTORY_ENTRIES = 30;
const FIRST_RESPONSE_TIMEOUT_MS = 45_000;
const IDLE_RESPONSE_TIMEOUT_MS = 20_000;
const TOTAL_RESPONSE_TIMEOUT_MS = 75_000;
const RATE_LIMIT = { max: 20, perMs: 10_000 };

const SAFETY_SETTINGS = [
  HarmCategory.HARM_CATEGORY_HARASSMENT,
  HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  'HARM_CATEGORY_CIVIC_INTEGRITY' as HarmCategory,
].map((category) => ({ category, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }));

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyBvQ8zvxnZJRsEFOY4Jo-COGjYGLXGDA38',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'caser-legal1.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'caser-legal1',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'caser-legal1.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '549498909010',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:549498909010:ios:798e5d51afd6c2ef964a8b',
};
const APP_CHECK_SITE_KEY = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY;

let app: FirebaseApp | null = null;

function firebaseApp(): FirebaseApp {
  if (app) return app;
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  if (APP_CHECK_SITE_KEY) {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(APP_CHECK_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  }
  return app;
}

function model(name: string) {
  return getGenerativeModel(
    getAI(firebaseApp(), { backend: new GoogleAIBackend() }),
    {
      model: name,
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      safetySettings: SAFETY_SETTINGS,
      tools: [{ googleSearch: {} }],
      systemInstruction: ATTICUS_SYSTEM_PROMPT,
    },
    { timeout: FIRST_RESPONSE_TIMEOUT_MS },
  );
}

export type AtticusSource = { title: string; url: string; index: number };
export type AtticusPassage = { text: string; sourceIndices: number[] };
export type AtticusChunk = {
  text: string;
  sources: AtticusSource[];
  passages: AtticusPassage[];
  searchEntryPointHTML: string | null;
};
export type AtticusTurn = { role: 'user' | 'assistant'; text: string };

function pairedHistory(turns: AtticusTurn[]): Content[] {
  const paired: Content[] = [];
  let pendingUser: Content | null = null;
  for (const turn of turns) {
    const text = turn.text.trim();
    if (!text) continue;
    if (turn.role === 'user') {
      pendingUser = { role: 'user', parts: [{ type: 'text', text }] };
    } else if (pendingUser) {
      paired.push(pendingUser, { role: 'model', parts: [{ type: 'text', text }] });
      pendingUser = null;
    }
  }
  return paired.slice(-MAX_HISTORY_ENTRIES);
}

function safeGroundingUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function chunkFrom(response: EnhancedGenerateContentResponse): AtticusChunk {
  const candidate = response.candidates?.[0];
  const metadata = candidate?.groundingMetadata;
  let text = '';
  try {
    text = response.text();
  } catch {
    text = '';
  }
  const sources = (metadata?.groundingChunks ?? []).flatMap((chunk, index) => {
    const url = safeGroundingUrl(chunk.web?.uri);
    const title = chunk.web?.title?.trim();
    return url ? [{ url, title: title || `Source ${index + 1}`, index }] : [];
  });
  const passages = (metadata?.groundingSupports ?? []).flatMap((support) => {
    const passage = support.segment?.text?.trim();
    return passage ? [{ text: passage, sourceIndices: support.groundingChunkIndices ?? [] }] : [];
  });
  return {
    text,
    sources,
    passages,
    searchEntryPointHTML: metadata?.searchEntryPoint?.renderedContent ?? null,
  };
}

function errorBlob(error: unknown): string {
  if (error instanceof Error) {
    const custom = (error as { customErrorData?: { status?: number; statusText?: string } }).customErrorData;
    return [error.message, custom?.status, custom?.statusText, String(error)].filter(Boolean).join(' ');
  }
  return String(error ?? '');
}

function isRateLimitText(lowered: string): boolean {
  return ['quota', '429', 'resource_exhausted', 'rate limit', 'rate limited'].some((needle) => lowered.includes(needle));
}

export function isRateLimit(error: unknown): boolean {
  return isRateLimitText(errorBlob(error).toLowerCase());
}

export function friendlyAtticusError(error: unknown): string {
  const text = errorBlob(error).trim();
  if (!text) return 'Something went wrong. Please try again.';
  const lowered = text.toLowerCase();
  if (lowered.includes('api_key_service_blocked') || lowered.includes('requests to this api')) {
    return 'AI service is temporarily unavailable. Please try again later.';
  }
  if (lowered.includes('app check') || lowered.includes('appcheck')) {
    return 'AI service is temporarily unavailable. Please try again later.';
  }
  if (lowered.includes('api key not valid') || lowered.includes('api_key_invalid')) {
    return 'AI service is temporarily unavailable. Please try again later.';
  }
  if (isRateLimitText(lowered)) {
    const seconds = text.match(/retry\s+in\s+([\d.]+)\s*s/i)?.[1];
    return seconds
      ? `Rate limit exceeded. Try again in ${Math.max(1, Math.ceil(Number(seconds)))} seconds.`
      : 'Rate limit exceeded. Try again in a moment.';
  }
  if (lowered.includes('safety')) return 'Response blocked. Please rephrase your question.';
  if (text.length > 120 || text.includes('http://') || text.includes('https://')) {
    return 'Something went wrong. Please try again.';
  }
  return text;
}

const sendTimes: number[] = [];

function allowSend(): boolean {
  const now = Date.now();
  while (sendTimes.length && now - sendTimes[0] >= RATE_LIMIT.perMs) sendTimes.shift();
  if (sendTimes.length >= RATE_LIMIT.max) return false;
  sendTimes.push(now);
  return true;
}

async function streamOnce(
  modelName: string,
  prompt: string,
  history: Content[],
  onChunk: (chunk: AtticusChunk) => void,
  outerSignal: AbortSignal,
  activity: { received: boolean },
): Promise<void> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  outerSignal.addEventListener('abort', abort, { once: true });

  let timedOut: string | null = null;
  const fail = (message: string) => {
    timedOut = message;
    controller.abort();
  };
  const total = setTimeout(() => fail('Atticus took too long to respond. Please try again.'), TOTAL_RESPONSE_TIMEOUT_MS);
  let idle = setTimeout(() => fail('Atticus took too long to respond. Please try again.'), FIRST_RESPONSE_TIMEOUT_MS);

  try {
    const chat = model(modelName).startChat({ history });
    const result = await chat.sendMessageStream(prompt, { signal: controller.signal });
    for await (const response of result.stream) {
      activity.received = true;
      clearTimeout(idle);
      idle = setTimeout(() => fail('Atticus stopped responding. Please try again.'), IDLE_RESPONSE_TIMEOUT_MS);
      onChunk(chunkFrom(response));
    }
  } catch (error) {
    if (timedOut) throw new Error(timedOut);
    throw error;
  } finally {
    clearTimeout(total);
    clearTimeout(idle);
    outerSignal.removeEventListener('abort', abort);
  }
}

export async function streamAtticus(
  prompt: string,
  turns: AtticusTurn[],
  onChunk: (chunk: AtticusChunk) => void,
  signal: AbortSignal,
): Promise<void> {
  if (!allowSend()) throw new Error('Rate limited. Please wait.');
  const payload = prompt.trim().slice(0, MAX_PREPARED_PROMPT_LENGTH);
  if (!payload) throw new Error('Empty prompt');
  const history = pairedHistory(turns);

  const activity = { received: false };
  try {
    await streamOnce(ATTICUS_MODELS.flash, payload, history, onChunk, signal, activity);
  } catch (error) {
    if (signal.aborted || activity.received || !isRateLimit(error)) throw error;
    await streamOnce(ATTICUS_MODELS.flashLite, payload, history, onChunk, signal, { received: false });
  }
}
