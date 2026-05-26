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
import { CheckCircle, Shield, Zap } from 'lucide-react';

const TAB_CONTENT_CLASS = 'mt-12';
const TAB_PANEL_GRID =
  'grid lg:grid-cols-2 gap-8 items-stretch lg:min-h-[42rem]';
const TAB_CARDS_COLUMN = 'grid gap-6 auto-rows-fr min-h-0';

export default function FeatureTabsOverview() {
  return (
          <Tabs defaultValue="ai" className="max-w-6xl mx-auto w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 sm:grid-cols-4 h-auto [&>button]:min-h-10">
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring" className={TAB_CONTENT_CLASS}>
              <div className={TAB_PANEL_GRID}>
                <div className={TAB_CARDS_COLUMN}>
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <CourthouseClock className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Court search &amp; monitoring</CardTitle>
                      <CardDescription>
                        Monitor 300+ U.S. federal court feeds via RSS-based search
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Federal District Courts</div>
                            <div className="text-sm text-muted-foreground">All 94 federal districts</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Bankruptcy Courts</div>
                            <div className="text-sm text-muted-foreground">Complete bankruptcy coverage</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Appellate Courts</div>
                            <div className="text-sm text-muted-foreground">Circuit and Supreme Court</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Gavel className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Keyword alerts</CardTitle>
                      <CardDescription>
                        Push notifications when filings match your keywords (~5 min scan cadence)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Push Notifications</div>
                            <div className="text-sm text-muted-foreground">Real-time mobile alerts</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Saved cases</div>
                            <div className="text-sm text-muted-foreground">Up to 5 free; unlimited with Pro</div>
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
                  <Image src="/search.png" alt="Search & Monitoring" width={1070} height={2149} className="max-w-sm w-full h-auto" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className={TAB_CONTENT_CLASS}>
              <div className={TAB_PANEL_GRID}>
                <div className={TAB_CARDS_COLUMN}>
                  <Card className="flex flex-col h-full">
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
                            <div className="text-sm text-muted-foreground">Monthly cost analysis</div>
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
                            <div className="font-medium">ROI Tracking</div>
                            <div className="text-sm text-muted-foreground">Investment return analysis</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col h-full">
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
                            <div className="text-sm text-muted-foreground">Complete notification log</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Performance Metrics</div>
                            <div className="text-sm text-muted-foreground">System efficiency data</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <Image src="/dashboard.png" alt="Analytics Dashboard" width={1070} height={2149} className="max-w-sm w-full h-auto" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className={TAB_CONTENT_CLASS}>
              <div className={TAB_PANEL_GRID}>
                <div className={TAB_CARDS_COLUMN}>
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <LegalSeal className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Enterprise Security</CardTitle>
                      <CardDescription>
                        Bank-grade security for your sensitive legal data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">End-to-End Encryption</div>
                            <div className="text-sm text-muted-foreground">AES-256 encryption</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Secure Data Transmission</div>
                            <div className="text-sm text-muted-foreground">TLS 1.3 protocols</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Privacy-First Design</div>
                            <div className="text-sm text-muted-foreground">No data sharing</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <LegalDocument className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Compliance & Verification</CardTitle>
                      <CardDescription>
                        Maintain compliance with legal industry standards
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Official Source Links</div>
                            <div className="text-sm text-muted-foreground">Direct PACER integration</div>
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
                            <div className="font-medium">Audit Trail</div>
                            <div className="text-sm text-muted-foreground">Complete activity logging</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <Image src="/security-screen.png" alt="CASER Security" width={1070} height={2149} className="max-w-sm w-full h-auto" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai" className={TAB_CONTENT_CLASS}>
              <div className={TAB_PANEL_GRID}>
                <div className={TAB_CARDS_COLUMN}>
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <BrainScales className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Atticus AI Assistant</CardTitle>
                      <CardDescription>
                        Included with CASER Pro — powered by Google Gemini (not legal advice)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">Legal concept research</div>
                            <div className="text-sm text-muted-foreground">Analysis and explanation</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">Case law precedent</div>
                            <div className="text-sm text-muted-foreground">Identification and context</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">Statutory interpretation</div>
                            <div className="text-sm text-muted-foreground">Guidance on relevant statutes</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Professional Features</CardTitle>
                      <CardDescription>
                        Research tools built for legal workflows
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">Legal terminology</div>
                            <div className="text-sm text-muted-foreground">Definitions and plain-language context</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">Document summarization</div>
                            <div className="text-sm text-muted-foreground">Faster review of filings</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 pt-2">
                        Atticus provides neutral legal information, not legal advice. Consult qualified
                        counsel for specific matters.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center lg:justify-start items-start">
                  <Image src="/ai.png" alt="Atticus AI Assistant" width={1070} height={2149} className="max-w-sm w-full h-auto" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
  );
}
