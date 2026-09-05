'use client';

import PageShell from '@/components/PageShell';
import Image from 'next/image';
import ShowcaseSection from '@/components/ShowcaseSection';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import { ProductStatRow, StatHighlightGrid } from '@/components/ProductStatRow';
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
                    src="/google-cloud-badge.webp"
                    alt="Google Cloud"
                    width={12}
                    height={12}
                    className="w-3 h-3 mr-2 rounded"
                  />
                  Built on Google Cloud
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Case Alerts & Search of
                  <span className="text-primary"> Electronic Records</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Monitor 300+ U.S. federal court feeds. Eliminate wasteful PACER search fees.
                  Filing notifications for keyword matches with direct document links. No PACER account required.
                </p>
              </div>

              <AppStoreCtaRow
                badgeSize="lg"
                secondary={
                  <MatchedOutlineButton href="#features" badgeSize="lg">
                    <LegalBookSearch className="w-5 h-5" />
                    Learn More
                  </MatchedOutlineButton>
                }
              />

              <ProductStatRow className="pt-8" />
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
                <CardTitle>Court monitoring &amp; filing notifications</CardTitle>
                <CardDescription>
                  On-device alerts after scans find matching filings across 300+ federal court feeds
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
                  Reduce avoidable search charges based on your PACER usage
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
                  Protected local records and encrypted network connections
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
                  Open available court documents through source links
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
          <div className="text-center space-y-3 mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Experience Professional Court Monitoring
            </h2>
            <p className="text-lg text-muted-foreground">
              Precision court monitoring for legal professionals — search, alerts, and savings in one app.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ShowcaseSection />
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

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-16 items-stretch">
            <div className="bg-muted/50 border rounded-lg p-6 h-full flex flex-col">
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

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 h-full flex flex-col">
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
                        Monitor 300+ court feeds without paying search fees. Only pay for documents
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
                      <span>PACER charges apply to billable searches and documents</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Quarterly PACER fees of $30 or less are waived</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Fee totals depend on each user&apos;s actual PACER activity</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>CASER helps reduce repeated manual searches</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Documents remain available through their source court systems</span>
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
                      <span>Monitor 300+ court feeds with zero search costs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Keyword alerts across supported federal court feeds</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Potential savings depend on each user&apos;s PACER activity</span>
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
                CASER monitors supported federal court feeds and alerts you to matching activity,
                reducing the need for repeated manual searches. PACER fees and savings vary with actual usage.
              </p>

              <div className="mt-6 pt-6 border-t">
                <h5 className="font-medium mb-4 text-center">Understand Your Research Costs</h5>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                  <div>
                    <h6 className="font-medium mb-2">PACER Fee Rules</h6>
                    <ul className="space-y-1">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>PACER charges $0.10 per billable page</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Search results are not covered by the $3 document cap</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Charges of $30 or less in a quarter are waived</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Opinions and eligible free copies carry no fee</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-2">How CASER Helps</h6>
                    <ul className="space-y-1">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>No per-search fees within the app</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Monitor keywords across available public feeds</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Search, save, and monitor public court updates in one app</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>One annual Pro price for individuals and professionals</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  CASER can reduce repeated PACER searches when the information you need is in public feeds.
                  It does not replace a complete docket search or change PACER document fees.
                  Review the assumptions in the calculator to estimate your own costs.
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
              Team & Integration Requests
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tell us about your team’s research needs. Additional services and integrations are
              discussed individually and are not included features of the current app.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">Your Research Requirements</h3>
                <p className="text-muted-foreground mb-4">
                  CASER searches current public feeds. If your workflow needs historical archives or
                  data delivery, contact us to discuss scope and availability.
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
                    <span className="text-sm">Historical data requirements (by request)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">PDF exports from current case information</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Discuss integration and data-delivery requirements</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 h-full">
                <h3 className="text-xl font-semibold text-primary mb-4">Professional Services</h3>
                <p className="text-muted-foreground mb-4">
                  Share your requirements for onboarding, data extraction, or analysis. We will confirm
                  what is available and any separate scope before an engagement.
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
            <h4 className="text-lg font-semibold text-center mb-4">PACER Fee Reference</h4>
            <div className="bg-primary/5 rounded-lg p-4 md:p-6">
              <StatHighlightGrid
                items={[
                  {
                    value: '$0.10',
                    lines: ['Per Page', 'For Billable Records'],
                  },
                  {
                    value: '$3.00',
                    lines: ['Maximum', 'Per Document'],
                  },
                  {
                    value: '$30.00',
                    lines: ['Quarterly', 'Waiver Threshold'],
                  },
                ]}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              PACER waives quarterly usage charges of $30 or less.
            </p>
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
            <AppStoreCtaRow
              badgeSize="lg"
              className="justify-center"
              secondary={
                <MatchedOutlineButton href="/download" badgeSize="lg">
                  Learn More
                </MatchedOutlineButton>
              }
            />
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>AES-256 Encryption (app)</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>TLS 1.3 Security (app)</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>Fee Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
