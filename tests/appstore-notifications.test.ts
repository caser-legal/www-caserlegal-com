import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';
import { handleAppStoreNotification } from '../src/lib/appstore-notifications';
import { memoryMeterStore, type MeterStore } from '../src/lib/meter-store';
import { configureMetering } from '../src/lib/metering';
import { appleNotificationVerifier, appleTransactionVerifier, clearEntitlementCache, proEntitlement } from '../src/lib/storekit';
import { signTransaction, testRoot, transactionPayload } from './fixtures/storekit';

const verifyNotification = appleNotificationVerifier({ roots: [testRoot], onlineChecks: false });
const verifyTransaction = appleTransactionVerifier({ roots: [testRoot], onlineChecks: false });
const ACCOUNT = '6f1c2a3b-4d5e-4f60-8a7b-9c0d1e2f3a4b';

let store: MeterStore;

function notification(
  notificationType: string,
  transaction: Record<string, unknown>,
  options: { subtype?: string; uuid?: string; environment?: string; appAppleId?: number; bundleId?: string } = {},
): string {
  const environment = options.environment ?? 'Sandbox';
  return signTransaction({
    notificationType,
    subtype: options.subtype,
    notificationUUID: options.uuid ?? randomUUID(),
    version: '2.0',
    signedDate: Date.now(),
    data: {
      appAppleId: options.appAppleId ?? 6752289799,
      bundleId: options.bundleId ?? 'com.alertsfor.caser',
      environment,
      signedTransactionInfo: signTransaction(transactionPayload({ environment, ...transaction })),
    },
  });
}

function post(body: unknown): Promise<Response> {
  return handleAppStoreNotification(
    new Request('https://www.caserlegal.com/v1/appstore/notifications', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }),
    verifyNotification,
  );
}

function deliver(signedPayload: string): Promise<Response> {
  return post({ signedPayload });
}

async function proFor(transaction: Record<string, unknown> = {}) {
  clearEntitlementCache();
  return proEntitlement(signTransaction(transactionPayload(transaction)), verifyTransaction, Date.now(), store);
}

test.beforeEach(() => {
  store = memoryMeterStore();
  configureMetering({ store, fallback: memoryMeterStore() });
  clearEntitlementCache();
});

test.after(() => configureMetering(null));

test('a REFUND revokes the subscription and REFUND_REVERSED restores it', async () => {
  const expiresDate = Date.now() + 30 * 86400_000;
  assert.ok(await proFor({ expiresDate }));
  const refund = await deliver(notification('REFUND', { revocationDate: Date.now(), expiresDate }));
  assert.equal(refund.status, 200);
  assert.deepEqual(await refund.json(), { ok: true });
  assert.ok(await store.get('atticus:v1:revoked-tx:2000000123456789'));
  assert.ok(await store.get('atticus:v1:revoked-otid:2000000100000000'));
  assert.equal(await proFor({ expiresDate }), null);
  assert.equal(await proFor({ transactionId: '2000000123456790', expiresDate }), null);
  assert.equal((await deliver(notification('REFUND_REVERSED', { expiresDate }))).status, 200);
  assert.ok(await proFor({ expiresDate }));
});

test('REVOKE blocks the subscription until a later renewal', async () => {
  const expiresDate = Date.now() + 30 * 86400_000;
  assert.equal((await deliver(notification('REVOKE', { expiresDate }))).status, 200);
  assert.equal(await proFor({ expiresDate }), null);
  assert.ok(await proFor({ transactionId: '2000000123459999', expiresDate: expiresDate + 365 * 86400_000 }));
});

test('expiry notifications mark the subscription expired through its expiry date', async () => {
  const expiresDate = Date.now() + 10 * 86400_000;
  assert.equal((await deliver(notification('DID_FAIL_TO_RENEW', { expiresDate }, { subtype: 'GRACE_PERIOD' }))).status, 200);
  assert.ok(await proFor({ expiresDate }));
  assert.equal((await deliver(notification('DID_FAIL_TO_RENEW', { expiresDate }))).status, 200);
  assert.equal(await proFor({ expiresDate }), null);
  assert.equal(await store.get('atticus:v1:expired-otid:2000000100000000'), String(expiresDate));
  for (const type of ['EXPIRED', 'GRACE_PERIOD_EXPIRED']) {
    assert.equal((await deliver(notification(type, { expiresDate: expiresDate - 86400_000 }))).status, 200);
  }
  assert.equal(await store.get('atticus:v1:expired-otid:2000000100000000'), String(expiresDate));
  assert.ok(await proFor({ expiresDate: expiresDate + 365 * 86400_000 }));
});

test('a refunded consumable subtracts its uses from the account, once, never below zero', async () => {
  const consumable = { transactionId: '2000000555', originalTransactionId: '2000000555', productId: 'com.alertsfor.caser.credits.10000', expiresDate: undefined };
  await store.setIfAbsent('atticus:v1:redeemed:2000000555', `${ACCOUNT}:com.alertsfor.caser.credits.10000:50`);
  await store.incr(`atticus:v1:credits:${ACCOUNT}`, 80);
  assert.equal((await deliver(notification('REFUND', consumable))).status, 200);
  assert.equal(await store.get(`atticus:v1:credits:${ACCOUNT}`), '30');
  assert.equal((await deliver(notification('REFUND', consumable))).status, 200);
  assert.equal(await store.get(`atticus:v1:credits:${ACCOUNT}`), '30');
  assert.equal((await deliver(notification('REFUND_REVERSED', consumable))).status, 200);
  assert.equal(await store.get(`atticus:v1:credits:${ACCOUNT}`), '80');
  await store.incr(`atticus:v1:credits:${ACCOUNT}`, -60);
  assert.equal((await deliver(notification('REFUND', consumable))).status, 200);
  assert.equal(await store.get(`atticus:v1:credits:${ACCOUNT}`), '0');
  assert.equal(await store.get('atticus:v1:refund-debit:2000000555'), '20');
  assert.equal((await deliver(notification('REFUND_REVERSED', consumable))).status, 200);
  assert.equal(await store.get(`atticus:v1:credits:${ACCOUNT}`), '20');
});

test('notifications are idempotent by notificationUUID', async () => {
  const uuid = randomUUID();
  const signed = notification('REFUND', { revocationDate: Date.now() }, { uuid });
  assert.deepEqual(await (await deliver(signed)).json(), { ok: true });
  await store.del('atticus:v1:revoked-tx:2000000123456789');
  assert.deepEqual(await (await deliver(signed)).json(), { ok: true, duplicate: true });
  assert.equal(await store.get('atticus:v1:revoked-tx:2000000123456789'), null);
});

test('production notifications verify against the app id and other notifications are acknowledged', async () => {
  assert.equal((await deliver(notification('REFUND', {}, { environment: 'Production' }))).status, 200);
  assert.equal((await deliver(notification('REFUND', {}, { environment: 'Production', appAppleId: 1 }))).status, 400);
  assert.equal((await deliver(notification('DID_RENEW', {}))).status, 200);
  const test = signTransaction({
    notificationType: 'TEST',
    notificationUUID: randomUUID(),
    version: '2.0',
    signedDate: Date.now(),
    data: { appAppleId: 6752289799, bundleId: 'com.alertsfor.caser', environment: 'Sandbox' },
  });
  assert.equal((await deliver(test)).status, 200);
});

test('invalid signatures, foreign apps and bad bodies are rejected with 400', async () => {
  const good = notification('REFUND', {});
  const [header, body] = good.split('.');
  const forged = `${header}.${body}.${Buffer.alloc(64, 1).toString('base64url')}`;
  const rejectedResponses = [
    await deliver(forged),
    await deliver(notification('REFUND', {}, { bundleId: 'com.example.other' })),
    await deliver('not.a.jws'),
    await post({ signedPayload: 42 }),
    await post({}),
  ];
  for (const response of rejectedResponses) {
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: 'invalid_notification' });
  }
  assert.equal(await store.get('atticus:v1:revoked-tx:2000000123456789'), null);
});

test('without a store, notifications return 503 so Apple retries', async () => {
  const original = console.error;
  console.error = () => undefined;
  try {
    configureMetering({ store: null, fallback: memoryMeterStore() });
    const response = await deliver(notification('REFUND', {}));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: 'notifications_unavailable' });
  } finally {
    console.error = original;
  }
});
