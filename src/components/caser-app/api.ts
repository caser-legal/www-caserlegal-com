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

  return { search };
}
