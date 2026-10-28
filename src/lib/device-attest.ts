import { X509Certificate, createHash, createHmac, createPublicKey, randomBytes, timingSafeEqual, verify } from 'node:crypto';
import type { MeterStore } from './meter-store';

export const APPLE_APP_ATTEST_ROOT_PEM = `-----BEGIN CERTIFICATE-----
MIICITCCAaegAwIBAgIQC/O+DvHN0uD7jG5yH2IXmDAKBggqhkjOPQQDAzBSMSYw
JAYDVQQDDB1BcHBsZSBBcHAgQXR0ZXN0YXRpb24gUm9vdCBDQTETMBEGA1UECgwK
QXBwbGUgSW5jLjETMBEGA1UECAwKQ2FsaWZvcm5pYTAeFw0yMDAzMTgxODMyNTNa
Fw00NTAzMTUwMDAwMDBaMFIxJjAkBgNVBAMMHUFwcGxlIEFwcCBBdHRlc3RhdGlv
biBSb290IENBMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9y
bmlhMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAERTHhmLW07ATaFQIEVwTtT4dyctdh
NbJhFs/Ii2FdCgAHGbpphY3+d8qjuDngIN3WVhQUBHAoMeQ/cLiP1sOUtgjqK9au
Yen1mMEvRq9Sk3Jm5X8U62H+xTD3FE9TgS41o0IwQDAPBgNVHRMBAf8EBTADAQH/
MB0GA1UdDgQWBBSskRBTM72+aEH/pwyp5frq5eWKoTAOBgNVHQ8BAf8EBAMCAQYw
CgYIKoZIzj0EAwMDaAAwZQIwQgFGnByvsiVbpTKwSga0kP0e8EeDS4+sQmTvb7vn
53O5+FRXgeLhpJ06ysC5PrOyAjEAp5U4xDgEgllF7En3VcE3iexZZtKeYnpqtijV
oyFraWVIyd/dganmrduC1bmTBGwD
-----END CERTIFICATE-----`;

export const DEFAULT_APP_ID = '672RKF28YZ.com.alertsfor.caser';
export const DEVICE_HEADER = 'x-caser-device';
export const ASSERTION_HEADER = 'x-caser-assertion';
export const ASSERTION_TIME_HEADER = 'x-caser-assertion-time';
export const ASSERTION_MAX_SKEW_MS = 5 * 60_000;
const CHALLENGE_MAX_AGE_MS = 5 * 60_000;
const CHALLENGE_MAX_SKEW_MS = 60_000;
const CHALLENGE_REPLAY_TTL_SECONDS = (CHALLENGE_MAX_AGE_MS + CHALLENGE_MAX_SKEW_MS) / 1000 + 60;
const ATTESTED_KEY_TTL_SECONDS = 400 * 86400;
export const ASSERTION_COUNTER_WINDOW = 32;
const DEVICE_TOKEN_TTL_MS = 30 * 24 * 60 * 60_000;
const NONCE_EXTENSION_OID = Buffer.from([0x2a, 0x86, 0x48, 0x86, 0xf7, 0x63, 0x64, 0x08, 0x02]);
const PRODUCTION_AAGUID = Buffer.concat([Buffer.from('appattest'), Buffer.alloc(7)]);
const DEVELOPMENT_AAGUID = Buffer.from('appattestdevelop');

export class AttestError extends Error {}

function hmac(secret: string, purpose: string, data: string): Buffer {
  return createHmac('sha256', secret).update(`${purpose}:${data}`).digest();
}

function sameBytes(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

function sha256(...parts: Buffer[]): Buffer {
  const hash = createHash('sha256');
  for (const part of parts) hash.update(part);
  return hash.digest();
}

export function attestSecret(): string {
  const secret = process.env.ATTEST_SECRET?.trim() ?? '';
  if (secret.length < 32) throw new AttestError('attest_not_configured');
  return secret;
}

export function issueChallenge(secret: string, now = Date.now()): string {
  const body = `${now}.${randomBytes(16).toString('hex')}`;
  return `${body}.${hmac(secret, 'challenge', body).toString('base64url')}`;
}

export function verifyChallenge(challenge: string, secret: string, now = Date.now()): void {
  const parts = challenge.split('.');
  if (parts.length !== 3 || !/^\d{1,15}$/.test(parts[0]) || !/^[0-9a-f]{32}$/.test(parts[1])) {
    throw new AttestError('invalid_challenge');
  }
  const body = `${parts[0]}.${parts[1]}`;
  if (!sameBytes(Buffer.from(parts[2], 'base64url'), hmac(secret, 'challenge', body))) {
    throw new AttestError('invalid_challenge');
  }
  const issued = Number(parts[0]);
  if (now - issued > CHALLENGE_MAX_AGE_MS || issued - now > CHALLENGE_MAX_SKEW_MS) {
    throw new AttestError('expired_challenge');
  }
}

const attestKeys = {
  challenge: (challenge: string) => `attest:v1:challenge:${sha256(Buffer.from(challenge, 'utf8')).toString('hex')}`,
  device: (deviceId: string) => `attest:v1:key:${deviceId}`,
  counter: (deviceId: string) => `attest:v1:counter:${deviceId}`,
};

export async function consumeChallenge(store: MeterStore, challenge: string): Promise<void> {
  if (!(await store.setIfAbsent(attestKeys.challenge(challenge), '1', CHALLENGE_REPLAY_TTL_SECONDS))) {
    throw new AttestError('challenge_reused');
  }
}

export type AttestedKey = { publicKey: string; counter: number; attestedAt: number };

export function publicKeySpki(point: Buffer): string {
  if (point.length !== 65 || point[0] !== 0x04) throw new AttestError('invalid_certificate');
  const key = createPublicKey({
    key: { kty: 'EC', crv: 'P-256', x: point.subarray(1, 33).toString('base64url'), y: point.subarray(33).toString('base64url') },
    format: 'jwk',
  });
  return key.export({ type: 'spki', format: 'der' }).toString('base64');
}

export async function saveAttestedKey(store: MeterStore, deviceId: string, point: Buffer, now = Date.now()): Promise<void> {
  const record: AttestedKey = { publicKey: publicKeySpki(point), counter: 0, attestedAt: now };
  await store.setIfAbsent(attestKeys.device(deviceId), JSON.stringify(record), ATTESTED_KEY_TTL_SECONDS);
}

export async function readAttestedKey(store: MeterStore, deviceId: string): Promise<AttestedKey | null> {
  const [raw, counter] = await store.getMany([attestKeys.device(deviceId), attestKeys.counter(deviceId)]);
  if (raw === null) return null;
  let record: Partial<AttestedKey>;
  try {
    record = JSON.parse(raw) as Partial<AttestedKey>;
  } catch {
    return null;
  }
  if (typeof record.publicKey !== 'string' || !record.publicKey) return null;
  const stored = Number(counter ?? record.counter ?? 0);
  return {
    publicKey: record.publicKey,
    counter: Number.isFinite(stored) ? stored : 0,
    attestedAt: Number(record.attestedAt ?? 0),
  };
}

export async function claimAssertionCounter(store: MeterStore, deviceId: string, counter: number): Promise<boolean> {
  if (!Number.isInteger(counter) || counter < 1) return false;
  return store.useCounter(attestKeys.counter(deviceId), counter, ASSERTION_COUNTER_WINDOW, ATTESTED_KEY_TTL_SECONDS);
}

export function assertionClientData(method: string, path: string, body: Uint8Array, time: string): Buffer {
  const bodyHash = createHash('sha256').update(body).digest('hex');
  return Buffer.from(`${method.toUpperCase()}\n${path}\n${bodyHash}\n${time}`, 'utf8');
}

export function verifyAssertion(
  input: { assertion: string; clientData: Buffer; publicKey: string },
  options: { appId?: string } = {},
): number {
  const decoded = decodeCBOR(Buffer.from(input.assertion, 'base64'));
  if (!(decoded instanceof Map)) throw new AttestError('assertion_invalid');
  const signature = decoded.get('signature');
  const authenticatorData = decoded.get('authenticatorData');
  if (!Buffer.isBuffer(signature) || !Buffer.isBuffer(authenticatorData) || authenticatorData.length < 37) {
    throw new AttestError('assertion_invalid');
  }
  const appId = Buffer.from(options.appId ?? DEFAULT_APP_ID, 'utf8');
  if (!sameBytes(authenticatorData.subarray(0, 32), sha256(appId))) throw new AttestError('assertion_invalid');
  const nonce = sha256(authenticatorData, sha256(input.clientData));
  let valid: boolean;
  try {
    const key = createPublicKey({ key: Buffer.from(input.publicKey, 'base64'), format: 'der', type: 'spki' });
    valid = verify('sha256', nonce, key, signature);
  } catch {
    valid = false;
  }
  if (!valid) throw new AttestError('assertion_invalid');
  return authenticatorData.readUInt32BE(33);
}

export function decodeCBOR(bytes: Buffer): unknown {
  let offset = 0;
  const take = (count: number): Buffer => {
    if (offset + count > bytes.length) throw new AttestError('invalid_attestation');
    const slice = bytes.subarray(offset, offset + count);
    offset += count;
    return slice;
  };
  const length = (info: number): number => {
    if (info < 24) return info;
    if (info === 24) return take(1).readUInt8(0);
    if (info === 25) return take(2).readUInt16BE(0);
    if (info === 26) return take(4).readUInt32BE(0);
    throw new AttestError('invalid_attestation');
  };
  const item = (depth: number): unknown => {
    if (depth > 8) throw new AttestError('invalid_attestation');
    const initial = take(1).readUInt8(0);
    const major = initial >> 5;
    const count = length(initial & 0x1f);
    switch (major) {
      case 0:
        return count;
      case 1:
        return -1 - count;
      case 2:
        return Buffer.from(take(count));
      case 3:
        return take(count).toString('utf8');
      case 4: {
        if (count > 64) throw new AttestError('invalid_attestation');
        return Array.from({ length: count }, () => item(depth + 1));
      }
      case 5: {
        if (count > 64) throw new AttestError('invalid_attestation');
        const map = new Map<unknown, unknown>();
        for (let index = 0; index < count; index += 1) {
          const key = item(depth + 1);
          map.set(key, item(depth + 1));
        }
        return map;
      }
      default:
        throw new AttestError('invalid_attestation');
    }
  };
  return item(0);
}

type DerNode = { tag: number; start: number; end: number };

function readDer(buffer: Buffer, offset: number, limit = buffer.length): DerNode {
  if (offset + 2 > limit) throw new AttestError('invalid_certificate');
  const tag = buffer[offset];
  let size = buffer[offset + 1];
  let start = offset + 2;
  if (size & 0x80) {
    const bytes = size & 0x7f;
    if (bytes < 1 || bytes > 4 || start + bytes > limit) throw new AttestError('invalid_certificate');
    size = 0;
    for (let index = 0; index < bytes; index += 1) size = size * 256 + buffer[start + index];
    start += bytes;
  }
  if (start + size > limit) throw new AttestError('invalid_certificate');
  return { tag, start, end: start + size };
}

function derChildren(buffer: Buffer, node: DerNode): DerNode[] {
  const children: DerNode[] = [];
  let offset = node.start;
  while (offset < node.end) {
    const child = readDer(buffer, offset, node.end);
    children.push(child);
    offset = child.end;
  }
  return children;
}

export function attestationNonce(certificate: Buffer): Buffer {
  const certificateNode = readDer(certificate, 0);
  const tbs = derChildren(certificate, certificateNode)[0];
  const extensionsWrapper = derChildren(certificate, tbs).find((node) => node.tag === 0xa3);
  if (!extensionsWrapper) throw new AttestError('missing_nonce');
  const extensions = derChildren(certificate, derChildren(certificate, extensionsWrapper)[0]);
  for (const extension of extensions) {
    const fields = derChildren(certificate, extension);
    const oid = fields[0];
    if (!oid || oid.tag !== 0x06 || !sameBytes(certificate.subarray(oid.start, oid.end), NONCE_EXTENSION_OID)) continue;
    const value = fields[fields.length - 1];
    if (value.tag !== 0x04) break;
    const sequence = readDer(certificate, value.start, value.end);
    const tagged = derChildren(certificate, sequence).find((node) => node.tag === 0xa1);
    if (!tagged) break;
    const octets = readDer(certificate, tagged.start, tagged.end);
    if (octets.tag !== 0x04 || octets.end - octets.start !== 32) break;
    return Buffer.from(certificate.subarray(octets.start, octets.end));
  }
  throw new AttestError('missing_nonce');
}

function uncompressedPublicKey(certificate: X509Certificate): Buffer {
  const jwk = certificate.publicKey.export({ format: 'jwk' }) as { crv?: string; x?: string; y?: string };
  if (jwk.crv !== 'P-256' || !jwk.x || !jwk.y) throw new AttestError('invalid_certificate');
  return Buffer.concat([Buffer.from([0x04]), Buffer.from(jwk.x, 'base64url'), Buffer.from(jwk.y, 'base64url')]);
}

function withinValidity(certificate: X509Certificate, now: number): boolean {
  return Date.parse(certificate.validFrom) <= now && now <= Date.parse(certificate.validTo);
}

export type AttestationOptions = {
  appId?: string;
  rootPem?: string;
  allowDevelopment?: boolean;
  now?: number;
};

export function verifyAttestation(
  input: { keyId: string; attestation: string; challenge: string },
  options: AttestationOptions = {},
): { deviceId: string; publicKey: Buffer } {
  const now = options.now ?? Date.now();
  const keyId = Buffer.from(input.keyId, 'base64');
  if (keyId.length !== 32) throw new AttestError('invalid_key_id');
  const decoded = decodeCBOR(Buffer.from(input.attestation, 'base64'));
  if (!(decoded instanceof Map) || decoded.get('fmt') !== 'apple-appattest') throw new AttestError('invalid_attestation');
  const statement = decoded.get('attStmt');
  const authData = decoded.get('authData');
  if (!(statement instanceof Map) || !Buffer.isBuffer(authData)) throw new AttestError('invalid_attestation');
  const chain = statement.get('x5c');
  if (!Array.isArray(chain) || chain.length < 2 || !chain.every((item) => Buffer.isBuffer(item))) {
    throw new AttestError('invalid_attestation');
  }

  let leaf: X509Certificate;
  let intermediate: X509Certificate;
  let root: X509Certificate;
  try {
    leaf = new X509Certificate(chain[0] as Buffer);
    intermediate = new X509Certificate(chain[1] as Buffer);
    root = new X509Certificate(options.rootPem ?? APPLE_APP_ATTEST_ROOT_PEM);
  } catch {
    throw new AttestError('invalid_certificate');
  }
  if (
    !leaf.checkIssued(intermediate) ||
    !leaf.verify(intermediate.publicKey) ||
    !intermediate.checkIssued(root) ||
    !intermediate.verify(root.publicKey) ||
    !withinValidity(leaf, now) ||
    !withinValidity(intermediate, now)
  ) {
    throw new AttestError('untrusted_certificate');
  }

  const clientDataHash = sha256(Buffer.from(input.challenge, 'utf8'));
  if (!sameBytes(attestationNonce(leaf.raw), sha256(authData, clientDataHash))) throw new AttestError('nonce_mismatch');

  const publicKey = uncompressedPublicKey(leaf);
  if (!sameBytes(sha256(publicKey), keyId)) throw new AttestError('key_mismatch');

  if (authData.length < 55) throw new AttestError('invalid_attestation');
  const rpIdHash = authData.subarray(0, 32);
  const signCount = authData.readUInt32BE(33);
  const aaguid = authData.subarray(37, 53);
  const credentialLength = authData.readUInt16BE(53);
  const credentialId = authData.subarray(55, 55 + credentialLength);
  if (!sameBytes(rpIdHash, sha256(Buffer.from(options.appId ?? DEFAULT_APP_ID, 'utf8')))) throw new AttestError('app_mismatch');
  if (signCount !== 0) throw new AttestError('invalid_counter');
  const productionKey = sameBytes(aaguid, PRODUCTION_AAGUID);
  const developmentKey = sameBytes(aaguid, DEVELOPMENT_AAGUID);
  if (!productionKey && !(developmentKey && options.allowDevelopment)) throw new AttestError('environment_mismatch');
  if (!sameBytes(credentialId, keyId)) throw new AttestError('key_mismatch');

  return { deviceId: sha256(keyId).toString('hex').slice(0, 32), publicKey };
}

export function issueDeviceToken(deviceId: string, secret: string, now = Date.now()): { token: string; expiresAt: number } {
  const expiresAt = now + DEVICE_TOKEN_TTL_MS;
  const body = `${deviceId}.${expiresAt}`;
  return { token: `${body}.${hmac(secret, 'device', body).toString('base64url')}`, expiresAt };
}

export function verifyDeviceToken(token: string | null, secret: string, now = Date.now()): string {
  const parts = (token ?? '').trim().split('.');
  if (parts.length !== 3 || !/^[0-9a-f]{32}$/.test(parts[0]) || !/^\d{1,15}$/.test(parts[1])) {
    throw new AttestError('device_unverified');
  }
  const body = `${parts[0]}.${parts[1]}`;
  if (!sameBytes(Buffer.from(parts[2], 'base64url'), hmac(secret, 'device', body))) throw new AttestError('device_unverified');
  if (Number(parts[1]) < now) throw new AttestError('device_unverified');
  return parts[0];
}
