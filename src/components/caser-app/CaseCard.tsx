'use client';

import { Bell, BellRing, Bookmark, BookmarkCheck, ExternalLink, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { courtTypeLabel, formatDate, type DocketMatch } from './store';

export function plainText(html: string): string {
  if (typeof window === 'undefined') return html.replace(/<[^>]*>/g, ' ');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

type CaseCardProps = {
  match: DocketMatch;
  saved: boolean;
  alertOn: boolean;
  unread?: boolean;
  onToggleSave: () => void;
  onAlert: () => void;
  onAnalyze: () => void;
  footer?: React.ReactNode;
};

export function CaseCard({ match, saved, alertOn, unread, onToggleSave, onAlert, onAnalyze, footer }: CaseCardProps) {
  const description = plainText(match.description);

  return (
    <article className={cn('rounded-xl border bg-card p-5 shadow-sm', unread && 'border-primary/60')}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{match.court}</span>
        <span>{match.state}</span>
        <Badge variant="secondary" className="font-normal">
          {courtTypeLabel(match.court_type)}
        </Badge>
        <span className="ml-auto">{formatDate(match.published_at)}</span>
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug">{match.title}</h3>
      {description && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{description}</p>}
      {match.parties.length > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Parties:</span> {match.parties.join(' · ')}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {match.link && (
          <Button variant="outline" size="sm" asChild>
            <a href={match.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              Open filing
            </a>
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onToggleSave} aria-pressed={saved}>
          {saved ? <BookmarkCheck className="text-primary" /> : <Bookmark />}
          {saved ? 'Saved' : 'Save'}
        </Button>
        <Button variant="outline" size="sm" onClick={onAlert} disabled={alertOn}>
          {alertOn ? <BellRing className="text-primary" /> : <Bell />}
          {alertOn ? 'Alert On' : 'Alert'}
        </Button>
        <Button variant="ghost" size="sm" onClick={onAnalyze}>
          <Sparkles className="text-primary" />
          Analyze with Atticus
        </Button>
        {footer}
      </div>
    </article>
  );
}
