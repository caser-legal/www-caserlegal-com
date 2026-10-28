import assert from 'node:assert/strict';
import test from 'node:test';
import {
  caseInsights,
  caseQuestion,
  caseQuestionStream,
  caseResearch,
  handlePost,
  handleRedeem,
  handleStream,
  handleUsage,
  type MuseResponse,
} from '../src/lib/case-intelligence';
import { issueDeviceToken } from '../src/lib/device-attest';
import { memoryMeterStore, upstashMeterStore, type MeterStore } from '../src/lib/meter-store';
import { configureMetering, costReport, formatCostReport, meterConfig, parsePacks } from '../src/lib/metering';
import { StoreKitError, appleTransactionVerifier, clearEntitlementCache, type SignedTransaction } from '../src/lib/storekit';
import { signTransaction, testRoot, transactionPayload } from './fixtures/storekit';

const ATTEST_SECRET = 'test-attest-secret-with-at-least-32-chars';
const DEVICE_A = 'ab'.repeat(16);
const DEVICE_B = 'cd'.repeat(16);
const ACCOUNT = '6f1c2a3b-4d5e-4f60-8a7b-9c0d1e2f3a4b';
const OCT = Date.parse('2026-10-28T12:00:00Z');
const NOV = Date.parse('2026-11-15T12:00:00Z');
const METER_ENV = [
  'MUSE_MONTHLY_BUDGET_USD',
  'MUSE_MONTHLY_HARD_CAP_USD',
  'UNMETERED_UNTIL',
  'FREE_BRIEFINGS_PER_MONTH',
  'FREE_QUESTIONS_PER_MONTH',
  'PRO_BRIEFINGS_PER_MONTH',
  'PRO_QUESTIONS_PER_MONTH',
  'JUDGE_BRIEFINGS_PER_MONTH',
  'JUDGE_QUESTIONS_PER_MONTH',
  'CREDIT_PACKS',
];

const baseEntry = {
  title: 'Doe v. Acme Corp',
  docketText: 'MOTION to Dismiss filed by Acme Corp.',
  court: 'District of Delaware',
  caseNumber: '1:26-cv-01234',
  filedDate: '2026-10-24',
  parties: ['Jane Doe', 'Acme Corp'],
  link: 'https://ecf.ded.uscourts.gov/cgi-bin/DktRpt.pl?123',
};

function entryFor(n: number) {
  return { ...baseEntry, docketText: `Docket entry number ${n}.` };
}

const MEASURED = { input_tokens: 10_000, output_tokens: 1_000 };
const CONTRIBUTOR_COST = 10_000 * 0.1e-6 + 1_000 * 0.2e-6 + 0.0025;

function museMessage(text: string): MuseResponse {
  return {
    status: 'completed',
    usage: MEASURED,
    output: [
      { type: 'web_search_call' },
      { type: 'message', content: [{ type: 'output_text', text, annotations: [] }] },
    ],
  };
}

const INSIGHTS = { summary: 'Acme asked to dismiss.', filing_explained: 'A motion.', key_terms: [], what_to_watch: [] };
const ABOUT = { story: 'Doe sued Acme.', whos_who: [], where_it_stands: 'Pending.', timeline: [], in_the_news: [] };

function muse(calls: { count: number }, text: string, status = 200): typeof fetch {
  return (async () => {
    calls.count += 1;
    if (status !== 200) return Response.json({ error: { type: 'invalid_request' } }, { status });
    return Response.json(museMessage(text));
  }) as typeof fetch;
}

function museStream(calls: { count: number }): typeof fetch {
  return (async () => {
    calls.count += 1;
    const events = [
      { type: 'response.output_text.delta', delta: 'Responses are due soon.' },
      { type: 'response.completed', response: museMessage('Responses are due soon.') },
    ];
    return new Response(events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(''), {
      headers: { 'content-type': 'text/event-stream' },
    });
  }) as typeof fetch;
}

function caseCache() {
  const items = new Map<string, unknown>();
  return {
    async getJSON<T>(pathname: string) {
      return (items.get(pathname) as T | undefined) ?? null;
    },
    async putJSON(pathname: string, value: unknown) {
      items.set(pathname, JSON.parse(JSON.stringify(value)));
    },
  };
}

let ip = 0;
function post(path: string, body: unknown, headers: Record<string, string> = {}, device = DEVICE_A): Request {
  ip += 1;
  return new Request(`https://www.caserlegal.com${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-real-ip': `10.${(ip >> 16) & 255}.${(ip >> 8) & 255}.${ip & 255}`,
      'x-caser-device': issueDeviceToken(device, ATTEST_SECRET).token,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

const APPSTORE = { 'x-caser-edition': 'appstore' };

function fakeJws(transaction: Partial<SignedTransaction>): string {
  return `fake.${Buffer.from(JSON.stringify(transaction)).toString('base64url')}`;
}

async function fakeVerify(jws: string): Promise<SignedTransaction> {
  if (!jws.startsWith('fake.')) throw new StoreKitError('invalid_transaction');
  return {
    transactionId: 't-1',
    originalTransactionId: 'o-1',
    productId: 'com.alertsfor.caser.yearly',
    environment: 'Production',
    expiresDate: null,
    revocationDate: null,
    appAccountToken: null,
    ...JSON.parse(Buffer.from(jws.slice(5), 'base64url').toString('utf8')),
  };
}

let store: MeterStore;
let now = OCT;

function setup(overrides: Record<string, unknown> = {}) {
  store = memoryMeterStore(() => now);
  configureMetering({ store, fallback: memoryMeterStore(() => now), verifyTransaction: fakeVerify, clock: () => now, ...overrides });
}

test.beforeEach(() => {
  process.env.MODEL_API_KEY = 'LLM_test_key';
  process.env.ATTEST_SECRET = ATTEST_SECRET;
  delete process.env.MUSE_MODEL;
  for (const name of METER_ENV) delete process.env[name];
  now = OCT;
  clearEntitlementCache();
  setup();
});

test.after(() => configureMetering(null));

function briefing(kind: 'insights' | 'research', n: number, headers: Record<string, string> = {}, device = DEVICE_A, options: { calls?: { count: number }; cache?: ReturnType<typeof caseCache> } = {}) {
  const calls = options.calls ?? { count: 0 };
  const cache = options.cache ?? caseCache();
  const path = kind === 'insights' ? '/v1/case-insights' : '/v1/case-research';
  return kind === 'insights'
    ? handlePost(post(path, { entry: entryFor(n) }, headers, device), (body) => caseInsights(body, muse(calls, JSON.stringify(INSIGHTS)), cache), {
        endpoint: 'case-insights',
        kind: 'briefing',
      })
    : handlePost(post(path, { entry: entryFor(n) }, headers, device), (body) => caseResearch(body, muse(calls, JSON.stringify(ABOUT)), cache), {
        endpoint: 'case-research',
        kind: 'briefing',
      });
}

function question(headers: Record<string, string> = {}, device = DEVICE_A, calls = { count: 0 }) {
  return handlePost(
    post('/v1/case-question', { entry: entryFor(1), question: 'When is the response due?' }, headers, device),
    (body) => caseQuestion(body, muse(calls, 'Responses are due soon.')),
    { endpoint: 'case-question', kind: 'question' },
  );
}

function streamQuestion(headers: Record<string, string> = {}, device = DEVICE_A, calls = { count: 0 }) {
  return handleStream(
    post('/v1/case-question-stream', { entry: entryFor(1), question: 'When is the response due?' }, headers, device),
    (body) => caseQuestionStream(body, museStream(calls)),
    { endpoint: 'case-question-stream', kind: 'question' },
  );
}

test('the judge build without an edition header uses the judge allowance until UNMETERED_UNTIL', async () => {
  for (let n = 1; n <= 5; n += 1) {
    const response = await briefing('insights', n);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(body.insights, INSIGHTS);
    assert.equal(body.cached, false);
    assert.equal(body.usage.edition, 'unmetered');
    assert.deepEqual(body.usage.briefings, { used: n, limit: 100 });
  }
  for (let n = 1; n <= 5; n += 1) assert.equal((await question()).status, 200);
  const usage = (await (await handleUsage(post('/v1/usage', {}))).json()).usage;
  assert.deepEqual(usage.questions, { used: 5, limit: 100 });
});

test('judge devices are capped per month like metered devices, counting each case once', async () => {
  process.env.JUDGE_BRIEFINGS_PER_MONTH = '2';
  process.env.JUDGE_QUESTIONS_PER_MONTH = '1';
  const calls = { count: 0 };
  assert.equal((await briefing('insights', 1, {}, DEVICE_A, { calls })).status, 200);
  assert.equal((await briefing('research', 1, {}, DEVICE_A, { calls })).status, 200);
  assert.equal((await briefing('insights', 2, {}, DEVICE_A, { calls })).status, 200);
  const before = calls.count;
  const blocked = await briefing('insights', 3, {}, DEVICE_A, { calls });
  assert.equal(blocked.status, 402);
  const body = await blocked.json();
  assert.equal(body.error, 'quota_exceeded');
  assert.equal(body.kind, 'briefing');
  assert.deepEqual(body.usage.briefings, { used: 2, limit: 2 });
  assert.equal(calls.count, before);
  assert.equal((await briefing('research', 2, {}, DEVICE_A, { calls })).status, 200);
  assert.equal((await briefing('insights', 3, {}, DEVICE_B, { calls })).status, 200);
  assert.equal((await question()).status, 200);
  const question402 = await question();
  assert.equal(question402.status, 402);
  assert.equal((await question402.json()).kind, 'question');
  assert.equal((await streamQuestion()).status, 402);
  now = Date.parse('2026-11-01T00:00:01Z');
  assert.equal((await question()).status, 200);
});

test('judge usage stays in the free spend pool even with a subscription header', async () => {
  process.env.MUSE_MONTHLY_BUDGET_USD = '0.005';
  const subscription = { 'x-caser-subscription': fakeJws({ expiresDate: now + 86400_000, originalTransactionId: 'o-judge' }) };
  const cache = caseCache();
  assert.equal((await briefing('research', 1, subscription, DEVICE_A, { cache })).status, 200);
  assert.equal((await briefing('research', 2, subscription, DEVICE_A, { cache })).status, 200);
  assert.ok(Number(await store.get('atticus:v1:spend-free:2026-10')) > 0.005);
  assert.equal((await briefing('research', 3, subscription, DEVICE_A, { cache })).status, 503);
});

test('no-edition requests are metered as free after UNMETERED_UNTIL', async () => {
  process.env.UNMETERED_UNTIL = '2026-10-01T00:00:00Z';
  for (let n = 1; n <= 3; n += 1) assert.equal((await briefing('insights', n)).status, 200);
  const blocked = await briefing('insights', 4);
  assert.equal(blocked.status, 402);
  const body = await blocked.json();
  assert.equal(body.usage.edition, 'appstore');
  assert.equal(body.usage.plan, 'free');
});

test('free App Store users get three briefings a month, counted once per case across insights and research', async () => {
  const calls = { count: 0 };
  const first = await (await briefing('insights', 1, APPSTORE, DEVICE_A, { calls })).json();
  assert.deepEqual(first.usage.briefings, { used: 1, limit: 3 });
  const sameCase = await (await briefing('research', 1, APPSTORE, DEVICE_A, { calls })).json();
  assert.deepEqual(sameCase.usage.briefings, { used: 1, limit: 3 });
  await briefing('insights', 2, APPSTORE, DEVICE_A, { calls });
  const third = await (await briefing('research', 3, APPSTORE, DEVICE_A, { calls })).json();
  assert.deepEqual(third.usage.briefings, { used: 3, limit: 3 });
  const before = calls.count;
  const blocked = await briefing('insights', 4, APPSTORE, DEVICE_A, { calls });
  assert.equal(blocked.status, 402);
  const body = await blocked.json();
  assert.equal(body.error, 'quota_exceeded');
  assert.equal(body.kind, 'briefing');
  assert.deepEqual(body.usage.briefings, { used: 3, limit: 3 });
  assert.equal(calls.count, before);
  assert.equal((await briefing('research', 1, APPSTORE, DEVICE_A, { calls })).status, 200);
  assert.equal((await briefing('insights', 1, APPSTORE, DEVICE_B, { calls })).status, 200);
});

test('a new month resets the allowance', async () => {
  for (let n = 1; n <= 3; n += 1) await briefing('insights', n, APPSTORE);
  assert.equal((await briefing('insights', 4, APPSTORE)).status, 402);
  now = Date.parse('2026-11-01T00:00:01Z');
  const response = await briefing('insights', 4, APPSTORE);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).usage.period_end, '2026-12-01T00:00:00.000Z');
});

test('a briefing served from the shared cache still counts and costs nothing', async () => {
  const cache = caseCache();
  await caseResearch({ entry: entryFor(9) }, muse({ count: 0 }, JSON.stringify(ABOUT)), cache);
  const calls = { count: 0 };
  const response = await briefing('research', 9, APPSTORE, DEVICE_A, { calls, cache });
  const body = await response.json();
  assert.equal(body.cached, true);
  assert.equal(calls.count, 0);
  assert.deepEqual(body.usage.briefings, { used: 1, limit: 3 });
  const report = await costReport(store, '2026-10');
  assert.equal(report.spend_usd, 0);
  assert.equal(report.endpoints.find((item) => item.endpoint === 'case-research')?.cached, 1);
});

test('failed requests are never charged, but their measured Muse cost is recorded', async () => {
  const failed = await handlePost(
    post('/v1/case-insights', { entry: entryFor(1) }, APPSTORE),
    (body) => caseInsights(body, muse({ count: 0 }, 'not json'), caseCache()),
    { endpoint: 'case-insights', kind: 'briefing' },
  );
  assert.equal(failed.status, 502);
  const upstream = await handlePost(
    post('/v1/case-insights', { entry: entryFor(2) }, APPSTORE),
    (body) => caseInsights(body, muse({ count: 0 }, '', 400), caseCache()),
    { endpoint: 'case-insights', kind: 'briefing' },
  );
  assert.equal(upstream.status, 502);
  const usage = (await (await handleUsage(post('/v1/usage', {}, APPSTORE))).json()).usage;
  assert.deepEqual(usage.briefings, { used: 0, limit: 3 });
  const report = await costReport(store, '2026-10');
  const insights = report.endpoints.find((item) => item.endpoint === 'case-insights')!;
  assert.equal(insights.failed, 1);
  assert.equal(insights.served, 0);
  assert.ok(Math.abs(report.spend_usd - CONTRIBUTOR_COST) < 1e-9);
});

test('free users get three questions a month across the JSON and streaming endpoints', async () => {
  const first = await (await question(APPSTORE)).json();
  assert.equal(first.answer.text, 'Responses are due soon.');
  assert.deepEqual(first.usage.questions, { used: 1, limit: 3 });
  await question(APPSTORE);
  const streamed = await streamQuestion(APPSTORE);
  assert.equal(streamed.status, 200);
  const text = await streamed.text();
  const done = text
    .split('\n\n')
    .filter((line) => line.startsWith('data: '))
    .map((line) => JSON.parse(line.slice(6)))
    .find((event) => event.type === 'done');
  assert.deepEqual(done.usage.questions, { used: 3, limit: 3 });
  const calls = { count: 0 };
  const blocked = await question(APPSTORE, DEVICE_A, calls);
  assert.equal(blocked.status, 402);
  const body = await blocked.json();
  assert.equal(body.kind, 'question');
  assert.equal(calls.count, 0);
  assert.equal((await streamQuestion(APPSTORE)).status, 402);
  assert.equal((await costReport(store, '2026-10')).questions, 3);
});

test('Pro subscribers get the Pro allowance keyed by the subscription, shared across devices', async () => {
  const subscription = { 'x-caser-subscription': fakeJws({ expiresDate: now + 86400_000, originalTransactionId: 'o-77' }) };
  const first = await (await briefing('insights', 1, { ...APPSTORE, ...subscription }, DEVICE_A)).json();
  assert.equal(first.usage.plan, 'pro');
  assert.deepEqual(first.usage.briefings, { used: 1, limit: 100 });
  const other = await (await briefing('insights', 2, { ...APPSTORE, ...subscription }, DEVICE_B)).json();
  assert.deepEqual(other.usage.briefings, { used: 2, limit: 100 });
  for (let n = 1; n <= 100; n += 1) {
    now += 60_000;
    await briefing('research', n, { ...APPSTORE, ...subscription }, n % 2 ? DEVICE_A : DEVICE_B);
  }
  now += 600_000;
  const blocked = await briefing('insights', 101, { ...APPSTORE, ...subscription }, DEVICE_A);
  assert.equal(blocked.status, 402);
  assert.deepEqual((await blocked.json()).usage.briefings, { used: 100, limit: 100 });
});

test('a bad, expired or foreign subscription header falls back to free without failing the request', async () => {
  for (const value of [
    'garbage',
    fakeJws({ expiresDate: now - 1000 }),
    fakeJws({ expiresDate: now + 86400_000, revocationDate: now - 1000 }),
    fakeJws({ expiresDate: now + 86400_000, productId: 'com.alertsfor.caser.monthly' }),
  ]) {
    clearEntitlementCache();
    const response = await briefing('insights', 1, { ...APPSTORE, 'x-caser-subscription': value });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).usage.plan, 'free');
  }
});

test('credit packs are redeemed once per transaction and spent after the monthly allowance', async () => {
  const pack = fakeJws({ transactionId: 'c-1', productId: 'com.alertsfor.caser.credits.10000', appAccountToken: ACCOUNT });
  const account = { 'x-caser-account': ACCOUNT.toUpperCase() };
  const redeemed = await handleRedeem(post('/v1/credits/redeem', { transaction: pack }, { ...APPSTORE, ...account }));
  assert.equal(redeemed.status, 200);
  const body = await redeemed.json();
  assert.equal(body.granted, 50);
  assert.equal(body.usage.credits, 50);
  const again = await (await handleRedeem(post('/v1/credits/redeem', { transaction: pack }, { ...APPSTORE, ...account }))).json();
  assert.equal(again.granted, 0);
  assert.equal(again.duplicate, true);
  assert.equal(again.usage.credits, 50);

  for (let n = 1; n <= 3; n += 1) await briefing('insights', n, { ...APPSTORE, ...account });
  const extra = await (await briefing('insights', 4, { ...APPSTORE, ...account })).json();
  assert.deepEqual(extra.usage.briefings, { used: 3, limit: 3 });
  assert.equal(extra.usage.credits, 49);
  for (let n = 1; n <= 4; n += 1) await question({ ...APPSTORE, ...account });
  const usage = (await (await handleUsage(post('/v1/usage', {}, { ...APPSTORE, ...account }))).json()).usage;
  assert.equal(usage.credits, 48);
  assert.deepEqual(usage.questions, { used: 3, limit: 3 });
  const withoutAccount = await briefing('insights', 5, APPSTORE);
  assert.equal(withoutAccount.status, 402);
});

test('redeem rejects bad accounts, foreign accounts, unknown products and revoked or forged transactions', async () => {
  const redeem = (transaction: unknown, account = ACCOUNT) =>
    handleRedeem(post('/v1/credits/redeem', { transaction }, { 'x-caser-account': account }));
  const pack = (overrides: Partial<SignedTransaction>) =>
    fakeJws({ transactionId: `c-${Math.random()}`, productId: 'com.alertsfor.caser.credits.50000', appAccountToken: ACCOUNT, ...overrides });
  assert.deepEqual(await (await redeem(pack({}), 'not-a-uuid')).json(), { error: 'invalid_account' });
  const foreign = await redeem(pack({ appAccountToken: '00000000-0000-4000-8000-000000000000' }));
  assert.equal(foreign.status, 403);
  assert.deepEqual(await foreign.json(), { error: 'account_mismatch' });
  assert.deepEqual(await (await redeem(pack({ productId: 'com.alertsfor.caser.yearly' }))).json(), { error: 'unknown_product' });
  assert.deepEqual(await (await redeem(pack({ revocationDate: now }))).json(), { error: 'transaction_revoked' });
  assert.deepEqual(await (await redeem('forged')).json(), { error: 'invalid_transaction' });
  assert.deepEqual(await (await redeem(42)).json(), { error: 'invalid_transaction' });
  const missingDevice = await handleRedeem(
    new Request('https://www.caserlegal.com/v1/credits/redeem', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-caser-account': ACCOUNT },
      body: JSON.stringify({ transaction: pack({}) }),
    }),
  );
  assert.equal(missingDevice.status, 401);
  const good = await (await redeem(pack({}))).json();
  assert.equal(good.granted, 200);
});

test('redeem verifies a real Apple-format signed consumable', async () => {
  setup({ verifyTransaction: appleTransactionVerifier({ roots: [testRoot], onlineChecks: false }) });
  now = Date.now();
  const jws = signTransaction(
    transactionPayload({
      transactionId: '2000000999',
      originalTransactionId: '2000000999',
      productId: 'com.alertsfor.caser.credits.100000',
      type: 'Consumable',
      expiresDate: undefined,
      appAccountToken: ACCOUNT,
      environment: 'Production',
    }),
  );
  const response = await handleRedeem(post('/v1/credits/redeem', { transaction: jws }, { 'x-caser-account': ACCOUNT }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).granted, 750);
});

test('Sandbox consumables grant at most 10 uses each', async () => {
  const redeem = (transactionId: string, environment: string) =>
    handleRedeem(
      post(
        '/v1/credits/redeem',
        { transaction: fakeJws({ transactionId, environment, productId: 'com.alertsfor.caser.credits.100000', appAccountToken: ACCOUNT }) },
        { 'x-caser-account': ACCOUNT },
      ),
    );
  const sandbox = await (await redeem('s-1', 'Sandbox')).json();
  assert.equal(sandbox.granted, 10);
  assert.equal(sandbox.usage.credits, 10);
  const production = await (await redeem('p-1', 'Production')).json();
  assert.equal(production.granted, 750);
  assert.equal(production.usage.credits, 760);
});

test('Sandbox subscriptions get Pro limits in a separate bucket, and their spend stays in the free pool', async () => {
  process.env.MUSE_MONTHLY_BUDGET_USD = '0.005';
  const sandbox = { ...APPSTORE, 'x-caser-subscription': fakeJws({ expiresDate: now + 86400_000, originalTransactionId: 'o-sb', environment: 'Sandbox' }) };
  const production = { ...APPSTORE, 'x-caser-subscription': fakeJws({ expiresDate: now + 86400_000, originalTransactionId: 'o-sb' }) };
  const cache = caseCache();
  const first = await (await briefing('research', 1, sandbox, DEVICE_A, { cache })).json();
  assert.equal(first.usage.plan, 'pro');
  assert.deepEqual(first.usage.briefings, { used: 1, limit: 100 });
  assert.equal(await store.get('atticus:v1:use:2026-10:pro-sandbox:o-sb:briefing'), '1');
  assert.equal(await store.get('atticus:v1:use:2026-10:pro:o-sb:briefing'), null);
  assert.equal((await briefing('research', 2, sandbox, DEVICE_A, { cache })).status, 200);
  assert.equal((await briefing('research', 3, sandbox, DEVICE_A, { cache })).status, 503);
  const paid = await (await briefing('research', 4, production, DEVICE_A, { cache })).json();
  assert.deepEqual(paid.usage.briefings, { used: 1, limit: 100 });
});

test('redeem refuses a transaction that an App Store notification revoked', async () => {
  await store.set('atticus:v1:revoked-tx:c-refunded', String(now));
  const response = await handleRedeem(
    post(
      '/v1/credits/redeem',
      { transaction: fakeJws({ transactionId: 'c-refunded', productId: 'com.alertsfor.caser.credits.10000', appAccountToken: ACCOUNT }) },
      { 'x-caser-account': ACCOUNT },
    ),
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'transaction_revoked' });
  assert.equal(await store.get(`atticus:v1:credits:${ACCOUNT}`), null);
});

test('a subscription revoked or expired by an App Store notification falls back to free', async () => {
  const expiresDate = now + 86400_000;
  const subscription = { ...APPSTORE, 'x-caser-subscription': fakeJws({ expiresDate, transactionId: 't-9', originalTransactionId: 'o-9' }) };
  assert.equal((await (await briefing('insights', 1, subscription)).json()).usage.plan, 'pro');
  await store.set('atticus:v1:revoked-otid:o-9', String(expiresDate));
  clearEntitlementCache();
  assert.equal((await (await briefing('insights', 2, subscription)).json()).usage.plan, 'free');
  await store.del('atticus:v1:revoked-otid:o-9');
  clearEntitlementCache();
  assert.equal((await (await briefing('insights', 3, subscription)).json()).usage.plan, 'pro');
  await store.set('atticus:v1:expired-otid:o-9', String(expiresDate));
  clearEntitlementCache();
  assert.equal((await (await briefing('insights', 4, subscription)).json()).usage.plan, 'free');
  const renewed = { ...APPSTORE, 'x-caser-subscription': fakeJws({ expiresDate: expiresDate + 86400_000 * 365, transactionId: 't-10', originalTransactionId: 'o-9' }) };
  assert.equal((await (await briefing('insights', 5, renewed)).json()).usage.plan, 'pro');
});

test('the monthly budget pauses Muse calls with atticus_paused but still serves cached briefings', async () => {
  process.env.MUSE_MONTHLY_BUDGET_USD = '0.005';
  const cache = caseCache();
  assert.equal((await briefing('research', 1, {}, DEVICE_A, { cache })).status, 200);
  assert.equal((await briefing('research', 2, {}, DEVICE_A, { cache })).status, 200);
  const calls = { count: 0 };
  const paused = await briefing('research', 3, APPSTORE, DEVICE_B, { calls, cache });
  assert.equal(paused.status, 503);
  assert.deepEqual(await paused.json(), { error: 'atticus_paused' });
  assert.equal(calls.count, 0);
  const cached = await briefing('research', 1, APPSTORE, DEVICE_B, { calls, cache });
  assert.equal(cached.status, 200);
  const body = await cached.json();
  assert.equal(body.cached, true);
  assert.equal(body.usage.paused, true);
  assert.equal((await question({}, DEVICE_A, calls)).status, 503);
  const streamed = await streamQuestion(APPSTORE, DEVICE_B, calls);
  assert.equal(streamed.status, 503);
  assert.deepEqual(await streamed.json(), { error: 'atticus_paused' });
  assert.equal(calls.count, 0);
  assert.equal((await briefing('research', 2, APPSTORE, DEVICE_B, { cache })).status, 200);
  const usage = (await (await handleUsage(post('/v1/usage', {}, APPSTORE, DEVICE_B))).json()).usage;
  assert.deepEqual(usage.briefings, { used: 2, limit: 3 });
});

test('durable abuse limits cap every device at 120 Muse requests per 10 minutes and 1500 per day', async (t) => {
  const previous = process.env.PRO_QUESTIONS_PER_MONTH;
  process.env.PRO_QUESTIONS_PER_MONTH = '500';
  t.after(() => {
    if (previous === undefined) delete process.env.PRO_QUESTIONS_PER_MONTH;
    else process.env.PRO_QUESTIONS_PER_MONTH = previous;
  });
  const subscription = { ...APPSTORE, 'x-caser-subscription': fakeJws({ expiresDate: now + 86400_000 }) };
  for (let n = 0; n < 120; n += 1) assert.equal((await question(subscription)).status, 200);
  const limited = await question(subscription);
  assert.equal(limited.status, 429);
  assert.deepEqual(await limited.json(), { error: 'rate_limited' });
  const retryAfter = Number(limited.headers.get('retry-after'));
  assert.ok(retryAfter > 0 && retryAfter <= 600);
  assert.equal((await question({}, DEVICE_B)).status, 200);
  now += 600_000;
  assert.equal((await question(subscription)).status, 200);
  await store.incr(`atticus:v1:abuse:${DEVICE_A}:d:2026-10-28`, 1500, 86400);
  const daily = await question(subscription);
  assert.equal(daily.status, 429);
  assert.ok(Number(daily.headers.get('retry-after')) > 600);
});

test('without a configured store, metered requests pause and judge requests run on in-memory limits', async () => {
  const logged: unknown[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    logged.push(args[0]);
  };
  try {
    setup({ store: null });
    const calls = { count: 0 };
    const metered = await briefing('insights', 1, APPSTORE, DEVICE_A, { calls });
    assert.equal(metered.status, 503);
    assert.deepEqual(await metered.json(), { error: 'atticus_paused' });
    assert.equal(calls.count, 0);
    assert.equal((await briefing('insights', 2, {}, DEVICE_A, { calls })).status, 200);
    assert.equal((await question()).status, 200);
    const redeem = await handleRedeem(post('/v1/credits/redeem', { transaction: fakeJws({}) }, { 'x-caser-account': ACCOUNT }));
    assert.equal(redeem.status, 503);
    assert.deepEqual(await redeem.json(), { error: 'credits_unavailable' });
    const usage = (await (await handleUsage(post('/v1/usage', {}, APPSTORE))).json()).usage;
    assert.equal(usage.paused, true);
    assert.equal(logged.filter((item) => item === 'meter_store_missing').length, 1);
    process.env.MUSE_MONTHLY_BUDGET_USD = '0.001';
    assert.equal((await question()).status, 503);
  } finally {
    console.error = original;
  }
});

test('a store outage pauses metered requests and keeps judge requests running', async () => {
  const original = console.error;
  console.error = () => undefined;
  try {
    const down = (async () => {
      throw new Error('down');
    }) as typeof fetch;
    setup({ store: upstashMeterStore('https://example.upstash.io', 't', down) });
    assert.equal((await briefing('insights', 1, APPSTORE)).status, 503);
    assert.equal((await briefing('insights', 1)).status, 200);
  } finally {
    console.error = original;
  }
});

test('/v1/usage reports plan, edition, limits for both tiers, credits and packs', async () => {
  const response = await handleUsage(post('/v1/usage', {}, APPSTORE));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    usage: {
      plan: 'free',
      edition: 'appstore',
      period_end: '2026-11-01T00:00:00.000Z',
      briefings: { used: 0, limit: 3 },
      questions: { used: 0, limit: 3 },
      credits: 0,
      packs: {
        'com.alertsfor.caser.credits.10000': 50,
        'com.alertsfor.caser.credits.50000': 200,
        'com.alertsfor.caser.credits.100000': 750,
      },
      plans: { free: { briefings: 3, questions: 3 }, pro: { briefings: 100, questions: 100 } },
      paused: false,
    },
  });
  process.env.FREE_BRIEFINGS_PER_MONTH = '5';
  process.env.PRO_QUESTIONS_PER_MONTH = '50';
  process.env.CREDIT_PACKS = 'com.alertsfor.caser.credits.10000=30';
  const changed = (await (await handleUsage(post('/v1/usage', {}, APPSTORE))).json()).usage;
  assert.deepEqual(changed.briefings, { used: 0, limit: 5 });
  assert.deepEqual(changed.plans.pro, { briefings: 100, questions: 50 });
  assert.deepEqual(changed.packs, { 'com.alertsfor.caser.credits.10000': 30 });
  const unverified = await handleUsage(
    new Request('https://www.caserlegal.com/v1/usage', { method: 'POST', headers: { 'x-caser-device': '' } }),
  );
  assert.equal(unverified.status, 401);
});

test('free usage spending its budget does not pause Pro subscribers until the hard cap', async () => {
  process.env.MUSE_MONTHLY_BUDGET_USD = '0.005';
  process.env.MUSE_MONTHLY_HARD_CAP_USD = '1';
  const cache = caseCache();
  assert.equal((await briefing('research', 1, APPSTORE, DEVICE_A, { cache })).status, 200);
  assert.equal((await briefing('research', 2, APPSTORE, DEVICE_A, { cache })).status, 200);
  assert.equal((await briefing('research', 3, APPSTORE, DEVICE_B, { cache })).status, 503);
  const subscription = { 'x-caser-subscription': fakeJws({ expiresDate: now + 86400_000, originalTransactionId: 'o-cap' }) };
  const pro = await briefing('research', 4, { ...APPSTORE, ...subscription }, DEVICE_B, { cache });
  assert.equal(pro.status, 200);
  assert.equal((await pro.json()).usage.paused, false);
  process.env.MUSE_MONTHLY_HARD_CAP_USD = '0.005';
  assert.equal((await briefing('research', 5, { ...APPSTORE, ...subscription }, DEVICE_B, { cache })).status, 503);
});

test('meterConfig ignores invalid numbers and pack definitions', () => {
  const config = meterConfig({
    MUSE_MONTHLY_BUDGET_USD: '-3',
    FREE_QUESTIONS_PER_MONTH: '2.5',
    PRO_BRIEFINGS_PER_MONTH: '45',
    UNMETERED_UNTIL: 'soon',
  });
  assert.equal(config.budgetUsd, 10);
  assert.equal(config.hardCapUsd, 50);
  assert.equal(config.free.questions, 3);
  assert.equal(config.pro.briefings, 45);
  assert.equal(config.unmeteredUntil, Date.parse('2026-11-10T08:00:00Z'));
  assert.deepEqual(parsePacks('bad id=5,com.x.pack=0'), parsePacks(undefined));
  assert.deepEqual(parsePacks('com.x.pack=7, com.y.pack = 9'), { 'com.x.pack': 7, 'com.y.pack': 9 });
});

test('the cost report prints measured averages per endpoint', async () => {
  const cache = caseCache();
  await briefing('insights', 1, {}, DEVICE_A, { cache });
  await briefing('research', 1, {}, DEVICE_A, { cache });
  await briefing('research', 1, {}, DEVICE_B, { cache });
  await question();
  const report = await costReport(store, '2026-10');
  const research = report.endpoints.find((item) => item.endpoint === 'case-research')!;
  assert.equal(research.served, 1);
  assert.equal(research.cached, 1);
  assert.equal(research.cache_hit_rate, 0.5);
  assert.ok(Math.abs((research.cost_per_uncached ?? 0) - CONTRIBUTOR_COST) < 1e-9);
  assert.ok(Math.abs((report.cost_per_uncached_briefing ?? 0) - 2 * CONTRIBUTOR_COST) < 1e-9);
  assert.equal(report.briefings, 2);
  assert.equal(report.questions, 1);
  const standardQuestion = 10_000 * 1.25e-6 + 1_000 * 4.25e-6 + 0.0025;
  assert.ok(Math.abs((report.cost_per_question ?? 0) - standardQuestion) < 1e-9);
  assert.ok(Math.abs(report.spend_usd - (2 * CONTRIBUTOR_COST + standardQuestion)) < 1e-9);
  const text = formatCostReport(report, 15);
  assert.ok(text.includes('2026-10'));
  assert.ok(text.includes('case-research'));
  assert.ok(text.includes('50.0%'));
  assert.equal((await costReport(store, '2026-09')).cost_per_question, null);
});
