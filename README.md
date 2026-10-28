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

Tests: `npm test` runs 125 tests, including prompt-injection defenses, structured-output shaping, rejection of incomplete answers, citation offset mapping, streaming, archive pruning, App Attest attestation and assertions, StoreKit verification, App Store Server Notifications, connector access and Atticus metering.

The browser Atticus at `/search` (Firebase AI Logic and Gemini, described below) predates the hackathon and is not part of the entry.

## Atticus metering and App Store paywall

Every Muse call's measured cost (`museUsage`) is recorded in a durable store, and App Store requests are metered against monthly allowances (`src/lib/metering.ts`, `src/lib/meter-store.ts`, `src/lib/storekit.ts`).

- **Editions:** requests with `X-CASER-Edition: appstore` are metered. Requests without it (the hackathon judge TestFlight build) get the judge allowance per device (`JUDGE_BRIEFINGS_PER_MONTH`, `JUDGE_QUESTIONS_PER_MONTH`, 50 each) until `UNMETERED_UNTIL`, then are metered as free tier. Judge allowances are counted and charged exactly like metered ones, and judge spend comes out of the free-usage pool. The budget cap and abuse limits apply to every edition.
- **Period:** the calendar month in UTC. Counters reset at 00:00 UTC on the 1st.
- **Briefing:** opening one case. `/v1/case-insights` and `/v1/case-research` for the same docket entry count once per month, even when served from the shared case cache; reopening it that month is free.
- **Question:** one `/v1/case-question` or `/v1/case-question-stream` call.
- **Plans:** free is keyed by the App Attest device id. Pro is keyed by the `com.alertsfor.caser.yearly` subscription's `originalTransactionId`, sent as `X-CASER-Subscription` (StoreKit 2 `signedTransactionInfo`) and verified with Apple's `@apple/app-store-server-library` against the Apple root certificates in `data/apple-roots/` (SHA-256 checked against the macOS system trust store). Production and Sandbox transactions are accepted. Sandbox subscriptions (App Review, TestFlight) get the Pro allowance under a separate subject, `pro-sandbox:<originalTransactionId>`, and their spend counts against the free-usage pool because no money was paid. An invalid, expired, refunded or revoked subscription is treated as free.
- **Credits:** `X-CASER-Account` is the app's `appAccountToken` (UUID). `POST /v1/credits/redeem` with `{ "transaction": "<JWS>" }` verifies a consumable, checks its `appAccountToken` against the header and grants its uses once per `transactionId`. A transaction that App Store Server Notifications reported as refunded or revoked is refused. Sandbox consumables grant at most 10 uses each. Credits are spent only after the monthly allowance (1 credit = 1 briefing or 1 question).
- **Charging:** allowance is checked before Muse is called and charged only after a successful response.
- **Budget:** free-tier and judge usage share a monthly pool, `MUSE_MONTHLY_BUDGET_USD`; Pro subscribers and people spending purchased uses are not limited by it. All usage together stops at `MUSE_MONTHLY_HARD_CAP_USD`. When a limit is reached, calls that would reach Muse return `503 {"error":"atticus_paused"}`; cached case results are still served. The app then answers with Apple's on-device or Private Cloud Compute model.
- **Abuse limits:** at most 40 Muse-bound requests per device per 10 minutes and 300 per UTC day (`429 {"error":"rate_limited"}` with `Retry-After`), on top of the per-IP limit.
- **No store:** if the store is not configured in production, metered requests return `atticus_paused`, redeem returns `503 {"error":"credits_unavailable"}`, unmetered requests run on per-instance in-memory allowances, budget and abuse limits, and `meter_store_missing` is logged once.

| Endpoint | Returns |
|---|---|
| `POST /v1/usage` | `{ "usage": … }` |
| `POST /v1/credits/redeem` | `{ "granted", "duplicate", "usage" }` |
| `POST /v1/appstore/notifications` | App Store Server Notifications V2 (see below) |

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

Requests without an edition header report the judge limits. When the allowance and credits are used up the endpoint returns `402 { "error": "quota_exceeded", "kind": "briefing" | "question", "usage": … }`.

| Variable | Default | Purpose |
|---|---|---|
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | none | Upstash Redis REST store for usage, credits and the cost ledger |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | none | Same, under the names the Vercel Marketplace Upstash integration sets |
| `KV_REST_API_READ_ONLY_TOKEN` | none | Read-only token. Used only by `npm run cost-report` when no read-write token is present; the site never writes with it, and with only this token the store counts as missing |
| `MUSE_MONTHLY_BUDGET_USD` | `10` | Monthly measured Muse spend for free-tier and judge usage |
| `MUSE_MONTHLY_HARD_CAP_USD` | `50` | Monthly cap on all measured Muse spend, paid usage included |
| `UNMETERED_UNTIL` | `2026-11-10T08:00:00Z` | Requests without an edition header are unmetered until this time |
| `FREE_BRIEFINGS_PER_MONTH`, `FREE_QUESTIONS_PER_MONTH` | `3`, `3` | Free allowance per device |
| `PRO_BRIEFINGS_PER_MONTH`, `PRO_QUESTIONS_PER_MONTH` | `100`, `100` | Pro allowance per subscription |
| `JUDGE_BRIEFINGS_PER_MONTH`, `JUDGE_QUESTIONS_PER_MONTH` | `50`, `50` | Allowance per device for requests without an edition header |
| `CREDIT_PACKS` | `com.alertsfor.caser.credits.10000=50,com.alertsfor.caser.credits.50000=200,com.alertsfor.caser.credits.100000=750` | Consumable product id = uses |

`npm run cost-report` reads the store (from the environment or `.env.local`; `KV_REST_API_READ_ONLY_TOKEN` is enough) and prints measured spend, Muse calls, cost per uncached briefing, cost per question and cache-hit rate per endpoint for the current and previous month. Set prices and allowances from these numbers.

### App Store Server Notifications

In App Store Connect (App Information, App Store Server Notifications), set both the Production and the Sandbox Server URL to `https://www.caserlegal.com/v1/appstore/notifications`, Version 2.

The route verifies `signedPayload` and the `signedTransactionInfo` inside it with `SignedDataVerifier.verifyAndDecodeNotification` against the bundled Apple roots (bundle `com.alertsfor.caser`, app id `6752289799`, Production and Sandbox). Each `notificationUUID` is processed once.

- `REFUND` and `REVOKE` record the `transactionId` and `originalTransactionId` as revoked. The subscription is refused until a renewal with a later expiry date. A refunded consumable that was already redeemed has its uses taken back from the account's credits, once, never below zero.
- `REFUND_REVERSED` clears the revocation and returns any credits taken back.
- `EXPIRED`, `GRACE_PERIOD_EXPIRED` and `DID_FAIL_TO_RENEW` without the `GRACE_PERIOD` subtype mark the subscription expired through the transaction's expiry date.
- Other types return `200` and change nothing.

Responses: `200 {"ok":true}` (plus `"duplicate":true` for a repeat), `400 {"error":"invalid_notification"}` for a bad signature or body, and `503 {"error":"notifications_unavailable"}` when the store is missing or fails, so Apple retries. Subscription checks read the revocation keys with one `MGET` per request, cached for 30 seconds.

## App Attest

`GET /v1/attest/challenge` issues an HMAC-signed challenge that is valid for five minutes. `POST /v1/attest` verifies the App Attest attestation and returns a 30-day device token for `X-CASER-Device`.

- **Single-use challenges:** a challenge is consumed atomically in the store (`SET NX` on its SHA-256) before the attestation is checked. A reused challenge returns `401 {"error":"invalid_challenge"}`.
- **Per-IP limits:** at most 60 challenges per IP per hour and 20 attestations per IP per UTC day, counted in the store (`429 {"error":"rate_limited"}` with `Retry-After`). IPs are stored as SHA-256 hashes.
- **Store required:** without a working store `POST /v1/attest` returns `503 {"error":"attest_unavailable"}` rather than accept replays. Challenges are still issued, limited per instance.
- **Attested keys:** each attested public key (SPKI DER, base64) is stored for 400 days with its counter, under the device id. Existing device tokens keep working.

**Per-request assertions.** On `/v1/case-insights`, `/v1/case-research`, `/v1/case-question`, `/v1/case-question-stream`, `/v1/usage` and `/v1/credits/redeem` the app sends `X-CASER-Assertion` (base64 App Attest assertion) and `X-CASER-Assertion-Time` (Unix milliseconds). The signed client data is `METHOD\nPATH\nSHA256_HEX(body)\nTIME`. The server checks the signature with the stored key, the app id hash, that the time is within five minutes, and the App Attest counter. A counter above the highest seen is accepted; so is a counter within 32 below it that has not been used yet, because parallel requests can arrive out of order. A counter already used, or 32 or more below the highest, is refused. The check and update are one atomic script in the store. `APP_ATTEST_ASSERTIONS` sets the rollout mode:

| Mode | Headers missing | Headers present | No stored key |
|---|---|---|---|
| `off` | allowed | ignored | allowed |
| `optional` (default) | allowed | must verify (`401 assertion_invalid`) | allowed |
| `required` | `401 assertion_required` | must verify (`401 assertion_invalid`) | `401 assertion_required` |

If the store is down, `optional` lets the request through and logs `assertion_unchecked`; `required` returns `503 attest_unavailable`.

| Variable | Default | Purpose |
|---|---|---|
| `ATTEST_SECRET` | none | HMAC key for challenges and device tokens, at least 32 characters |
| `APP_ATTEST_APP_ID` | `672RKF28YZ.com.alertsfor.caser` | Team and bundle id checked in attestations and assertions |
| `APP_ATTEST_ALLOW_DEVELOPMENT` | unset | `1` accepts development App Attest keys |
| `APP_ATTEST_ASSERTIONS` | `optional` | `off`, `optional` or `required` |

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

Access: when `DOCKET_SEARCH_KEY` is set, the connector must send it, either as `X-CASER-Connector-Key: <key>` or as `Authorization: Bearer <key>`; it is compared in constant time. When it is not set, the route stays public so the Muse connector keeps working; the per-IP limits and the cache apply either way.

Each search can fan out to every court feed, so identical searches (same normalized query, courts, date range and limit) are cached in the store for 10 minutes.

Errors: `400` for bad input, `401` without the connector key when one is set, `429` after 10 searches in a minute or 200 in a UTC day from one IP (counted in the store, with `Retry-After`), and `500` if search fails. A request can run for up to 60 seconds.

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
