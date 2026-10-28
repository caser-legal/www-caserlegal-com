import { createHash, timingSafeEqual } from 'node:crypto';
import { clientKey } from './case-intelligence';
import { DocketSearchError, normalizeInput, searchDockets, type DocketSearchResult } from './docket-search';
import { MeterError, enforceDurableLimit, meterStores } from './metering';

export const CONNECTOR_KEY_HEADER = 'x-caser-connector-key';
const CACHE_TTL_SECONDS = 600;
const LIMITS = [
  { max: 10, seconds: 60 },
  { max: 200, seconds: 86400 },
];

type Search = (body: Record<string, unknown>) => Promise<DocketSearchResult>;

function digest(value: string): Buffer {
  return createHash('sha256').update(value, 'utf8').digest();
}

export function connectorAuthorized(request: Request, env: Record<string, string | undefined> = process.env): boolean {
  const expected = env.DOCKET_SEARCH_KEY?.trim() ?? '';
  if (!expected) return true;
  const bearer = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? '';
  const presented = request.headers.get(CONNECTOR_KEY_HEADER)?.trim() || bearer;
  return Boolean(presented) && timingSafeEqual(digest(presented), digest(expected));
}

export function searchCacheKey(body: Record<string, unknown>): string {
  const input = normalizeInput(body);
  const normalized = JSON.stringify([input.query, input.feeds.map((feed) => feed.id).sort(), input.dateRange, input.limit]);
  return `docket:v1:search:${digest(normalized).toString('hex')}`;
}

async function cached(key: string): Promise<DocketSearchResult | null> {
  const { store, fallback } = meterStores();
  try {
    const value = await (store ?? fallback).get(key);
    return value ? (JSON.parse(value) as DocketSearchResult) : null;
  } catch {
    return null;
  }
}

async function remember(key: string, result: DocketSearchResult): Promise<void> {
  const { store, fallback } = meterStores();
  try {
    await (store ?? fallback).set(key, JSON.stringify(result), CACHE_TTL_SECONDS);
  } catch {
    console.error('docket_search_cache_failed');
  }
}

export async function handleDocketSearch(request: Request, search: Search = (body) => searchDockets(body)): Promise<Response> {
  if (!connectorAuthorized(request)) {
    return Response.json({ error: 'A valid connector key is required.' }, { status: 401 });
  }

  try {
    await enforceDurableLimit('docket-search', clientKey(request), LIMITS);
  } catch (error) {
    if (!(error instanceof MeterError)) throw error;
    return Response.json(
      { error: 'Too many searches. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(error.retryAfterSeconds ?? 60) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Send a JSON search request.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Send a JSON search request.' }, { status: 400 });
  }

  try {
    const input = body as Record<string, unknown>;
    const key = searchCacheKey(input);
    const hit = await cached(key);
    if (hit) return Response.json(hit);
    const result = await search(input);
    await remember(key, result);
    return Response.json(result);
  } catch (error) {
    if (error instanceof DocketSearchError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: 'CASER search is unavailable right now.' }, { status: 500 });
  }
}
