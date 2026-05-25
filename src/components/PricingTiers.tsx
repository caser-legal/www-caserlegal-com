import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CARD_ACTION_CLASS } from '@/components/ContactCard';
import { CourthouseClock, LegalSeal } from '@/components/ui/icons';
import { CheckCircle } from 'lucide-react';
import { AppStoreBadge } from '@/components/AppStoreLink';
import {
  FREE_FEATURES,
  PRO_FEATURES,
  BUSINESS_FEATURES,
  ENTERPRISE_FEATURES,
} from '@/lib/pricing-features';

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((text) => (
        <li key={text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function IndividualPricing() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-primary uppercase tracking-wide">Individual · iOS</p>
        <h2 className="text-2xl lg:text-3xl font-bold">Download free, upgrade in the app</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm lg:text-base">
          CASER is on the App Store. Start on the free tier, then subscribe to CASER Pro inside
          the app when you need more capacity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <Card className="flex flex-col h-full border-border/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Free</CardTitle>
            <CardDescription>Try federal court monitoring at no cost</CardDescription>
            <div className="pt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">$0</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">No subscription required</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 pt-0">
            <FeatureList items={FREE_FEATURES} />
            <p className="text-xs text-muted-foreground mt-6 pt-4 border-t">
              Lifetime limits apply to searches and alerts as listed above.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full border-primary shadow-md relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground px-3 py-0.5 text-xs">
              Recommended
            </Badge>
          </div>
          <CardHeader className="pb-4 pt-2">
            <CardTitle className="text-xl">CASER Pro</CardTitle>
            <CardDescription>Full monitoring and Atticus AI for one year</CardDescription>
            <div className="pt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-primary">$14.99</span>
                <span className="text-muted-foreground text-sm font-medium">/ year</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Subscribed in-app · billed through your Apple ID
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 pt-0">
            <p className="text-xs font-medium text-foreground mb-3">Includes everything in Free, plus:</p>
            <FeatureList items={PRO_FEATURES} />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-lg border bg-muted/30 px-6 py-8">
        <AppStoreBadge size="md" />
        <p className="text-sm text-muted-foreground text-center max-w-md leading-relaxed">
          Download CASER on the App Store. CASER Pro is purchased inside the app after install;
          Apple handles renewal and cancellation in your subscription settings.
        </p>
      </div>
    </div>
  );
}

export default function PricingTiers() {
  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      <IndividualPricing />

      <div className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Firms &amp; organizations
          </p>
          <h2 className="text-2xl font-bold">Business and Enterprise</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Volume licensing, custom workflows, and integrations — priced per engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-14 gap-y-8 items-stretch">
          <Card className="relative flex flex-col h-full">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CourthouseClock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Business</CardTitle>
              <CardDescription className="text-base min-h-[3.25rem] flex items-center justify-center">
                <span>
                  Firm workflows and volume licensing
                  <span className="block">for mid-sized teams</span>
                </span>
              </CardDescription>
              <div className="mt-4">
                <div className="text-4xl font-bold">Custom</div>
                <p className="text-sm text-muted-foreground mt-1">Contact for quote</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 flex flex-col flex-1 pt-0">
              <div className="space-y-3 flex-1">
                {BUSINESS_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <Button className={CARD_ACTION_CLASS} variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="relative flex flex-col h-full">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <LegalSeal className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription className="text-base min-h-[3.25rem] flex items-center justify-center">
                <span>
                  Custom integrations and deployments
                  <span className="block">for large organizations</span>
                </span>
              </CardDescription>
              <div className="mt-4">
                <div className="text-4xl font-bold">Custom</div>
                <p className="text-sm text-muted-foreground mt-1">Contact for quote</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 flex flex-col flex-1 pt-0">
              <div className="space-y-3 flex-1">
                {ENTERPRISE_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className={CARD_ACTION_CLASS} asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
