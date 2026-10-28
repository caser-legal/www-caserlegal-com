import assert from 'node:assert/strict';
import { X509Certificate, createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { attestChallenge, attestDevice, handleAttestPost } from '../src/lib/case-intelligence';
import { decodeCBOR, issueChallenge, readAttestedKey, saveAttestedKey, verifyAttestation } from '../src/lib/device-attest';
import { memoryMeterStore, upstashMeterStore, type MeterStore } from '../src/lib/meter-store';
import { configureMetering } from '../src/lib/metering';

const ATTEST_SECRET = 'test-attest-secret-with-at-least-32-chars';
const fixture = JSON.parse(readFileSync(new URL('./fixtures/app-attest.json', import.meta.url), 'utf8')) as {
  appId: string;
  challenge: string;
  keyId: string;
  attestation: string;
  rootPem: string;
};

let store: MeterStore;
let now = Date.parse('2026-10-28T12:00:00Z');
let ip = 0;

function nextIp(): string {
  ip += 1;
  return `198.51.${(ip >> 8) & 255}.${ip & 255}`;
}

function challengeRequest(address: string): Request {
  return new Request('https://www.caserlegal.com/v1/attest/challenge', { headers: { 'x-real-ip': address } });
}

function attestRequest(body: unknown, address: string): Request {
  return new Request('https://www.caserlegal.com/v1/attest', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': address },
    body: JSON.stringify(body),
  });
}

function attest(body: unknown, address = nextIp()): Promise<Response> {
  return handleAttestPost(attestRequest(body, address), (input, active) => attestDevice(input, active));
}

function limitKey(name: string, address: string, seconds: number): string {
  const hashed = createHash('sha256').update(address).digest('hex').slice(0, 32);
  return `atticus:v1:limit:${name}:${hashed}:${seconds}:${Math.floor(now / (seconds * 1000))}`;
}

test.beforeEach(() => {
  process.env.ATTEST_SECRET = ATTEST_SECRET;
  now = Date.parse('2026-10-28T12:00:00Z');
  store = memoryMeterStore(() => now);
  configureMetering({ store, fallback: memoryMeterStore(() => now), clock: () => now });
});

test.after(() => configureMetering(null));

test('an attestation challenge can be used only once', async () => {
  const challenge = issueChallenge(ATTEST_SECRET);
  const body = { key_id: Buffer.alloc(32, 1).toString('base64'), attestation: Buffer.from('not cbor').toString('base64'), challenge };
  const first = await attest(body);
  assert.equal(first.status, 400);
  assert.deepEqual(await first.json(), { error: 'invalid_attestation' });
  const replay = await attest(body);
  assert.equal(replay.status, 401);
  assert.deepEqual(await replay.json(), { error: 'invalid_challenge' });
  const fresh = await attest({ ...body, challenge: issueChallenge(ATTEST_SECRET) });
  assert.equal(fresh.status, 400);
});

test('attestation fails closed when the store is missing or down, while challenges still issue', async () => {
  const original = console.error;
  console.error = () => undefined;
  try {
    configureMetering({ store: null, fallback: memoryMeterStore(() => now), clock: () => now });
    const body = { key_id: Buffer.alloc(32, 1).toString('base64'), attestation: 'AA==', challenge: issueChallenge(ATTEST_SECRET) };
    const missing = await attest(body);
    assert.equal(missing.status, 503);
    assert.deepEqual(await missing.json(), { error: 'attest_unavailable' });
    assert.equal((await attestChallenge(challengeRequest(nextIp()))).status, 200);
    const down = (async () => {
      throw new Error('down');
    }) as typeof fetch;
    configureMetering({ store: upstashMeterStore('https://example.upstash.io', 't', down), fallback: memoryMeterStore(() => now), clock: () => now });
    const outage = await attest(body);
    assert.equal(outage.status, 503);
    assert.deepEqual(await outage.json(), { error: 'attest_unavailable' });
    assert.equal((await attestChallenge(challengeRequest(nextIp()))).status, 200);
  } finally {
    console.error = original;
  }
});

test('one IP may POST /v1/attest at most 20 times per UTC day', async () => {
  const address = nextIp();
  const body = { key_id: 'x', attestation: 'y' };
  for (let n = 0; n < 20; n += 1) assert.equal((await attest(body, address)).status, 400);
  const limited = await attest(body, address);
  assert.equal(limited.status, 429);
  assert.deepEqual(await limited.json(), { error: 'rate_limited' });
  assert.equal(Number(limited.headers.get('retry-after')), 12 * 3600);
  assert.equal((await attest(body, nextIp())).status, 400);
  now = Date.parse('2026-10-29T00:00:01Z');
  assert.equal((await attest(body, address)).status, 400);
});

test('one IP may fetch at most 60 challenges per hour', async () => {
  const address = nextIp();
  for (let n = 0; n < 10; n += 1) assert.equal((await attestChallenge(challengeRequest(address))).status, 200);
  await store.incr(limitKey('attest-challenge', address, 3600), 50, 3600);
  const limited = await attestChallenge(challengeRequest(address));
  assert.equal(limited.status, 429);
  assert.deepEqual(await limited.json(), { error: 'rate_limited' });
  assert.equal(Number(limited.headers.get('retry-after')), 3600);
  assert.equal((await attestChallenge(challengeRequest(nextIp()))).status, 200);
});

test('an attested public key is stored for 400 days with a zero counter', async () => {
  const { deviceId, publicKey } = verifyAttestation(
    { keyId: fixture.keyId, attestation: fixture.attestation, challenge: fixture.challenge },
    { appId: fixture.appId, rootPem: fixture.rootPem },
  );
  assert.equal(await readAttestedKey(store, deviceId), null);
  await saveAttestedKey(store, deviceId, publicKey, now);
  const saved = await readAttestedKey(store, deviceId);
  const statement = (decodeCBOR(Buffer.from(fixture.attestation, 'base64')) as Map<string, Map<string, Buffer[]>>).get('attStmt')!;
  const leaf = new X509Certificate(statement.get('x5c')![0]);
  assert.deepEqual(saved, {
    publicKey: leaf.publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
    counter: 0,
    attestedAt: now,
  });
  now += 399 * 86400_000;
  assert.ok(await readAttestedKey(store, deviceId));
  now += 2 * 86400_000;
  assert.equal(await readAttestedKey(store, deviceId), null);
});
