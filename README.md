# CASER Legal Website

Marketing site for **CASER** (Case Automated Search of Electronic Records) — federal court case search and alerts for iOS.

- **Production**: [https://www.caserlegal.com](https://www.caserlegal.com) (Vercel)
- **App Store**: [https://apps.apple.com/app/id6752289799](https://apps.apple.com/app/id6752289799)

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export to out/
```

## Pricing (website)

| Tier | CTA |
|------|-----|
| **CASER Pro (Individual)** | Free + $19.99/year Pro via App Store download |
| **Business** | Contact form → `/contact` |
| **Enterprise** | Contact form → `/contact` |

## Key components

- `src/lib/app-store.ts` — canonical App Store URL
- `src/components/AppStoreLink.tsx` — Download buttons
- `src/components/PricingTiers.tsx` — three-column pricing
- `src/components/SiteFooter.tsx` — shared footer

## Support

- **General / support**: hi@caserlegal.com
- **Privacy rights**: rights@caserlegal.com
