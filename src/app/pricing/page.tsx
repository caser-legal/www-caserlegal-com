'use client';

import PageShell from '@/components/PageShell';
import PricingTiers from '@/components/PricingTiers';
import PacerSavingsCalculator from '@/components/PacerSavingsCalculator';

export default function PricingPage() {
  return (
    <PageShell>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-center text-3xl lg:text-4xl font-bold">PACER Savings Calculator</h2>
          <PacerSavingsCalculator />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTiers />
        </div>
      </section>

    </PageShell>
  );
}
