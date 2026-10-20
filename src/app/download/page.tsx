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
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight route-title">
              Download CASER
              <span className="text-primary"> for iOS</span>
            </h1>
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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 rounded-3xl border bg-[#f5f0e4] p-6 sm:p-9 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: CourthouseClock, title: 'Court search & alerts' },
                { icon: DollarDocument, title: 'PACER savings tracker' },
                { icon: Gavel, title: 'Atticus AI (CASER Pro)' },
                { icon: LegalDocument, title: 'PDF export' },
              ].map(({ icon: Icon, title }) => (
                <div key={title} className="route-card flex items-center gap-4 border p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{title}</h3>
                </div>
              ))}
            </div>
            <div className="phone-stage relative flex min-h-[460px] items-end justify-center">
              <div className="phone-glow" aria-hidden="true" />
              <Image
                src="/screenshot-3.png?v=3"
                alt="CASER dashboard on iPhone"
                width={1070}
                height={2149}
                className="phone-shot relative z-10 h-[460px] w-auto object-contain sm:h-[520px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">System Requirements</h2>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-primary" />
              <span className="font-semibold">iPhone</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">iOS Version</span>
              <Badge variant="secondary">iOS 17.6+</Badge>
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
              Free tier: 1 lifetime search and up to 5 saved cases. Keyword alerts need CASER Pro.
            </p>
            <div className="pt-4 border-t space-y-3">
              <p className="font-semibold text-sm">CASER Pro ($14.99/year)</p>
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

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <div className="flex justify-center">
            <AppStoreBadge size="lg" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
