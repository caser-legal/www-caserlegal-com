export interface MeterStore {
  incr(key: string, by: number, ttlSeconds?: number): Promise<number>;
  incrByFloat(key: string, by: number, ttlSeconds?: number): Promise<number>;
  get(key: string): Promise<string | null>;
  getMany(keys: string[]): Promise<(string | null)[]>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  setIfAbsent(key: string, value: string, ttlSeconds?: number): Promise<boolean>;
  setIfGreater(key: string, value: number, ttlSeconds?: number): Promise<boolean>;
  del(key: string): Promise<void>;
}

export class MeterStoreError extends Error {}

type Entry = { value: string; expiresAt: number };

export function memoryMeterStore(clock: () => number = Date.now): MeterStore & { size(): number } {
  const items = new Map<string, Entry>();
  const live = (key: string): Entry | undefined => {
    const entry = items.get(key);
    if (entry && entry.expiresAt <= clock()) {
      items.delete(key);
      return undefined;
    }
    return entry;
  };
  const expiry = (ttlSeconds?: number) => (ttlSeconds && ttlSeconds > 0 ? clock() + ttlSeconds * 1000 : Infinity);
  const add = (key: string, by: number, ttlSeconds?: number) => {
    const entry = live(key);
    const value = Number(entry?.value ?? 0) + by;
    items.set(key, { value: String(value), expiresAt: entry && entry.expiresAt !== Infinity ? entry.expiresAt : expiry(ttlSeconds) });
    return value;
  };
  return {
    async incr(key, by, ttlSeconds) {
      return add(key, Math.trunc(by), ttlSeconds);
    },
    async incrByFloat(key, by, ttlSeconds) {
      return add(key, by, ttlSeconds);
    },
    async get(key) {
      return live(key)?.value ?? null;
    },
    async getMany(keys) {
      return keys.map((key) => live(key)?.value ?? null);
    },
    async set(key, value, ttlSeconds) {
      items.set(key, { value, expiresAt: expiry(ttlSeconds) });
    },
    async setIfAbsent(key, value, ttlSeconds) {
      if (live(key)) return false;
      items.set(key, { value, expiresAt: expiry(ttlSeconds) });
      return true;
    },
    async setIfGreater(key, value, ttlSeconds) {
      const entry = live(key);
      if (entry && !(value > Number(entry.value))) return false;
      items.set(key, { value: String(value), expiresAt: expiry(ttlSeconds) });
      return true;
    },
    async del(key) {
      items.delete(key);
    },
    size() {
      return items.size;
    },
  };
}

const INCR_WITH_EXPIRY = `local v = redis.call('INCRBY', KEYS[1], ARGV[1])
if tonumber(ARGV[2]) > 0 and redis.call('TTL', KEYS[1]) < 0 then redis.call('EXPIRE', KEYS[1], ARGV[2]) end
return v`;

const INCRBYFLOAT_WITH_EXPIRY = `local v = redis.call('INCRBYFLOAT', KEYS[1], ARGV[1])
if tonumber(ARGV[2]) > 0 and redis.call('TTL', KEYS[1]) < 0 then redis.call('EXPIRE', KEYS[1], ARGV[2]) end
return v`;

const SET_IF_GREATER = `local current = redis.call('GET', KEYS[1])
if current and tonumber(ARGV[1]) <= tonumber(current) then return 0 end
if tonumber(ARGV[2]) > 0 then redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2]) else redis.call('SET', KEYS[1], ARGV[1]) end
return 1`;

const REDIS_TIMEOUT_MS = 4000;

export function upstashMeterStore(url: string, token: string, fetcher: typeof fetch = fetch): MeterStore {
  const base = url.replace(/\/+$/, '');
  async function command(args: (string | number)[]): Promise<unknown> {
    let response: Response;
    try {
      response = await fetcher(base, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(args.map(String)),
        signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
      });
    } catch {
      throw new MeterStoreError('meter_store_unreachable');
    }
    let payload: { result?: unknown; error?: unknown };
    try {
      payload = (await response.json()) as { result?: unknown; error?: unknown };
    } catch {
      throw new MeterStoreError('meter_store_invalid_response');
    }
    if (!response.ok || payload?.error !== undefined) throw new MeterStoreError('meter_store_error');
    return payload.result ?? null;
  }
  const ttl = (ttlSeconds?: number) => (ttlSeconds && ttlSeconds > 0 ? Math.ceil(ttlSeconds) : 0);
  return {
    async incr(key, by, ttlSeconds) {
      return Number(await command(['EVAL', INCR_WITH_EXPIRY, 1, key, Math.trunc(by), ttl(ttlSeconds)]));
    },
    async incrByFloat(key, by, ttlSeconds) {
      return Number(await command(['EVAL', INCRBYFLOAT_WITH_EXPIRY, 1, key, by, ttl(ttlSeconds)]));
    },
    async get(key) {
      const result = await command(['GET', key]);
      return result === null ? null : String(result);
    },
    async getMany(keys) {
      if (!keys.length) return [];
      const result = await command(['MGET', ...keys]);
      return Array.isArray(result) ? result.map((value) => (value === null ? null : String(value))) : keys.map(() => null);
    },
    async set(key, value, ttlSeconds) {
      const args: (string | number)[] = ['SET', key, value];
      if (ttl(ttlSeconds)) args.push('EX', ttl(ttlSeconds));
      await command(args);
    },
    async setIfAbsent(key, value, ttlSeconds) {
      const args: (string | number)[] = ['SET', key, value, 'NX'];
      if (ttl(ttlSeconds)) args.push('EX', ttl(ttlSeconds));
      return (await command(args)) === 'OK';
    },
    async setIfGreater(key, value, ttlSeconds) {
      return Number(await command(['EVAL', SET_IF_GREATER, 1, key, value, ttl(ttlSeconds)])) === 1;
    },
    async del(key) {
      await command(['DEL', key]);
    },
  };
}

export function meterStoreFromEnv(env: Record<string, string | undefined> = process.env, fetcher: typeof fetch = fetch): MeterStore | null {
  const url = (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || '').trim();
  const token = (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || '').trim();
  if (url.startsWith('https://') && token) return upstashMeterStore(url, token, fetcher);
  if (env.VERCEL || env.NODE_ENV === 'production') return null;
  return memoryMeterStore();
}

export function readOnlyMeterStoreFromEnv(env: Record<string, string | undefined> = process.env, fetcher: typeof fetch = fetch): MeterStore | null {
  const url = (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || '').trim();
  const token = (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || env.KV_REST_API_READ_ONLY_TOKEN || '').trim();
  return url.startsWith('https://') && token ? upstashMeterStore(url, token, fetcher) : null;
}
