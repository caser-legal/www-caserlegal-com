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
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight route-title" suppressHydrationWarning>
              Comprehensive Court Monitoring
              <span className="text-primary"> for Everyone</span>
            </h1>
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
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Feature Overview
            </h2>
          </div>

          <FeatureTabsOverview />
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Technical Specifications
            </h2>
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
                  <span className="text-sm">Dedicated iPad app</span>
                  <PlatformStatusBadge status="planned" />
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
                  <span className="text-sm font-medium">~5 min while active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Search Speed</span>
                  <span className="text-sm font-medium">Source-dependent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Background Checks</span>
                  <span className="text-sm font-medium">Scheduled by iOS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Feed Retention</span>
                  <span className="text-sm font-medium">Varies by court</span>
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
                  <Badge variant="secondary">Source links</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">PDF Export</span>
                  <Badge variant="secondary">Supported</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Access</span>
                  <Badge variant="outline">By request</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SSO</span>
                  <Badge variant="outline">By request</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Transform Your Court Monitoring?
            </h2>
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
