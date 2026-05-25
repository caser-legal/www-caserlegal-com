import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ProfessionalBriefcase,
  CourthouseClock,
  LegalSeal,
} from '@/components/ui/icons';
import { CheckCircle } from 'lucide-react';
import { DownloadButton } from '@/components/AppStoreLink';

const FREE_FEATURES = [
  '1 case search (lifetime)',
  '1 keyword alert',
  '5 saved cases',
  'Federal court RSS search',
  'Direct PACER document links',
  'PACER savings tracker',
];

const PRO_FEATURES = [
  'Unlimited searches',
  'Unlimited keyword alerts',
  'Unlimited saved cases',
  'Atticus AI legal assistant',
  'Push notifications for matches',
  'PDF export (legal brief layout)',
];

const BUSINESS_FEATURES = [
  'Multi-attorney firm workflows',
  'Priority onboarding & training',
  'Custom alert workflows',
  'Dedicated account contact',
  'Volume licensing options',
];

const ENTERPRISE_FEATURES = [
  'Enterprise volume licensing',
  'Custom integrations & data services',
  'Dedicated support & SLA options',
  'White-label & API discussions',
  'On-premise / compliance consulting',
];

export default function PricingTiers() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <Card className="relative border-primary shadow-lg md:scale-105">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">
            Individual — App Store
          </Badge>
        </div>
        <CardHeader className="text-center pb-6 pt-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <ProfessionalBriefcase className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">CASER Pro</CardTitle>
          <CardDescription className="text-base">
            Download free on the App Store. Upgrade to Pro inside the app.
          </CardDescription>
          <div className="mt-6 space-y-2">
            <div>
              <div className="text-2xl font-bold">Free</div>
              <div className="text-sm text-muted-foreground">to get started</div>
            </div>
            <div className="text-muted-foreground">or</div>
            <div>
              <div className="text-4xl font-bold text-primary">$19.99</div>
              <div className="text-muted-foreground">per year (CASER Pro)</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Free tier</p>
            <div className="space-y-2">
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">CASER Pro</p>
            <div className="space-y-2">
              {PRO_FEATURES.map((f) => (
                <div key={f} className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <DownloadButton className="w-full" size="lg" label="Download on the App Store" />
          <p className="text-xs text-muted-foreground text-center">
            Subscribe to CASER Pro inside the app after download. Billed through your Apple ID.
          </p>
        </CardContent>
      </Card>

      <Card className="relative">
        <CardHeader className="text-center pb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CourthouseClock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Business</CardTitle>
          <CardDescription className="text-base">
            For mid-sized firms and legal departments
          </CardDescription>
          <div className="mt-6">
            <div className="text-4xl font-bold">Custom</div>
            <div className="text-muted-foreground">contact sales</div>
          </div>
          <Badge variant="secondary" className="mt-4">Contact sales</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {BUSINESS_FEATURES.map((f) => (
              <div key={f} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
          <Button className="w-full" size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="relative">
        <CardHeader className="text-center pb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <LegalSeal className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Enterprise</CardTitle>
          <CardDescription className="text-base">
            Large organizations and custom deployments
          </CardDescription>
          <div className="mt-6">
            <div className="text-4xl font-bold">Custom</div>
            <div className="text-muted-foreground">contact sales</div>
          </div>
          <Badge variant="outline" className="mt-4">Enterprise</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {ENTERPRISE_FEATURES.map((f) => (
              <div key={f} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Custom pricing and tailored solutions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
