# CASER Legal Website

> **Case Automated Search of Electronic Records** - Professional marketing website for CASER legal technology platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📋 Site Structure

### **Pages Overview**

| Page | Route | Purpose | Key Features |
|------|-------|---------|--------------|
| **Home** | `/` | Landing page | Hero, stats (170+ courts), features overview, PACER comparison, testimonials |
| **About** | `/about` | Company story | Mission, team, values, stats, timeline |
| **Features** | `/features` | Product capabilities | Real-time monitoring, alerts, document access, integrations |
| **Pricing** | `/pricing` | Plans & ROI calculator | Interactive savings calculator, 3 pricing tiers, comparison table |
| **Download** | `/download` | App download (iOS) | Platform features, waitlist signup, system requirements |
| **Contact** | `/contact` | Get in touch | Contact options (general, business, support), practice inquiry form |
| **Support** | `/support` | Help center | FAQs, documentation, troubleshooting, contact support |
| **Careers** | `/careers` | Job opportunities | Open positions, company culture, benefits, application |
| **Terms** | `/terms` | Legal terms | Terms of service, usage policies, disclaimers |
| **Privacy** | `/privacy` | Privacy policy | Data collection, usage, security, user rights |

---

## 🎨 Design System

### **Brand Colors**
- **Primary**: Blue (`text-primary`, `bg-primary`)
- **Foreground**: Dark text (`text-foreground`)
- **Muted**: Gray text (`text-muted-foreground`)
- **Background**: White/Light (`bg-background`)

### **Key Components**
- **Navigation**: Sticky header with logo, links, CTA button
- **Footer**: 4-column layout with clickable logo (links to home), product/company/support links
- **Cards**: Shadcn UI cards for content sections
- **Buttons**: Primary, outline, and ghost variants
- **Badges**: Status indicators (Open, Remote, etc.)

### **Typography**
- **Headings**: `text-4xl lg:text-6xl` for hero titles
- **Body**: `text-xl` for descriptions
- **Small**: `text-sm` for metadata

---

## 🔗 Navigation & Buttons Reference

### **Main Navigation** (All Pages)
```
Logo (left) → Home page
├── Home → /
├── About → /about
├── Features → /features
├── Pricing → /pricing
├── Download → /download (or Contact on some pages)
└── [CTA Button] → /contact or /download
```

### **Footer Links** (All Pages)
```
Logo (clickable) → /

Product Column:
├── Features → /features
├── Pricing → /pricing
└── Download → /download

Company Column:
├── About → /about
├── Careers → /careers
└── Contact → /contact

Support Column:
├── Support Center → /support
├── Terms of Service → /terms
└── Privacy Policy → /privacy
```

### **Page-Specific CTAs**

#### **Home Page** (`/`)
- Primary: "Start Free Trial" → `/contact`
- Secondary: "View Pricing" → `/pricing`
- Features section: "Learn More" → `/features`

#### **About Page** (`/about`)
- Primary: "Join Our Team" → `/careers`
- Secondary: "Contact Us" → `/contact`

#### **Features Page** (`/features`)
- Primary: "Contact" → `/contact`
- Secondary: "View Pricing" → `/pricing`

#### **Pricing Page** (`/pricing`)
- Each tier: "Get Started" or "Contact Sales" → `/contact`
- Calculator: "Purchase CASER Now" → `/contact`

#### **Download Page** (`/download`)
- Primary: "Download" (iOS) → `/contact` (waitlist)
- Secondary: "Join Waitlist" → `/contact`

#### **Contact Page** (`/contact`)
- Email buttons → `mailto:hi@caserlegal.com` or `mailto:business@caserlegal.com`
- Support link → `/support`

#### **Support Page** (`/support`)
- "Contact Support" → `/contact`
- "Submit Ticket" → `mailto:hi@caserlegal.com`

#### **Careers Page** (`/careers`)
- "Apply Now" → `mailto:hi@caserlegal.com`
- "General Application" → `mailto:hi@caserlegal.com`

---

## 📊 Key Metrics & Content

### **Statistics** (Keep Consistent)
- **Courts Monitored**: 170+ U.S. Courts
- **Cost Savings**: Up to 95% PACER fee reduction
- **Response Time**: Near real-time updates
- **Coverage**: Federal District, Bankruptcy, Appellate Courts

### **Contact Information**
- **General**: hi@caserlegal.com
- **Business**: business@caserlegal.com
- **Hours**: Monday-Friday, 9 AM - 6 PM EST

### **Pricing Tiers**
1. **Starter**: $49/month - Solo practitioners
2. **Professional**: $149/month - Small firms
3. **Enterprise**: Custom - Large organizations

---

## 🛠️ Technical Stack

- **Framework**: Next.js 15.5.6 (Static Export)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React + Custom icons
- **Deployment**: Netlify
- **Repository**: GitHub

---

## 📁 File Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── features/page.tsx     # Features page
│   ├── pricing/page.tsx      # Pricing + ROI calculator
│   ├── download/page.tsx     # Download page
│   ├── contact/page.tsx      # Contact page
│   ├── support/page.tsx      # Support center
│   ├── careers/page.tsx      # Careers page
│   ├── terms/page.tsx        # Terms of service
│   ├── privacy/page.tsx      # Privacy policy
│   ├── layout.tsx            # Root layout + metadata
│   └── favicon.ico           # CASER logo favicon
├── components/
│   ├── ui/                   # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── icons.tsx         # Custom icons
│   │   └── ...
│   └── Navigation.tsx        # Shared navigation component
└── lib/
    └── utils.ts              # Utility functions
```

---

## 🔧 Common Tasks

### **Update Court Count**
Search and replace across all files:
```bash
# Find all instances
grep -r "170+" src/

# Update in layout.tsx, page.tsx, features/page.tsx, about/page.tsx
```

### **Update Contact Email**
Update in:
- `src/app/contact/page.tsx`
- `src/app/support/page.tsx`
- `src/app/careers/page.tsx`

### **Update Pricing**
Edit `src/app/pricing/page.tsx`:
- Tier prices (lines ~200-300)
- Calculator logic (lines ~400-600)

### **Add New Page**
1. Create `src/app/[page-name]/page.tsx`
2. Add navigation link to all page headers
3. Add footer link if needed
4. Update this README

---

## 🚨 Important Notes

### **Branding**
- ✅ **Correct**: "Case Automated Search of Electronic Records"
- ❌ **Wrong**: "Court Automated Search of Electronic Records"

### **Favicon**
- Located at `src/app/favicon.ico`
- Currently: CASER logo (PNG format, 328x203)
- Replace with proper ICO if needed

### **Footer Logo**
- All footer logos are clickable and link to home (`/`)
- No text below logo (removed for clean design)

### **Button Text Consistency**
- Download links → "Download"
- Contact links → "Contact"
- Never mix these up!

---

## 🔄 Deployment

### **Netlify Configuration**
- **Build Command**: `npm run build`
- **Publish Directory**: `out/`
- **Branch**: `main`

### **Deploy Process**
1. Make changes locally
2. Test with `npm run build`
3. Commit to branch
4. Push to GitHub
5. Netlify auto-deploys from `main`

### **Manual Deploy**
```bash
# Build locally
npm run build

# Output in /out directory
# Upload to Netlify manually if needed
```

---

## 📝 Content Guidelines

### **Tone**
- Professional but approachable
- Focus on value and ROI
- Emphasize cost savings and efficiency

### **Key Messages**
1. Save 95% on PACER fees
2. Monitor 170+ courts in real-time
3. Instant alerts with direct document links
4. Professional-grade legal technology

### **Call-to-Actions**
- Primary: "Start Free Trial" / "Get Started"
- Secondary: "View Pricing" / "Learn More"
- Support: "Contact Us" / "Schedule Demo"

---

## 🐛 Troubleshooting

### **Build Fails**
1. Check for syntax errors in TSX files
2. Ensure all imports are correct
3. Run `npm run build` locally first
4. Check Netlify build logs

### **Styling Issues**
1. Verify Tailwind classes are correct
2. Check component imports from `@/components/ui`
3. Clear browser cache

### **Navigation Broken**
1. Verify all `<Link href="">` paths start with `/`
2. Check that pages exist in `src/app/`
3. Ensure no typos in route names

---

## 📞 Support

For questions about this website:
- **Developer**: Check this README first
- **Content Updates**: Edit page files directly
- **Technical Issues**: Review build logs
- **Design Changes**: Update Tailwind classes

---

## 📄 License

© 2026 CASER. All rights reserved.

---

**Last Updated**: January 3, 2025
**Version**: 1.0.0
**Maintained By**: CASER Development Team
