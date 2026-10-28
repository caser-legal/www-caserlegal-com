import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  AttestError,
  decodeCBOR,
  issueChallenge,
  issueDeviceToken,
  verifyAttestation,
  verifyChallenge,
  verifyDeviceToken,
} from '../src/lib/device-attest';

const fixture = JSON.parse(readFileSync(new URL('./fixtures/app-attest.json', import.meta.url), 'utf8')) as {
  appId: string;
  challenge: string;
  keyId: string;
  attestation: string;
  rootPem: string;
};
const secret = 'test-secret-that-is-at-least-32-characters';
const input = { keyId: fixture.keyId, attestation: fixture.attestation, challenge: fixture.challenge };
const options = { appId: fixture.appId, rootPem: fixture.rootPem };

function rejects(run: () => unknown, code: string) {
  assert.throws(run, (error: unknown) => error instanceof AttestError && error.message === code);
}

test('a valid attestation from the trusted root yields a stable device id', () => {
  const first = verifyAttestation(input, options);
  const second = verifyAttestation(input, options);
  assert.match(first.deviceId, /^[0-9a-f]{32}$/);
  assert.equal(first.deviceId, second.deviceId);
  assert.equal(first.publicKey.length, 65);
});

test('attestation is rejected for the wrong root, app, challenge or key', () => {
  rejects(() => verifyAttestation(input, { appId: fixture.appId }), 'untrusted_certificate');
  rejects(() => verifyAttestation(input, { ...options, appId: '672RKF28YZ.com.example.other' }), 'app_mismatch');
  rejects(() => verifyAttestation({ ...input, challenge: 'another-challenge' }, options), 'nonce_mismatch');
  rejects(() => verifyAttestation({ ...input, keyId: Buffer.alloc(32, 7).toString('base64') }, options), 'key_mismatch');
  rejects(() => verifyAttestation({ ...input, keyId: 'c2hvcnQ=' }, options), 'invalid_key_id');
  rejects(() => verifyAttestation({ ...input, attestation: Buffer.from('not cbor').toString('base64') }, options), 'invalid_attestation');
});

test('attestation outside the certificate validity window is rejected', () => {
  rejects(() => verifyAttestation(input, { ...options, now: Date.parse('2001-01-01') }), 'untrusted_certificate');
});

test('challenges are signed, single-purpose and expire after five minutes', () => {
  const now = Date.parse('2026-10-28T12:00:00Z');
  const challenge = issueChallenge(secret, now);
  verifyChallenge(challenge, secret, now + 60_000);
  rejects(() => verifyChallenge(challenge, secret, now + 6 * 60_000), 'expired_challenge');
  rejects(() => verifyChallenge(challenge, 'a-different-secret-of-at-least-32-chars', now), 'invalid_challenge');
  rejects(() => verifyChallenge(`${challenge}x`, secret, now), 'invalid_challenge');
  rejects(() => verifyChallenge('garbage', secret, now), 'invalid_challenge');
});

test('device tokens verify until they expire and cannot be forged or reused as challenges', () => {
  const now = Date.parse('2026-10-28T12:00:00Z');
  const deviceId = 'ab'.repeat(16);
  const { token, expiresAt } = issueDeviceToken(deviceId, secret, now);
  assert.equal(verifyDeviceToken(token, secret, now), deviceId);
  assert.equal(expiresAt - now, 30 * 24 * 60 * 60_000);
  rejects(() => verifyDeviceToken(token, secret, expiresAt + 1), 'device_unverified');
  rejects(() => verifyDeviceToken(token.replace(deviceId, 'cd'.repeat(16)), secret, now), 'device_unverified');
  rejects(() => verifyDeviceToken(null, secret, now), 'device_unverified');
  rejects(() => verifyChallenge(token, secret, now), 'invalid_challenge');
});

test('the CBOR reader refuses truncated and oversized input', () => {
  assert.deepEqual(decodeCBOR(Buffer.from([0x82, 0x01, 0x02])), [1, 2]);
  rejects(() => decodeCBOR(Buffer.from([0x5a, 0xff, 0xff, 0xff, 0xff])), 'invalid_attestation');
  rejects(() => decodeCBOR(Buffer.from([0x98, 0xff])), 'invalid_attestation');
});
