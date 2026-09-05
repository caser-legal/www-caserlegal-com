'use client';

import { useState, useId, type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, FileSearch } from '@/components/ui/icons';
import { ArrowRight } from 'lucide-react';
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
  const inputId = useId();
  const [monthlySearches, setMonthlySearches] = useState(100);
  const [pagesPerSearch, setPagesPerSearch] = useState(5);
  const [documentsPerMonth, setDocumentsPerMonth] = useState(10);
  const [pagesPerDocument, setPagesPerDocument] = useState(5);
  const [searchesReplacedPercent, setSearchesReplacedPercent] = useState(100);
  const CASER_PRO_ANNUAL = CASER_PRO_ANNUAL_PRICE;
  const pacerCosts = calculatePacerBilling({ monthlySearches, pagesPerSearch, documentsPerMonth,
    pagesPerDocument, searchesReplacedPercent, annualSubscription: CASER_PRO_ANNUAL });
  const caserCosts = { monthlyCost: pacerCosts.annualWithCaser / 12, annualCost: pacerCosts.annualWithCaser };
  const totalAnnualSavings = pacerCosts.netAnnualSavings;
  const monthlySavings = totalAnnualSavings / 12;
  const costMultiple = pacerCosts.annualBillable / caserCosts.annualCost;
  const savingsPercentage = pacerCosts.annualBillable > 0
    ? Math.max(0, totalAnnualSavings / pacerCosts.annualBillable * 100) : 0;

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
              ${formatNumber(Number(totalAnnualSavings.toFixed(2)))}
            </div>
            <div className="text-xs text-muted-foreground">Estimated Annual Savings</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg border">
            <div className="text-2xl font-bold text-foreground mb-1">
              ${formatNumber(Number(monthlySavings.toFixed(2)))}
            </div>
            <div className="text-xs text-muted-foreground">Estimated Monthly Savings</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg border">
            <div className="text-2xl font-bold text-foreground mb-1">{costMultiple.toFixed(1)}×</div>
            <div className="text-xs text-muted-foreground">Cost Comparison</div>
          </div>
    </div>
  );

  const savingsSummaryDetails = (
    <>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Estimated total cost reduction</span>
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
          Compares PACER charges with CASER Pro plus the PACER charges you would still pay
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
        <CardTitle className="text-lg">Estimated Cost with CASER</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-0">
        <p className="text-sm text-muted-foreground">${CASER_PRO_ANNUAL.toFixed(2)} subscription + ${pacerCosts.remainingAnnualPacer.toFixed(2)} remaining PACER charges per year.</p>
        <div className="p-3 border rounded-lg flex justify-between items-center">
          <span className="text-sm font-medium">Monthly Equivalent</span>
          <span className="text-lg font-semibold">
            ${formatNumber(Number(caserCosts.monthlyCost.toFixed(2)))}
          </span>
        </div>
        <div className="p-3 border rounded-lg flex justify-between items-center">
          <span className="text-sm font-medium">Annual Total</span>
          <span className="text-lg font-semibold">
            ${formatNumber(Number(caserCosts.annualCost.toFixed(2)))}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const usageInputs = [
    { key: 'searches', label: 'Monthly PACER searches', value: monthlySearches, set: setMonthlySearches, min: 0, max: 500, step: 10 },
    { key: 'search-pages', label: 'Average billable pages per search', value: pagesPerSearch, set: setPagesPerSearch, min: 1, max: 50, step: 1 },
    { key: 'documents', label: 'Paid PACER documents opened per month', value: documentsPerMonth, set: setDocumentsPerMonth, min: 0, max: 100, step: 1 },
    { key: 'document-pages', label: 'Average pages per paid document', value: pagesPerDocument, set: setPagesPerDocument, min: 1, max: 100, step: 1 },
    { key: 'replacement', label: 'PACER searches you could replace with CASER (%)', value: searchesReplacedPercent, set: setSearchesReplacedPercent, min: 0, max: 100, step: 5 },
  ];
  const inputsCard = (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center space-x-2">
          <FileSearch className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Your PACER Usage</CardTitle>
        </div>
        <CardDescription>Estimate the activity you expect each month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        {usageInputs.map(({ key, label, value, set, min, max, step }) => (
          <div className="space-y-2" key={key}>
            <div className="flex justify-between items-center gap-3">
              <label htmlFor={`${inputId}-${key}`} className="text-sm font-medium">{label}</label>
              <output htmlFor={`${inputId}-${key}`} className="text-sm font-semibold text-primary">{value}</output>
            </div>
            <input id={`${inputId}-${key}`} type="range" min={min} max={max} step={step}
              value={value} onChange={event => set(Number(event.target.value))}
              className="w-full h-7 accent-primary cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" />
            <div className="flex justify-between text-xs text-muted-foreground"><span>{min}</span><span>{max}</span></div>
          </div>
        ))}
        <div className="p-3 border rounded-lg bg-muted/50 space-y-2">
          <p className="text-sm font-medium">CASER Pro: ${CASER_PRO_ANNUAL}/year</p>
          <p className="text-xs text-muted-foreground">
            This estimate assumes the same usage every month. CASER searches current public feeds;
            it does not replace every PACER search or provide a complete historical docket archive.
            Paid PACER documents remain a separate expense. Opinions and eligible free copies are excluded.
            Other PACER activity can affect your quarterly waiver.
          </p>
          <a className="text-xs text-primary underline" href="https://pacer.uscourts.gov/pacer-pricing-how-fees-work" target="_blank" rel="noopener noreferrer">PACER fee rules and exemptions</a>
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
            <div className="text-xs text-muted-foreground">Search Page Fees</div>
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
            <span className="text-sm font-medium">Annual Total (after quarterly waiver)</span>
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
            Estimate your potential savings with CASER. Adjust the sliders to match your
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
                Compares PACER charges with CASER Pro plus the PACER charges you would still pay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${formatNumber(Number(totalAnnualSavings.toFixed(2)))}
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Annual Savings</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${formatNumber(Number(monthlySavings.toFixed(2)))}
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Monthly Savings</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {costMultiple.toFixed(1)}×
                  </div>
                  <div className="text-sm text-muted-foreground">Cost Comparison</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Estimated total cost reduction</span>
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
                  For Firms & Individuals
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
