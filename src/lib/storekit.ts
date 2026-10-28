import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Environment, SignedDataVerifier, type JWSTransactionDecodedPayload } from '@apple/app-store-server-library';
import type { MeterStore } from './meter-store';

export const BUNDLE_ID = 'com.alertsfor.caser';
export const APP_APPLE_ID = 6752289799;
export const PRO_PRODUCT_ID = 'com.alertsfor.caser.yearly';
export const APPLE_ROOT_FILES = ['AppleRootCA-G3.cer', 'AppleRootCA-G2.cer', 'AppleIncRootCertificate.cer'];
const MAX_JWS_LENGTH = 16 * 1024;
const VALID_CACHE_MS = 10 * 60_000;
const INVALID_CACHE_MS = 60_000;
const CACHE_MAX_ENTRIES = 2000;
const STATUS_CACHE_MS = 30_000;
const MAX_NOTIFICATION_LENGTH = 64 * 1024;

export const revocationKeys = {
  transaction: (transactionId: string) => `atticus:v1:revoked-tx:${transactionId}`,
  original: (originalTransactionId: string) => `atticus:v1:revoked-otid:${originalTransactionId}`,
  expired: (originalTransactionId: string) => `atticus:v1:expired-otid:${originalTransactionId}`,
};

export class StoreKitError extends Error {}

export type SignedTransaction = {
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  environment: string;
  expiresDate: number | null;
  revocationDate: number | null;
  appAccountToken: string | null;
};

export type TransactionVerifier = (jws: string) => Promise<SignedTransaction>;

export function appleRootCertificates(): Buffer[] {
  const dir = path.join(process.cwd(), 'data', 'apple-roots');
  return APPLE_ROOT_FILES.map((file) => readFileSync(path.join(dir, file)));
}

function peekPayload(jws: string): Record<string, unknown> {
  const parts = jws.split('.');
  if (parts.length !== 3) throw new StoreKitError('invalid_transaction');
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as unknown;
    return payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};
  } catch {
    throw new StoreKitError('invalid_transaction');
  }
}

function peekEnvironment(jws: string): string {
  const payload = peekPayload(jws);
  return typeof payload.environment === 'string' ? payload.environment : '';
}

function optionalNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

type VerifierOptions = { roots?: Buffer[]; onlineChecks?: boolean };

function appleVerifiers(options: VerifierOptions): () => Record<string, SignedDataVerifier> {
  let verifiers: Record<string, SignedDataVerifier> | null = null;
  return () => {
    if (verifiers) return verifiers;
    const roots = options.roots ?? appleRootCertificates();
    const online = options.onlineChecks ?? true;
    verifiers = {
      [Environment.PRODUCTION]: new SignedDataVerifier(roots, online, Environment.PRODUCTION, BUNDLE_ID, APP_APPLE_ID),
      [Environment.SANDBOX]: new SignedDataVerifier(roots, online, Environment.SANDBOX, BUNDLE_ID, APP_APPLE_ID),
    };
    return verifiers;
  };
}

function signedTransaction(payload: JWSTransactionDecodedPayload): SignedTransaction {
  if (
    payload.bundleId !== BUNDLE_ID ||
    typeof payload.transactionId !== 'string' ||
    typeof payload.productId !== 'string' ||
    !payload.transactionId
  ) {
    throw new StoreKitError('invalid_transaction');
  }
  return {
    transactionId: payload.transactionId,
    originalTransactionId:
      typeof payload.originalTransactionId === 'string' && payload.originalTransactionId
        ? payload.originalTransactionId
        : payload.transactionId,
    productId: payload.productId,
    environment: String(payload.environment ?? ''),
    expiresDate: optionalNumber(payload.expiresDate),
    revocationDate: optionalNumber(payload.revocationDate),
    appAccountToken: typeof payload.appAccountToken === 'string' ? payload.appAccountToken.toLowerCase() : null,
  };
}

export function appleTransactionVerifier(options: VerifierOptions = {}): TransactionVerifier {
  const load = appleVerifiers(options);
  return async (jws) => {
    if (typeof jws !== 'string' || !jws || jws.length > MAX_JWS_LENGTH) throw new StoreKitError('invalid_transaction');
    const verifier = load()[peekEnvironment(jws)];
    if (!verifier) throw new StoreKitError('unsupported_environment');
    let payload;
    try {
      payload = await verifier.verifyAndDecodeTransaction(jws);
    } catch {
      throw new StoreKitError('invalid_transaction');
    }
    return signedTransaction(payload);
  };
}

export type ServerNotification = {
  notificationUUID: string;
  notificationType: string;
  subtype: string | null;
  environment: string;
  transaction: SignedTransaction | null;
};

export type NotificationVerifier = (signedPayload: string) => Promise<ServerNotification>;

export function appleNotificationVerifier(options: VerifierOptions = {}): NotificationVerifier {
  const load = appleVerifiers(options);
  return async (signedPayload) => {
    if (typeof signedPayload !== 'string' || !signedPayload || signedPayload.length > MAX_NOTIFICATION_LENGTH) {
      throw new StoreKitError('invalid_notification');
    }
    let environment = '';
    try {
      const payload = peekPayload(signedPayload);
      const section = (payload.data ?? payload.summary ?? payload.appData) as { environment?: unknown } | undefined;
      environment = typeof section?.environment === 'string' ? section.environment : Environment.PRODUCTION;
    } catch {
      throw new StoreKitError('invalid_notification');
    }
    const verifier = load()[environment];
    if (!verifier) throw new StoreKitError('invalid_notification');
    let notification;
    let transaction: SignedTransaction | null = null;
    try {
      notification = await verifier.verifyAndDecodeNotification(signedPayload);
      const signedInfo = notification.data?.signedTransactionInfo;
      if (signedInfo) transaction = signedTransaction(await verifier.verifyAndDecodeTransaction(signedInfo));
    } catch {
      throw new StoreKitError('invalid_notification');
    }
    if (typeof notification.notificationUUID !== 'string' || !notification.notificationUUID || typeof notification.notificationType !== 'string') {
      throw new StoreKitError('invalid_notification');
    }
    return {
      notificationUUID: notification.notificationUUID,
      notificationType: String(notification.notificationType),
      subtype: notification.subtype ? String(notification.subtype) : null,
      environment,
      transaction,
    };
  };
}

export type ProEntitlement = { transactionId: string; originalTransactionId: string; expiresAt: number; environment: string };

const entitlementCache = new Map<string, { value: ProEntitlement | null; until: number }>();
const statusCache = new Map<string, { blocked: boolean; until: number }>();

export function clearEntitlementCache(): void {
  entitlementCache.clear();
  statusCache.clear();
}

function remember<T>(cache: Map<string, T>, key: string, value: T): void {
  cache.delete(key);
  cache.set(key, value);
  if (cache.size > CACHE_MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

function coveredThrough(value: string | null): number {
  if (value === null) return -Infinity;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Infinity;
}

async function entitlementBlocked(value: ProEntitlement, store: MeterStore, now: number): Promise<boolean> {
  const key = `${value.transactionId}:${value.originalTransactionId}:${value.expiresAt}`;
  const cached = statusCache.get(key);
  if (cached && cached.until > now) return cached.blocked;
  let blocked: boolean;
  try {
    const [revoked, original, expired] = await store.getMany([
      revocationKeys.transaction(value.transactionId),
      revocationKeys.original(value.originalTransactionId),
      revocationKeys.expired(value.originalTransactionId),
    ]);
    blocked =
      revoked !== null || coveredThrough(original) >= value.expiresAt || coveredThrough(expired) >= value.expiresAt;
  } catch {
    console.error('entitlement_status_unavailable');
    return false;
  }
  remember(statusCache, key, { blocked, until: now + STATUS_CACHE_MS });
  return blocked;
}

export async function proEntitlement(
  jws: string | null,
  verify: TransactionVerifier,
  now = Date.now(),
  store: MeterStore | null = null,
): Promise<ProEntitlement | null> {
  const value = await verifiedEntitlement(jws, verify, now);
  if (value && store && (await entitlementBlocked(value, store, now))) return null;
  return value;
}

async function verifiedEntitlement(jws: string | null, verify: TransactionVerifier, now: number): Promise<ProEntitlement | null> {
  const token = (jws ?? '').trim();
  if (!token || token.length > MAX_JWS_LENGTH) return null;
  const key = createHash('sha256').update(token).digest('hex');
  const cached = entitlementCache.get(key);
  if (cached && cached.until > now && (!cached.value || cached.value.expiresAt > now)) return cached.value;
  let value: ProEntitlement | null = null;
  try {
    const transaction = await verify(token);
    if (
      transaction.productId === PRO_PRODUCT_ID &&
      transaction.revocationDate === null &&
      transaction.expiresDate !== null &&
      transaction.expiresDate > now
    ) {
      value = {
        transactionId: transaction.transactionId,
        originalTransactionId: transaction.originalTransactionId,
        expiresAt: transaction.expiresDate,
        environment: transaction.environment,
      };
    }
  } catch {
    value = null;
  }
  remember(entitlementCache, key, {
    value,
    until: value ? Math.min(now + VALID_CACHE_MS, value.expiresAt) : now + INVALID_CACHE_MS,
  });
  return value;
}
