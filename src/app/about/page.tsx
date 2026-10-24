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
      {/* Hero Section */}
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight route-title">
              Pioneering Legal Technology
              <span className="text-primary"> for Modern Practice</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
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
                  It started with countless nights studying law, drafting page after page of documents,
                  navigating the federal court system Pro Se for the very first time. The complexity
                  was overwhelming, but the real challenge came after filing.
                </p>
                <p>
                  What happens next? How do you monitor your case? How do you know when something changes?
                  The PACER system was expensive, confusing, and seemed designed to keep people out rather
                  than provide access to justice.
                </p>
                <p>
                  That's when the idea sparked: if the system won't work for regular people, maybe
                  technology could bridge that gap. So I started learning to code—because I needed
                  solutions to problems that didn't exist yet.
                </p>
                <p className="text-primary font-semibold text-xl">
                  And so, CASER was born.
                </p>
                <p>
                  What began as a personal tool to monitor a single case evolved into a platform that
                  can now serve thousands of legal professionals, Pro Se litigants, and anyone who believes
                  that access to court information shouldn't require a law degree to navigate.
                </p>
                <p>
                  CASER represents more than just technology—it's proof that when the system fails,
                  innovation can succeed. It's a solution built by someone who lived the problem,
                  for everyone who faces the same challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
                  The founder learned to code to solve real monitoring needs. The iOS app ships on the
                  App Store—focused tools, not buzzwords.
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
                  Monitor federal court feeds without a PACER account for in-app search. Open documents
                  on PACER only when you choose—public docket data stays reachable.
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

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Our Mission: Democratizing Access to Court Intelligence
              </h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>400+ U.S. federal court feeds monitored</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Potential PACER savings based on your usage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Protected local storage and optional app lock</span>
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

      {/* CTA Section */}
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
