'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  ProfessionalBriefcase, 
  DownloadDocument, 
  LegalBookSearch 
} from '@/components/ui/icons';
import { Shield, Zap, Brain } from 'lucide-react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  const [monthlySearches, setMonthlySearches] = useState([100]);
  const [pagesPerSearch, setPagesPerSearch] = useState([5]);
  const [documentsPerMonth, setDocumentsPerMonth] = useState([10]);
  const [hoursPerMonth, setHoursPerMonth] = useState([20]);
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const PACER_PAGE_COST = 0.10;
  const PACER_DOCUMENT_COST = 2.50;
  const PACER_QUARTERLY_CAP = 30;

  const CASER_PRICING = {
    professional: 49,
    business: 149,
    enterprise: 0
  };

  const calculatePACERCosts = () => {
    const pageCosts = monthlySearches[0] * pagesPerSearch[0] * PACER_PAGE_COST;
    const documentCosts = documentsPerMonth[0] * PACER_DOCUMENT_COST;
    const monthlyTotal = pageCosts + documentCosts;
    const annualTotal = monthlyTotal * 12;
    const quarterlyCost = Math.min(monthlyTotal * 3, PACER_QUARTERLY_CAP);
    const annualWithCap = quarterlyCost * 4;
    
    return {
      pageCosts,
      documentCosts,
      monthlyTotal,
      annualTotal,
      annualWithCap: Math.min(annualTotal, annualWithCap)
    };
  };

  const calculateCASERCosts = () => {
    const monthlyCost = CASER_PRICING[selectedPlan];
    return {
      monthlyCost,
      annualCost: monthlyCost * 12
    };
  };

  const calculateTimeSavings = () => {
    const hourlyRate = 250;
    const timeSavedHours = hoursPerMonth[0] * 0.7;
    return {
      hoursSaved: timeSavedHours * 12,
      monetaryValue: timeSavedHours * 12 * hourlyRate
    };
  };

  const pacerCosts = calculatePACERCosts();
  const caserCosts = calculateCASERCosts();
  const timeSavings = calculateTimeSavings();
  
  const totalAnnualSavings = pacerCosts.annualWithCap + timeSavings.monetaryValue - caserCosts.annualCost;
  const monthlySavings = totalAnnualSavings / 12;
  const roiPercentage = caserCosts.annualCost > 0 ? (totalAnnualSavings / caserCosts.annualCost) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo-full.png" alt="CASER" className="h-11" />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-primary">Home</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
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
      <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">
                  <img 
                    src="https://www.gstatic.com/marketing-cms/assets/images/29/8c/e1f2c0994e87b8d7edf2886f9c02/google-cloud.webp=s48-fcrop64=1,00000000ffffffff-rw" 
                    alt="Google Cloud" 
                    className="w-3 h-3 mr-2 rounded"
                  />
                  Google Backed & Trusted Technology
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Case Automated Search of
                  <span className="text-primary"> Electronic Records</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Monitor 175+ U.S. Courts in near real-time. Eliminate wasteful PACER search fees. 
                  Receive instant alerts with direct document links. No PACER account required.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/contact">
                    <DownloadDocument className="w-5 h-5 mr-2" />
                    Join waitlist
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <a href="#features">
                    <LegalBookSearch className="w-5 h-5 mr-2" />
                    Learn More
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{formatNumber(175)}+</div>
                  <div className="text-sm text-muted-foreground">U.S. Courts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">Real-time</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$0</div>
                  <div className="text-sm text-muted-foreground">Search Fees</div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <img 
                src="/screenshot-5.png" 
                alt="CASER App Interface" 
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
                <CardTitle>Near Real-Time Monitoring</CardTitle>
                <CardDescription>
                  Receive instant notifications as new entries are docketed across 175+ U.S. courts
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
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Powered by Atticus, your legal research expert
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
                    <h3 className="text-lg font-semibold mb-2">Real-Time Alert System</h3>
                    <p className="text-muted-foreground">
                      Instant push notifications when new filings match your criteria. 
                      Includes direct PACER links for immediate document access.
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

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl border">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">PACER Savings Calculator</h3>
                    <p className="text-xs text-muted-foreground">
                      Calculate your exact savings with CASER
                    </p>
                  </div>

                  {/* Input Section */}
                  <Card className="p-4">
                    <CardContent className="space-y-4 px-0 pt-0">
                      {/* Monthly Searches */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium">Monthly Searches</Label>
                          <span className="text-xs font-semibold text-primary">{monthlySearches[0]}</span>
                        </div>
                        <Slider
                          value={monthlySearches}
                          onValueChange={setMonthlySearches}
                          max={500}
                          min={10}
                          step={10}
                          className="w-full"
                        />
                      </div>

                      {/* Pages per Search */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium">Pages per Search</Label>
                          <span className="text-xs font-semibold text-primary">{pagesPerSearch[0]}</span>
                        </div>
                        <Slider
                          value={pagesPerSearch}
                          onValueChange={setPagesPerSearch}
                          max={50}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Documents per Month */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium">Documents per Month</Label>
                          <span className="text-xs font-semibold text-primary">{documentsPerMonth[0]}</span>
                        </div>
                        <Slider
                          value={documentsPerMonth}
                          onValueChange={setDocumentsPerMonth}
                          max={100}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Hours per Month */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium">Hours per Month</Label>
                          <span className="text-xs font-semibold text-primary">{hoursPerMonth[0]}</span>
                        </div>
                        <Slider
                          value={hoursPerMonth}
                          onValueChange={setHoursPerMonth}
                          max={100}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Plan Selection */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Select CASER Plan</Label>
                        <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                          <SelectTrigger className="text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional - $49/month</SelectItem>
                            <SelectItem value="business">Business - $149/month</SelectItem>
                            <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* PACER Costs */}
                  <Card className="p-4">
                    <CardHeader className="px-0 pt-0 pb-2">
                      <CardTitle className="text-sm">Traditional PACER Costs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 px-0 pb-0">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 border rounded text-center">
                          <div className="text-[10px] text-muted-foreground">Page Fees</div>
                          <div className="text-sm font-semibold">${formatNumber(Number(pacerCosts.pageCosts.toFixed(2)))}</div>
                        </div>
                        <div className="p-2 border rounded text-center">
                          <div className="text-[10px] text-muted-foreground">Doc Fees</div>
                          <div className="text-sm font-semibold">${formatNumber(Number(pacerCosts.documentCosts.toFixed(2)))}</div>
                        </div>
                      </div>
                      <div className="p-2 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">Annual Total</span>
                          <span className="text-sm font-bold">${formatNumber(Number(pacerCosts.annualWithCap.toFixed(2)))}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CASER Costs */}
                  <Card className="p-4">
                    <CardHeader className="px-0 pt-0 pb-2">
                      <CardTitle className="text-sm">CASER Investment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 px-0 pb-0">
                      <div className="p-2 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">Annual Cost</span>
                          <span className="text-sm font-semibold">${formatNumber(Number(caserCosts.annualCost.toFixed(2)))}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Savings Summary */}
                  <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary">
                    <CardContent className="space-y-3 px-0 pt-0 pb-0">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          ${formatNumber(Number(totalAnnualSavings.toFixed(0)))}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Total Annual Savings</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-white rounded">
                          <div className="text-lg font-bold text-green-600">${formatNumber(Number(monthlySavings.toFixed(0)))}</div>
                          <div className="text-[10px] text-muted-foreground">Monthly</div>
                        </div>
                        <div className="p-2 bg-white rounded">
                          <div className="text-lg font-bold text-blue-600">{formatNumber(Number(roiPercentage.toFixed(0)))}%</div>
                          <div className="text-[10px] text-muted-foreground">ROI</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
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
                        Monitor 175+ courts without paying search fees. Only pay for documents 
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
                      <span>Monitor 175+ courts with zero search costs</span>
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
                  from 175+ U.S. courts, providing insights unavailable through any other source.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Real-time court monitoring across all federal jurisdictions</span>
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
                We are looking to expand these services soon. Contact to Join Waitlist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/contact">
                    Join Waitlist
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <a href="#download">
                    Download CASER Pro
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section id="download" className="py-20 lg:py-32">
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
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/contact">
                      Join waitlist
                    </Link>
                  </Button>
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
              Start monitoring 175+ U.S. federal courts in real-time. Transform your court monitoring 
              workflow and eliminate wasteful PACER fees today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/contact">
                  <DownloadDocument className="w-5 h-5 mr-2" />
                  Join waitlist
                </Link>
              </Button>
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

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-1">
            <div className="space-y-3">
              <div className="flex justify-center">
                <img src="/logo-icon.png" alt="CASER" className="h-12" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Professional-grade court monitoring for legal professionals.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/download" className="hover:text-primary transition-colors">Download</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Support Center</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 CASER. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
