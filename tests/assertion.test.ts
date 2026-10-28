import assert from 'node:assert/strict';
import { createHash, generateKeyPairSync, sign, type KeyObject } from 'node:crypto';
import test from 'node:test';
import { handlePost, handleUsage } from '../src/lib/case-intelligence';
import { DEFAULT_APP_ID, issueDeviceToken, saveAttestedKey } from '../src/lib/device-attest';
import { memoryMeterStore, type MeterStore } from '../src/lib/meter-store';
import { configureMetering } from '../src/lib/metering';

const ATTEST_SECRET = 'test-attest-secret-with-at-least-32-chars';
const DEVICE = 'ef'.repeat(16);
const OTHER_DEVICE = '12'.repeat(16);
const ORIGIN = 'https://www.caserlegal.com';

let store: MeterStore;
let now = Date.parse('2026-10-28T12:00:00Z');
let ip = 0;

function keyPair() {
  const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' });
  const jwk = publicKey.export({ format: 'jwk' }) as { x: string; y: string };
  const point = Buffer.concat([Buffer.from([4]), Buffer.from(jwk.x, 'base64url'), Buffer.from(jwk.y, 'base64url')]);
  return { privateKey, point };
}

const device = keyPair();
const stranger = keyPair();

function cborBytes(value: Buffer): Buffer {
  if (value.length < 24) return Buffer.concat([Buffer.from([0x40 | value.length]), value]);
  if (value.length < 256) return Buffer.concat([Buffer.from([0x58, value.length]), value]);
  const header = Buffer.alloc(3);
  header[0] = 0x59;
  header.writeUInt16BE(value.length, 1);
  return Buffer.concat([header, value]);
}

function cborText(value: string): Buffer {
  return Buffer.concat([Buffer.from([0x60 | value.length]), Buffer.from(value, 'utf8')]);
}

function sha256(...parts: (Buffer | string)[]): Buffer {
  const hash = createHash('sha256');
  for (const part of parts) hash.update(part);
  return hash.digest();
}

type AssertionOptions = {
  counter: number;
  method?: string;
  path?: string;
  body?: string;
  time?: string;
  appId?: string;
  key?: KeyObject;
};

function assertion(options: AssertionOptions): { assertion: string; time: string } {
  const time = options.time ?? String(now);
  const clientData = `${options.method ?? 'POST'}\n${options.path ?? '/v1/case-question'}\n${sha256(options.body ?? '').toString('hex')}\n${time}`;
  const counter = Buffer.alloc(4);
  counter.writeUInt32BE(options.counter);
  const authenticatorData = Buffer.concat([sha256(options.appId ?? DEFAULT_APP_ID), Buffer.from([0x40]), counter]);
  const signature = sign('sha256', sha256(authenticatorData, sha256(clientData)), options.key ?? device.privateKey);
  const encoded = Buffer.concat([
    Buffer.from([0xa2]),
    cborText('signature'),
    cborBytes(signature),
    cborText('authenticatorData'),
    cborBytes(authenticatorData),
  ]);
  return { assertion: encoded.toString('base64'), time };
}

function request(
  body: string,
  signed: { assertion: string; time: string } | null,
  options: { path?: string; device?: string; edition?: boolean } = {},
): Request {
  ip += 1;
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-real-ip': `192.0.2.${ip % 250}`,
    'x-caser-device': issueDeviceToken(options.device ?? DEVICE, ATTEST_SECRET).token,
  };
  if (options.edition) headers['x-caser-edition'] = 'appstore';
  if (signed) {
    headers['x-caser-assertion'] = signed.assertion;
    headers['x-caser-assertion-time'] = signed.time;
  }
  return new Request(`${ORIGIN}${options.path ?? '/v1/case-question'}`, { method: 'POST', headers, body });
}

const BODY = JSON.stringify({ question: 'When is the response due?' });

function send(req: Request): Promise<Response> {
  return handlePost(req, async (input) => ({ received: input }));
}

async function rejected(req: Request, code: string) {
  const response = await send(req);
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: code });
}

test.beforeEach(async () => {
  process.env.ATTEST_SECRET = ATTEST_SECRET;
  delete process.env.APP_ATTEST_ASSERTIONS;
  delete process.env.APP_ATTEST_APP_ID;
  now = Date.parse('2026-10-28T12:00:00Z');
  store = memoryMeterStore(() => now);
  configureMetering({ store, fallback: memoryMeterStore(() => now), clock: () => now });
  await saveAttestedKey(store, DEVICE, device.point, now);
});

test.after(() => {
  configureMetering(null);
  delete process.env.APP_ATTEST_ASSERTIONS;
});

test('a valid assertion over method, path, body and time is accepted and advances the counter', async () => {
  const response = await send(request(BODY, assertion({ counter: 1, body: BODY })));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { received: JSON.parse(BODY) });
  assert.equal(await store.get(`attest:v1:counter:${DEVICE}`), '1');
  assert.equal((await send(request(BODY, assertion({ counter: 5, body: BODY })))).status, 200);
  assert.equal(await store.get(`attest:v1:counter:${DEVICE}`), '5');
});

test('parallel assertions arriving out of order are each accepted once', async () => {
  const research = assertion({ counter: 2, body: BODY });
  const insights = assertion({ counter: 3, body: BODY });
  assert.equal((await send(request(BODY, insights))).status, 200);
  assert.equal((await send(request(BODY, research))).status, 200);
  assert.equal(await store.get(`attest:v1:counter:${DEVICE}`), '3');
  await rejected(request(BODY, research), 'assertion_invalid');
  await rejected(request(BODY, insights), 'assertion_invalid');
  assert.equal((await send(request(BODY, assertion({ counter: 1, body: BODY })))).status, 200);
  await rejected(request(BODY, assertion({ counter: 1, body: BODY })), 'assertion_invalid');
});

test('a counter 32 or more below the highest seen is rejected even if unused', async () => {
  assert.equal((await send(request(BODY, assertion({ counter: 40, body: BODY })))).status, 200);
  await rejected(request(BODY, assertion({ counter: 8, body: BODY })), 'assertion_invalid');
  assert.equal((await send(request(BODY, assertion({ counter: 9, body: BODY })))).status, 200);
  await rejected(request(BODY, assertion({ counter: 9, body: BODY })), 'assertion_invalid');
  assert.equal((await send(request(BODY, assertion({ counter: 41, body: BODY })))).status, 200);
  await rejected(request(BODY, assertion({ counter: 9, body: BODY })), 'assertion_invalid');
  await rejected(request(BODY, assertion({ counter: 0, body: BODY })), 'assertion_invalid');
});

test('a signature from another key, a wrong app id or a stale time is rejected', async () => {
  await rejected(request(BODY, assertion({ counter: 1, body: BODY, key: stranger.privateKey })), 'assertion_invalid');
  await rejected(request(BODY, assertion({ counter: 1, body: BODY, appId: '672RKF28YZ.com.example.other' })), 'assertion_invalid');
  await rejected(request(BODY, assertion({ counter: 1, body: BODY, time: String(now - 5 * 60_000 - 1) })), 'assertion_invalid');
  await rejected(request(BODY, assertion({ counter: 1, body: BODY, time: String(now + 5 * 60_000 + 1) })), 'assertion_invalid');
  const garbage = { assertion: Buffer.from('not cbor').toString('base64'), time: String(now) };
  await rejected(request(BODY, garbage), 'assertion_invalid');
  await rejected(request(BODY, { assertion: assertion({ counter: 1, body: BODY }).assertion, time: '' }), 'assertion_invalid');
  assert.equal(await store.get(`attest:v1:counter:${DEVICE}`), null);
  assert.equal((await send(request(BODY, assertion({ counter: 1, body: BODY, time: String(now - 4 * 60_000) })))).status, 200);
});

test('a tampered body or a different path is rejected', async () => {
  const tampered = JSON.stringify({ question: 'Something else entirely?' });
  await rejected(request(tampered, assertion({ counter: 1, body: BODY })), 'assertion_invalid');
  await rejected(request(BODY, assertion({ counter: 1, body: BODY, path: '/v1/case-research' })), 'assertion_invalid');
  await rejected(request(BODY, assertion({ counter: 1, body: BODY, method: 'GET' })), 'assertion_invalid');
  const research = await send(request(BODY, assertion({ counter: 1, body: BODY, path: '/v1/case-research' }), { path: '/v1/case-research' }));
  assert.equal(research.status, 200);
});

test('optional mode allows requests without an assertion or without a stored key', async () => {
  assert.equal((await send(request(BODY, null))).status, 200);
  assert.equal((await send(request(BODY, assertion({ counter: 1, body: BODY }), { device: OTHER_DEVICE }))).status, 200);
  process.env.APP_ATTEST_ASSERTIONS = 'nonsense';
  assert.equal((await send(request(BODY, null))).status, 200);
  await rejected(request(BODY, assertion({ counter: 1, body: BODY, key: stranger.privateKey })), 'assertion_invalid');
});

test('by default App Store requests must be signed, judge-build requests only until UNMETERED_UNTIL', async () => {
  await rejected(request(BODY, null, { edition: true }), 'assertion_required');
  await rejected(request(BODY, assertion({ counter: 1, body: BODY }), { edition: true, device: OTHER_DEVICE }), 'assertion_required');
  assert.equal((await send(request(BODY, assertion({ counter: 1, body: BODY }), { edition: true }))).status, 200);
  assert.equal((await send(request(BODY, null))).status, 200);
  now = Date.parse('2026-11-10T08:00:00Z');
  await rejected(request(BODY, null), 'assertion_required');
  assert.equal((await send(request(BODY, assertion({ counter: 2, body: BODY })))).status, 200);
});

test('required mode refuses requests without an assertion or without a stored key', async () => {
  process.env.APP_ATTEST_ASSERTIONS = 'required';
  await rejected(request(BODY, null), 'assertion_required');
  await rejected(request(BODY, assertion({ counter: 1, body: BODY }), { device: OTHER_DEVICE }), 'assertion_required');
  assert.equal((await send(request(BODY, assertion({ counter: 1, body: BODY })))).status, 200);
  const original = console.error;
  console.error = () => undefined;
  try {
    configureMetering({ store: null, fallback: memoryMeterStore(() => now), clock: () => now });
    const unavailable = await send(request(BODY, assertion({ counter: 2, body: BODY })));
    assert.equal(unavailable.status, 503);
    assert.deepEqual(await unavailable.json(), { error: 'attest_unavailable' });
    process.env.APP_ATTEST_ASSERTIONS = 'optional';
    assert.equal((await send(request(BODY, assertion({ counter: 2, body: BODY })))).status, 200);
  } finally {
    console.error = original;
  }
});

test('off mode ignores assertion headers entirely', async () => {
  process.env.APP_ATTEST_ASSERTIONS = 'off';
  assert.equal((await send(request(BODY, { assertion: 'garbage', time: 'soon' }))).status, 200);
});

test('/v1/usage verifies an assertion over an empty body', async () => {
  const usage = (signed: { assertion: string; time: string } | null) => {
    const headers: Record<string, string> = {
      'x-real-ip': '192.0.2.251',
      'x-caser-device': issueDeviceToken(DEVICE, ATTEST_SECRET).token,
    };
    if (signed) {
      headers['x-caser-assertion'] = signed.assertion;
      headers['x-caser-assertion-time'] = signed.time;
    }
    return handleUsage(new Request(`${ORIGIN}/v1/usage`, { method: 'POST', headers }));
  };
  assert.equal((await usage(assertion({ counter: 1, path: '/v1/usage' }))).status, 200);
  assert.equal((await usage(assertion({ counter: 2, path: '/v1/usage', body: '{}' }))).status, 401);
  process.env.APP_ATTEST_ASSERTIONS = 'required';
  assert.equal((await usage(null)).status, 401);
  assert.equal((await usage(assertion({ counter: 3, path: '/v1/usage' }))).status, 200);
});
