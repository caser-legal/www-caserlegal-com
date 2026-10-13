'use client';

import { useCallback } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import type { CourtType, DateRange, DocketSearchResult } from './store';

export type SearchRequest = {
  query: string;
  states?: string[];
  courtTypes?: CourtType[];
  dateRange?: DateRange;
};

export type AtticusEvent =
  | { type: 'text'; text: string }
  | { type: 'sources'; sources: { title: string; url: string }[] }
  | { type: 'error'; error: string }
  | { type: 'done' };

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function readError(response: Response, fallback: string): Promise<ApiError> {
  const data = await response.json().catch(() => null);
  const message = data && typeof data.error === 'string' ? data.error : fallback;
  return new ApiError(message, response.status);
}

/** Calls CASER's signed-in API routes with the current Privy access token. */
export function useCaserApi() {
  const { getAccessToken } = usePrivy();

  const authedFetch = useCallback(
    async (path: string, body: object, signal?: AbortSignal) => {
      const token = await getAccessToken();
      if (!token) throw new ApiError('Your session has expired. Sign in again.', 401);
      return fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
        signal,
      });
    },
    [getAccessToken],
  );

  const search = useCallback(
    async (request: SearchRequest, signal?: AbortSignal): Promise<DocketSearchResult> => {
      const response = await authedFetch(
        '/api/caser/search',
        {
          query: request.query,
          states: request.states?.length ? request.states : undefined,
          court_types: request.courtTypes?.length ? request.courtTypes : undefined,
          date_range: request.dateRange,
        },
        signal,
      );
      if (!response.ok) throw await readError(response, 'CASER search is unavailable right now.');
      return response.json();
    },
    [authedFetch],
  );

  const askAtticus = useCallback(
    async (
      body: { message?: string; analyze?: { title: string; description: string }; history: { role: 'user' | 'assistant'; text: string }[] },
      onEvent: (event: AtticusEvent) => void,
      signal?: AbortSignal,
    ) => {
      const response = await authedFetch('/api/caser/atticus', body, signal);
      if (!response.ok || !response.body) throw await readError(response, 'Atticus is unavailable right now.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            onEvent(JSON.parse(line) as AtticusEvent);
          } catch {
            // Ignore a malformed line rather than dropping the whole answer.
          }
        }
      }
    },
    [authedFetch],
  );

  return { search, askAtticus };
}
