import { createRemoteJWKSet, jwtVerify } from 'jose';

export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? 'cmv6w8rnv00200gjpv1pdax1v';

// Privy signs access tokens (ES256); the public keys live at the app's JWKS endpoint.
const jwks = createRemoteJWKSet(
  new URL(`https://auth.privy.io/api/v1/apps/${PRIVY_APP_ID}/jwks.json`),
);

export class AuthError extends Error {}

/** Returns the Privy user DID for a valid `Authorization: Bearer <token>` header. */
export async function requirePrivyUser(request: Request): Promise<string> {
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) throw new AuthError('Sign in to use CASER search.');

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: 'privy.io',
      audience: PRIVY_APP_ID,
      algorithms: ['ES256'],
    });
    if (typeof payload.sub !== 'string' || !payload.sub) throw new Error('missing sub');
    return payload.sub;
  } catch {
    throw new AuthError('Your session has expired. Sign in again.');
  }
}

const windows = new Map<string, number[]>();

/** Sliding-window limiter. Per server instance, so it caps bursts rather than guaranteeing quotas. */
export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (windows.get(key) ?? []).filter((at) => now - at < windowMs);
  const limited = recent.length >= max;
  if (!limited) recent.push(now);
  windows.set(key, recent);
  return limited;
}
