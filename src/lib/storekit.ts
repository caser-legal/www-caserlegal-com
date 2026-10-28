import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Environment, SignedDataVerifier } from '@apple/app-store-server-library';

export const BUNDLE_ID = 'com.alertsfor.caser';
export const APP_APPLE_ID = 6752289799;
export const PRO_PRODUCT_ID = 'com.alertsfor.caser.yearly';
export const APPLE_ROOT_FILES = ['AppleRootCA-G3.cer', 'AppleRootCA-G2.cer', 'AppleIncRootCertificate.cer'];
const MAX_JWS_LENGTH = 16 * 1024;
const VALID_CACHE_MS = 10 * 60_000;
const INVALID_CACHE_MS = 60_000;
const CACHE_MAX_ENTRIES = 2000;

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

function peekEnvironment(jws: string): string {
  const parts = jws.split('.');
  if (parts.length !== 3) throw new StoreKitError('invalid_transaction');
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as { environment?: unknown };
    return typeof payload?.environment === 'string' ? payload.environment : '';
  } catch {
    throw new StoreKitError('invalid_transaction');
  }
}

function optionalNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

export function appleTransactionVerifier(options: { roots?: Buffer[]; onlineChecks?: boolean } = {}): TransactionVerifier {
  let verifiers: Record<string, SignedDataVerifier> | null = null;
  const load = () => {
    if (verifiers) return verifiers;
    const roots = options.roots ?? appleRootCertificates();
    const online = options.onlineChecks ?? true;
    verifiers = {
      [Environment.PRODUCTION]: new SignedDataVerifier(roots, online, Environment.PRODUCTION, BUNDLE_ID, APP_APPLE_ID),
      [Environment.SANDBOX]: new SignedDataVerifier(roots, online, Environment.SANDBOX, BUNDLE_ID, APP_APPLE_ID),
    };
    return verifiers;
  };
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
  };
}

export type ProEntitlement = { originalTransactionId: string; expiresAt: number; environment: string };

const entitlementCache = new Map<string, { value: ProEntitlement | null; until: number }>();

export function clearEntitlementCache(): void {
  entitlementCache.clear();
}

export async function proEntitlement(
  jws: string | null,
  verify: TransactionVerifier,
  now = Date.now(),
): Promise<ProEntitlement | null> {
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
        originalTransactionId: transaction.originalTransactionId,
        expiresAt: transaction.expiresDate,
        environment: transaction.environment,
      };
    }
  } catch {
    value = null;
  }
  entitlementCache.delete(key);
  entitlementCache.set(key, {
    value,
    until: value ? Math.min(now + VALID_CACHE_MS, value.expiresAt) : now + INVALID_CACHE_MS,
  });
  if (entitlementCache.size > CACHE_MAX_ENTRIES) {
    const oldest = entitlementCache.keys().next().value;
    if (oldest !== undefined) entitlementCache.delete(oldest);
  }
  return value;
}
