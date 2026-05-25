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
      <section className="relative pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <ScalesOfJustice className="w-3 h-3 mr-2" />
              About CASER
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Pioneering Legal Technology
              <span className="text-primary"> for Modern Practice</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Born from firsthand experience navigating the federal court system, 
              CASER represents the culmination of extensive research into the evolving needs 
              of modern litigation teams and legal operations professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold">
              How CASER Was Born
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A personal journey through the federal court system that sparked a technological revolution.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
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
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at CASER
            </p>
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
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Our Mission: Democratizing Access to Court Intelligence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that every legal professional deserves access to real-time court docket 
                intelligence without the prohibitive costs and inefficiencies of traditional PACER research.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CASER was engineered to eliminate the billions of dollars wasted annually on 
                unnecessary PACER searches while providing the critical court monitoring capabilities 
                that modern litigation demands.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>300+ U.S. federal court feeds monitored</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Thousands saved annually per user</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Enterprise-grade security and privacy</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-2xl border">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">$2.3B+</div>
                    <div className="text-sm text-muted-foreground">Wasted annually on PACER searches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">300+</div>
                    <div className="text-sm text-muted-foreground leading-snug">Federal U.S.</div>
                    <div className="text-sm text-muted-foreground leading-snug">Courts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Legal professionals served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Join the Future of Legal Technology
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the power of professional-grade court monitoring designed by 
              legal professionals, for legal professionals.
            </p>
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