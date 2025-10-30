'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ScalesOfJustice, 
  Gavel, 
  CourthouseClock, 
  LegalDocument,
  LegalBriefChart,
  KeyDocument,
  BrainScales,
  DollarDocument,
  LegalSeal,
  MagnifyingGlassLegal,
  ContactDocument,
  LegalBookSearch
} from '@/components/ui/icons';
import { CheckCircle, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/logo-full.png" alt="CASER" className="h-11" />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link href="/features" className="text-sm font-medium text-primary">Features</Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
              <Link href="/download" className="text-sm font-medium hover:text-primary transition-colors">Download</Link>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">
                Contact
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit">
              <ScalesOfJustice className="w-3 h-3 mr-2" />
              Professional Features
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Comprehensive Court Monitoring
              <span className="text-primary"> for Legal Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Engineered with precision for litigation teams, paralegals, and legal operations professionals. 
              Every feature designed to eliminate inefficiency and maximize competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/pricing">
                  View Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Contact App
                </Link>
              </Button>
            </div>
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

          <Tabs defaultValue="ai" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <CourthouseClock className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Real-Time Court Monitoring</CardTitle>
                      <CardDescription>
                        Monitor 175+ U.S. Courts with near real-time docket updates
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

                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Gavel className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Instant Alert System</CardTitle>
                      <CardDescription>
                        Receive immediate notifications for relevant court filings
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
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-muted-foreground">Detailed filing summaries</div>
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

                <div className="flex justify-center lg:justify-end">
                  <img src="/search.png" alt="Search & Monitoring" className="max-w-md w-full h-auto" />
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

                <div className="flex justify-center lg:justify-end">
                  <img src="/dashboard.png" alt="Analytics Dashboard" className="max-w-md w-full h-auto" />
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

                  <Card>
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

                <div className="flex justify-center lg:justify-end">
                  <img src="/security-screen.png" alt="CASER Security" className="max-w-md w-full h-auto" />
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
                            <span>Document summarization</span>
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

                <div className="flex justify-center lg:justify-end">
                  <img src="/ai.png" alt="Atticus AI Assistant" className="max-w-md w-full h-auto" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
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

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">iOS</span>
                  <Badge variant="secondary">Waitlist</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">iPadOS</span>
                  <Badge variant="secondary">Waitlist</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">macOS</span>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Web</span>
                  <Badge variant="outline">Coming Soon</Badge>
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
                  <span className="text-sm font-medium">Real-time</span>
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
                  <span className="text-sm font-medium">&lt; 1000 seconds</span>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact CASER
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">
                  Compare Plans
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-1">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <img src="/logo-icon.png" alt="CASER" className="h-12" />
              </div>
              <p className="text-sm text-muted-foreground">
                Court Automated Search of Electronic Records
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Website: www.caserlegal.com</li>
                <li>Available on iOS</li>
                <li>MacOS and Web coming soon</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 CASER. All rights reserved. Supporting independent developers in legal technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}