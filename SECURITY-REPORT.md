# Pre-launch security fixes and dependency status — October 28, 2026

## Server fixes

- Requests without an edition header (the judge build) now have a per-device monthly allowance instead of unlimited use.
- App Attest challenges are single-use, attestation is limited per IP in the durable store, and attestation fails closed when the store is unavailable.
- Attested public keys are stored, and requests carry per-request App Attest assertions (signature, app id, time and a counter that cannot be reused). Rollout is controlled by `APP_ATTEST_ASSERTIONS`.
- `/v1/docket-search` requires the connector key when `DOCKET_SEARCH_KEY` is set (it stays public otherwise, for the Muse connector), is limited per IP in the durable store and caches identical searches for 10 minutes.
- App Store Server Notifications V2 (`/v1/appstore/notifications`) record refunds, revocations and expiries; Pro checks and credit redemption honor them, and refunded credit packs are taken back.
- Sandbox purchases are kept apart from paid usage.
- Tooling can read the store with the read-only token; the site never writes with it.

`npm test` (125 tests), `npm run lint`, `npx tsc --noEmit -p .` and `npm run build` passed.

## Dependency audit

`npm audit --omit=dev` reports **38 advisories in production dependencies: 25 high, 13 moderate, 0 critical.** The September 4 statement of zero advisories below is no longer true.

They come through four direct dependencies:

| Direct dependency | Vulnerable packages underneath |
|---|---|
| `@privy-io/react-auth` (web sign-in on `/search`) | `ws`, `zod` (older nested copies), `uuid`, `decode-uri-component`, wallet libraries |
| `firebase` (browser Atticus on `/search`) | `@grpc/grpc-js` |
| `@vercel/blob` (feed archive) | `@vercel/oidc` → `@vercel/cli-config` → `zod` |
| `zod` | flagged only because of the nested copies above; the top-level `zod` is 4.6.7, which is not affected |

npm offers no compatible fix: its suggested fixes are semver-major downgrades (`firebase` 9.14.0, `@privy-io/react-auth` 3.6.1, `@vercel/blob` 2.4.0). They are not applied here. Dependabot (`.github/dependabot.yml`) now opens weekly npm and monthly GitHub Actions updates so fixed upstream releases are picked up. The `npm audit --omit=dev --audit-level=moderate` step in `.github/workflows/validate.yml` will fail until these advisories are resolved.

This is a dependency snapshot, not an independent security certification.

---

# Dependency and build verification — September 4, 2026 (superseded)

The marketing site is a static Next.js 16 export. After compatible dependency updates,
`npm audit` reported zero known advisories. This is a dependency snapshot, not an
independent security certification. `npm run test` (5 fee-regression tests),
`npm run lint`, and `npm run build` passed during remediation.

Re-run these commands for every dependency change. Security statements on the site
now describe implemented iOS data protection, Keychain, HTTPS, and provider processing;
they do not claim end-to-end AI encryption or a complete audit trail.

The older report below is retained as historical evidence only. Its versions and
scan counts are not current.

---

# Security Scan Report
**Date:** November 1, 2025  
**Project:** Caser Legal Website (Static Next.js 15)

## Executive Summary
✅ **EXCELLENT NEWS:** Zero known vulnerabilities found in production dependencies  
⚠️ **Action Required:** Remove unused Socket.io dependencies (attack surface reduction)

---

## Scan Results

### 1. npm Audit (Dependency Vulnerabilities)
- **Critical:** 0
- **High:** 0  
- **Moderate:** 0
- **Low:** 0
- **Total Dependencies Scanned:** 547 (134 production, 356 dev)

**Status:** ✅ CLEAN - No known CVEs in any dependencies

### 2. Outdated Packages
Minor updates available (non-security):
- `eslint`: 9.38.0 → 9.39.0
- `react-hook-form`: 7.65.0 → 7.66.0
- `lucide-react`: 0.525.0 → 0.552.0

Major version updates available:
- `next`: 15.5.6 → 16.0.1 (consider after 16.x stabilizes)
- `@types/node`: 20.19.24 → 24.9.2

---

## Required Actions

### HIGH PRIORITY: Remove Unused Socket.io
**Risk:** Unnecessary attack surface  
**Impact:** Low (not running in production, but increases dependency count)

```bash
# Remove dependencies
npm uninstall socket.io socket.io-client

# Remove unused files
rm server.ts
rm src/lib/socket.ts
```

### MEDIUM PRIORITY: Code Quality Fixes
Review `next.config.ts`:
- Remove `typescript.ignoreBuildErrors: true`
- Remove `eslint.ignoreDuringBuilds: true`
- Fix underlying errors

### LOW PRIORITY: Minor Updates
```bash
npm update eslint react-hook-form lucide-react
```

---

## Tools Not Available (Install for Future Scans)

```bash
# Install security tools
brew install gitleaks trivy semgrep
npm install -g @cyclonedx/cdxgen
```

---

## Next Steps

1. ✅ **Immediate:** Remove Socket.io (5 min)
2. 📋 **This Week:** Enable GitHub Dependabot
3. 🔄 **Monthly:** Re-run security scan
4. 📚 **Ongoing:** Monitor Next.js/React advisories

---

## Conclusion

Your static site has **zero known vulnerabilities** - excellent security posture! The main recommendation is removing unused Socket.io code to reduce attack surface. Continue monitoring dependencies monthly.
