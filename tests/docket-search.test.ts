import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DocketSearchError,
  localSearchTerms,
  normalizeInput,
  searchDockets,
  trustedFeedHost,
  type CourtFeed,
} from '../src/lib/docket-search';

const sample: CourtFeed = {
  id: 'test-de',
  name: 'District of Delaware',
  state: 'Delaware',
  stateCode: 'DE',
  type: 'district',
  url: 'https://ecf.ded.uscourts.gov/cgi-bin/rss_outside.pl',
};

test('rejects an empty query', () => {
  assert.throws(() => normalizeInput({ query: '   ' }), DocketSearchError);
});

test('expands a loose docket number the way CASER search does', () => {
  const terms = localSearchTerms('25cv199khr');
  assert.ok(terms.includes('25-cv-00199-khr'));
});

test('refuses a feed host CASER does not use', () => {
  assert.equal(trustedFeedHost('https://example.com/feed'), false);
  assert.equal(trustedFeedHost('http://ecf.ded.uscourts.gov/rss'), false);
  assert.equal(trustedFeedHost(sample.url), true);
});

test('drops filings outside the date window and ignores untrusted hosts', async () => {
  const calls: string[] = [];
  const now = new Date('2026-09-21T12:00:00Z');
  const result = await searchDockets(
    { query: 'Acme', states: ['DE'], date_range: 'Last 7 days', limit: 25 },
    {
      now,
      deadlineMs: 5_000,
      feedList: [
        sample,
        { ...sample, id: 'bad', url: 'https://example.com/secret' },
      ],
      fetchImpl: async (input) => {
        const url = String(input);
        calls.push(url);
        const xml = `<?xml version="1.0"?><rss><channel>
          <item><title>Acme Corp v. Smith</title><link>https://ecf.ded.uscourts.gov/doc/1</link>
            <description>Order regarding Acme</description><pubDate>Mon, 20 Sep 2026 12:00:00 GMT</pubDate><guid>new</guid></item>
          <item><title>Acme old matter</title><link>https://ecf.ded.uscourts.gov/doc/2</link>
            <description>Acme</description><pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate><guid>old</guid></item>
        </channel></rss>`;
        return new Response(xml, { status: 200 });
      },
    },
  );

  assert.deepEqual(calls, [sample.url]);
  assert.equal(result.matches.length, 1);
  assert.equal(result.matches[0]?.title, 'Acme Corp v. Smith');
  assert.equal(result.matches[0]?.link, 'https://ecf.ded.uscourts.gov/doc/1');
  assert.equal(result.failed_courts, 1);
  assert.equal(result.incomplete, false);
});

test('marks the search incomplete when the deadline passes', async () => {
  const result = await searchDockets(
    { query: 'Acme', states: ['DE'] },
    {
      deadlineMs: 0,
      feedList: [sample, { ...sample, id: 'second', url: 'https://ecf.ded.uscourts.gov/other' }],
      fetchImpl: () => new Promise<Response>(() => {}),
    },
  );
  assert.equal(result.incomplete, true);
  assert.equal(result.matches.length, 0);
});
