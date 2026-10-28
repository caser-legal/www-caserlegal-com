import assert from 'node:assert/strict';
import test from 'node:test';
import type { DocketSearchResult } from '../src/lib/docket-search';
import { connectorAuthorized, handleDocketSearch, searchCacheKey } from '../src/lib/docket-search-endpoint';
import { memoryMeterStore, type MeterStore } from '../src/lib/meter-store';
import { configureMetering } from '../src/lib/metering';

const KEY = 'connector-key-for-tests-0123456789';
let store: MeterStore;
let now = Date.parse('2026-10-28T12:00:30Z');
let ip = 0;

function result(query: string): DocketSearchResult {
  return {
    matches: [],
    match_count: 0,
    truncated: false,
    scanned_courts: 1,
    failed_courts: 0,
    total_courts: 1,
    incomplete: false,
    disclaimer: query,
  };
}

function request(body: unknown, headers: Record<string, string> = {}, address?: string): Request {
  ip += 1;
  return new Request('https://www.caserlegal.com/v1/docket-search', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': address ?? `203.0.113.${ip % 250}`, 'x-caser-connector-key': KEY, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function counting() {
  const calls: unknown[] = [];
  const search = async (body: Record<string, unknown>) => {
    calls.push(body);
    return result(String(body.query));
  };
  return { calls, search };
}

test.beforeEach(() => {
  process.env.DOCKET_SEARCH_KEY = KEY;
  delete process.env.VERCEL;
  now = Date.parse('2026-10-28T12:00:30Z');
  store = memoryMeterStore(() => now);
  configureMetering({ store, fallback: memoryMeterStore(() => now), clock: () => now });
});

test.after(() => {
  configureMetering(null);
  delete process.env.DOCKET_SEARCH_KEY;
});

test('the connector key is required and compared exactly, by header or bearer token', async () => {
  const { calls, search } = counting();
  assert.equal((await handleDocketSearch(request({ query: 'Acme' }), search)).status, 200);
  assert.equal((await handleDocketSearch(request({ query: 'Acme' }, { 'x-caser-connector-key': '', authorization: `Bearer ${KEY}` }), search)).status, 200);
  for (const wrong of ['', `${KEY}x`, KEY.slice(1), 'short']) {
    const response = await handleDocketSearch(request({ query: 'Acme' }, { 'x-caser-connector-key': wrong }), search);
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: 'A valid connector key is required.' });
  }
  assert.equal(calls.length, 1);
});

test('without DOCKET_SEARCH_KEY the route stays public, still limited and cached', async () => {
  delete process.env.DOCKET_SEARCH_KEY;
  process.env.VERCEL = '1';
  try {
    const plain = new Request('https://www.caserlegal.com/v1/docket-search', { method: 'POST' });
    assert.equal(connectorAuthorized(plain, { VERCEL: '1' }), true);
    assert.equal(connectorAuthorized(plain, { DOCKET_SEARCH_KEY: KEY, VERCEL: '1' }), false);
    const { calls, search } = counting();
    const address = '198.18.1.1';
    const first = await handleDocketSearch(request({ query: 'Acme' }, { 'x-caser-connector-key': '' }, address), search);
    assert.equal(first.status, 200);
    assert.equal((await handleDocketSearch(request({ query: 'Acme' }, { 'x-caser-connector-key': 'anything' }, address), search)).status, 200);
    assert.equal(calls.length, 1);
    for (let n = 0; n < 8; n += 1) await handleDocketSearch(request({ query: `p${n}` }, {}, address), search);
    const limited = await handleDocketSearch(request({ query: 'more' }, {}, address), search);
    assert.equal(limited.status, 429);
  } finally {
    delete process.env.VERCEL;
  }
});

test('repeat searches within 10 minutes are served from the cache without fanning out', async () => {
  const { calls, search } = counting();
  const first = await handleDocketSearch(request({ query: '  Acme  ', states: ['DE'] }), search);
  assert.deepEqual(await first.json(), result('  Acme  '));
  const again = await handleDocketSearch(request({ query: 'Acme', states: ['Delaware'], date_range: 'Last 30 days', limit: 25 }), search);
  assert.deepEqual(await again.json(), result('  Acme  '));
  assert.equal(calls.length, 1);
  await handleDocketSearch(request({ query: 'Acme', states: ['WY'] }), search);
  assert.equal(calls.length, 2);
  now += 600_001;
  await handleDocketSearch(request({ query: 'Acme', states: ['DE'] }), search);
  assert.equal(calls.length, 3);
  assert.equal(searchCacheKey({ query: 'Acme', limit: 3 }) === searchCacheKey({ query: 'Acme', limit: 4 }), false);
});

test('one IP gets 10 searches a minute and 200 a day', async () => {
  const { search } = counting();
  const address = '198.18.0.1';
  for (let n = 0; n < 10; n += 1) assert.equal((await handleDocketSearch(request({ query: `q${n}` }, {}, address), search)).status, 200);
  const limited = await handleDocketSearch(request({ query: 'q' }, {}, address), search);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '30');
  assert.equal((await handleDocketSearch(request({ query: 'q' }, {}, '198.18.0.2'), search)).status, 200);
  for (let minute = 1; minute < 19; minute += 1) {
    now += 60_000;
    for (let n = 0; n < 10; n += 1) assert.equal((await handleDocketSearch(request({ query: `m${minute}-${n}` }, {}, address), search)).status, 200);
  }
  now += 60_000;
  for (let n = 0; n < 9; n += 1) assert.equal((await handleDocketSearch(request({ query: `last-${n}` }, {}, address), search)).status, 200);
  const daily = await handleDocketSearch(request({ query: 'late' }, {}, address), search);
  assert.equal(daily.status, 429);
  assert.ok(Number(daily.headers.get('retry-after')) > 3600);
});

test('bad input is still rejected with the existing messages', async () => {
  const { calls, search } = counting();
  const notJson = await handleDocketSearch(request('{oops'), search);
  assert.equal(notJson.status, 400);
  assert.deepEqual(await notJson.json(), { error: 'Send a JSON search request.' });
  const empty = await handleDocketSearch(request({ query: ' ' }), search);
  assert.equal(empty.status, 400);
  assert.deepEqual(await empty.json(), { error: 'A search query is required.' });
  const failing = await handleDocketSearch(request({ query: 'boom' }), async () => {
    throw new Error('down');
  });
  assert.equal(failing.status, 500);
  assert.equal(calls.length, 0);
});
