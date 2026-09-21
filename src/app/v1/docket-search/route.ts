import { DocketSearchError, searchDockets } from '@/lib/docket-search';

export const runtime = 'nodejs';
export const maxDuration = 60;

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || 'local';
}

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export async function POST(request: Request) {
  if (limited(clientKey(request))) {
    return Response.json({ error: 'Too many searches. Try again in a minute.' }, { status: 429 });
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
    const result = await searchDockets(body);
    return Response.json(result);
  } catch (error) {
    if (error instanceof DocketSearchError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: 'CASER search is unavailable right now.' }, { status: 500 });
  }
}
