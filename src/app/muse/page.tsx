import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { buildPageMetadata } from '@/lib/site-metadata';
import MuseLockup from '@/components/MuseLockup';

const MUSE_APP_STORE = 'https://muse.ai/';



export const metadata: Metadata = buildPageMetadata({
  title: 'CASER × Muse',
  description:
    'CASER federal case search on Muse. Ask for a party, keyword, or case title across 400+ U.S. federal courts. Search only. No PACER account and no legal advice.',
  path: '/muse',
});

const steps = [
  {
    n: '01',
    title: 'Ask CASER',
    body: 'A party, keyword, or case title starts the search. State, court type, and a date window can narrow it. The default window is the last 30 days.',
  },
  {
    n: '02',
    title: 'CASER searches',
    body: 'CASER searches 400+ U.S. federal courts, including bankruptcy and appellate, the same way case search works in the app.',
  },
  {
    n: '03',
    title: 'Filings come back',
    body: 'Each match includes the court, date, a short description, and a direct link.',
  },
];

export default function MusePage() {
  return (
    <PageShell mainUnpadded>
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
            <div className="space-y-4">
                <MuseLockup />
                <p className="text-xl text-muted-foreground leading-relaxed">
                  CASER is a Muse connector from Meta. A party, keyword, or case title
                  comes back with the court, the date, and a direct link.
                </p>
              </div>
              <AppStoreCtaRow
                badgeSize="lg"
                secondary={
                  <MatchedOutlineButton href={MUSE_APP_STORE} badgeSize="lg" internal={false}>
                    <img src="/muse/meta.svg" alt="" className="h-4 w-4" />
                    Download Muse
                  </MatchedOutlineButton>
                }
              />
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/muse/jolly-laptop.png"
                alt="Muse’s mascot at a laptop"
                width={518}
                height={520}
                priority
                className="w-full max-w-md h-auto rounded-3xl bg-muted"
              />
            </div>
            </div>
          </div>
      </section>

      <section id="how" className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">How CASER on Muse works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => (
              <Card key={step.n}>
                <CardHeader>
                  <p className="text-sm font-medium text-muted-foreground">{step.n}</p>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{step.body}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="/muse/jolly.png"
                alt="Muse’s mascot"
                width={420}
                height={420}
                className="w-full max-w-sm h-auto rounded-3xl bg-muted"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">What comes back</h2>
              <ul className="space-y-3 text-sm">
                {[
                  'District, bankruptcy, and appellate filings',
                  'Court, date, and a short description',
                  'A direct link when CASER has one',
                  'State, court type, and a date window when the search needs them',
                  'The same case search as the iPhone app',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                CASER on iPhone is at{' '}
                <Link href="/download" className="underline underline-offset-4">
                  Download
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
