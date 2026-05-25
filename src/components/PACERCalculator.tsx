'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Calculator, FileSearch } from '@/components/ui/icons';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';
import { DownloadButton } from '@/components/AppStoreLink';

interface PACERCalculatorProps {
  standalone?: boolean;
}

export default function PACERCalculator({ standalone = false }: PACERCalculatorProps) {
  const [monthlySearches, setMonthlySearches] = useState([100]);
  const [pagesPerSearch, setPagesPerSearch] = useState([5]);
  const [documentsPerMonth, setDocumentsPerMonth] = useState([10]);
  const [hoursPerMonth, setHoursPerMonth] = useState([20]);
  const CASER_PRO_ANNUAL = 19.99;

  const PACER_PAGE_COST = 0.10;
  const PACER_DOCUMENT_COST = 2.50;
  const PACER_QUARTERLY_CAP = 30;

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
      annualWithCap: Math.min(annualTotal, annualWithCap),
    };
  };

  const calculateCASERCosts = () => ({
    monthlyCost: CASER_PRO_ANNUAL / 12,
    annualCost: CASER_PRO_ANNUAL,
  });

  const calculateTimeSavings = () => {
    const hourlyRate = 250;
    const timeSavedHours = hoursPerMonth[0] * 0.7;
    return {
      hoursSaved: timeSavedHours * 12,
      monetaryValue: timeSavedHours * 12 * hourlyRate,
    };
  };

  const pacerCosts = useMemo(() => calculatePACERCosts(), [monthlySearches, pagesPerSearch, documentsPerMonth]);
  const caserCosts = useMemo(() => calculateCASERCosts(), []);
  const timeSavings = useMemo(() => calculateTimeSavings(), [hoursPerMonth]);

  const totalAnnualSavings = useMemo(
    () => pacerCosts.annualWithCap + timeSavings.monetaryValue - caserCosts.annualCost,
    [pacerCosts, caserCosts, timeSavings]
  );
  const monthlySavings = useMemo(() => totalAnnualSavings / 12, [totalAnnualSavings]);
  const roiPercentage = useMemo(
    () => (caserCosts.annualCost > 0 ? (totalAnnualSavings / caserCosts.annualCost) * 100 : 0),
    [caserCosts, totalAnnualSavings]
  );

  const sectionClass = standalone
    ? 'py-20 lg:py-32'
    : 'py-16 lg:py-24';

  return (
    <section className={sectionClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {standalone && (
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center space-x-2">
                <Calculator className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="w-fit">
                  Interactive Calculator
                </Badge>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                PACER Savings Calculator
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Calculate your exact savings with CASER. Adjust the sliders to match your
                firm&apos;s PACER usage and see the potential ROI.
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Input Section */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center space-x-2">
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
                    <span className="text-sm font-semibold text-primary">
                      {documentsPerMonth[0]}
                    </span>
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

                <div className="p-3 border rounded-lg bg-muted/50">
                  <p className="text-sm font-medium">CASER Pro (App Store)</p>
                  <p className="text-lg font-semibold text-primary mt-1">
                    ${CASER_PRO_ANNUAL}/year
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Individual subscription purchased inside the iOS app after download.
                  </p>
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

              <div className="text-center pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <DownloadButton size="lg" label="Download CASER" />
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Contact for Business
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Subscribe to CASER Pro inside the app after download.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
