import assert from 'node:assert/strict';
import test from 'node:test';
import { ingestArchive, searchArchive, type ArchiveStore } from '../src/lib/feed-archive';
import type { CourtFeed } from '../src/lib/docket-search';

const NOW = new Date('2026-10-27T12:00:00Z');
const feed: CourtFeed = {
  id: 'uscourts-wyd',
  name: 'Wyoming District Court',
  state: 'Wyoming',
  stateCode: 'WY',
  type: 'district',
  url: 'https://www.wyd.uscourts.gov/feed.xml',
};

function memoryStore(): ArchiveStore & { files: Map<string, unknown> } {
  const files = new Map<string, unknown>();
  return {
    files,
    async getJSON<T>(pathname: string) {
      return (files.get(pathname) as T) ?? null;
    },
    async putJSON(pathname: string, value: unknown) {
      files.set(pathname, value);
    },
    async remove(pathname: string) {
      files.delete(pathname);
    },
  };
}

function xmlFor(title: string, guid: string, pubDate: string): string {
  return `<?xml version="1.0"?><rss><channel><item><title>${title}</title><link>https://www.wyd.uscourts.gov/doc.pdf</link><description>${title} filing</description><pubDate>${pubDate}</pubDate><guid>${guid}</guid></item></channel></rss>`;
}

test('ingest stores entries by day, dedupes on re-run and search finds past filings', async () => {
  const store = memoryStore();
  const fetcher = (async () =>
    new Response(xmlFor('Cothron v. Casper Police Department', 'entry-14', 'Mon, 20 Oct 2026 10:00:00 GMT'))) as typeof fetch;

  const first = await ingestArchive({ now: NOW, fetcher, store, feedList: [feed] });
  assert.equal(first.added, 1);
  assert.equal(first.total, 1);

  const second = await ingestArchive({ now: NOW, fetcher, store, feedList: [feed] });
  assert.equal(second.added, 0);
  assert.equal(second.total, 1);

  const found = await searchArchive('Casper Police', { now: NOW, store });
  assert.equal(found.matches.length, 1);
  assert.equal(found.matches[0].title, 'Cothron v. Casper Police Department');
  assert.equal(found.days_covered, 1);

  const missing = await searchArchive('Unrelated Motors', { now: NOW, store });
  assert.equal(missing.matches.length, 0);
});

test('ingest prunes shards older than 30 days', async () => {
  const store = memoryStore();
  await store.putJSON('feed-archive/entries-2026-08-01.json', [
    {
      id: 'old|1',
      title: 'Old Case',
      description: '',
      court: 'Wyoming District Court',
      state: 'Wyoming',
      court_type: 'district',
      published_at: '2026-08-01T00:00:00.000Z',
      parties: [],
      link: null,
    },
  ]);
  await store.putJSON('feed-archive/index.json', {
    updated_at: '2026-08-01T00:00:00.000Z',
    days: [{ day: '2026-08-01', count: 1, pathname: 'feed-archive/entries-2026-08-01.json' }],
    total: 1,
  });
  const fetcher = (async () => new Response(xmlFor('Fresh Case', 'entry-1', 'Mon, 26 Oct 2026 10:00:00 GMT'))) as typeof fetch;
  await ingestArchive({ now: NOW, fetcher, store, feedList: [feed] });
  assert.equal(store.files.has('feed-archive/entries-2026-08-01.json'), false);
  const found = await searchArchive('Old Case', { now: NOW, store });
  assert.equal(found.matches.length, 0);
});
