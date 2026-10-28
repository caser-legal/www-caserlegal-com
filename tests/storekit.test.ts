import assert from 'node:assert/strict';
import { createHash, X509Certificate } from 'node:crypto';
import test from 'node:test';
import {
  StoreKitError,
  appleRootCertificates,
  appleTransactionVerifier,
  clearEntitlementCache,
  proEntitlement,
} from '../src/lib/storekit';
import { signTransaction, testRoot, transactionPayload } from './fixtures/storekit';

const verify = appleTransactionVerifier({ roots: [testRoot], onlineChecks: false });

function rejects(promise: Promise<unknown>, code: string) {
  return assert.rejects(promise, (error: unknown) => error instanceof StoreKitError && error.message === code);
}

test.beforeEach(() => clearEntitlementCache());

test('the bundled Apple roots match the published Apple Root CA fingerprints', () => {
  const fingerprints = appleRootCertificates().map((der) => createHash('sha256').update(der).digest('hex'));
  assert.deepEqual(fingerprints, [
    '63343abfb89a6a03ebb57e9b3f5fa7be7c4f5c756f3017b3a8c488c3653e9179',
    'c2b9b042dd57830e7d117dac55ac8ae19407d38e41d88f3215bc3a890444a050',
    'b0b1730ecbc7ff4505142c49f1295e6eda6bcaed7e2c68c5be91b5a11001f024',
  ]);
  assert.equal(new X509Certificate(appleRootCertificates()[0]).subject.includes('Apple Root CA - G3'), true);
});

test('a signed Sandbox or Production subscription verifies with the trusted chain', async () => {
  const sandbox = await verify(signTransaction(transactionPayload({ appAccountToken: 'AAAAAAAA-BBBB-4CCC-8DDD-EEEEEEEEEEEE' })));
  assert.equal(sandbox.productId, 'com.alertsfor.caser.yearly');
  assert.equal(sandbox.originalTransactionId, '2000000100000000');
  assert.equal(sandbox.environment, 'Sandbox');
  assert.equal(sandbox.appAccountToken, 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee');
  assert.equal(sandbox.revocationDate, null);
  const production = await verify(signTransaction(transactionPayload({ environment: 'Production' })));
  assert.equal(production.environment, 'Production');
});

test('forged, foreign or untrusted transactions are rejected', async () => {
  const good = signTransaction(transactionPayload());
  const [header, , signature] = good.split('.');
  const tampered = `${header}.${Buffer.from(JSON.stringify(transactionPayload({ productId: 'x' }))).toString('base64url')}.${signature}`;
  await rejects(verify(tampered), 'invalid_transaction');
  await rejects(verify(signTransaction(transactionPayload({ bundleId: 'com.example.other' }))), 'invalid_transaction');
  await rejects(verify(signTransaction(transactionPayload({ environment: 'Xcode' }))), 'unsupported_environment');
  await rejects(verify('not.a.jws'), 'invalid_transaction');
  await rejects(verify(''), 'invalid_transaction');
  const appleOnly = appleTransactionVerifier({ onlineChecks: false });
  await rejects(appleOnly(good), 'invalid_transaction');
});

test('proEntitlement accepts only an active, unrevoked yearly subscription', async () => {
  const active = await proEntitlement(signTransaction(transactionPayload()), verify);
  assert.equal(active?.originalTransactionId, '2000000100000000');
  assert.equal(await proEntitlement(signTransaction(transactionPayload({ expiresDate: Date.now() - 1000 })), verify), null);
  assert.equal(await proEntitlement(signTransaction(transactionPayload({ revocationDate: Date.now() - 1000 })), verify), null);
  assert.equal(
    await proEntitlement(signTransaction(transactionPayload({ productId: 'com.alertsfor.caser.credits.10000', expiresDate: undefined })), verify),
    null,
  );
  assert.equal(await proEntitlement('garbage', verify), null);
  assert.equal(await proEntitlement(null, verify), null);
});

test('proEntitlement caches verification briefly and never past expiry', async () => {
  let calls = 0;
  const counting = async (jws: string) => {
    calls += 1;
    return verify(jws);
  };
  const now = Date.now();
  const jws = signTransaction(transactionPayload({ expiresDate: now + 5 * 60_000 }));
  assert.ok(await proEntitlement(jws, counting, now));
  assert.ok(await proEntitlement(jws, counting, now + 60_000));
  assert.equal(calls, 1);
  assert.equal(await proEntitlement(jws, counting, now + 6 * 60_000), null);
  assert.equal(calls, 2);
});
