import { meterStoreFromEnv } from '../src/lib/meter-store';
import { costReport, formatCostReport, meterConfig, periodKey, previousPeriodKey } from '../src/lib/metering';

async function main() {
  try {
    process.loadEnvFile('.env.local');
  } catch {}
  const store = meterStoreFromEnv({ ...process.env, NODE_ENV: 'production' });
  if (!store) {
    console.error('Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL and KV_REST_API_TOKEN) to read the usage ledger.');
    process.exit(1);
  }
  const now = Date.now();
  const budget = meterConfig().budgetUsd;
  for (const period of [periodKey(now), previousPeriodKey(now)]) {
    console.log(formatCostReport(await costReport(store, period), budget));
    console.log('');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
