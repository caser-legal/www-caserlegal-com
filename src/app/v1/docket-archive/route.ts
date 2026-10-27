import { searchArchive } from '@/lib/feed-archive';
import { clientKey, enforceRateLimit, errorResponse, CaseIntelligenceError } from '@/lib/case-intelligence';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    enforceRateLimit(clientKey(request));
    const url = new URL(request.url);
    const query = (url.searchParams.get('query') ?? '').slice(0, 200);
    if (!query.trim()) throw new CaseIntelligenceError(400, 'invalid_query');
    const days = Number(url.searchParams.get('days') ?? '30');
    const result = await searchArchive(query, { days: Number.isFinite(days) ? days : 30 });
    return Response.json(
      {
        matches: result.matches,
        match_count: result.matches.length,
        archive_updated_at: result.archive_updated_at,
        days_covered: result.days_covered,
        total_archived: result.total_archived,
        disclaimer: 'Results from the CASER 30-day court feed archive. Verify important details with the court record.',
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
