'use client';

import Navigation from '@/components/Navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  ScalesOfJustice, 
  CheckCircle, 
  Star, 
  ArrowRight,
  ProfessionalBriefcase,
  CourthouseClock,
  DollarDocument,
  LegalSeal,
  TrendingUp,
  Calculator,
  PiggyBank,
  FileSearch
} from '@/components/ui/icons';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function PricingPage() {
  // PACER Calculator State
  const [monthlySearches, setMonthlySearches] = useState([100]);
  const [pagesPerSearch, setPagesPerSearch] = useState([5]);
  const [documentsPerMonth, setDocumentsPerMonth] = useState([10]);
  const [hoursPerMonth, setHoursPerMonth] = useState([20]);
  const [selectedPlan, setSelectedPlan] = useState('professional');

  // PACER costs (actual rates)
  const PACER_PAGE_COST = 0.10;
  const PACER_DOCUMENT_COST = 2.50;
  const PACER_QUARTERLY_CAP = 30; // $30 per quarter waived if under $15

  // CASER pricing
  const CASER_PRICING = {
    professional: 49,
    business: 149,
    enterprise: 0 // Custom
  };

  // Calculate costs
  const calculatePACERCosts = () => {
    const pageCosts = monthlySearches[0] * pagesPerSearch[0] * PACER_PAGE_COST;
    const documentCosts = documentsPerMonth[0] * PACER_DOCUMENT_COST;
    const monthlyTotal = pageCosts + documentCosts;
    const annualTotal = monthlyTotal * 12;
    
    // Apply quarterly cap logic
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
    const hourlyRate = 250; // Average attorney hourly rate
    const timeSavedHours = hoursPerMonth[0] * 0.7; // 70% time savings
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
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit">
              <DollarDocument className="w-3 h-3 mr-2" />
              Pricing Plans
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Professional Pricing
              <span className="text-primary"> for Every Practice Size</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transparent pricing designed to deliver exceptional value. 
              Save thousands annually while accessing premium court monitoring capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Purchase Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">
                  View Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Professional Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription className="text-base">
                  Perfect for individual attorneys and small firms
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">$49</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                <Badge variant="secondary" className="mt-4">Most Popular</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Monitor up to 25 cases</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Real-time alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Direct PACER links</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Basic analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Email support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Mobile app access</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/contact">
                    Get Started Now
                  </Link>
                </Button>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    🔒 AES-256
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    TLS 1.3
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    Pro Se
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Business Plan */}
            <Card className="relative border-primary shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Best Value
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Business</CardTitle>
                <CardDescription className="text-base">
                  Ideal for mid-sized firms and legal departments
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">$149</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                <Badge className="mt-4 bg-primary text-primary-foreground">Recommended</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Monitor up to 100 cases</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Priority real-time alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Advanced filtering</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Team collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">AI Assistant access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Custom reports</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/contact">
                    Get Started Now
                  </Link>
                </Button>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    🔒 AES-256
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    TLS 1.3
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    Pro Se
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <LegalSeal className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-base">
                  Custom solutions for large firms and organizations
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">Custom</div>
                  <div className="text-muted-foreground">contact us</div>
                </div>
                <Badge variant="outline" className="mt-4">Enterprise</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Unlimited case monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">White-label options</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">API access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">SSO integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Dedicated support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Custom training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">SLA guarantees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">On-premise options</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link href="/support">
                    Contact Sales
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Custom pricing • Tailored solutions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PACER Savings Calculator */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="secondary" className="w-fit">
                <Calculator className="w-3 h-3 mr-2" />
                Interactive Calculator
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                PACER Savings Calculator
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Calculate your exact savings with CASER. Adjust the sliders to match your firm's PACER usage and see the potential ROI.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Input Section */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <Link href="/" className="flex items-center space-x-2">
                    <FileSearch className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl">Your PACER Usage</CardTitle>
                  </div>
                  <CardDescription>
                    Enter your current monthly PACER usage patterns
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 px-0">
                  {/* Monthly Searches */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Monthly Searches</Label>
                      <span className="text-sm font-semibold text-primary">{monthlySearches[0]}</span>
                    </div>
                    <Slider
                      value={monthlySearches}
                      onValueChange={setMonthlySearches}
                      max={500}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10</span>
                      <span>500</span>
                    </div>
                  </div>

                  {/* Pages per Search */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Average Pages per Search</Label>
                      <span className="text-sm font-semibold text-primary">{pagesPerSearch[0]}</span>
                    </div>
                    <Slider
                      value={pagesPerSearch}
                      onValueChange={setPagesPerSearch}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Documents per Month */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Document Contacts per Month</Label>
                      <span className="text-sm font-semibold text-primary">{documentsPerMonth[0]}</span>
                    </div>
                    <Slider
                      value={documentsPerMonth}
                      onValueChange={setDocumentsPerMonth}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Hours per Month */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Hours Spent on Research per Month</Label>
                      <span className="text-sm font-semibold text-primary">{hoursPerMonth[0]}</span>
                    </div>
                    <Slider
                      value={hoursPerMonth}
                      onValueChange={setHoursPerMonth}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Plan Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select CASER Plan</Label>
                    <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                      <SelectTrigger>
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

              {/* Results Section */}
              <div className="space-y-6">
                {/* PACER Costs Breakdown */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl">Traditional PACER Costs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <div className="text-xs text-muted-foreground">Page Fees</div>
                        <div className="text-lg font-semibold">
                          ${pacerCosts.pageCosts.toFixed(2)}/mo
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-xs text-muted-foreground">Document Fees</div>
                        <div className="text-lg font-semibold">
                          ${pacerCosts.documentCosts.toFixed(2)}/mo
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Monthly Total</span>
                        <span className="text-lg font-bold">
                          ${pacerCosts.monthlyTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Annual Total (with caps)</span>
                        <span className="text-xl font-bold">
                          ${formatNumber(Number(pacerCosts.annualWithCap.toFixed(2)))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CASER Costs */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl">CASER Investment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-0">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Monthly Cost</span>
                        <span className="text-lg font-semibold">
                          ${formatNumber(Number(caserCosts.monthlyCost.toFixed(2)))}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Annual Cost</span>
                        <span className="text-lg font-semibold">
                          ${formatNumber(Number(caserCosts.annualCost.toFixed(2)))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Savings Summary */}
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Your Annual Savings Summary</CardTitle>
                <CardDescription className="text-base">
                  Total value including time savings and cost reduction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold text-foreground mb-2">
                      ${formatNumber(Number(totalAnnualSavings.toFixed(0)))}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Annual Savings</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold text-foreground mb-2">
                      ${formatNumber(Number(monthlySavings.toFixed(0)))}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {formatNumber(Number(roiPercentage.toFixed(0)))}%
                    </div>
                    <div className="text-sm text-muted-foreground">ROI Percentage</div>
                  </div>
                </div>

                {/* Time Savings Breakdown */}
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Time Savings Value</span>
                    <span className="font-semibold text-foreground">
                      ${formatNumber(Number(timeSavings.monetaryValue.toFixed(2)))}/year
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Hours Saved Annually</span>
                    <span className="font-semibold text-foreground">
                      {formatNumber(Number(timeSavings.hoursSaved.toFixed(0)))} hours
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Savings Progress</span>
                    <span className="font-medium">{Math.min(roiPercentage, 999).toFixed(0)}% ROI</span>
                  </div>
                  <Progress value={Math.min(roiPercentage, 100)} className="h-3" />
                </div>

                <div className="text-center pt-4">
                  <Button size="lg" className="bg-primary text-primary-foreground" asChild>
                    <Link href="/contact">
                      Purchase CASER Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    AES-256 & TLS 1.3 • Secure Purchase
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-1">
            <div className="space-y-2">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/logo-icon.png" alt="CASER" className="h-12" />
              </Link>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/download" className="hover:text-primary transition-colors">Download</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
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
