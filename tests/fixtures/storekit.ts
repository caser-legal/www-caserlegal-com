import { createPrivateKey, sign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const fixture = JSON.parse(readFileSync(new URL('./storekit.json', import.meta.url), 'utf8')) as {
  rootDer: string;
  intermediateDer: string;
  leafDer: string;
  leafKeyJwk: Record<string, string>;
};

export const testRoot = Buffer.from(fixture.rootDer, 'base64');
const leafKey = createPrivateKey({ key: fixture.leafKeyJwk, format: 'jwk' });

export function signTransaction(payload: Record<string, unknown>, chain = [fixture.leafDer, fixture.intermediateDer, fixture.rootDer]): string {
  const header = Buffer.from(JSON.stringify({ alg: 'ES256', x5c: chain })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign('sha256', Buffer.from(`${header}.${body}`), { key: leafKey, dsaEncoding: 'ieee-p1363' });
  return `${header}.${body}.${signature.toString('base64url')}`;
}

export function transactionPayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const now = Date.now();
  return {
    transactionId: '2000000123456789',
    originalTransactionId: '2000000100000000',
    bundleId: 'com.alertsfor.caser',
    productId: 'com.alertsfor.caser.yearly',
    purchaseDate: now - 86400_000,
    originalPurchaseDate: now - 30 * 86400_000,
    expiresDate: now + 300 * 86400_000,
    quantity: 1,
    type: 'Auto-Renewable Subscription',
    inAppOwnershipType: 'PURCHASED',
    signedDate: now,
    environment: 'Sandbox',
    transactionReason: 'PURCHASE',
    storefront: 'USA',
    storefrontId: '143441',
    price: 14990,
    currency: 'USD',
    ...overrides,
  };
}
