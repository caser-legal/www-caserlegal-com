'use client';

import PageShell from '@/components/PageShell';
import Image from 'next/image';
import { AppStoreBadge, AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import { Badge } from '@/components/ui/badge';
import { PlatformStatusBadge } from '@/components/PlatformStatusBadge';
import { CheckCircle } from 'lucide-react';
import { PRO_FEATURES } from '@/lib/pricing-features';
import {
  Gavel,
  CourthouseClock,
  DollarDocument,
  LegalDocument,
  Smartphone,
} from '@/components/ui/icons';
import Link from 'next/link';

export default function DownloadPage() {
  return (
    <PageShell>
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              Available on the App Store
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Download CASER
              <span className="text-primary"> for iOS</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Monitor 300+ U.S. federal court feeds. Search filings, set keyword alerts, and upgrade
              to CASER Pro ($19.99/year) inside the app after download.
            </p>
            <AppStoreCtaRow
              badgeSize="lg"
              className="justify-center"
              secondary={
                <MatchedOutlineButton href="/pricing" badgeSize="lg">
                  View Pricing
                </MatchedOutlineButton>
              }
            />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <CourthouseClock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Court search &amp; alerts</h3>
                    <p className="text-muted-foreground">
                      Search federal district and bankruptcy filings. Keyword alerts with push
                      notifications (scans run approximately every 5 minutes while the app is active).
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarDocument className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">PACER savings tracker</h3>
                    <p className="text-muted-foreground">
                      No per-search fees in CASER. Pay PACER only when you open document links. Track
                      hypothetical savings vs PACER search-result pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Atticus AI (CASER Pro)</h3>
                    <p className="text-muted-foreground">
                      AI legal research assistant powered by Gemini. Not legal advice — for research
                      and education only. Included with CASER Pro.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <LegalDocument className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">PDF export</h3>
                    <p className="text-muted-foreground">
                      Export search results and case details as PDF with a legal-brief style layout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/screenshot-3.png"
                alt="CASER App Screenshot"
                width={1070}
                height={2149}
                className="max-w-sm w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">System Requirements</h2>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-primary" />
              <span className="font-semibold">iPhone &amp; iPad</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">iOS Version</span>
              <Badge variant="secondary">iOS 26.0+</Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Account</span>
              <Badge variant="secondary">No account required</Badge>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t">
              <span className="font-medium">Platform</span>
              <PlatformStatusBadge status="available" />
            </div>
            <p className="text-sm text-muted-foreground pt-4 border-t">
              Free tier: 1 search (lifetime), 1 keyword alert, 5 saved cases.
            </p>
            <div className="pt-4 border-t space-y-3">
              <p className="font-semibold text-sm">CASER Pro ($19.99/year)</p>
              <p className="text-xs text-muted-foreground">
                One-year subscription via the App Store. Includes:
              </p>
              <ul className="space-y-2">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Need Business or Enterprise?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
            .
          </p>
          <div className="flex justify-center">
            <AppStoreBadge size="lg" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
