'use client';

import PageShell from '@/components/PageShell';
import Image from 'next/image';
import PACERCalculator from '@/components/PACERCalculator';
import { DownloadButton } from '@/components/AppStoreLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CourthouseClock,
  LegalBriefChart,
  KeyDocument,
  BrainScales,
  DollarDocument,
  LegalSeal,
  ProfessionalBriefcase,
  DownloadDocument,
  LegalBookSearch,
} from '@/components/ui/icons';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

export default function Home() {
  return (
    <PageShell mainUnpadded>
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">
                  <Image
                    src="https://www.gstatic.com/marketing-cms/assets/images/29/8c/e1f2c0994e87b8d7edf2886f9c02/google-cloud.webp=s48-fcrop64=1,00000000ffffffff-rw"
                    alt="Google Cloud"
                    width={12}
                    height={12}
                    className="w-3 h-3 mr-2 rounded"
                  />
                  Google Backed & Trusted Technology
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Case Automated Search of
                  <span className="text-primary"> Electronic Records</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Monitor 300+ U.S. federal court feeds. Eliminate wasteful PACER search fees.
                  Push alerts for keyword matches with direct document links. No PACER account required.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <DownloadButton size="lg" className="text-lg px-8 py-6 h-auto" label="Download on the App Store" />
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <a href="#features">
                    <LegalBookSearch className="w-5 h-5 mr-2" />
                    Learn More
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{formatNumber(300)}+</div>
                  <div className="text-sm text-muted-foreground">U.S. Courts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">Push</div>
                  <div className="text-sm text-muted-foreground">Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$0</div>
                  <div className="text-sm text-muted-foreground">Search Fees</div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <Image
                src="/screenshot-5.png"
                alt="CASER App Interface"
                width={1070}
                height={2149}
                className="max-w-sm w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Professional-Grade Court Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Engineered for litigation teams, paralegals, and legal operations professionals 
              who require precision, efficiency, and competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Court monitoring &amp; push alerts</CardTitle>
                <CardDescription>
                  Push notifications when filings match your keywords across 300+ federal court feeds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Federal courts coverage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Bankruptcy courts included
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Custom keyword alerts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarDocument className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Eliminate PACER Waste</CardTitle>
                <CardDescription>
                  Save thousands annually by paying only for relevant documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Zero search fees
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Direct document links
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Cost tracking analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <LegalSeal className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Professional Security</CardTitle>
                <CardDescription>
                  Enterprise-grade security with complete privacy protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    No PACER account required
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Secure data transmission
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Privacy-first design
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <LegalBriefChart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Comprehensive insights into your docket monitoring activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Usage statistics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Cost savings reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Activity monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <KeyDocument className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Direct Document Access</CardTitle>
                <CardDescription>
                  Instant access to court documents through verified PACER links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    One-click document viewing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    PDF export capabilities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Document organization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BrainScales className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Atticus AI (CASER Pro)</CardTitle>
                <CardDescription>
                  Gemini-powered legal research assistant — not legal advice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Legal concept research
                    </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Term definitions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-foreground mr-2" />
                    Neutral information provider
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section id="showcase" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Experience Professional Court Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Designed for legal professionals who demand precision, efficiency, and results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Intelligent Search & Monitoring</h3>
                    <p className="text-muted-foreground">
                      Advanced keyword matching with exact match and case-sensitive options. 
                      Monitor specific cases, parties, or legal concepts across all supported courts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Push alert system</h3>
                    <p className="text-muted-foreground">
                      Push notifications when new filings match your keywords (scans run about every
                      5 minutes). Includes direct PACER links for document access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Comprehensive Dashboard</h3>
                    <p className="text-muted-foreground">
                      Monitor active cases, track cost savings, and manage all your 
                      docket intelligence from a single, professional interface.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">Professional Disclaimer</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  CASER monitors publicly available court docket information and provides 
                  links to PACER for detailed review. This is a research tool, not legal advice. 
                  Verify all information through official court sources.
                </p>
              </div>
            </div>

            <PACERCalculator />
          </div>
        </div>
      </section>

      {/* PACER Problem Section */}
      <section id="pacer-problem" className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              The PACER Problem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              How systemic barriers in federal court access create inequity—and how CASER provides the solution.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-muted/50 border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                <p className="text-muted-foreground mb-4">
                  The federal PACER system, designed to provide Public Access to Court Electronic Records, 
                  presents significant barriers that prevent meaningful public access to justice.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Unpredictable Search Costs</h4>
                      <p className="text-sm text-muted-foreground">
                        Users face unknown charges until after searches are completed, with simple typos 
                        potentially costing hundreds. This creates financial barriers to research.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Outdated Interface</h4>
                      <p className="text-sm text-muted-foreground">
                        The user interface remains fundamentally unusable for modern legal research, 
                        lacking intuitive design and efficient workflows.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Limited Search Capabilities</h4>
                      <p className="text-sm text-muted-foreground">
                        No document-level search exists. Users cannot search for legal concepts or 
                        phrases—only known case names or docket numbers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">No Accountability</h4>
                      <p className="text-sm text-muted-foreground">
                        Without external oversight, document availability cannot be verified, 
                        compromising transparency in the justice system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">The CASER Solution</h3>
                <p className="text-muted-foreground mb-4">
                  CASER addresses these fundamental issues by providing intelligent monitoring 
                  and eliminating wasteful PACER searches through advanced technology.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Zero Search Fees</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor 300+ courts without paying search fees. Only pay for documents 
                        you actually need, eliminating surprise charges.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Professional Interface</h4>
                      <p className="text-sm text-muted-foreground">
                        Modern, intuitive design built for legal professionals. Efficient workflows 
                        that save time and reduce frustration.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Advanced Keyword Monitoring</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor specific legal concepts, parties, or topics across all courts. 
                        Receive alerts when relevant documents are filed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Complete Transparency</h4>
                      <p className="text-sm text-muted-foreground">
                        Track all monitoring activities, cost savings, and document access. 
                        Full accountability for your court research.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Access to Justice is Fundamental</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Meaningful public access to court records is essential for democracy, transparency, 
              and the rule of law. When barriers prevent citizens, journalists, and legal professionals 
              from observing our justice system, we all lose.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              CASER represents a technological solution to the PACER Problem—democratizing access 
              to federal court records while eliminating wasteful costs and inefficiencies.
            </p>
            
            <div className="bg-muted/50 border rounded-lg p-6 max-w-4xl mx-auto">
              <h4 className="text-xl font-semibold mb-4">The PACER Cost Crisis</h4>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h5 className="font-medium mb-3">The Problem</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>1+ billion documents in PACER system</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Average 9.1 pages per document</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>$0.10 per page = $0.91 average per document</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Total value: ~$910 million for complete access</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Cloud storage would cost only {formatNumber(128000)}/year</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>PACER revenue: {formatNumber(142000000)} annually (FY 2025-26)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{formatNumber(619000000)} requests processed in FY 2024 alone</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>${formatNumber(200000000)} modernization cost (FY 2026-27)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-3">The CASER Solution</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Eliminate search fees entirely</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Monitor 300+ courts with zero search costs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{formatNumber(323560)} documents monitored in first 3 days</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Saving users ~{formatNumber(100000)} daily in PACER fees</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Pay only for documents you actually need</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Democratizing access to justice</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                PACER operates as an unchecked monopoly, charging <strong>1,109x more</strong> than cloud storage costs ($142M vs $128K). 
                CASER breaks this monopoly by providing intelligent monitoring that eliminates wasteful searches 
                while maintaining direct access to court documents when needed.
              </p>
              
              <div className="mt-6 pt-6 border-t">
                <h5 className="font-medium mb-4 text-center">The Systemic Failure</h5>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                  <div>
                    <h6 className="font-medium mb-2">Government Mismanagement</h6>
                    <ul className="space-y-1">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>$125 million lawsuit settlement for overcharging</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>$200M modernization while still charging monopoly fees</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Only 14% of 4.48M accounts are active</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>84% of users get free access - proving fees are unnecessary</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-2">CASER's Revolutionary Impact</h6>
                    <ul className="space-y-1">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Immediate savings without government bureaucracy</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Technology solution vs $200M government modernization</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Proven results: {formatNumber(100000)}+ documents saved daily</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Private innovation solving public access crisis</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  While the judiciary spends $200M on modernization and fights legislation to eliminate fees, 
                  CASER already delivers the solution: free search monitoring with pay-per-document access. 
                  This is how innovation should work—solving problems faster, cheaper, and better than government bureaucracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Services Section */}
      <section id="data-services" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Enterprise Data Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bulk court data, custom research, and professional consulting for organizations 
              that need comprehensive legal intelligence beyond standard monitoring.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">Advanced Data Capabilities</h3>
                <p className="text-muted-foreground mb-4">
                  Our proprietary monitoring system captures comprehensive docket information 
                  from 300+ U.S. courts, providing insights unavailable through any other source.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Federal district and bankruptcy court feed monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Custom keyword and entity tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Historical docket data analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Automated report generation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">API integration and data delivery</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 h-full">
                <h3 className="text-xl font-semibold text-primary mb-4">Professional Services</h3>
                <p className="text-muted-foreground mb-4">
                  From data extraction to strategic analysis, we deliver actionable insights 
                  tailored to your specific requirements.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Custom data research and extraction</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Litigation trend analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Competitive intelligence reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Regulatory compliance monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Strategic consulting services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Service Pricing</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="font-semibold text-lg mb-2">Academic Institutions</div>
                <div className="text-3xl font-bold text-primary mb-2">$140</div>
                <div className="text-sm text-muted-foreground">per hour</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-2">Media Organizations</div>
                <div className="text-3xl font-bold text-primary mb-2">$70-180</div>
                <div className="text-sm text-muted-foreground">per hour (sliding scale)</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-2">Non-Profit Organizations</div>
                <div className="text-3xl font-bold text-primary mb-2">$140-180</div>
                <div className="text-sm text-muted-foreground">per hour (based on scope)</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-2">Corporate Clients</div>
                <div className="text-3xl font-bold text-primary mb-2">$170-750</div>
                <div className="text-sm text-muted-foreground">per hour (project complexity)</div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              One hour minimum. Billing rounded to nearest half hour. Volume discounts available.
            </p>
            
            <div className="mt-8 pt-8 border-t">
              <h4 className="text-lg font-semibold text-center mb-4">The CASER Impact</h4>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">{formatNumber(323560)}</div>
                  <div className="text-sm text-muted-foreground">Documents Monitored (First 3 Days)</div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">{formatNumber(100000)}+</div>
                  <div className="text-sm text-muted-foreground">Documents Saved Daily</div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">${formatNumber(100000)}</div>
                  <div className="text-sm text-muted-foreground">Daily PACER Costs Avoided</div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Based on PACER pricing: $0.10 per page with $3 cap per document
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Example Projects</h3>
              <div className="space-y-3">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="font-medium mb-1">One Hour: Comprehensive Citation Analysis</div>
                  <p className="text-sm text-muted-foreground">
                    Generate CSV of all federal court citations for specific legal topics across 
                    monitored jurisdictions.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="font-medium mb-1">Two Hours: Litigation Pattern Report</div>
                  <p className="text-sm text-muted-foreground">
                    Create detailed analysis of filing patterns for specific case types or 
                    parties across multiple districts.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="font-medium mb-1">Three Hours: Competitive Intelligence</div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive report on litigation activities involving specific companies 
                    or industries within defined timeframes.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Complex Engagements</h3>
              <div className="space-y-3">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="font-medium mb-1">Strategic Market Analysis</div>
                  <p className="text-sm text-muted-foreground">
                    Long-term monitoring and analysis of litigation trends affecting your 
                    industry with quarterly reports and alerts.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="font-medium mb-1">Regulatory Compliance Tracking</div>
                  <p className="text-sm text-muted-foreground">
                    Automated monitoring of regulatory enforcement actions and compliance 
                    litigation across all federal courts.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="font-medium mb-1">Custom Integration Solutions</div>
                  <p className="text-sm text-muted-foreground">
                    API development and integration services to incorporate court monitoring 
                    data into your existing systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Enterprise data services and custom integrations are available by inquiry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/contact">Contact for Enterprise</Link>
                </Button>
                <DownloadButton size="lg" className="text-lg px-8 py-6 h-auto" label="Download CASER" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section id="download-cta" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Elevate Your Court Monitoring Strategy
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of legal professionals who trust CASER for critical 
                docket intelligence and cost-effective court monitoring.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <DownloadDocument className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Download Now</h3>
                  <p className="text-sm text-muted-foreground">
                    Available exclusively on the App Store for iOS devices
                  </p>
                  <DownloadButton className="w-full" size="lg" label="Download" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <LegalBookSearch className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Learn More</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit our website for detailed features and documentation
                  </p>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="https://www.caserlegal.com" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                </div>
              </Card>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Important Notice</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                CASER is a research tool designed to monitor publicly available court docket information. 
                It is not a substitute for official court records or legal advice. 
                PACER charges may apply when accessing documents through provided links. 
                MacOS and Web versions coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Download CASER
              <span className="text-primary"> for iOS</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Download CASER on the App Store. Monitor 300+ federal court feeds and upgrade to CASER Pro
              inside the app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DownloadButton size="lg" className="text-lg px-8 py-6 h-auto" label="Download on the App Store" />
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/download">
                  Learn More
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>TLS 1.3 Security</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>Pro Se Discounts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
