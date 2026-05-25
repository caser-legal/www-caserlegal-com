'use client';

import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import Image from 'next/image';
import { DownloadButton, AppStoreBadgeLink } from '@/components/AppStoreLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Gavel,
  CourthouseClock,
  DollarDocument,
  Shield,
  LegalDocument,
  Smartphone,
} from '@/components/ui/icons';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              Available on the App Store
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Download CASER
              <span className="text-primary"> for iOS</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Monitor 300+ U.S. federal court feeds. Search filings, set keyword alerts, and upgrade
              to CASER Pro ($19.99/year) inside the app after download.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <DownloadButton size="lg" label="Download on the App Store" />
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
            <AppStoreBadgeLink className="mx-auto" />
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Subscribe to CASER Pro inside the app after download. Purchases are billed through your
              Apple ID.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <CourthouseClock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Court search &amp; alerts</h3>
                    <p className="text-muted-foreground">
                      Search federal district and bankruptcy filings. Keyword alerts with push
                      notifications (scans run approximately every 5 minutes while the app is active).
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarDocument className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">PACER savings tracker</h3>
                    <p className="text-muted-foreground">
                      No per-search fees in CASER. Pay PACER only when you open document links. Track
                      hypothetical savings vs PACER search-result pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Atticus AI (CASER Pro)</h3>
                    <p className="text-muted-foreground">
                      AI legal research assistant powered by Gemini. Not legal advice — for research
                      and education only. Included with CASER Pro.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <LegalDocument className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">PDF export</h3>
                    <p className="text-muted-foreground">
                      Export search results and case details as PDF with a legal-brief style layout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/screenshot-3.png"
                alt="CASER App Screenshot"
                width={1070}
                height={2149}
                className="max-w-sm w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">System Requirements</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-primary" />
                <CardTitle>iPhone &amp; iPad</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">iOS Version</span>
                <Badge variant="secondary">iOS 26.0+</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Account</span>
                <Badge variant="secondary">No account required</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">PACER account</span>
                <Badge variant="secondary">Optional for documents</Badge>
              </div>
              <p className="text-sm text-muted-foreground pt-4 border-t">
                Free tier: 1 search (lifetime), 1 keyword alert, 5 saved cases. CASER Pro unlocks
                unlimited search, alerts, saves, and Atticus AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Download CASER from the App Store. Need Business or Enterprise?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
            .
          </p>
          <DownloadButton size="lg" label="Download" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
