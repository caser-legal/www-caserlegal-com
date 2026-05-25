'use client';

import PageShell from '@/components/PageShell';
import PricingTiers from '@/components/PricingTiers';
import PACERCalculator from '@/components/PACERCalculator';
import ShowcaseLeftSlot from '@/components/ShowcaseLeftSlot';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarDocument } from '@/components/ui/icons';
import { ArrowRight } from 'lucide-react';

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
              Download CASER free on the App Store. Upgrade to CASER Pro for $14.99/year inside
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

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="w-fit">
                  Interactive Calculator
                </Badge>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">PACER Savings Calculator</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Adjust the sliders to match your PACER usage. Savings and ROI update on the left;
                usage inputs and traditional PACER costs stay on the right.
              </p>
            </div>

            <PACERCalculator showcase leftSlot={<ShowcaseLeftSlot />} />

            <div className="text-center space-y-3">
              <AppStoreCtaRow
                badgeSize="lg"
                className="justify-center"
                secondary={
                  <MatchedOutlineButton href="/contact" badgeSize="lg">
                    Contact for Business
                    <ArrowRight className="w-4 h-4" />
                  </MatchedOutlineButton>
                }
              />
              <p className="text-xs text-muted-foreground">
                Subscribe to CASER Pro inside the app after download.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
