'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Gavel,
  CourthouseClock,
  LegalDocument,
  LegalBriefChart,
  BrainScales,
  DollarDocument,
  LegalSeal,
} from '@/components/ui/icons';
import { CheckCircle, Shield, Star, Zap } from 'lucide-react';

/** Feature overview tabs — restored from 7e4a743 (2026-03-28). */
export default function FeatureTabsOverview() {
  return (
    <Tabs defaultValue="ai" className="max-w-6xl mx-auto">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
        <TabsTrigger value="ai" className="min-h-11 whitespace-normal">AI Assistant</TabsTrigger>
        <TabsTrigger value="monitoring" className="min-h-11 whitespace-normal">Monitoring</TabsTrigger>
        <TabsTrigger value="security" className="min-h-11 whitespace-normal">Security</TabsTrigger>
        <TabsTrigger value="analytics" className="min-h-11 whitespace-normal">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="monitoring" className="mt-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Federal Court Feed Monitoring</CardTitle>
                <CardDescription>
                  Search 300+ public federal court feeds, including court RSS and GovInfo opinions. Feed availability and retention vary; this is not a complete docket archive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Federal District Courts</div>
                      <div className="text-sm text-muted-foreground">Participating district court feeds</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Bankruptcy Courts</div>
                      <div className="text-sm text-muted-foreground">Available bankruptcy court feeds</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Appellate Courts</div>
                      <div className="text-sm text-muted-foreground">Participating federal circuit feeds</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Gavel className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Keyword Alert System</CardTitle>
                <CardDescription>
                  Find relevant matches when CASER checks available feeds. Background checks depend on iOS scheduling; delivery times are not guaranteed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">On-device Notifications</div>
                      <div className="text-sm text-muted-foreground">Alerts after a completed scan</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">In-app Match History</div>
                      <div className="text-sm text-muted-foreground">Review matched titles and source links</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Custom Filters</div>
                      <div className="text-sm text-muted-foreground">Alert only what matters</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Image src="/search.png?v=2" alt="Search & Monitoring" width={1070} height={2149} className="max-w-sm w-full h-auto" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="mt-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <LegalBriefChart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Cost Savings Analytics</CardTitle>
                <CardDescription>
                  Track and optimize your PACER cost savings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Savings Reports</div>
                      <div className="text-sm text-muted-foreground">Illustrative quarterly fee estimates</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Usage Statistics</div>
                      <div className="text-sm text-muted-foreground">Detailed activity metrics</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">PACER Cost Comparison</div>
                      <div className="text-sm text-muted-foreground">Estimates based on stated assumptions</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarDocument className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Activity Monitoring</CardTitle>
                <CardDescription>
                  Comprehensive insights into your docket monitoring activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Monitor Status</div>
                      <div className="text-sm text-muted-foreground">Active tracking overview</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Alert History</div>
                      <div className="text-sm text-muted-foreground">Recent matched feed entries</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Scan Status</div>
                      <div className="text-sm text-muted-foreground">Check recent scan activity</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Image src="/dashboard.png?v=2" alt="Analytics Dashboard" width={1070} height={2149} className="max-w-sm w-full h-auto" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="security" className="mt-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <LegalSeal className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Device Security</CardTitle>
                <CardDescription>
                  iOS data protection, secure storage, and optional app locking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Protected Local Storage</div>
                      <div className="text-sm text-muted-foreground">iOS data protection and Keychain</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Secure Data Transmission</div>
                      <div className="text-sm text-muted-foreground">HTTPS connections to supported services</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Privacy-First Design</div>
                      <div className="text-sm text-muted-foreground">Local history; AI requests processed by Google</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <LegalDocument className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Sources & Verification</CardTitle>
                <CardDescription>
                  Review official records and verify AI-assisted research before relying on it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Official Source Links</div>
                      <div className="text-sm text-muted-foreground">Links to court and GovInfo records</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Verification Required</div>
                      <div className="text-sm text-muted-foreground">Source confirmation</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Local Activity History</div>
                      <div className="text-sm text-muted-foreground">Recent activity stored on your device</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Image src="/security-screen.png?v=2" alt="CASER Security" width={1070} height={2149} className="max-w-sm w-full h-auto" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="ai" className="mt-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BrainScales className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Atticus AI Assistant</CardTitle>
              <CardDescription className="text-lg">
                Your intelligent legal research companion powered by advanced AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">Research Capabilities</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span>Legal concept research and analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span>Case law precedent identification</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span>Statutory interpretation assistance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span>Regulatory compliance guidance</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Professional Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Legal terminology definitions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Case summary assistance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Cross-reference analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Neutral information provider</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Important:</strong> Atticus is a research assistant providing neutral legal information. 
                  This is not legal advice. Always consult with qualified legal counsel for specific matters.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center lg:justify-start">
            <Image src="/ai.png?v=2" alt="Atticus AI Assistant" width={1070} height={2149} className="max-w-sm w-full h-auto" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
