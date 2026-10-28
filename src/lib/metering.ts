import { AsyncLocalStorage } from 'node:async_hooks';
import { createHash } from 'node:crypto';
import { MeterStoreError, memoryMeterStore, meterStoreFromEnv, type MeterStore } from './meter-store';
import { StoreKitError, appleTransactionVerifier, proEntitlement, revocationKeys, type TransactionVerifier } from './storekit';

export const EDITION_HEADER = 'x-caser-edition';
export const SUBSCRIPTION_HEADER = 'x-caser-subscription';
export const ACCOUNT_HEADER = 'x-caser-account';
const KEY_PREFIX = 'atticus:v1';
const PERIOD_TTL_SECONDS = 40 * 86400;
const LEDGER_TTL_SECONDS = 400 * 86400;
const ABUSE_WINDOW_SECONDS = 600;
const ABUSE_WINDOW_MAX = 120;
const ABUSE_DAY_MAX = 1500;
const DEFAULT_UNMETERED_UNTIL = '2026-11-10T08:00:00Z';
const DEFAULT_BUDGET_USD = 10;
const DEFAULT_HARD_CAP_USD = 50;
const SANDBOX_MAX_USES = 10;
const DEFAULT_PACKS: Record<string, number> = {
  'com.alertsfor.caser.credits.10000': 50,
  'com.alertsfor.caser.credits.50000': 200,
  'com.alertsfor.caser.credits.100000': 750,
};
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PRODUCT_PATTERN = /^[A-Za-z0-9._-]{1,100}$/;

export const METERED_ENDPOINTS = ['case-insights', 'case-research', 'case-question', 'case-question-stream'] as const;
export type MeteredEndpoint = (typeof METERED_ENDPOINTS)[number];
export type MeteredKind = 'briefing' | 'question';
export type MeterSpec = { endpoint: MeteredEndpoint; kind: MeteredKind };

export class MeterError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    readonly retryAfterSeconds?: number,
    readonly extra?: Record<string, unknown>,
  ) {
    super(code);
  }
}

export type MeterConfig = {
  budgetUsd: number;
  hardCapUsd: number;
  unmeteredUntil: number;
  free: { briefings: number; questions: number };
  pro: { briefings: number; questions: number };
  judge: { briefings: number; questions: number };
  packs: Record<string, number>;
};

function whole(value: string | undefined, fallback: number): number {
  const parsed = Number(value?.trim());
  return value?.trim() && Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function amount(value: string | undefined, fallback: number): number {
  const parsed = Number(value?.trim());
  return value?.trim() && Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function parsePacks(value: string | undefined): Record<string, number> {
  if (!value?.trim()) return { ...DEFAULT_PACKS };
  const packs: Record<string, number> = {};
  for (const pair of value.split(',')) {
    const [productId, uses] = pair.split('=').map((part) => part?.trim() ?? '');
    const count = Number(uses);
    if (PRODUCT_PATTERN.test(productId) && Number.isInteger(count) && count > 0) packs[productId] = count;
  }
  return Object.keys(packs).length ? packs : { ...DEFAULT_PACKS };
}

export function meterConfig(env: Record<string, string | undefined> = process.env): MeterConfig {
  const until = Date.parse(env.UNMETERED_UNTIL?.trim() ?? '');
  const budgetUsd = amount(env.MUSE_MONTHLY_BUDGET_USD, DEFAULT_BUDGET_USD);
  return {
    budgetUsd,
    hardCapUsd: Math.max(budgetUsd, amount(env.MUSE_MONTHLY_HARD_CAP_USD, DEFAULT_HARD_CAP_USD)),
    unmeteredUntil: Number.isFinite(until) ? until : Date.parse(DEFAULT_UNMETERED_UNTIL),
    free: {
      briefings: whole(env.FREE_BRIEFINGS_PER_MONTH, 3),
      questions: whole(env.FREE_QUESTIONS_PER_MONTH, 3),
    },
    pro: {
      briefings: whole(env.PRO_BRIEFINGS_PER_MONTH, 100),
      questions: whole(env.PRO_QUESTIONS_PER_MONTH, 100),
    },
    judge: {
      briefings: whole(env.JUDGE_BRIEFINGS_PER_MONTH, 100),
      questions: whole(env.JUDGE_QUESTIONS_PER_MONTH, 100),
    },
    packs: parsePacks(env.CREDIT_PACKS),
  };
}

type MeterDeps = {
  store: MeterStore | null;
  fallback: MeterStore;
  verifyTransaction: TransactionVerifier;
  clock: () => number;
};

let overrides: Partial<MeterDeps> = {};
let envStore: MeterStore | null | undefined;
let defaultVerifier: TransactionVerifier | undefined;
const fallbackStore = memoryMeterStore();
let warnedMissing = false;

export function configureMetering(next: Partial<MeterDeps> | null): void {
  overrides = next ?? {};
  envStore = undefined;
  warnedMissing = false;
}

function deps(): MeterDeps {
  if (!('store' in overrides) && envStore === undefined) envStore = meterStoreFromEnv();
  const store = 'store' in overrides ? (overrides.store ?? null) : (envStore ?? null);
  if (!store && !warnedMissing) {
    warnedMissing = true;
    console.error('meter_store_missing');
  }
  return {
    store,
    fallback: overrides.fallback ?? fallbackStore,
    verifyTransaction: overrides.verifyTransaction ?? (defaultVerifier ??= appleTransactionVerifier()),
    clock: overrides.clock ?? Date.now,
  };
}

export function meterStores(): { store: MeterStore | null; fallback: MeterStore; now: number } {
  const { store, fallback, clock } = deps();
  return { store, fallback, now: clock() };
}

export function periodKey(now: number): string {
  return new Date(now).toISOString().slice(0, 7);
}

export function periodEnd(now: number): string {
  const date = new Date(now);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1)).toISOString();
}

export function previousPeriodKey(now: number): string {
  const date = new Date(now);
  return periodKey(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1));
}

const keys = {
  use: (period: string, subject: string, kind: MeteredKind) => `${KEY_PREFIX}:use:${period}:${subject}:${kind}`,
  brief: (period: string, subject: string, digest: string) => `${KEY_PREFIX}:brief:${period}:${subject}:${digest}`,
  credits: (account: string) => `${KEY_PREFIX}:credits:${account}`,
  redeemed: (transactionId: string) => `${KEY_PREFIX}:redeemed:${transactionId}`,
  spend: (period: string) => `${KEY_PREFIX}:spend:${period}`,
  freeSpend: (period: string) => `${KEY_PREFIX}:spend-free:${period}`,
  ledger: (period: string, name: string, field: string) => `${KEY_PREFIX}:ledger:${period}:${name}:${field}`,
  abuseWindow: (deviceId: string, bucket: number) => `${KEY_PREFIX}:abuse:${deviceId}:w:${bucket}`,
  abuseDay: (deviceId: string, day: string) => `${KEY_PREFIX}:abuse:${deviceId}:d:${day}`,
  limit: (name: string, subject: string, seconds: number, bucket: number) => `${KEY_PREFIX}:limit:${name}:${subject}:${seconds}:${bucket}`,
  refundDebit: (transactionId: string) => `${KEY_PREFIX}:refund-debit:${transactionId}`,
  notification: (uuid: string) => `${KEY_PREFIX}:asn:${uuid}`,
};

export { keys as meterKeys };

export type LimitWindow = { max: number; seconds: number };

async function countWindows(store: MeterStore, name: string, subject: string, windows: LimitWindow[], now: number): Promise<void> {
  const hashed = createHash('sha256').update(subject).digest('hex').slice(0, 32);
  const buckets = windows.map((window) => Math.floor(now / (window.seconds * 1000)));
  const counts = await Promise.all(
    windows.map((window, index) => store.incr(keys.limit(name, hashed, window.seconds, buckets[index]), 1, window.seconds)),
  );
  let retryAfter = 0;
  windows.forEach((window, index) => {
    if (counts[index] <= window.max) return;
    const end = (buckets[index] + 1) * window.seconds * 1000;
    retryAfter = Math.max(retryAfter, Math.ceil((end - now) / 1000));
  });
  if (retryAfter) throw new MeterError(429, 'rate_limited', Math.max(1, retryAfter));
}

export async function enforceDurableLimit(
  name: string,
  subject: string,
  windows: LimitWindow[],
  options: { store?: MeterStore } = {},
): Promise<void> {
  const { store, fallback, now } = meterStores();
  if (options.store) return countWindows(options.store, name, subject, windows, now);
  try {
    return await countWindows(store ?? fallback, name, subject, windows, now);
  } catch (error) {
    if (!(error instanceof MeterStoreError)) throw error;
    console.error('meter_store_error', error.message);
    return countWindows(fallback, name, subject, windows, now);
  }
}

export type Edition = 'appstore' | 'unmetered';
export type Plan = 'free' | 'pro';

export type MeterIdentity = {
  deviceId: string;
  edition: Edition;
  plan: Plan;
  subject: string;
  account: string | null;
  now: number;
  period: string;
  periodEnd: string;
  limits: { briefings: number; questions: number };
  config: MeterConfig;
  store: MeterStore;
  degraded: boolean;
  paid: boolean;
};

export type Usage = {
  plan: Plan;
  edition: Edition;
  period_end: string;
  briefings: { used: number; limit: number };
  questions: { used: number; limit: number };
  credits: number;
  packs: Record<string, number>;
  plans: { free: { briefings: number; questions: number }; pro: { briefings: number; questions: number } };
  paused: boolean;
};

export function parseAccount(value: string | null): string | null {
  const trimmed = (value ?? '').trim();
  return UUID_PATTERN.test(trimmed) ? trimmed.toLowerCase() : null;
}

export async function meterIdentity(request: Request, deviceId: string): Promise<MeterIdentity> {
  const { store, fallback, verifyTransaction, clock } = deps();
  const now = clock();
  const config = meterConfig();
  const edition: Edition = request.headers.has(EDITION_HEADER) || now >= config.unmeteredUntil ? 'appstore' : 'unmetered';
  const pro = await proEntitlement(request.headers.get(SUBSCRIPTION_HEADER), verifyTransaction, now, store);
  const plan: Plan = pro ? 'pro' : 'free';
  const sandbox = pro?.environment === 'Sandbox';
  const subject =
    edition === 'unmetered'
      ? `judge:${deviceId}`
      : pro
        ? `${sandbox ? 'pro-sandbox' : 'pro'}:${pro.originalTransactionId}`
        : `device:${deviceId}`;
  return {
    deviceId,
    edition,
    plan,
    subject,
    account: parseAccount(request.headers.get(ACCOUNT_HEADER)),
    now,
    period: periodKey(now),
    periodEnd: periodEnd(now),
    limits: edition === 'unmetered' ? config.judge : pro ? config.pro : config.free,
    config,
    store: store ?? fallback,
    degraded: !store,
    paid: edition === 'appstore' && Boolean(pro) && !sandbox,
  };
}

async function withStore<T>(id: MeterIdentity, run: (store: MeterStore) => Promise<T>): Promise<T> {
  try {
    return await run(id.store);
  } catch (error) {
    if (!(error instanceof MeterStoreError) || id.degraded) throw error;
    console.error('meter_store_error', error.message);
    id.store = deps().fallback;
    id.degraded = true;
    return run(id.store);
  }
}

function asNumber(value: string | null | undefined): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

type Spend = { total: number; free: number };

function pausedFor(id: MeterIdentity, spend: Spend): boolean {
  if (id.degraded && id.edition === 'appstore') return true;
  if (spend.total >= id.config.hardCapUsd) return true;
  return !id.paid && spend.free >= id.config.budgetUsd;
}

async function readState(id: MeterIdentity, briefDigest?: string) {
  const list = [
    keys.use(id.period, id.subject, 'briefing'),
    keys.use(id.period, id.subject, 'question'),
    keys.spend(id.period),
    id.account ? keys.credits(id.account) : '',
    briefDigest ? keys.brief(id.period, id.subject, briefDigest) : '',
    keys.freeSpend(id.period),
  ];
  const wanted = list.filter(Boolean);
  const values = await withStore(id, (store) => store.getMany(wanted));
  const read = (key: string) => (key ? values[wanted.indexOf(key)] : null);
  return {
    briefings: asNumber(read(list[0])),
    questions: asNumber(read(list[1])),
    spend: { total: asNumber(read(list[2])), free: asNumber(read(list[5])) },
    credits: Math.max(0, asNumber(read(list[3]))),
    briefSeen: read(list[4]) !== null,
  };
}

function usageFrom(id: MeterIdentity, state: { briefings: number; questions: number; spend: Spend; credits: number }): Usage {
  return {
    plan: id.plan,
    edition: id.edition,
    period_end: id.periodEnd,
    briefings: { used: Math.min(state.briefings, id.limits.briefings), limit: id.limits.briefings },
    questions: { used: Math.min(state.questions, id.limits.questions), limit: id.limits.questions },
    credits: state.credits,
    packs: { ...id.config.packs },
    plans: { free: { ...id.config.free }, pro: { ...id.config.pro } },
    paused: pausedFor(id, state.spend),
  };
}

export async function readUsage(id: MeterIdentity): Promise<Usage> {
  return usageFrom(id, await readState(id));
}

async function enforceAbuseLimits(id: MeterIdentity): Promise<void> {
  const bucket = Math.floor(id.now / (ABUSE_WINDOW_SECONDS * 1000));
  const day = new Date(id.now).toISOString().slice(0, 10);
  const [inWindow, inDay] = await withStore(id, (store) =>
    Promise.all([
      store.incr(keys.abuseWindow(id.deviceId, bucket), 1, ABUSE_WINDOW_SECONDS),
      store.incr(keys.abuseDay(id.deviceId, day), 1, 86400),
    ]),
  );
  if (inDay > ABUSE_DAY_MAX) {
    const nextDay = Date.parse(`${day}T00:00:00Z`) + 86400_000;
    throw new MeterError(429, 'rate_limited', Math.max(1, Math.ceil((nextDay - id.now) / 1000)));
  }
  if (inWindow > ABUSE_WINDOW_MAX) {
    const windowEnd = (bucket + 1) * ABUSE_WINDOW_SECONDS * 1000;
    throw new MeterError(429, 'rate_limited', Math.max(1, Math.ceil((windowEnd - id.now) / 1000)));
  }
}

export type MeterSession = {
  identity: MeterIdentity;
  beforeMuse(): Promise<void>;
  recordMuse(costUsd: number): void;
  settle(result: { ok: boolean; cached?: boolean }): Promise<Usage | null>;
};

export const meterScope = new AsyncLocalStorage<MeterSession>();

export async function openMeterSession(
  request: Request,
  deviceId: string,
  spec: MeterSpec,
  caseDigest?: string,
): Promise<MeterSession> {
  const id = await meterIdentity(request, deviceId);
  await enforceAbuseLimits(id);
  const metered = id.edition === 'appstore';
  if (metered && id.degraded) throw new MeterError(503, 'atticus_paused');
  const digest = spec.kind === 'briefing' ? caseDigest : undefined;
  const state = await readState(id, digest);
  if (metered && id.degraded) throw new MeterError(503, 'atticus_paused');
  const used = spec.kind === 'briefing' ? state.briefings : state.questions;
  const limit = spec.kind === 'briefing' ? id.limits.briefings : id.limits.questions;
  const free = spec.kind === 'briefing' && state.briefSeen;
  if (!free && used >= limit && state.credits < 1) {
    throw new MeterError(402, 'quota_exceeded', undefined, { kind: spec.kind, usage: usageFrom(id, state) });
  }
  if (!free && used >= limit) id.paid = true;

  const costs: number[] = [];
  let settled = false;

  async function charge(kind: MeteredKind): Promise<void> {
    const useKey = keys.use(id.period, id.subject, kind);
    const used = await id.store.incr(useKey, 1, PERIOD_TTL_SECONDS);
    const limit = kind === 'briefing' ? id.limits.briefings : id.limits.questions;
    if (used <= limit) return;
    await id.store.incr(useKey, -1, PERIOD_TTL_SECONDS);
    if (!id.account) {
      console.error('quota_race', kind);
      return;
    }
    const creditKey = keys.credits(id.account);
    const balance = await id.store.incr(creditKey, -1);
    if (balance < 0) {
      await id.store.incr(creditKey, 1);
      console.error('quota_race', kind);
    }
  }

  async function record(result: { ok: boolean; cached?: boolean }): Promise<void> {
    const cost = costs.reduce((total, value) => total + value, 0);
    const ledger = (field: string) => keys.ledger(id.period, spec.endpoint, field);
    const writes: Promise<unknown>[] = [];
    if (result.ok || costs.length) {
      writes.push(id.store.incr(ledger(result.ok ? (result.cached ? 'cached' : 'served') : 'failed'), 1, LEDGER_TTL_SECONDS));
    }
    if (costs.length) {
      writes.push(id.store.incr(ledger('muse_calls'), costs.length, LEDGER_TTL_SECONDS));
      writes.push(id.store.incrByFloat(ledger('cost_usd'), cost, LEDGER_TTL_SECONDS));
      writes.push(id.store.incrByFloat(keys.spend(id.period), cost, LEDGER_TTL_SECONDS));
      if (!id.paid) writes.push(id.store.incrByFloat(keys.freeSpend(id.period), cost, LEDGER_TTL_SECONDS));
    }
    await Promise.all(writes);
  }

  const session: MeterSession = {
    identity: id,
    async beforeMuse() {
      const [total, free] = await withStore(id, (store) => store.getMany([keys.spend(id.period), keys.freeSpend(id.period)]));
      if (pausedFor(id, { total: asNumber(total), free: asNumber(free) })) throw new MeterError(503, 'atticus_paused');
    },
    recordMuse(costUsd) {
      if (Number.isFinite(costUsd) && costUsd >= 0) costs.push(costUsd);
    },
    async settle(result) {
      if (settled) return null;
      settled = true;
      try {
        await record(result);
      } catch (error) {
        console.error('meter_ledger_failed', error instanceof Error ? error.message : 'Error');
      }
      if (!result.ok) return null;
      try {
        if (spec.kind === 'question') {
          await id.store.incr(keys.ledger(id.period, 'units', 'questions'), 1, LEDGER_TTL_SECONDS);
          await charge('question');
        } else if (digest && (await id.store.setIfAbsent(keys.brief(id.period, id.subject, digest), '1', PERIOD_TTL_SECONDS))) {
          await id.store.incr(keys.ledger(id.period, 'units', 'briefings'), 1, LEDGER_TTL_SECONDS);
          await charge('briefing');
        }
        return await readUsage(id);
      } catch (error) {
        console.error('meter_charge_failed', error instanceof Error ? error.message : 'Error');
        return null;
      }
    },
  };
  if (spec.kind === 'question') await session.beforeMuse();
  return session;
}

export async function redeemCredits(
  request: Request,
  deviceId: string,
  body: Record<string, unknown>,
): Promise<{ granted: number; duplicate: boolean; usage: Usage }> {
  const account = parseAccount(request.headers.get(ACCOUNT_HEADER));
  if (!account) throw new MeterError(400, 'invalid_account');
  const jws = typeof body.transaction === 'string' ? body.transaction.trim() : '';
  if (!jws || jws.length > 16 * 1024) throw new MeterError(400, 'invalid_transaction');
  const id = await meterIdentity(request, deviceId);
  if (id.degraded) throw new MeterError(503, 'credits_unavailable');
  let transaction;
  try {
    transaction = await deps().verifyTransaction(jws);
  } catch (error) {
    throw new MeterError(400, error instanceof StoreKitError ? error.message : 'invalid_transaction');
  }
  const packUses = id.config.packs[transaction.productId];
  if (!packUses) throw new MeterError(400, 'unknown_product');
  if (transaction.revocationDate !== null) throw new MeterError(400, 'transaction_revoked');
  if (transaction.appAccountToken !== account) throw new MeterError(403, 'account_mismatch');
  const uses = transaction.environment === 'Sandbox' ? Math.min(packUses, SANDBOX_MAX_USES) : packUses;
  const marker = keys.redeemed(transaction.transactionId);
  let revoked: boolean;
  let fresh = false;
  try {
    revoked = (await id.store.get(revocationKeys.transaction(transaction.transactionId))) !== null;
    if (!revoked) fresh = await id.store.setIfAbsent(marker, `${account}:${transaction.productId}:${uses}`);
  } catch {
    throw new MeterError(503, 'credits_unavailable');
  }
  if (revoked) throw new MeterError(400, 'transaction_revoked');
  if (fresh) {
    try {
      await id.store.incr(keys.credits(account), uses);
    } catch {
      await id.store.del(marker).catch(() => undefined);
      throw new MeterError(503, 'credits_unavailable');
    }
  }
  return { granted: fresh ? uses : 0, duplicate: !fresh, usage: await readUsage(id) };
}

export type EndpointCost = {
  endpoint: MeteredEndpoint;
  muse_calls: number;
  cost_usd: number;
  served: number;
  cached: number;
  failed: number;
  cost_per_uncached: number | null;
  cache_hit_rate: number | null;
};

export type CostReport = {
  period: string;
  spend_usd: number;
  briefings: number;
  questions: number;
  endpoints: EndpointCost[];
  cost_per_uncached_briefing: number | null;
  cost_per_question: number | null;
  cost_per_counted_briefing: number | null;
};

const LEDGER_FIELDS = ['muse_calls', 'cost_usd', 'served', 'cached', 'failed'] as const;

function ratio(numerator: number, denominator: number): number | null {
  return denominator > 0 ? numerator / denominator : null;
}

export async function costReport(store: MeterStore, period: string): Promise<CostReport> {
  const endpointKeys = METERED_ENDPOINTS.flatMap((endpoint) => LEDGER_FIELDS.map((field) => keys.ledger(period, endpoint, field)));
  const values = await store.getMany([
    keys.spend(period),
    keys.ledger(period, 'units', 'briefings'),
    keys.ledger(period, 'units', 'questions'),
    ...endpointKeys,
  ]);
  const [spend, briefings, questions] = values.slice(0, 3).map(asNumber);
  const endpoints = METERED_ENDPOINTS.map((endpoint, index) => {
    const [museCalls, cost, served, cached, failed] = values.slice(3 + index * 5, 8 + index * 5).map(asNumber);
    return {
      endpoint,
      muse_calls: museCalls,
      cost_usd: cost,
      served,
      cached,
      failed,
      cost_per_uncached: ratio(cost, served),
      cache_hit_rate: ratio(cached, cached + served),
    };
  });
  const by = (name: MeteredEndpoint) => endpoints.find((item) => item.endpoint === name)!;
  const insights = by('case-insights');
  const research = by('case-research');
  const asked = [by('case-question'), by('case-question-stream')];
  const briefingCost = insights.cost_usd + research.cost_usd;
  return {
    period,
    spend_usd: spend,
    briefings,
    questions,
    endpoints,
    cost_per_uncached_briefing:
      insights.cost_per_uncached !== null || research.cost_per_uncached !== null
        ? (insights.cost_per_uncached ?? 0) + (research.cost_per_uncached ?? 0)
        : null,
    cost_per_question: ratio(
      asked.reduce((total, item) => total + item.cost_usd, 0),
      asked.reduce((total, item) => total + item.served, 0),
    ),
    cost_per_counted_briefing: ratio(briefingCost, briefings),
  };
}

function dollars(value: number | null): string {
  return value === null ? '-' : `$${value.toFixed(4)}`;
}

function percent(value: number | null): string {
  return value === null ? '-' : `${(value * 100).toFixed(1)}%`;
}

export function formatCostReport(report: CostReport, budgetUsd: number): string {
  const lines = [
    `Atticus measured Muse cost, ${report.period} (UTC)`,
    `Spend: $${report.spend_usd.toFixed(4)} of $${budgetUsd.toFixed(2)} budget`,
    `Briefings counted: ${report.briefings}   Questions counted: ${report.questions}`,
    `Cost per uncached briefing (insights + research): ${dollars(report.cost_per_uncached_briefing)}`,
    `Cost per counted briefing (incl. cache hits): ${dollars(report.cost_per_counted_briefing)}`,
    `Cost per question: ${dollars(report.cost_per_question)}`,
    '',
    'endpoint               muse_calls  served  cached  failed   cost_usd  per_uncached  cache_hit',
  ];
  for (const item of report.endpoints) {
    lines.push(
      [
        item.endpoint.padEnd(22),
        String(item.muse_calls).padStart(10),
        String(item.served).padStart(7),
        String(item.cached).padStart(7),
        String(item.failed).padStart(7),
        `$${item.cost_usd.toFixed(4)}`.padStart(10),
        dollars(item.cost_per_uncached).padStart(13),
        percent(item.cache_hit_rate).padStart(10),
      ].join(' '),
    );
  }
  return lines.join('\n');
}
