import { readFileSync } from 'node:fs';
import path from 'node:path';

export const DOCKET_SEARCH_DISCLAIMER =
  'CASER search results are recent federal filings from CASER Case Search. They are not legal advice and are not a complete court record. Confirm critical facts with the court. Opening a document link may follow that court’s or PACER’s own terms.';

export const DATE_RANGES = [
  'Last 24 hours',
  'Last 7 days',
  'Last 30 days',
  'Last 90 days',
  'All time',
] as const;

export type DateRange = (typeof DATE_RANGES)[number];
export type CourtType = 'district' | 'bankruptcy' | 'appellate';

const COURT_TYPES = new Set<CourtType>(['district', 'bankruptcy', 'appellate']);
const MAX_QUERY = 200;
const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 25;
const FETCH_CONCURRENCY = 25;
const PER_FEED_MS = 12_000;

const STATE_BY_NAME: Record<string, string> = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', 'district of columbia': 'DC',
  florida: 'FL', georgia: 'GA', hawaii: 'HI', idaho: 'ID', illinois: 'IL',
  indiana: 'IN', iowa: 'IA', kansas: 'KS', kentucky: 'KY', louisiana: 'LA',
  maine: 'ME', maryland: 'MD', massachusetts: 'MA', michigan: 'MI', minnesota: 'MN',
  mississippi: 'MS', missouri: 'MO', montana: 'MT', nebraska: 'NE', nevada: 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
  'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH', oklahoma: 'OK',
  oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT', vermont: 'VT',
  virginia: 'VA', washington: 'WA', 'west virginia': 'WV', wisconsin: 'WI',
  wyoming: 'WY', national: 'NATIONAL',
};

const NAME_BY_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_BY_NAME).map(([name, code]) => [code, titleCaseState(name)]),
);

export type CourtFeed = {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  type: CourtType;
  url: string;
};

export type DocketMatch = {
  id: string;
  title: string;
  description: string;
  court: string;
  state: string;
  court_type: CourtType;
  published_at: string | null;
  parties: string[];
  link: string | null;
};

export type DocketSearchResult = {
  matches: DocketMatch[];
  match_count: number;
  truncated: boolean;
  scanned_courts: number;
  failed_courts: number;
  total_courts: number;
  incomplete: boolean;
  disclaimer: string;
};

export class DocketSearchError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

type RawItem = {
  title: string;
  link: string;
  description: string;
  pubDate: Date | null;
  guid: string;
};

function titleCaseState(name: string): string {
  return name.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function canonicalStateCode(value: string): string {
  const trimmed = value.trim();
  const fromName = STATE_BY_NAME[trimmed.toLowerCase()];
  if (fromName) return fromName;
  return trimmed.toUpperCase();
}

export function trustedFeedHost(urlString: string): boolean {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:') return false;
  const host = url.hostname.toLowerCase();
  return host === 'uscourts.gov' || host.endsWith('.uscourts.gov')
    || host === 'govinfo.gov' || host.endsWith('.govinfo.gov');
}

export function safeResultLink(value: string): string | null {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.toLowerCase();
  const ok = ['uscourts.gov', 'govinfo.gov', 'pacer.gov'].some(
    (suffix) => host === suffix || host.endsWith(`.${suffix}`),
  );
  return ok ? url.toString() : null;
}

const CASE_REF = /\b((?:19|20)?\d{2})[\s:._/\-]*(cv|cr|mc|bk|ap|mj)[\s:._/\-]*0*(\d{1,7})(?:[\s:._/\-]*([a-z]{2,6}(?:[\s._/\-]+[a-z]{2,6})?))?\b/gi;

export function localSearchTerms(query: string): string[] {
  const references: string[][] = [];
  for (const match of query.matchAll(CASE_REF)) {
    const rawYear = match[1];
    const fullYear = rawYear.length === 2 ? `20${rawYear}` : rawYear;
    const shortYear = fullYear.slice(-2);
    const caseType = match[2].toLowerCase();
    const number = String(Number(match[3]));
    const padded = number.padStart(5, '0');
    const suffix = match[4]
      ? match[4].replace(/[\s._/]+/g, '-').toUpperCase()
      : undefined;
    const parts = [shortYear, caseType, number, suffix].filter(Boolean) as string[];
    const paddedParts = [fullYear, caseType, padded, suffix].filter(Boolean) as string[];
    const short = parts.join('-');
    const canonicalPadded = paddedParts.join('-');
    references.push([
      match[0],
      short,
      canonicalPadded,
      [shortYear, caseType, padded, suffix].filter(Boolean).join('-'),
      short.replaceAll('-', ' '),
      canonicalPadded.replaceAll('-', ''),
      `${caseType} ${number} ${suffix ?? ''}`.trim(),
      `${shortYear}-${caseType}-${number}`,
      `${shortYear}-${caseType}-${padded}`,
    ]);
  }
  const source = references.length === 0 ? [query] : [query, ...references.flat()];
  const seen = new Set<string>();
  const terms: string[] = [];
  for (const term of source) {
    const lower = term.toLowerCase();
    if (lower && !seen.has(lower)) {
      seen.add(lower);
      terms.push(lower);
    }
  }
  return terms;
}

export function compactSearchKey(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

function parseRssDate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Date.parse(trimmed);
  return Number.isNaN(parsed) ? null : new Date(parsed);
}

export function parseFeedItems(xml: string): RawItem[] {
  const items: RawItem[] = [];
  const blocks = xml.match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi) ?? [];
  for (const block of blocks.slice(0, 500)) {
    const title = stripHtml(tagText(block, 'title'));
    const link = attr(block, 'link', 'href') || tagText(block, 'link');
    const description = stripHtml(
      tagText(block, 'description') || tagText(block, 'summary') || tagText(block, 'content'),
    );
    const pubDate = parseRssDate(
      tagText(block, 'pubDate') || tagText(block, 'published') || tagText(block, 'updated'),
    );
    const guid = (tagText(block, 'guid') || tagText(block, 'id') || `${title}|${link}`).trim();
    items.push({ title, link, description, pubDate, guid });
  }
  return items;
}

function tagText(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() ?? '';
}

function attr(block: string, tag: string, name: string): string {
  const match = block.match(new RegExp(`<${tag}\\b[^>]*\\b${name}="([^"]+)"`, 'i'));
  return match?.[1] ?? '';
}

function cutoffFor(range: DateRange, now: Date): Date | null {
  const days: Record<DateRange, number | null> = {
    'Last 24 hours': 1,
    'Last 7 days': 7,
    'Last 30 days': 30,
    'Last 90 days': 90,
    'All time': null,
  };
  const dayCount = days[range];
  if (dayCount == null) return null;
  return new Date(now.getTime() - dayCount * 24 * 60 * 60 * 1000);
}

export function loadCourts(): CourtFeed[] {
  const dir = path.join(process.cwd(), 'data', 'courts');
  const uscourts = JSON.parse(readFileSync(path.join(dir, 'uscourts.json'), 'utf8')) as Array<{
    name: string;
    state: string;
    type: string;
    url: string | null;
  }>;
  const feeds: CourtFeed[] = [];
  for (const entry of uscourts) {
    if (!entry.url || !trustedFeedHost(entry.url)) continue;
    const type: CourtType = entry.type === 'appellate' || entry.type === 'bankruptcy'
      ? entry.type
      : 'district';
    feeds.push({
      id: `uscourts-${entry.name.toLowerCase().replaceAll(' ', '-')}`,
      name: entry.name,
      state: entry.state,
      stateCode: canonicalStateCode(entry.state),
      type,
      url: entry.url,
    });
  }

  const govinfo = readFileSync(path.join(dir, 'govinfo.txt'), 'utf8');
  for (const line of govinfo.split('\n')) {
    if (!line.includes('uscourts-')) continue;
    const url = line.match(/https:\/\/\S+/)?.[0];
    if (!url || !trustedFeedHost(url)) continue;
    const courtCode = url.split('uscourts-').pop()?.replace(/\.xml$/, '');
    if (!courtCode) continue;
    const parsed = parseGovinfoCode(courtCode);
    feeds.push({
      id: `govinfo-${courtCode}`,
      name: parsed.name,
      state: parsed.state,
      stateCode: canonicalStateCode(parsed.state),
      type: parsed.type,
      url,
    });
  }
  return feeds;
}

function parseGovinfoCode(code: string): { name: string; state: string; type: CourtType } {
  if (code.startsWith('ca') && code.length <= 4) {
    const circuit = code.slice(2);
    const circuitName = circuit === 'dc' ? 'D.C. Circuit' : circuit === 'fc' ? 'Federal Circuit' : `${circuit}th Circuit`;
    return { name: `U.S. Court of Appeals for the ${circuitName}`, state: 'National', type: 'appellate' };
  }
  const districtMap: Record<string, string> = {
    n: 'Northern', s: 'Southern', e: 'Eastern', w: 'Western', m: 'Middle', c: 'Central',
  };
  const finish = (kind: CourtType, label: string) => {
    let stateCode = code.slice(0, -1);
    let district = '';
    for (const [suffix, name] of Object.entries(districtMap)) {
      if (stateCode.endsWith(suffix) && stateCode.length > 2) {
        district = `${name} `;
        stateCode = stateCode.slice(0, -1);
        break;
      }
    }
    const state = NAME_BY_CODE[stateCode.toUpperCase()] ?? stateCode.toUpperCase();
    return { name: `${state} ${district}${label}`, state, type: kind };
  };
  if (code.endsWith('b')) return finish('bankruptcy', 'Bankruptcy Court');
  if (code.endsWith('d')) return finish('district', 'District Court');
  return { name: code.toUpperCase(), state: 'Unknown', type: 'district' };
}

let courtCache: CourtFeed[] | null = null;
export function courts(): CourtFeed[] {
  courtCache ??= loadCourts();
  return courtCache;
}

export type DocketSearchInput = {
  query?: unknown;
  states?: unknown;
  court_types?: unknown;
  date_range?: unknown;
  limit?: unknown;
};

export function normalizeInput(body: DocketSearchInput, now = new Date()): {
  query: string;
  terms: string[];
  feeds: CourtFeed[];
  dateRange: DateRange;
  cutoff: Date | null;
  limit: number;
} {
  if (typeof body.query !== 'string') {
    throw new DocketSearchError('A search query is required.', 400);
  }
  const query = [...body.query]
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code > 31 && code !== 127;
    })
    .join('')
    .trim()
    .slice(0, MAX_QUERY);
  if (!query) throw new DocketSearchError('A search query is required.', 400);

  const states = normalizeStringList(body.states, 'states').map(canonicalStateCode);
  const courtTypes = normalizeStringList(body.court_types, 'court_types').map((value) => {
    const type = value.toLowerCase() as CourtType;
    if (!COURT_TYPES.has(type)) {
      throw new DocketSearchError(`Unknown court type “${value}”.`, 400);
    }
    return type;
  });

  const dateRange = (body.date_range ?? 'Last 30 days') as string;
  if (!DATE_RANGES.includes(dateRange as DateRange)) {
    throw new DocketSearchError('Unknown date range.', 400);
  }

  let limit = DEFAULT_LIMIT;
  if (body.limit != null) {
    if (typeof body.limit !== 'number' || !Number.isInteger(body.limit) || body.limit < 1) {
      throw new DocketSearchError('Limit must be a positive integer.', 400);
    }
    limit = Math.min(body.limit, MAX_LIMIT);
  }

  const feeds = courts().filter((feed) => {
    const stateOk = states.length === 0 || states.includes(feed.stateCode) || states.includes(feed.state.toUpperCase());
    const typeOk = courtTypes.length === 0 || courtTypes.includes(feed.type);
    return stateOk && typeOk;
  });

  return {
    query,
    terms: localSearchTerms(query),
    feeds,
    dateRange: dateRange as DateRange,
    cutoff: cutoffFor(dateRange as DateRange, now),
    limit,
  };
}

function normalizeStringList(value: unknown, field: string): string[] {
  if (value == null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new DocketSearchError(`${field} must be a list of strings.`, 400);
  }
  return value.map((item) => item.trim()).filter(Boolean);
}

type Hit = DocketMatch & { published: Date | null };

function matchesTerms(item: RawItem, court: CourtFeed, terms: string[]): boolean {
  const searchable = `${item.title} ${item.description} ${court.name} ${item.guid}`.toLowerCase();
  const compact = compactSearchKey(searchable);
  return terms.some((term) => searchable.includes(term) || compact.includes(compactSearchKey(term)));
}

export async function searchDockets(
  body: DocketSearchInput,
  options: {
    now?: Date;
    deadlineMs?: number;
    fetchImpl?: typeof fetch;
    feedList?: CourtFeed[];
  } = {},
): Promise<DocketSearchResult> {
  const now = options.now ?? new Date();
  const normalized = normalizeInput(body, now);
  const feeds = options.feedList ?? normalized.feeds;
  const deadlineMs = options.deadlineMs ?? 50_000;
  const fetchImpl = options.fetchImpl ?? fetch;
  const started = Date.now();

  if (feeds.length === 0) {
    throw new DocketSearchError('No courts match the selected filters.', 400);
  }

  const hits: Hit[] = [];
  const seen = new Set<string>();
  let scanned = 0;
  let failed = 0;
  let incomplete = false;

  const queue = [...feeds];
  async function worker() {
    while (queue.length > 0) {
      if (Date.now() - started >= deadlineMs) {
        incomplete = true;
        return;
      }
      const feed = queue.shift();
      if (!feed) return;
      if (!trustedFeedHost(feed.url)) {
        failed += 1;
        scanned += 1;
        continue;
      }
      const remaining = deadlineMs - (Date.now() - started);
      if (remaining <= 0) {
        incomplete = true;
        return;
      }
      try {
        const budget = Math.min(PER_FEED_MS, remaining);
        const response = await Promise.race([
          fetchImpl(feed.url, {
            signal: AbortSignal.timeout(budget),
            headers: { 'user-agent': 'CASER-Case-Search' },
            redirect: 'error',
          }),
          new Promise<Response>((_, reject) => {
            setTimeout(() => reject(new Error('timeout')), budget);
          }),
        ]);
        if (!response.ok) throw new Error('status');
        const xml = await response.text();
        for (const item of parseFeedItems(xml)) {
          if (normalized.cutoff && (!item.pubDate || item.pubDate < normalized.cutoff)) continue;
          if (!matchesTerms(item, feed, normalized.terms)) continue;
          const id = item.guid || `${feed.id}:${item.link}`;
          if (!seen.has(id)) {
            seen.add(id);
            hits.push({
              id,
              title: item.title,
              description: item.description,
              court: feed.name,
              state: feed.state,
              court_type: feed.type,
              published_at: item.pubDate?.toISOString() ?? null,
              published: item.pubDate,
              parties: [],
              link: safeResultLink(item.link),
            });
          }
        }
      } catch {
        failed += 1;
      }
      scanned += 1;
    }
  }

  await Promise.all(Array.from({ length: Math.min(FETCH_CONCURRENCY, feeds.length) }, () => worker()));
  if (queue.length > 0) incomplete = true;

  hits.sort((a, b) => {
    if (a.published && b.published) return b.published.getTime() - a.published.getTime();
    if (a.published) return -1;
    if (b.published) return 1;
    return 0;
  });

  const matchCount = hits.length;
  const matches = hits.slice(0, normalized.limit).map(({ published: _published, ...match }) => match);
  return {
    matches,
    match_count: matchCount,
    truncated: matchCount > matches.length,
    scanned_courts: scanned,
    failed_courts: failed,
    total_courts: feeds.length,
    incomplete: incomplete || scanned < feeds.length,
    disclaimer: DOCKET_SEARCH_DISCLAIMER,
  };
}
