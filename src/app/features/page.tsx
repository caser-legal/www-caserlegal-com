import PageShell from '@/components/PageShell';
import FeatureTabsOverview from '@/components/FeatureTabsOverview';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlatformStatusBadge } from '@/components/PlatformStatusBadge';
import { Scale } from 'lucide-react';
export default function FeaturesPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mx-auto gap-1.5">
              <Scale className="w-3 h-3 shrink-0" aria-hidden />
              Professional Features
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight" suppressHydrationWarning>
              Comprehensive Court Monitoring
              <span className="text-primary"> for Legal Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Engineered with precision for litigation teams, paralegals, and legal operations professionals. 
              Every feature designed to eliminate inefficiency and maximize competitive advantage.
            </p>
            <AppStoreCtaRow
              badgeSize="lg"
              className="justify-center"
              secondary={
                <MatchedOutlineButton href="/pricing" badgeSize="lg">
                  View Pricing
                </MatchedOutlineButton>
              }
            />
          </div>
        </div>
      </section>

      {/* Core Features Tabs */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Feature Overview
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the comprehensive capabilities that make CASER the preferred choice 
              for legal professionals across law firms and legal practices.
            </p>
          </div>

          <FeatureTabsOverview />
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Technical Specifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technology to ensure reliability, performance, and security
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-6 sm:gap-x-10 md:gap-x-14 gap-y-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">iOS</span>
                  <PlatformStatusBadge status="available" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">iPadOS</span>
                  <PlatformStatusBadge status="available" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">macOS</span>
                  <PlatformStatusBadge status="planned" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Web</span>
                  <PlatformStatusBadge status="planned" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Update Frequency</span>
                  <span className="text-sm font-medium">~5 min scans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-medium">Instant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Uptime</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Freshness</span>
                  <span className="text-sm font-medium">&lt; 1,000 seconds</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">PACER</span>
                  <Badge variant="secondary">Integrated</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">PDF Export</span>
                  <Badge variant="secondary">Supported</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Access</span>
                  <Badge variant="outline">Enterprise</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SSO</span>
                  <Badge variant="outline">Enterprise</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Transform Your Court Monitoring?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of legal professionals who have already elevated their practice 
              with CASER's professional-grade court monitoring capabilities.
            </p>
            <AppStoreCtaRow
              badgeSize="lg"
              className="justify-center"
              secondary={
                <MatchedOutlineButton href="/contact" badgeSize="lg">
                  Business &amp; Enterprise
                </MatchedOutlineButton>
              }
            />
          </div>
        </div>
      </section>

    </PageShell>
  );
}
