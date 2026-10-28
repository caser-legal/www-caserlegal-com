import { timingSafeEqual } from 'node:crypto';
import { compactSearchKey, courts, localSearchTerms, parseFeedItems, trustedFeedHost, type CourtFeed, type DocketMatch } from './docket-search';

export const ARCHIVE_DAYS = 30;
export const ARCHIVE_PREFIX = 'feed-archive';
const MANIFEST_PATH = `${ARCHIVE_PREFIX}/index.json`;
const MAX_FEED_BYTES = 5 * 1024 * 1024;

export type ArchiveManifest = {
  updated_at: string;
  days: { day: string; count: number; pathname: string }[];
  total: number;
};

export interface ArchiveStore {
  getJSON<T>(pathname: string): Promise<T | null>;
  putJSON(pathname: string, value: unknown): Promise<void>;
  remove(pathname: string): Promise<void>;
}

export function blobArchiveStore(): ArchiveStore {
  return {
    async getJSON<T>(pathname: string) {
      const { get } = await import('@vercel/blob');
      try {
        const result = await get(pathname, { access: 'private' });
        if (!result || result.statusCode !== 200 || !result.stream) return null;
        const text = await new Response(result.stream).text();
        return JSON.parse(text) as T;
      } catch {
        return null;
      }
    },
    async putJSON(pathname: string, value: unknown) {
      const { put } = await import('@vercel/blob');
      await put(pathname, JSON.stringify(value), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      });
    },
    async remove(pathname: string) {
      const { del } = await import('@vercel/blob');
      await del(pathname);
    },
  };
}

export function cronAuthorized(authorization: string | null, secret = process.env.CRON_SECRET?.trim()): boolean {
  if (!secret || !authorization) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(authorization);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export function dayOf(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function shardPath(day: string): string {
  return `${ARCHIVE_PREFIX}/entries-${day}.json`;
}

function toEntry(item: ReturnType<typeof parseFeedItems>[number], court: CourtFeed): DocketMatch | null {
  if (!item.title) return null;
  const link = item.link && trustedFeedHost(item.link) ? item.link : null;
  return {
    id: `${court.id}|${item.guid}`,
    title: item.title.slice(0, 500),
    description: item.description.slice(0, 2000),
    court: court.name,
    state: court.state,
    court_type: court.type,
    published_at: item.pubDate ? item.pubDate.toISOString() : null,
    parties: [],
    link,
  };
}

async function fetchCourtEntries(court: CourtFeed, fetcher: typeof fetch): Promise<DocketMatch[]> {
  if (!trustedFeedHost(court.url)) return [];
  const response = await fetcher(court.url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) return [];
  const xml = await response.text();
  if (xml.length > MAX_FEED_BYTES) return [];
  return parseFeedItems(xml).flatMap((item) => {
    const entry = toEntry(item, court);
    return entry ? [entry] : [];
  });
}

export async function ingestArchive(
  options: {
    now?: Date;
    fetcher?: typeof fetch;
    store?: ArchiveStore;
    feedList?: CourtFeed[];
    concurrency?: number;
  } = {},
): Promise<{ added: number; total: number; courts_ok: number; courts_failed: number; days: number }> {
  const now = options.now ?? new Date();
  const fetcher = options.fetcher ?? fetch;
  const store = options.store ?? blobArchiveStore();
  const feeds = options.feedList ?? courts();
  const cutoffDay = dayOf(new Date(now.getTime() - ARCHIVE_DAYS * 24 * 60 * 60 * 1000));
  const latestDay = dayOf(new Date(now.getTime() + 24 * 60 * 60 * 1000));

  const byDay = new Map<string, DocketMatch[]>();
  let courtsOk = 0;
  let courtsFailed = 0;
  let index = 0;
  const workers = Array.from({ length: Math.min(options.concurrency ?? 25, feeds.length) }, async () => {
    while (index < feeds.length) {
      const court = feeds[index];
      index += 1;
      try {
        const entries = await fetchCourtEntries(court, fetcher);
        courtsOk += 1;
        for (const entry of entries) {
          const day = entry.published_at ? entry.published_at.slice(0, 10) : dayOf(now);
          if (day < cutoffDay || day > latestDay) continue;
          const list = byDay.get(day) ?? [];
          list.push(entry);
          byDay.set(day, list);
        }
      } catch {
        courtsFailed += 1;
      }
    }
  });
  await Promise.all(workers);

  const manifest: ArchiveManifest = (await store.getJSON<ArchiveManifest>(MANIFEST_PATH)) ?? {
    updated_at: now.toISOString(),
    days: [],
    total: 0,
  };
  const keptDays = manifest.days.filter((item) => item.day >= cutoffDay && item.day <= latestDay);
  for (const dropped of manifest.days) {
    if (dropped.day < cutoffDay || dropped.day > latestDay) await store.remove(dropped.pathname);
  }

  let added = 0;
  const dayCounts = new Map(keptDays.map((item) => [item.day, item]));
  for (const [day, fresh] of byDay) {
    const pathname = shardPath(day);
    const existing = (await store.getJSON<DocketMatch[]>(pathname)) ?? [];
    const seen = new Set(existing.map((entry) => entry.id));
    const merged = [...existing];
    for (const entry of fresh) {
      if (seen.has(entry.id)) continue;
      seen.add(entry.id);
      merged.push(entry);
      added += 1;
    }
    await store.putJSON(pathname, merged);
    dayCounts.set(day, { day, count: merged.length, pathname });
  }

  const days = [...dayCounts.values()].sort((a, b) => b.day.localeCompare(a.day));
  const total = days.reduce((sum, item) => sum + item.count, 0);
  await store.putJSON(MANIFEST_PATH, { updated_at: now.toISOString(), days, total } satisfies ArchiveManifest);
  return { added, total, courts_ok: courtsOk, courts_failed: courtsFailed, days: days.length };
}

export function archiveMatches(entry: DocketMatch, query: string, cutoff: Date): boolean {
  if (entry.published_at && new Date(entry.published_at) < cutoff) return false;
  const searchable = `${entry.title} ${entry.description} ${entry.court}`.toLowerCase();
  const terms = localSearchTerms(query);
  if (terms.some((term) => searchable.includes(term))) return true;
  const compact = compactSearchKey(searchable);
  return terms.some((term) => {
    const key = compactSearchKey(term);
    return key && key !== term && compact.includes(key);
  });
}

export async function searchArchive(
  query: string,
  options: { days?: number; now?: Date; store?: ArchiveStore; limit?: number } = {},
): Promise<{ matches: DocketMatch[]; archive_updated_at: string | null; days_covered: number; total_archived: number }> {
  const clean = query.trim().slice(0, 200);
  if (!clean) throw new Error('invalid_query');
  const days = Math.min(Math.max(options.days ?? ARCHIVE_DAYS, 1), ARCHIVE_DAYS);
  const now = options.now ?? new Date();
  const store = options.store ?? blobArchiveStore();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const manifest = await store.getJSON<ArchiveManifest>(MANIFEST_PATH);
  if (!manifest) return { matches: [], archive_updated_at: null, days_covered: 0, total_archived: 0 };

  const wanted = manifest.days.filter((item) => item.day >= dayOf(cutoff));
  const shards = await Promise.all(wanted.map((item) => store.getJSON<DocketMatch[]>(item.pathname)));
  const seen = new Set<string>();
  const matches: DocketMatch[] = [];
  for (const shard of shards) {
    for (const entry of shard ?? []) {
      if (seen.has(entry.id)) continue;
      if (!archiveMatches(entry, clean, cutoff)) continue;
      seen.add(entry.id);
      matches.push(entry);
    }
  }
  matches.sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''));
  return {
    matches: matches.slice(0, options.limit ?? 500),
    archive_updated_at: manifest.updated_at,
    days_covered: wanted.length,
    total_archived: manifest.total,
  };
}
