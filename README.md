# CASER Legal Website

Marketing site for **CASER** — **Case Alerts & Search of Electronic Records** (aka **Case Search & Alerts by CASER**) — federal court alerts and search for iOS.

- **Production**: [https://www.caserlegal.com](https://www.caserlegal.com) (Vercel)
- **App Store**: [https://apps.apple.com/app/id6752289799](https://apps.apple.com/app/id6752289799)

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Vercel server build. /v1/docket-search runs only after this project is deployed, not from a static out/ folder.
```

## Pricing (website)

| Tier | CTA |
|------|-----|
| **CASER Pro (Individual)** | Free + $14.99/year Pro via App Store download |
| **Business** | Contact form → `/contact` |
| **Enterprise** | Contact form → `/contact` |

## Key components

- `src/lib/app-store.ts` — canonical App Store URL
- `src/components/AppStoreLink.tsx` — Download buttons
- `src/components/PricingTiers.tsx` — three-column pricing
- `src/components/SiteFooter.tsx` — shared footer

## Meta Muse case intelligence (Meta Global AI Developer Hackathon)

This repository is the backend for [CASER 2.0](https://github.com/caser-legal/CASER-2.0), the hackathon entry (Startups track). The site itself predates the event. **Every commit from `c32fa20` (Oct 27, 2026) onward is hackathon work**; the commit before it, `e018b59`, is dated Oct 24. See it with `git log c32fa20~1..main`.

Built during the hackathon, all in `src/lib/case-intelligence.ts` and `src/lib/feed-archive.ts`:

| Endpoint | What it does with the Meta Model API |
|---|---|
| `POST /v1/case-insights` | Explains one docket entry. `muse-spark-1.3`, structured output (`text.format` JSON schema, strict) |
| `POST /v1/case-research` | The About This Case artifact: story, who's who, where it stands, timeline, news. Structured output plus `web_search` grounding; `url_citation` offsets are mapped onto the story so the app can show a source number after each cited claim. Incomplete or malformed answers are rejected |
| `POST /v1/case-question` | Ask Atticus about a case, with web search and the `search_related_dockets` function tool |
| `POST /v1/case-question-stream` | The same answer streamed as server-sent events: text deltas, reasoning summaries, tool status, sources |
| `GET /v1/docket-archive` | Searches the 30-day archive of court feed filings (no model call) |
| `GET /api/cron/feed-archive` | Ingests every court feed into private Vercel Blob storage and prunes anything older than 30 days (Bearer `CRON_SECRET`) |

Docket text is fenced as untrusted data, inputs are validated and size-capped, and every endpoint is rate limited per client. The Meta API key stays on the server.

Environment variables: `MODEL_API_KEY` (Meta Model API key, required), `MUSE_MODEL` (optional, defaults to `muse-spark-1.3`), `CRON_SECRET`, and the Vercel Blob token for the archive.

Tests: `npm test` runs 87 tests, including prompt-injection defenses, structured-output shaping, rejection of incomplete answers, citation offset mapping, streaming, archive pruning, App Attest, StoreKit verification and Atticus metering.

The browser Atticus at `/search` (Firebase AI Logic and Gemini, described below) predates the hackathon and is not part of the entry.

## Atticus metering and App Store paywall

Every Muse call's measured cost (`museUsage`) is recorded in a durable store, and App Store requests are metered against monthly allowances (`src/lib/metering.ts`, `src/lib/meter-store.ts`, `src/lib/storekit.ts`).

- **Editions:** requests with `X-CASER-Edition: appstore` are metered. Requests without it (the hackathon judge TestFlight build) are unmetered until `UNMETERED_UNTIL`, then metered as free tier. The budget cap and abuse limits apply to every edition.
- **Period:** the calendar month in UTC. Counters reset at 00:00 UTC on the 1st.
- **Briefing:** opening one case. `/v1/case-insights` and `/v1/case-research` for the same docket entry count once per month, even when served from the shared case cache; reopening it that month is free.
- **Question:** one `/v1/case-question` or `/v1/case-question-stream` call.
- **Plans:** free is keyed by the App Attest device id. Pro is keyed by the `com.alertsfor.caser.yearly` subscription's `originalTransactionId`, sent as `X-CASER-Subscription` (StoreKit 2 `signedTransactionInfo`) and verified with Apple's `@apple/app-store-server-library` against the Apple root certificates in `data/apple-roots/` (SHA-256 checked against the macOS system trust store). Production and Sandbox transactions are accepted. An invalid or expired header is treated as free.
- **Credits:** `X-CASER-Account` is the app's `appAccountToken` (UUID). `POST /v1/credits/redeem` with `{ "transaction": "<JWS>" }` verifies a consumable, checks its `appAccountToken` against the header and grants its uses once per `transactionId`. Credits are spent only after the monthly allowance (1 credit = 1 briefing or 1 question).
- **Charging:** allowance is checked before Muse is called and charged only after a successful response.
- **Budget:** free-tier and judge usage share a monthly pool, `MUSE_MONTHLY_BUDGET_USD`; Pro subscribers and people spending purchased uses are not limited by it. All usage together stops at `MUSE_MONTHLY_HARD_CAP_USD`. When a limit is reached, calls that would reach Muse return `503 {"error":"atticus_paused"}`; cached case results are still served. The app then answers with Apple's on-device or Private Cloud Compute model.
- **Abuse limits:** at most 40 Muse-bound requests per device per 10 minutes and 300 per UTC day (`429 {"error":"rate_limited"}` with `Retry-After`), on top of the per-IP limit.
- **No store:** if the store is not configured in production, metered requests return `atticus_paused`, redeem returns `503 {"error":"credits_unavailable"}`, unmetered requests run on per-instance in-memory budget and abuse limits, and `meter_store_missing` is logged once.

| Endpoint | Returns |
|---|---|
| `POST /v1/usage` | `{ "usage": … }` |
| `POST /v1/credits/redeem` | `{ "granted", "duplicate", "usage" }` |

`usage` is also added to successful `/v1/case-insights`, `/v1/case-research` and `/v1/case-question` responses and to the stream's `done` event:

```json
{
  "plan": "free",
  "edition": "appstore",
  "period_end": "2026-11-01T00:00:00.000Z",
  "briefings": { "used": 1, "limit": 3 },
  "questions": { "used": 0, "limit": 3 },
  "credits": 0,
  "packs": { "com.alertsfor.caser.credits.10000": 50 },
  "plans": { "free": { "briefings": 3, "questions": 3 }, "pro": { "briefings": 100, "questions": 100 } },
  "paused": false
}
```

`limit` is `null` for unmetered requests. When the allowance and credits are used up the endpoint returns `402 { "error": "quota_exceeded", "kind": "briefing" | "question", "usage": … }`.

| Variable | Default | Purpose |
|---|---|---|
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | none | Upstash Redis REST store for usage, credits and the cost ledger |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | none | Same, under the names the Vercel Marketplace Upstash integration sets |
| `MUSE_MONTHLY_BUDGET_USD` | `10` | Monthly measured Muse spend for free-tier and judge usage |
| `MUSE_MONTHLY_HARD_CAP_USD` | `50` | Monthly cap on all measured Muse spend, paid usage included |
| `UNMETERED_UNTIL` | `2026-11-10T08:00:00Z` | Requests without an edition header are unmetered until this time |
| `FREE_BRIEFINGS_PER_MONTH`, `FREE_QUESTIONS_PER_MONTH` | `3`, `3` | Free allowance per device |
| `PRO_BRIEFINGS_PER_MONTH`, `PRO_QUESTIONS_PER_MONTH` | `100`, `100` | Pro allowance per subscription |
| `CREDIT_PACKS` | `com.alertsfor.caser.credits.10000=50,com.alertsfor.caser.credits.50000=200,com.alertsfor.caser.credits.100000=750` | Consumable product id = uses |

`npm run cost-report` reads the store (from the environment or `.env.local`) and prints measured spend, Muse calls, cost per uncached briefing, cost per question and cache-hit rate per endpoint for the current and previous month. Set prices and allowances from these numbers.

## Muse connector

CASER's Muse connector is a server route in this site and deploys with it, so every push to `main` redeploys the connector. While Muse is reviewing it, avoid pushing changes that affect the route.

- **Endpoint:** `POST https://www.caserlegal.com/v1/docket-search` (`src/app/v1/docket-search/route.ts`)
- **Search logic:** `src/lib/docket-search.ts`, using the court feed lists in `data/courts/` (the same lists the iOS app ships)
- **Landing page:** `/muse` (`src/app/muse/page.tsx`, `src/components/MuseLockup.tsx`, assets in `public/muse/`)
- **Connector icon** for the Muse submission (512×512 PNG): `docs/caser-muse-connector-icon.png`
- **Tests:** `npm run test` (`tests/docket-search.test.ts`)

Request body (JSON):

| Field | Required | Values |
|---|---|---|
| `query` | Yes | Party, keyword or case title. Anything past 200 characters is cut. |
| `states` | No | State names or two-letter codes, or `National`, e.g. `["WY"]` |
| `court_types` | No | Any of `district`, `bankruptcy`, `appellate` |
| `date_range` | No | `Last 24 hours`, `Last 7 days`, `Last 30 days` (default), `Last 90 days`, `All time` |
| `limit` | No | A positive integer, capped at 25 (the default) |

The response has `matches` (each with `id`, `title`, `description`, `court`, `state`, `court_type`, `published_at`, `parties`, `link`), plus `match_count`, `truncated`, `scanned_courts`, `failed_courts`, `total_courts`, `incomplete` and `disclaimer`.

Errors: `400` for bad input, `429` after 10 searches in a minute from one IP (counted per server instance), and `500` if search fails. A request can run for up to 60 seconds.

```bash
curl -X POST https://www.caserlegal.com/v1/docket-search \
  -H 'content-type: application/json' \
  -d '{"query":"order","states":["IL"],"court_types":["district"],"date_range":"Last 7 days","limit":3}'
```

## CASER web app (`/search`)

The header's Login button opens Privy sign-in; signed-in users land on `/search`, the browser version of the iOS app (Dashboard, Search, Alerts, Atticus, Saved, Search fees, Settings).

- **Sign-in:** Privy (`src/components/PrivyProviders.tsx`). The API routes verify the Privy access token against the app's JWKS (`src/lib/privy-server.ts`); the Privy app secret is not used.
- **Search:** `POST /api/caser/search`, signed-in only, same search logic as the Muse connector.
- **Alerts:** custom check intervals (5 minutes to 7 days). Alerts, matches, saved cases and chats are stored in the browser per account, and checks run while a CASER tab is open.
- **Atticus:** same as iOS: Firebase AI Logic (Gemini Developer API) on the `caser-legal1` project and iOS app config, with Google Search grounding (`src/components/caser-app/firebase-atticus.ts`). Gemini 2.5 Flash with a Flash-Lite retry on rate limits, the iOS system prompt and prompt guard (`src/lib/atticus.ts`), sources, exact passages and Google Search suggestions.

Environment variables (set in `.env.local` and in Vercel):

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | No | Defaults to the iOS app's `caser-legal1` config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | No | Defaults to the iOS app's `caser-legal1` config |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | No | Defaults to the iOS app's `caser-legal1` config |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | No | Defaults to the iOS app's `caser-legal1` config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | No | Defaults to the iOS app's `caser-legal1` config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | No | Defaults to the iOS app's `caser-legal1` config |
| `NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY` | No | Turns on web App Check. Without it, Firebase AI Logic must not enforce App Check |
| `NEXT_PUBLIC_PRIVY_APP_ID` | No | Defaults to the production Privy app |

## Support

- **Contact (support, careers, privacy, security)**: caserlegal@proton.me
