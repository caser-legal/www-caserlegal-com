'use client';

import PageShell from '@/components/PageShell';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ScalesOfJustice,
  CourthouseClock,
  ProfessionalBriefcase,
  BrainScales,
} from '@/components/ui/icons';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageShell>
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight route-title">
              Built inside a real
              <span className="text-primary"> federal case</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold">
              How CASER Was Born
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="route-card p-8">
              <CardContent className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Federal court is terrifying, especially Pro Se. You never know when the next filing is
                  coming. Maybe it&apos;s a motion to dismiss. Maybe it&apos;s a deadline. Maybe it&apos;s a
                  default judgment. You find out what work needs to be done when the letter shows up,
                  days or even a week after it was filed.
                </p>
                <p>
                  Court RSS feeds don&apos;t help much. Filings scroll off within a short window, so unless
                  you&apos;re refreshing the page for months between filings, you miss what just happened
                  in your own case. And PACER charges 10 cents a page, search results included, for cases
                  you often weren&apos;t even looking for.
                </p>
                <p>
                  I lived this in my own federal case. So I built a tool in Automator to watch it for me.
                </p>
                <p className="text-primary font-semibold text-xl">
                  That tool became CASER.
                </p>
                <p>
                  It kept growing: search across 400+ federal court feeds, an archive that keeps filings
                  after they leave the feed, alerts, and PACER cost tracking. In October 2026 I rebuilt
                  the case page around Meta Muse. Now you open any filing and Atticus builds the whole
                  page for you, with a timeline, who&apos;s who and every source it used.
                </p>
                <p>
                  Court records have always been public. CASER is how I keep them that way: built by
                  someone who lived the problem, for everyone who faces it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            <Card className="text-center flex flex-col h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ScalesOfJustice className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Lived experience</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  CASER began after navigating federal courts Pro Se—when PACER made it hard to know
                  what changed on a docket. We build for people who have lived that problem.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center flex flex-col h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BrainScales className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Practical engineering</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  CASER started as an Automator workflow watching one case. It grew into an iOS app
                  on the App Store, built one real need at a time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center flex flex-col h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Open access</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Search federal court feeds without a PACER account. Once a public case page is built,
                  the next person who opens that case gets it instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center flex flex-col h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Honest economics</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  CASER Pro is $14.99 per year with clear limits on the free tier—no surprise search
                  bills from hunting filings across hundreds of courts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Understand any federal case, without the PACER bill
              </h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>400+ U.S. federal court feeds monitored</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Case pages built by Atticus, powered by Meta Muse</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>A 30-day archive of filings that left the feed</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-2xl border">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">$0</div>
                    <div className="text-sm text-muted-foreground">Per-search fees inside CASER</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">400+</div>
                    <div className="text-sm text-muted-foreground leading-snug">Federal U.S.</div>
                    <div className="text-sm text-muted-foreground leading-snug">Court feeds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">$14.99</div>
                    <div className="text-sm text-muted-foreground">Annual CASER Pro subscription</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Join the Future of Legal Technology
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/download">
                  Download CASER
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/careers#open-positions">
                  Apply Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
