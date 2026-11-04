import { DocketSearchError, searchDockets } from '@/lib/docket-search';
import { AuthError, rateLimited, requirePrivyUser } from '@/lib/privy-server';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await requirePrivyUser(request);
  } catch (error) {
    const message = error instanceof AuthError ? error.message : 'Sign in to use CASER search.';
    return Response.json({ error: message }, { status: 401 });
  }

  if (rateLimited(`search:${userId}`, 30, 60_000)) {
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
    return Response.json(await searchDockets(body));
  } catch (error) {
    if (error instanceof DocketSearchError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: 'CASER search is unavailable right now.' }, { status: 500 });
  }
}
