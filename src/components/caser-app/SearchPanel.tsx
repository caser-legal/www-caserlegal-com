'use client';

import { useRef, useState } from 'react';
import { AlertTriangle, History, Loader2, Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CourtTypeFields, StateFields } from './FilterFields';
import { CaseCard } from './CaseCard';
import { DATE_RANGES, type DateRange, type DocketMatch, type DocketSearchResult, type SearchFilters } from './store';

type SearchPanelProps = {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  recent: string[];
  onClearRecent: () => void;
  onSearch: (query: string, signal: AbortSignal) => Promise<DocketSearchResult>;
  cardProps: (match: DocketMatch) => Omit<React.ComponentProps<typeof CaseCard>, 'match'>;
};

export function SearchPanel({ filters, onFiltersChange, recent, onClearRecent, onSearch, cardProps }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<DocketSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const controller = useRef<AbortController | null>(null);

  const filterCount = (filters.states.length ? 1 : 0) + (filters.courtTypes.length ? 1 : 0);

  async function run(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    setQuery(trimmed);
    setLoading(true);
    setError(null);
    try {
      setResult(await onSearch(trimmed, abort.signal));
    } catch (err) {
      if (abort.signal.aborted) return;
      setResult(null);
      setError(err instanceof Error ? err.message : 'CASER search is unavailable right now.');
    } finally {
      if (controller.current === abort) setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          run(query);
        }}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search cases"
            className="h-11 pl-9"
            placeholder="Search cases, parties, courts..."
            value={query}
            maxLength={200}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filters.dateRange} onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value as DateRange })}>
            <SelectTrigger className="h-11 w-[150px]" aria-label="Date range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" variant="outline" className="h-11" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal />
            Filters
            {filterCount > 0 && <Badge className="ml-1 px-1.5">{filterCount}</Badge>}
          </Button>
          <Button type="submit" className="h-11" disabled={loading || !query.trim()}>
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
            Search
          </Button>
        </div>
      </form>

      {recent.length > 0 && !loading && !result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <History className="size-4" />
              Recent searches
            </h3>
            <Button variant="ghost" size="sm" onClick={onClearRecent}>
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recent.map((item) => (
              <Button key={item} variant="secondary" size="sm" onClick={() => run(item)}>
                {item}
              </Button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-primary" />
          Searching federal court feeds for “{query}”…
        </div>
      )}

      {error && !loading && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-card p-5 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{result.match_count}</span> search{' '}
              {result.match_count === 1 ? 'match' : 'matches'} · {result.scanned_courts} of {result.total_courts} courts
              searched
              {result.truncated && ` · showing the newest ${result.matches.length}`}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setResult(null);
                setQuery('');
              }}
            >
              <X />
              Clear results
            </Button>
          </div>
          {result.incomplete && (
            <p className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
              {result.failed_courts} {result.failed_courts === 1 ? 'court' : 'courts'} didn’t respond in time, so these
              results may be incomplete. Search again to retry.
            </p>
          )}
          {result.matches.length === 0 ? (
            <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
              No recent filings match “{query}”. Try a party name, a docket number, or a wider date range.
            </div>
          ) : (
            result.matches.map((match) => <CaseCard key={match.id} match={match} {...cardProps(match)} />)
          )}
          <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
        </div>
      )}

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogDescription>Narrow searches to specific states and court types.</DialogDescription>
          </DialogHeader>
          <StateFields value={filters.states} onChange={(states) => onFiltersChange({ ...filters, states })} />
          <CourtTypeFields
            value={filters.courtTypes}
            onChange={(courtTypes) => onFiltersChange({ ...filters, courtTypes })}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => onFiltersChange({ ...filters, states: [], courtTypes: [] })}>
              Reset
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
