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
- **Atticus:** `POST /api/caser/atticus` streams Gemini with Google Search grounding, using the iOS system prompt and prompt guard (`src/lib/atticus.ts`). Needs `GEMINI_API_KEY`; `GEMINI_MODEL` defaults to `gemini-2.5-flash`.

Environment variables (set in `.env.local` and in Vercel):

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | For Atticus | Google AI Studio API key |
| `GEMINI_MODEL` | No | Override the Gemini model |
| `NEXT_PUBLIC_PRIVY_APP_ID` | No | Defaults to the production Privy app |

## Support

- **Contact (support, careers, privacy, security)**: caserlegal@proton.me
