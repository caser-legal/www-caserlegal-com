'use client';

import { useId, useState } from 'react';
import { Card } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import { CASER_PRO_ANNUAL_PRICE } from '@/lib/branding';
import { calculatePacerBilling } from '@/lib/pacer-fees';

const usageFields = [
  { key: 'searches', label: 'Monthly PACER searches', min: 0, max: 500, step: 10 },
  { key: 'search-pages', label: 'Billable pages per search', min: 1, max: 50, step: 1 },
  { key: 'documents', label: 'Paid documents opened per month', min: 0, max: 100, step: 1 },
  { key: 'document-pages', label: 'Pages per paid document', min: 1, max: 100, step: 1 },
  { key: 'replacement', label: 'Searches you could replace with CASER (%)', min: 0, max: 100, step: 5 },
] as const;

export default function PacerSavingsCalculator() {
  const inputId = useId();
  const [values, setValues] = useState({
    searches: 100,
    'search-pages': 5,
    documents: 10,
    'document-pages': 5,
    replacement: 100,
  });

  const pacer = calculatePacerBilling({
    monthlySearches: values.searches,
    pagesPerSearch: values['search-pages'],
    documentsPerMonth: values.documents,
    pagesPerDocument: values['document-pages'],
    searchesReplacedPercent: values.replacement,
    annualSubscription: CASER_PRO_ANNUAL_PRICE,
  });

  const pacerAnnual = pacer.annualBillable;
  const caserAnnual = pacer.annualWithCaser;
  const annualSavings = pacer.netAnnualSavings;
  const monthlySavings = annualSavings / 12;
  const savingsPercent = pacerAnnual > 0 ? Math.max(0, (annualSavings / pacerAnnual) * 100) : 0;
  const barScale = Math.max(pacerAnnual, caserAnnual, 1);

  const money = (value: number) => `$${formatNumber(Number(value.toFixed(2)))}`;

  return (
    <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3 p-6 sm:p-8">
        <div className="space-y-7">
          {usageFields.map(({ key, label, min, max, step }) => {
            const value = values[key];
            return (
              <div key={key} className="space-y-3">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`${inputId}-${key}`} className="text-sm font-medium">
                    {label}
                  </label>
                  <output htmlFor={`${inputId}-${key}`} className="text-base font-semibold text-primary">
                    {value}
                  </output>
                </div>
                <input
                  id={`${inputId}-${key}`}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(event) => setValues((current) => ({ ...current, [key]: Number(event.target.value) }))}
                  className="w-full h-6 accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="lg:col-span-2 p-6 sm:p-8 bg-primary/5 border-primary">
        <p className="text-sm font-medium text-muted-foreground">Estimated annual savings</p>
        <div className="mt-2 text-5xl font-bold tracking-tight text-foreground">{money(annualSavings)}</div>
        <p className="mt-2 text-sm text-muted-foreground">About {money(monthlySavings)} per month</p>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Estimated cost reduction</span>
            <span className="font-medium">{savingsPercent.toFixed(0)}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, savingsPercent)}%` }} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>PACER charges</span>
              <span className="font-semibold">{money(pacerAnnual)}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-foreground/60" style={{ width: `${(pacerAnnual / barScale) * 100}%` }} />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>With CASER Pro</span>
              <span className="font-semibold">{money(caserAnnual)}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(caserAnnual / barScale) * 100}%` }} />
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Estimates assume the same usage every month. CASER searches current public feeds and does not replace every
          PACER search or provide a complete historical docket archive. Paid documents remain a separate expense.
        </p>
      </Card>
    </div>
  );
}
