import assert from 'node:assert/strict';
import test from 'node:test';
import { MeterStoreError, memoryMeterStore, meterStoreFromEnv, upstashMeterStore } from '../src/lib/meter-store';

test('the memory store increments atomically with expiry and set-if-absent', async () => {
  let now = 1_000_000;
  const store = memoryMeterStore(() => now);
  assert.equal(await store.incr('a', 1, 10), 1);
  assert.equal(await store.incr('a', 2, 999), 3);
  assert.equal(await store.incr('a', -1), 2);
  now += 10_001;
  assert.equal(await store.get('a'), null);
  assert.equal(await store.incr('a', 1, 10), 1);
  assert.equal(await store.incrByFloat('cost', 0.0125), 0.0125);
  assert.ok(Math.abs((await store.incrByFloat('cost', 0.0025)) - 0.015) < 1e-12);
  assert.equal(await store.setIfAbsent('once', 'x', 5), true);
  assert.equal(await store.setIfAbsent('once', 'y', 5), false);
  const [once, missing, cost] = await store.getMany(['once', 'missing', 'cost']);
  assert.deepEqual([once, missing], ['x', null]);
  assert.ok(Math.abs(Number(cost) - 0.015) < 1e-12);
  await store.del('once');
  assert.equal(await store.setIfAbsent('once', 'z'), true);
  now += 1_000_000_000;
  assert.equal(await store.get('once'), 'z');
});

function upstashFetch(results: unknown[], calls: { url: string; init: RequestInit }[]): typeof fetch {
  return (async (url: unknown, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    const next = results.shift();
    if (next instanceof Error) throw next;
    return Response.json(next);
  }) as typeof fetch;
}

test('the Upstash store sends REST commands with the bearer token', async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  const store = upstashMeterStore(
    'https://example.upstash.io/',
    'token-123',
    upstashFetch([{ result: 4 }, { result: '0.25' }, { result: 'OK' }, { result: null }, { result: ['1', null] }, { result: '7' }, { result: 1 }], calls),
  );
  assert.equal(await store.incr('k', 1, 600), 4);
  assert.equal(await store.incrByFloat('f', 0.25, 60), 0.25);
  assert.equal(await store.setIfAbsent('s', 'v', 30), true);
  assert.equal(await store.setIfAbsent('s', 'v'), false);
  assert.deepEqual(await store.getMany(['a', 'b']), ['1', null]);
  assert.equal(await store.get('g'), '7');
  await store.del('s');
  const bodies = calls.map((call) => JSON.parse(String(call.init.body)));
  assert.equal(calls[0].url, 'https://example.upstash.io');
  assert.equal((calls[0].init.headers as Record<string, string>).Authorization, 'Bearer token-123');
  assert.equal(bodies[0][0], 'EVAL');
  assert.deepEqual(bodies[0].slice(2), ['1', 'k', '1', '600']);
  assert.deepEqual(bodies[1].slice(2), ['1', 'f', '0.25', '60']);
  assert.deepEqual(bodies[2], ['SET', 's', 'v', 'NX', 'EX', '30']);
  assert.deepEqual(bodies[3], ['SET', 's', 'v', 'NX']);
  assert.deepEqual(bodies[4], ['MGET', 'a', 'b']);
  assert.deepEqual(bodies[5], ['GET', 'g']);
  assert.deepEqual(bodies[6], ['DEL', 's']);
});

test('the Upstash store reports errors and outages as MeterStoreError', async () => {
  const store = upstashMeterStore('https://example.upstash.io', 't', upstashFetch([{ error: 'WRONGTYPE' }, new Error('down')], []));
  await assert.rejects(store.get('x'), MeterStoreError);
  await assert.rejects(store.get('x'), MeterStoreError);
});

test('the store comes from Upstash or Vercel KV variables and is missing in production without them', () => {
  assert.ok(meterStoreFromEnv({ UPSTASH_REDIS_REST_URL: 'https://a.upstash.io', UPSTASH_REDIS_REST_TOKEN: 't' }));
  assert.ok(meterStoreFromEnv({ KV_REST_API_URL: 'https://a.upstash.io', KV_REST_API_TOKEN: 't', VERCEL: '1' }));
  assert.equal(meterStoreFromEnv({ VERCEL: '1' }), null);
  assert.equal(meterStoreFromEnv({ NODE_ENV: 'production' }), null);
  assert.equal(meterStoreFromEnv({ KV_REST_API_URL: 'http://insecure', KV_REST_API_TOKEN: 't', VERCEL: '1' }), null);
  assert.ok(meterStoreFromEnv({ NODE_ENV: 'development' }));
});
