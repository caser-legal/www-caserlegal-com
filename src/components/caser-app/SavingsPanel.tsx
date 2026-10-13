'use client';

import { AlertTriangle } from 'lucide-react';
import { PACER_PAGE_FEE, type SavingsEvent } from './store';

function quarterOf(date: Date): string {
  return `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`;
}

function money(value: number): string {
  return `$${value.toFixed(2)}`;
}

function tally(events: SavingsEvent[]) {
  const search = events.filter((event) => event.kind === 'search').reduce((sum, event) => sum + event.pages, 0);
  const alert = events.filter((event) => event.kind === 'alert').reduce((sum, event) => sum + event.pages, 0);
  return { search, alert, total: search + alert, savings: (search + alert) * PACER_PAGE_FEE };
}

export function quarterSavings(events: SavingsEvent[]): number {
  const current = quarterOf(new Date());
  return tally(events.filter((event) => quarterOf(new Date(event.at)) === current)).savings;
}

export function SavingsPanel({ events }: { events: SavingsEvent[] }) {
  const current = quarterOf(new Date());
  const thisQuarter = tally(events.filter((event) => quarterOf(new Date(event.at)) === current));
  const lifetime = tally(events);

  const byQuarter = new Map<string, SavingsEvent[]>();
  for (const event of events) {
    const key = quarterOf(new Date(event.at));
    byQuarter.set(key, [...(byQuarter.get(key) ?? []), event]);
  }
  const history = [...byQuarter.entries()].sort(
    ([, a], [, b]) => new Date(b[0].at).getTime() - new Date(a[0].at).getTime(),
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Savings this quarter</p>
          <p className="mt-1 text-4xl font-bold tracking-tight">{money(thisQuarter.savings)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            What PACER would charge: <span className="font-medium text-foreground">{money(thisQuarter.savings)}</span>
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>• Manual searches: {thisQuarter.search} {thisQuarter.search === 1 ? 'result' : 'results'}</li>
            <li>• Alerts: {thisQuarter.alert} {thisQuarter.alert === 1 ? 'result' : 'results'}</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Lifetime savings</p>
          <p className="mt-1 text-4xl font-bold tracking-tight">{money(lifetime.savings)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {lifetime.total} search results across all searches and alerts (hypothetical PACER charges)
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border bg-card p-5 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
        <div>
          <p className="font-medium">PACER Uncapped Search Warning</p>
          <p className="mt-1 text-muted-foreground">
            PACER search-result screens are NOT covered by the $3 per-document cap. Name searches, non-case-specific
            reports, and transcripts bill $0.10 per result with no ceiling. This tracker reflects the worst-case PACER
            bill for the same activity.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-semibold">Quarterly history</h3>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No history yet</p>
        ) : (
          <ul className="mt-3 divide-y">
            {history.map(([quarter, quarterEvents]) => {
              const totals = tally(quarterEvents);
              return (
                <li key={quarter} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div>
                    <p className="font-medium">{quarter}</p>
                    <p className="text-muted-foreground">
                      {totals.total} results ({totals.search} search, {totals.alert} alert)
                    </p>
                  </div>
                  <span className="font-semibold">{money(totals.savings)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        CASER has no per-search or per-result fees. This tracker compares your activity to PACER’s $0.10-per-result
        billing on its uncapped search screens. Alerts count as 1 billable result per match.
      </p>
    </div>
  );
}
