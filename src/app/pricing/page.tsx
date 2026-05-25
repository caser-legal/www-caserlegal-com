'use client';

import PageShell from '@/components/PageShell';
import PricingTiers from '@/components/PricingTiers';
import dynamic from 'next/dynamic';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarDocument } from '@/components/ui/icons';
import Link from 'next/link';

const PACERCalculator = dynamic(() => import('@/components/PACERCalculator'), {
  loading: () => <div className="py-16 lg:py-24 animate-pulse" />,
});

export default function PricingPage() {
  return (
    <PageShell>
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <DollarDocument className="w-3 h-3 mr-2" />
              Pricing
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Simple pricing
              <span className="text-primary"> for individuals and firms</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Download CASER free on the App Store. Upgrade to CASER Pro for $19.99/year inside
              the app. Business and Enterprise plans are available by inquiry.
            </p>
            <AppStoreCtaRow
              badgeSize="lg"
              className="justify-center"
              secondary={
                <MatchedOutlineButton href="/features" badgeSize="lg">
                  View Features
                </MatchedOutlineButton>
              }
            />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTiers />
        </div>
      </section>

      <PACERCalculator standalone />
    </PageShell>
  );
}
