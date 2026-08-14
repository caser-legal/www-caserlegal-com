'use client';

import { useState, useMemo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Calculator, FileSearch } from '@/components/ui/icons';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn, formatNumber } from '@/lib/utils';
import { CASER_PRO_ANNUAL_PRICE } from '@/lib/branding';
import { calculatePacerBilling } from '@/lib/pacer-fees';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';

interface PACERCalculatorProps {
  /** Full-width section on pricing page with heading */
  standalone?: boolean;
  /** Inside another section — no outer container or duplicate CTAs */
  embedded?: boolean;
  /** Home showcase: steps + summary on left, sliders + PACER costs on right */
  showcase?: boolean;
  leftSlot?: ReactNode;
}

export default function PACERCalculator({
  standalone = false,
  embedded = false,
  showcase = false,
  leftSlot,
}: PACERCalculatorProps) {
  const [monthlySearches, setMonthlySearches] = useState([100]);
  const [pagesPerSearch, setPagesPerSearch] = useState([5]);
  const [documentsPerMonth, setDocumentsPerMonth] = useState([10]);
  const CASER_PRO_ANNUAL = CASER_PRO_ANNUAL_PRICE;

  const calculatePACERCosts = () =>
    calculatePacerBilling({
      monthlySearches: monthlySearches[0],
      pagesPerSearch: pagesPerSearch[0],
      documentsPerMonth: documentsPerMonth[0],
    });

  const calculateCASERCosts = () => ({
    monthlyCost: CASER_PRO_ANNUAL / 12,
    annualCost: CASER_PRO_ANNUAL,
  });

  const pacerCosts = useMemo(() => calculatePACERCosts(), [monthlySearches, pagesPerSearch, documentsPerMonth]);
  const caserCosts = useMemo(() => calculateCASERCosts(), []);
  const totalAnnualSavings = useMemo(
    () => Math.max(0, pacerCosts.annualBillable - caserCosts.annualCost),
    [pacerCosts.annualBillable, caserCosts.annualCost]
  );
  const monthlySavings = useMemo(() => totalAnnualSavings / 12, [totalAnnualSavings]);
  const costMultiple = useMemo(
    () => (caserCosts.annualCost > 0 ? pacerCosts.annualBillable / caserCosts.annualCost : 0),
    [caserCosts.annualCost, pacerCosts.annualBillable]
  );
  const savingsPercentage = pacerCosts.annualBillable > 0
    ? (totalAnnualSavings / pacerCosts.annualBillable) * 100
    : 0;

  const sectionClass = standalone ? 'py-20 lg:py-32' : 'py-16 lg:py-24';

  const savingsSummaryMetrics = (compact: boolean) => (
    <div
      className={
        compact
          ? 'grid grid-cols-1 gap-3'
          : 'grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'
      }
    >
          <div className="text-center p-3 bg-background rounded-lg border">
            <div className="text-2xl font-bold text-foreground mb-1">
              ${formatNumber(Number(totalAnnualSavings.toFixed(0)))}
            </div>
            <div className="text-xs text-muted-foreground">Total Annual Savings</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg border">
            <div className="text-2xl font-bold text-foreground mb-1">
              ${formatNumber(Number(monthlySavings.toFixed(0)))}
            </div>
            <div className="text-xs text-muted-foreground">Monthly Savings</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg border">
            <div className="text-2xl font-bold text-foreground mb-1">{costMultiple.toFixed(1)}×</div>
            <div className="text-xs text-muted-foreground">PACER Cost Multiple</div>
          </div>
    </div>
  );

  const savingsSummaryDetails = (
    <>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Estimated PACER fee reduction</span>
          <span className="font-medium">{savingsPercentage.toFixed(0)}%</span>
        </div>
        <Progress value={savingsPercentage} className="h-2.5" />
      </div>
    </>
  );

  const savingsSummaryCard = (compact = false) => (
    <Card
      className={
        compact
          ? 'p-4 sm:p-5 bg-gradient-to-r from-primary/5 to-primary/10 border-primary'
          : 'p-5 sm:p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary'
      }
    >
      <CardHeader className={cn('px-0 pt-0 text-left', compact ? 'pb-3' : 'pb-4')}>
        <CardTitle className="text-lg sm:text-xl">Your Annual Savings Summary</CardTitle>
        <CardDescription className="text-sm">
          PACER fee estimate minus the CASER Pro annual price
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {savingsSummaryMetrics(compact)}
        {savingsSummaryDetails}
      </CardContent>
    </Card>
  );

  const caserInvestmentCard = (compactShowcase = false) => (
    <Card className={compactShowcase ? 'p-4 sm:p-5' : 'p-5 sm:p-6'}>
      <CardHeader className="px-0 pt-0 pb-3">
        <CardTitle className="text-lg">CASER Investment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-0">
        <div className="p-3 border rounded-lg flex justify-between items-center">
          <span className="text-sm font-medium">Monthly Cost</span>
          <span className="text-lg font-semibold">
            ${formatNumber(Number(caserCosts.monthlyCost.toFixed(2)))}
          </span>
        </div>
        <div className="p-3 border rounded-lg flex justify-between items-center">
          <span className="text-sm font-medium">Annual Cost</span>
          <span className="text-lg font-semibold">
            ${formatNumber(Number(caserCosts.annualCost.toFixed(2)))}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const inputsCard = (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center space-x-2">
          <FileSearch className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Your PACER Usage</CardTitle>
        </div>
        <CardDescription>Enter your current monthly PACER usage patterns</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-0">
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

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Documents Opened per Month</Label>
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

        <div className="p-3 border rounded-lg bg-muted/50">
          <p className="text-sm font-medium">CASER Pro (App Store)</p>
          <p className="text-lg font-semibold text-primary mt-1">${CASER_PRO_ANNUAL}/year</p>
          <p className="text-xs text-muted-foreground mt-2">
            Individual subscription purchased inside the iOS app after download.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const pacerCostsCard = (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl">Traditional PACER Costs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border rounded-lg">
            <div className="text-xs text-muted-foreground">Page Fees</div>
            <div className="text-lg font-semibold">${pacerCosts.pageCosts.toFixed(2)}/mo</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-xs text-muted-foreground">Document Fees</div>
            <div className="text-lg font-semibold">${pacerCosts.documentCosts.toFixed(2)}/mo</div>
          </div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Monthly Total</span>
            <span className="text-lg font-bold">${pacerCosts.monthlyTotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Annual Total (with caps)</span>
            <span className="text-xl font-bold">
              ${formatNumber(Number(pacerCosts.annualBillable.toFixed(2)))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showcase) {
    return (
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 w-full min-w-0 items-start">
        <div className="flex flex-col gap-4 min-w-0">
          {leftSlot}
          {savingsSummaryCard(true)}
          {caserInvestmentCard(true)}
        </div>
        <div className="flex flex-col gap-4 min-w-0 lg:sticky lg:top-24 lg:self-start">
          {inputsCard}
          {pacerCostsCard}
        </div>
      </div>
    );
  }

  const calculatorBody = (
    <>
      {standalone && (
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-2">
            <Calculator className="w-5 h-5 text-primary" />
            <Badge variant="secondary" className="w-fit">
              Interactive Calculator
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold">PACER Savings Calculator</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your exact savings with CASER. Adjust the sliders to match your firm&apos;s
            PACER usage and see the estimated fee difference.
          </p>
        </div>
      )}

      <div
        className={
          embedded ? 'grid grid-cols-1 gap-6 mb-6' : 'grid lg:grid-cols-2 gap-8 mb-8'
        }
      >
        {inputsCard}
        <div className="space-y-6">
          {pacerCostsCard}
          {caserInvestmentCard(false)}
        </div>
      </div>

      <div className={embedded ? 'mt-6' : 'mb-0'}>
        {standalone ? (
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Your Annual Savings Summary</CardTitle>
              <CardDescription className="text-base">
                PACER fee estimate minus the CASER Pro annual price
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${formatNumber(Number(totalAnnualSavings.toFixed(0)))}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Annual Savings</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${formatNumber(Number(monthlySavings.toFixed(0)))}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {costMultiple.toFixed(1)}×
                  </div>
                  <div className="text-sm text-muted-foreground">PACER Cost Multiple</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Estimated PACER fee reduction</span>
                  <span className="font-medium">{savingsPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={savingsPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>
        ) : (
          savingsSummaryCard(false)
        )}
      </div>

      {!embedded && (
        <>
          <div className="text-center pt-6 flex justify-center">
            <AppStoreCtaRow
              badgeSize="lg"
              secondary={
                <MatchedOutlineButton href="/contact" badgeSize="lg">
                  Contact for Business
                  <ArrowRight className="w-4 h-4" />
                </MatchedOutlineButton>
              }
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Subscribe to CASER Pro inside the app after download.
          </p>
        </>
      )}
    </>
  );

  if (embedded) {
    return <div className="w-full min-w-0">{calculatorBody}</div>;
  }

  return (
    <section className={sectionClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{calculatorBody}</div>
      </div>
    </section>
  );
}
