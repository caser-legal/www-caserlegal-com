import {
  ATTICUS_SYSTEM_PROMPT,
  MAX_PREPARED_PROMPT_LENGTH,
  caseAnalysisPrompt,
  guardUserInput,
  type GuardResult,
} from '@/lib/atticus';
import { AuthError, rateLimited, requirePrivyUser } from '@/lib/privy-server';

export const runtime = 'nodejs';
export const maxDuration = 60;

// Same model and settings as the iOS app (AIAssistantService.swift).
const MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
const MAX_HISTORY = 20;
const SAFETY = [
  'HARM_CATEGORY_HARASSMENT',
  'HARM_CATEGORY_HATE_SPEECH',
  'HARM_CATEGORY_SEXUALLY_EXPLICIT',
  'HARM_CATEGORY_DANGEROUS_CONTENT',
].map((category) => ({ category, threshold: 'BLOCK_MEDIUM_AND_ABOVE' }));

type ChatTurn = { role: 'user' | 'assistant'; text: string };
type Source = { title: string; url: string };

function parseHistory(value: unknown): ChatTurn[] | null {
  if (value == null) return [];
  if (!Array.isArray(value)) return null;
  const turns: ChatTurn[] = [];
  for (const item of value.slice(-MAX_HISTORY)) {
    if (!item || typeof item !== 'object') return null;
    const { role, text } = item as Record<string, unknown>;
    if ((role !== 'user' && role !== 'assistant') || typeof text !== 'string') return null;
    turns.push({ role, text: text.slice(0, MAX_PREPARED_PROMPT_LENGTH) });
  }
  return turns;
}

function safeSourceUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await requirePrivyUser(request);
  } catch (error) {
    const message = error instanceof AuthError ? error.message : 'Sign in to use Atticus.';
    return Response.json({ error: message }, { status: 401 });
  }

  if (rateLimited(`atticus:${userId}`, 20, 10 * 60_000)) {
    return Response.json({ error: 'Atticus needs a short break. Try again in a few minutes.' }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Atticus is not configured on this server yet.' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
    body = parsed;
  } catch {
    return Response.json({ error: 'Send a JSON request.' }, { status: 400 });
  }

  const history = parseHistory(body.history);
  if (!history) return Response.json({ error: 'Invalid conversation history.' }, { status: 400 });

  let prompt: GuardResult;
  const analyze = body.analyze as Record<string, unknown> | undefined;
  if (analyze && typeof analyze === 'object') {
    if (typeof analyze.title !== 'string' || typeof analyze.description !== 'string') {
      return Response.json({ error: 'A case title and description are required.' }, { status: 400 });
    }
    prompt = caseAnalysisPrompt(analyze.title, analyze.description);
  } else if (typeof body.message === 'string') {
    prompt = guardUserInput(body.message);
  } else {
    return Response.json({ error: 'Type a question for Atticus.' }, { status: 400 });
  }
  if (!prompt.ok) return Response.json({ error: prompt.message }, { status: 400 });

  const contents = [...history, { role: 'user' as const, text: prompt.text }].map((turn) => ({
    role: turn.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: turn.text }],
  }));

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:streamGenerateContent?alt=sse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: ATTICUS_SYSTEM_PROMPT }] },
        contents,
        tools: [{ google_search: {} }],
        safetySettings: SAFETY,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
      signal: AbortSignal.timeout(45_000),
    },
  ).catch(() => null);

  if (!upstream?.ok || !upstream.body) {
    const status = upstream?.status === 429 ? 429 : 502;
    const error =
      status === 429 ? 'Atticus is busy right now. Try again in a minute.' : 'Atticus is unavailable right now.';
    return Response.json({ error }, { status });
  }

  // Re-emit Gemini's SSE as newline-delimited JSON events the client can render as they arrive.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();
  const sources = new Map<string, Source>();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: object) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            let chunk: {
              candidates?: {
                content?: { parts?: { text?: string; thought?: boolean }[] };
                finishReason?: string;
                groundingMetadata?: { groundingChunks?: { web?: { uri?: string; title?: string } }[] };
              }[];
            };
            try {
              chunk = JSON.parse(line.slice(5));
            } catch {
              continue;
            }
            const candidate = chunk.candidates?.[0];
            for (const part of candidate?.content?.parts ?? []) {
              if (part.text && !part.thought) send({ type: 'text', text: part.text });
            }
            for (const grounding of candidate?.groundingMetadata?.groundingChunks ?? []) {
              const url = safeSourceUrl(grounding.web?.uri);
              if (url && !sources.has(url)) sources.set(url, { url, title: grounding.web?.title || url });
            }
            if (candidate?.finishReason === 'SAFETY') {
              send({ type: 'error', error: "I can't help with that. Let's stick to the legal research question." });
            }
          }
        }
        if (sources.size) send({ type: 'sources', sources: [...sources.values()] });
        send({ type: 'done' });
      } catch {
        send({ type: 'error', error: 'Atticus was interrupted. Try again.' });
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
