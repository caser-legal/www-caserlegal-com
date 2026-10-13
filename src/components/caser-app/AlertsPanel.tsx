'use client';

import { useState } from 'react';
import { Bell, BellOff, Loader2, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox, CourtTypeFields, StateFields } from './FilterFields';
import { CaseCard } from './CaseCard';
import {
  formatDate,
  formatInterval,
  newId,
  type Alert,
  type AlertMatch,
  type CourtType,
  type DocketMatch,
} from './store';

export const MAX_ALERTS = 100;
export const MIN_INTERVAL = 5;
export const MAX_INTERVAL = 10_080;
const PRESETS = [5, 15, 30, 60, 180, 360, 720, 1440];

type Draft = {
  term: string;
  states: string[];
  courtTypes: CourtType[];
  exactMatch: boolean;
  caseSensitive: boolean;
  intervalMinutes: number;
  notify: boolean;
};

const EMPTY_DRAFT: Draft = {
  term: '',
  states: [],
  courtTypes: [],
  exactMatch: false,
  caseSensitive: false,
  intervalMinutes: 30,
  notify: true,
};

export function createAlert(draft: Draft): Alert {
  return {
    ...draft,
    id: newId(),
    term: draft.term.trim().slice(0, 200),
    enabled: true,
    createdAt: new Date().toISOString(),
    lastCheckedAt: null,
    lastError: null,
    seen: [],
  };
}

type AlertsPanelProps = {
  alerts: Alert[];
  matches: AlertMatch[];
  checking: Set<string>;
  notificationPermission: NotificationPermission | 'unsupported';
  onRequestNotifications: () => void;
  onSave: (alert: Alert) => void;
  onDelete: (id: string) => void;
  onCheckNow: (id: string) => void;
  onCheckAll: () => void;
  onMarkAllRead: () => void;
  onClearMatches: () => void;
  cardProps: (match: DocketMatch) => Omit<React.ComponentProps<typeof CaseCard>, 'match'>;
};

export function AlertsPanel({
  alerts,
  matches,
  checking,
  notificationPermission,
  onRequestNotifications,
  onSave,
  onDelete,
  onCheckNow,
  onCheckAll,
  onMarkAllRead,
  onClearMatches,
  cardProps,
}: AlertsPanelProps) {
  const [editing, setEditing] = useState<Alert | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [open, setOpen] = useState(false);
  const [customInterval, setCustomInterval] = useState(false);

  const unread = matches.filter((match) => !match.read).length;

  function openEditor(alert?: Alert) {
    setEditing(alert ?? null);
    const next = alert ? { ...alert } : EMPTY_DRAFT;
    setDraft(next);
    setCustomInterval(!PRESETS.includes(next.intervalMinutes));
    setOpen(true);
  }

  function save() {
    const term = draft.term.trim();
    if (!term) return;
    const intervalMinutes = Math.min(MAX_INTERVAL, Math.max(MIN_INTERVAL, Math.round(draft.intervalMinutes) || 30));
    if (editing) {
      onSave({ ...editing, ...draft, term, intervalMinutes, lastError: null });
    } else {
      onSave(createAlert({ ...draft, term, intervalMinutes }));
    }
    setOpen(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-muted-foreground">
          Alerts only notify you about new filings that appear after you create the alert. Checks run on your schedule
          while CASER is open in a browser tab.
        </p>
        <div className="flex flex-wrap gap-2">
          {notificationPermission === 'default' && (
            <Button variant="outline" onClick={onRequestNotifications}>
              <Bell />
              Enable notifications
            </Button>
          )}
          <Button variant="outline" onClick={onCheckAll} disabled={alerts.every((alert) => !alert.enabled)}>
            <RefreshCw />
            Check All Now
          </Button>
          <Button onClick={() => openEditor()} disabled={alerts.length >= MAX_ALERTS}>
            <Plus />
            Add Alert
          </Button>
        </div>
      </div>

      {notificationPermission === 'denied' && (
        <p className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
          Browser notifications are blocked for this site. New matches still appear here; allow notifications in your
          browser’s site settings to get pop-up alerts.
        </p>
      )}

      {alerts.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <Bell className="mx-auto size-8 text-primary" />
          <h3 className="mt-3 font-semibold">No alerts yet</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Track a party, a docket number, or a keyword and CASER will check federal court feeds on the timer you set.
          </p>
          <Button className="mt-4" onClick={() => openEditor()}>
            <Plus />
            Add Alert
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {alerts.map((alert) => {
            const busy = checking.has(alert.id);
            const count = matches.filter((match) => match.alertId === alert.id).length;
            const next =
              alert.enabled && alert.lastCheckedAt
                ? new Date(new Date(alert.lastCheckedAt).getTime() + alert.intervalMinutes * 60_000).toISOString()
                : null;
            return (
              <div key={alert.id} className="flex flex-col rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{alert.term}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {alert.enabled ? `Active · ${formatInterval(alert.intervalMinutes)} checks` : 'Paused'}
                      {alert.exactMatch && ' · Exact match'}
                      {alert.caseSensitive && ' · Case sensitive'}
                    </p>
                  </div>
                  <Badge variant={count ? 'default' : 'secondary'}>{count} {count === 1 ? 'match' : 'matches'}</Badge>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Last checked</dt>
                    <dd>{alert.lastCheckedAt ? formatDate(alert.lastCheckedAt) : 'Not yet'}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Next check</dt>
                    <dd>{alert.enabled ? (next ? formatDate(next) : 'Now') : '—'}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted-foreground">Scope</dt>
                    <dd>
                      {alert.states.length ? alert.states.join(', ') : 'All states'} ·{' '}
                      {alert.courtTypes.length ? alert.courtTypes.join(', ') : 'all court types'}
                    </dd>
                  </div>
                </dl>
                {alert.lastError && <p className="mt-3 text-xs text-destructive">{alert.lastError}</p>}
                <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                  <Button variant="outline" size="sm" onClick={() => onCheckNow(alert.id)} disabled={busy || !alert.enabled}>
                    {busy ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                    Search Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSave({ ...alert, enabled: !alert.enabled, lastError: null })}
                  >
                    {alert.enabled ? <BellOff /> : <Bell />}
                    {alert.enabled ? 'Pause' : 'Resume'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openEditor(alert)}>
                    <Pencil />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(alert.id)}>
                    <Trash2 />
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            New filings {unread > 0 && <Badge className="ml-2 align-middle">{unread} unread</Badge>}
          </h2>
          {matches.length > 0 && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onMarkAllRead} disabled={unread === 0}>
                Mark all read
              </Button>
              <Button variant="ghost" size="sm" onClick={onClearMatches}>
                Clear
              </Button>
            </div>
          )}
        </div>
        {matches.length === 0 ? (
          <p className="text-sm text-muted-foreground">Matches from your alerts will appear here.</p>
        ) : (
          matches.map((item) => (
            <CaseCard
              key={item.key}
              match={item.match}
              unread={!item.read}
              {...cardProps(item.match)}
              footer={
                <span className="ml-auto text-xs text-muted-foreground">
                  Alert “{item.term}” · found {formatDate(item.foundAt)}
                </span>
              }
            />
          ))
        )}
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Alert' : 'Add Alert'}</DialogTitle>
            <DialogDescription>
              Alerts only notify you about new filings that appear after you create the alert.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="alert-term">Keyword, party, or docket number</Label>
              <Input
                id="alert-term"
                autoFocus
                maxLength={200}
                placeholder="e.g. Acme Corp or 1:25-cv-00199"
                value={draft.term}
                onChange={(event) => setDraft({ ...draft, term: event.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Check every</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={customInterval ? 'custom' : String(draft.intervalMinutes)}
                  onValueChange={(value) => {
                    if (value === 'custom') {
                      setCustomInterval(true);
                    } else {
                      setCustomInterval(false);
                      setDraft({ ...draft, intervalMinutes: Number(value) });
                    }
                  }}
                >
                  <SelectTrigger className="w-[160px]" aria-label="Check interval">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map((minutes) => (
                      <SelectItem key={minutes} value={String(minutes)}>
                        {formatInterval(minutes)}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom…</SelectItem>
                  </SelectContent>
                </Select>
                {customInterval && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      aria-label="Custom interval in minutes"
                      className="w-24"
                      min={MIN_INTERVAL}
                      max={MAX_INTERVAL}
                      value={draft.intervalMinutes}
                      onChange={(event) => setDraft({ ...draft, intervalMinutes: Number(event.target.value) })}
                    />
                    <span className="text-sm text-muted-foreground">minutes</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Between {MIN_INTERVAL} minutes and 7 days.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Checkbox
                label="Exact match"
                checked={draft.exactMatch}
                onChange={(exactMatch) => setDraft({ ...draft, exactMatch })}
              />
              <Checkbox
                label="Case sensitive"
                checked={draft.caseSensitive}
                onChange={(caseSensitive) => setDraft({ ...draft, caseSensitive })}
              />
              <Checkbox
                label="Browser notification"
                checked={draft.notify}
                onChange={(notify) => setDraft({ ...draft, notify })}
              />
            </div>

            <StateFields value={draft.states} onChange={(states) => setDraft({ ...draft, states })} />
            <CourtTypeFields value={draft.courtTypes} onChange={(courtTypes) => setDraft({ ...draft, courtTypes })} />

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!draft.term.trim()}>
                {editing ? 'Save Alert' : 'Add Alert'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
