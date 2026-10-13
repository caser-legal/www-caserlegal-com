'use client';

import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import { CONTACT_EMAIL, mailto } from '@/lib/contact-email';
import { supportFaqPreview, supportNav } from '@/lib/support-docs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DownloadDocument,
  LegalBookSearch,
  Mail,
  ProfessionalBriefcase,
  Gavel,
} from '@/components/ui/icons';
import { ArrowRight, HelpCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <PageShell>
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight route-title">
              CASER Support
              <span className="text-primary"> for iOS</span>
            </h1>
            <AppStoreCtaRow
              badgeSize="lg"
              className="justify-center"
              secondary={
                <MatchedOutlineButton href={mailto({ subject: 'CASER Support' })} badgeSize="lg" internal={false}>
                  Contact Support
                </MatchedOutlineButton>
              }
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Start here</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DownloadDocument className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Install, permissions, and your first search</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/support/getting-started">
                    Read guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <LegalBookSearch className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>User Guide</CardTitle>
                <CardDescription>Complete overview of every major feature</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/support/user-guide">
                    Read guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Common issues and fixes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/support/troubleshooting">
                    View solutions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="documentation" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Documentation</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {supportNav.map((item) => (
              <Card key={item.path} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={item.path}>
                      Read guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {supportFaqPreview.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-border bg-background px-4 py-3"
              >
                <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-muted-foreground text-sm group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed pb-1">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Contact support</h2>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Typically 24–48 hour response</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium">{CONTACT_EMAIL}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={mailto({ subject: 'CASER Support' })}>Send Email</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">More resources</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Get CASER on the App Store</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/download">Download</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Free tier and CASER Pro</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-center gap-2">
                  <Gavel className="w-4 h-4 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">How we protect your data</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/security-policy">Security Policy</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Bugs, ideas, or feature requests</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={mailto({ subject: 'CASER Feedback' })}>Send feedback</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
