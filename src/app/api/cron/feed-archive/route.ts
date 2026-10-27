import { ingestArchive } from '@/lib/feed-archive';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  try {
    const stats = await ingestArchive();
    return Response.json({ ok: true, ...stats }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'ingest_failed' }, { status: 500 });
  }
}
