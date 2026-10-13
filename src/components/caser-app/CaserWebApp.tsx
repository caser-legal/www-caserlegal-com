'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import {
  Bell,
  Bookmark,
  LayoutDashboard,
  Loader2,
  LogOut,
  PiggyBank,
  Plus,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useCaserApi } from './api';
import { friendlyAtticusError, streamAtticus } from './firebase-atticus';
import { caseAnalysisPrompt, guardUserInput } from '@/lib/atticus';
import { SearchPanel } from './SearchPanel';
import { AlertsPanel, createAlert, MAX_ALERTS } from './AlertsPanel';
import { AtticusPanel } from './AtticusPanel';
import { SavingsPanel, quarterSavings } from './SavingsPanel';
import { CaseCard, plainText } from './CaseCard';
import {
  newId,
  usePersistentState,
  type Alert,
  type AlertMatch,
  type ChatMessage,
  type DocketMatch,
  type SavingsEvent,
  type SearchFilters,
} from './store';

type Tab = 'dashboard' | 'search' | 'alerts' | 'atticus' | 'saved' | 'fees' | 'settings';

const TICK_MS = 30_000;
const MAX_MATCHES = 500;
const MAX_SEEN = 2000;
const MAX_CHAT = 100;
const DEFAULT_FILTERS: SearchFilters = { states: [], courtTypes: [], dateRange: 'Last 30 days' };

const DOCKET_PATTERN = /\b\d{1,2}:\d{2}-[a-z]{1,4}-\d{2,6}(?:-[a-z]{1,4})*\b|\b\d{2}-\d{3,6}\b/i;

/** The term a case card's Alert button watches: its docket number when the title has one. */
function alertTermFor(match: DocketMatch): string {
  return (match.title.match(DOCKET_PATTERN)?.[0] ?? match.title).slice(0, 200);
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function passesAlertOptions(alert: Alert, match: DocketMatch): boolean {
  if (!alert.exactMatch && !alert.caseSensitive) return true;
  const haystack = `${match.title} ${plainText(match.description)} ${match.court}`;
  if (alert.exactMatch) {
    return new RegExp(`(^|\\W)${escapeRegExp(alert.term)}(\\W|$)`, alert.caseSensitive ? '' : 'i').test(haystack);
  }
  return haystack.includes(alert.term);
}

function notificationState(): NotificationPermission | 'unsupported' {
  return typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported';
}

export default function CaserWebApp() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" aria-label="Loading" />
      </div>
    );
  }

  if (!authenticated || !user) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Sign in to <span className="text-primary">CASER</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Search federal court filings, set alerts on your own schedule, and research cases with Atticus.
        </p>
        <Button className="mt-6" size="lg" onClick={() => login()}>
          Login
        </Button>
      </div>
    );
  }

  return <Workspace userId={user.id} account={user.email?.address ?? user.phone?.number ?? 'Signed in'} onLogout={logout} />;
}

function Workspace({ userId, account, onLogout }: { userId: string; account: string; onLogout: () => Promise<void> }) {
  const router = useRouter();
  const { toast } = useToast();
  const { search } = useCaserApi();
  const key = (name: string) => `caser:v1:${userId}:${name}`;

  const [tab, setTab] = useState<Tab>('dashboard');
  const [filters, setFilters] = usePersistentState<SearchFilters>(key('filters'), DEFAULT_FILTERS);
  const [recent, setRecent] = usePersistentState<string[]>(key('recent'), []);
  const [saved, setSaved] = usePersistentState<DocketMatch[]>(key('saved'), []);
  const [alerts, setAlerts] = usePersistentState<Alert[]>(key('alerts'), []);
  const [matches, setMatches] = usePersistentState<AlertMatch[]>(key('matches'), []);
  const [savings, setSavings] = usePersistentState<SavingsEvent[]>(key('savings'), []);
  const [messages, setMessages] = usePersistentState<ChatMessage[]>(key('atticus'), []);
  const [checking, setChecking] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('unsupported');
  const atticusAbort = useRef<AbortController | null>(null);

  useEffect(() => setPermission(notificationState()), []);

  const unread = matches.filter((match) => !match.read).length;
  useEffect(() => {
    document.title = unread ? `(${unread}) CASER Search` : 'CASER Search';
  }, [unread]);

  const recordSavings = useCallback(
    (kind: SavingsEvent['kind'], pages: number) => {
      if (pages > 0) setSavings((prev) => [...prev, { at: new Date().toISOString(), pages, kind }].slice(-5000));
    },
    [setSavings],
  );

  // ---- Search -------------------------------------------------------------

  const runSearch = useCallback(
    async (query: string, signal: AbortSignal) => {
      const result = await search({ query, ...filters }, signal);
      setRecent((prev) => [query, ...prev.filter((item) => item !== query)].slice(0, 8));
      recordSavings('search', Math.max(1, result.match_count));
      return result;
    },
    [filters, recordSavings, search, setRecent],
  );

  // ---- Alerts -------------------------------------------------------------

  const alertsRef = useRef(alerts);
  useEffect(() => {
    alertsRef.current = alerts;
  }, [alerts]);
  const inFlight = useRef(new Set<string>());

  const patchAlert = useCallback(
    (id: string, patch: Partial<Alert>) =>
      setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, ...patch } : alert))),
    [setAlerts],
  );

  const checkAlert = useCallback(
    async (id: string) => {
      const alert = alertsRef.current.find((item) => item.id === id);
      if (!alert || inFlight.current.has(id)) return;
      inFlight.current.add(id);
      setChecking(new Set(inFlight.current));
      try {
        const result = await search({
          query: alert.term,
          states: alert.states,
          courtTypes: alert.courtTypes,
          dateRange: 'Last 7 days',
        });
        const createdAt = new Date(alert.createdAt).getTime();
        const seen = new Set(alert.seen);
        // Like iOS: only filings published after the alert was created, each announced once.
        const fresh = result.matches.filter(
          (match) =>
            match.published_at &&
            new Date(match.published_at).getTime() >= createdAt &&
            !seen.has(match.id) &&
            passesAlertOptions(alert, match),
        );
        patchAlert(id, {
          lastCheckedAt: new Date().toISOString(),
          lastError: result.incomplete ? `${result.failed_courts} courts didn’t respond; they’ll be retried next check.` : null,
          seen: [...fresh.map((match) => match.id), ...alert.seen].slice(0, MAX_SEEN),
        });
        if (fresh.length === 0) return;

        const foundAt = new Date().toISOString();
        setMatches((prev) =>
          [
            ...fresh.map((match) => ({
              key: `${alert.id}|${match.id}`,
              alertId: alert.id,
              term: alert.term,
              foundAt,
              read: false,
              match,
            })),
            ...prev,
          ].slice(0, MAX_MATCHES),
        );
        recordSavings('alert', fresh.length);

        const summary = `${fresh.length} new ${fresh.length === 1 ? 'filing' : 'filings'} for “${alert.term}”`;
        toast({ title: 'CASER alert', description: summary });
        if (alert.notify && notificationState() === 'granted') {
          const notification = new Notification(`CASER alert: ${alert.term}`, {
            body: `${summary}\n${fresh[0].title}`,
            tag: alert.id,
            icon: '/favicon.ico',
          });
          notification.onclick = () => {
            window.focus();
            setTab('alerts');
          };
        }
      } catch (error) {
        patchAlert(id, {
          lastCheckedAt: new Date().toISOString(),
          lastError: error instanceof Error ? error.message : 'Check failed. It will retry on schedule.',
        });
      } finally {
        inFlight.current.delete(id);
        setChecking(new Set(inFlight.current));
      }
    },
    [patchAlert, recordSavings, search, setMatches, toast],
  );

  // The custom timer: every 30 seconds, run each enabled alert whose interval has elapsed.
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const now = Date.now();
      const due = alertsRef.current.filter(
        (alert) =>
          alert.enabled &&
          (!alert.lastCheckedAt || now - new Date(alert.lastCheckedAt).getTime() >= alert.intervalMinutes * 60_000),
      );
      for (const alert of due) {
        if (cancelled) return;
        await checkAlert(alert.id);
      }
    };
    tick();
    const timer = window.setInterval(tick, TICK_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [checkAlert]);

  const saveAlert = (alert: Alert) => {
    setAlerts((prev) => (prev.some((item) => item.id === alert.id) ? prev.map((item) => (item.id === alert.id ? alert : item)) : [alert, ...prev]));
  };

  const alertFromCase = (match: DocketMatch) => {
    if (alerts.length >= MAX_ALERTS) {
      toast({ title: 'Alert limit reached', description: `You can have up to ${MAX_ALERTS} alerts.` });
      return;
    }
    const alert = createAlert({
      term: alertTermFor(match),
      states: [],
      courtTypes: [match.court_type],
      exactMatch: false,
      caseSensitive: false,
      intervalMinutes: 30,
      notify: true,
    });
    saveAlert(alert);
    toast({ title: 'Alert On', description: `CASER will check for new filings in “${alert.term}” every 30 min.` });
  };

  const requestNotifications = async () => {
    if (notificationState() === 'unsupported') return;
    setPermission(await Notification.requestPermission());
  };

  // ---- Atticus ------------------------------------------------------------

  const sendToAtticus = async (prompt: string, shown: string) => {
    atticusAbort.current?.abort();
    const abort = new AbortController();
    atticusAbort.current = abort;

    const turns = messages
      .filter((message) => message.role !== 'system' && message.text)
      .map((message) => ({ role: message.role as 'user' | 'assistant', text: message.prompt ?? message.text }));
    const reply: ChatMessage = { id: newId(), role: 'assistant', text: '' };
    const asked: ChatMessage = { id: newId(), role: 'user', text: shown, ...(prompt !== shown && { prompt }) };
    setMessages((prev) => [...prev, asked, reply].slice(-MAX_CHAT));
    setSending(true);

    const fail = (text: string) =>
      setMessages((prev) =>
        prev.flatMap((message) =>
          message.id !== reply.id
            ? [message]
            : message.text
              ? [message, { id: newId(), role: 'system' as const, text }]
              : [{ id: newId(), role: 'system' as const, text }],
        ),
      );

    try {
      // Like iOS: text accumulates, the latest non-empty grounding replaces the previous one.
      await streamAtticus(
        prompt,
        turns,
        (chunk) =>
          setMessages((prev) =>
            prev.map((message) =>
              message.id !== reply.id
                ? message
                : {
                    ...message,
                    text: message.text + chunk.text,
                    sources: chunk.sources.length ? chunk.sources : message.sources,
                    passages: chunk.passages.length ? chunk.passages : message.passages,
                    searchEntryPointHTML: chunk.searchEntryPointHTML || message.searchEntryPointHTML,
                  },
            ),
          ),
        abort.signal,
      );
    } catch (error) {
      fail(abort.signal.aborted ? 'Stopped.' : friendlyAtticusError(error));
    } finally {
      if (atticusAbort.current === abort) setSending(false);
      setMessages((prev) => prev.filter((message) => message.id !== reply.id || message.text));
    }
  };

  const addSystemMessage = (text: string) =>
    setMessages((prev) => [...prev, { id: newId(), role: 'system' as const, text }].slice(-MAX_CHAT));

  const askAtticus = (text: string) => {
    const guarded = guardUserInput(text);
    if (!guarded.ok) return addSystemMessage(guarded.message);
    sendToAtticus(guarded.text, guarded.text);
  };

  const analyzeCase = (match: DocketMatch) => {
    setTab('atticus');
    const guarded = caseAnalysisPrompt(match.title, match.description);
    if (!guarded.ok) return addSystemMessage(guarded.message);
    sendToAtticus(guarded.text, 'Analyze this case for me');
  };

  // ---- Shared card wiring -------------------------------------------------

  const savedIds = useMemo(() => new Set(saved.map((match) => match.id)), [saved]);
  const alertTerms = useMemo(() => new Set(alerts.map((alert) => alert.term)), [alerts]);
  const cardProps = (match: DocketMatch) => ({
    saved: savedIds.has(match.id),
    alertOn: alertTerms.has(alertTermFor(match)),
    onToggleSave: () =>
      setSaved((prev) => (prev.some((item) => item.id === match.id) ? prev.filter((item) => item.id !== match.id) : [match, ...prev])),
    onAlert: () => alertFromCase(match),
    onAnalyze: () => analyzeCase(match),
  });

  const activeAlerts = alerts.filter((alert) => alert.enabled).length;

  const tabs: { value: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { value: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
    { value: 'search', label: 'Search', icon: <Search /> },
    { value: 'alerts', label: 'Alerts', icon: <Bell />, badge: unread },
    { value: 'atticus', label: 'Atticus', icon: <Sparkles /> },
    { value: 'saved', label: 'Saved', icon: <Bookmark /> },
    { value: 'fees', label: 'Search fees', icon: <PiggyBank /> },
    { value: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  return (
    <div className="container mx-auto min-h-[calc(100dvh-4rem)] max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)} className="gap-8">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-max">
            {tabs.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="gap-1.5 px-3">
                {item.icon}
                {item.label}
                {!!item.badge && <Badge className="ml-1 px-1.5 py-0 text-[10px]">{item.badge}</Badge>}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Case Search &amp; Alerts by <span className="text-primary">CASER</span>
            </h1>
            <p className="mt-1 text-muted-foreground">Federal court filings, alerts, and Atticus in your browser.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <DashboardCard
              title="Search"
              icon={<Search className="size-5 text-primary" />}
              lines={[`${recent.length} recent ${recent.length === 1 ? 'search' : 'searches'}`, `${saved.length} saved ${saved.length === 1 ? 'case' : 'cases'}`]}
              actions={[
                { label: 'New search', onClick: () => setTab('search') },
                { label: 'Saved', onClick: () => setTab('saved') },
              ]}
            />
            <DashboardCard
              title="Alerts"
              icon={<Bell className="size-5 text-primary" />}
              lines={[`${activeAlerts} active ${activeAlerts === 1 ? 'alert' : 'alerts'}`, `${unread} unread ${unread === 1 ? 'match' : 'matches'}`]}
              actions={[
                { label: 'Alert Status', onClick: () => setTab('alerts') },
                { label: 'Add Alert', onClick: () => setTab('alerts'), icon: <Plus /> },
              ]}
            />
            <DashboardCard
              title="Atticus AI"
              icon={<Sparkles className="size-5 text-primary" />}
              lines={['Explain filings and court terms', 'Research dockets with sources']}
              actions={[{ label: 'Ask Atticus', onClick: () => setTab('atticus') }]}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <DashboardCard
              title="Search fees"
              icon={<PiggyBank className="size-5 text-primary" />}
              lines={[`$${quarterSavings(savings).toFixed(2)} saved vs. PACER this quarter`]}
              actions={[{ label: 'View savings', onClick: () => setTab('fees') }]}
            />
            <DashboardCard
              title="Notifications"
              icon={<Bell className="size-5 text-primary" />}
              lines={[
                permission === 'granted'
                  ? 'Browser notifications are on'
                  : permission === 'denied'
                    ? 'Blocked in browser settings'
                    : permission === 'unsupported'
                      ? 'Not supported in this browser'
                      : 'Get a pop-up when an alert matches',
              ]}
              actions={permission === 'default' ? [{ label: 'Enable notifications', onClick: requestNotifications }] : []}
            />
          </div>
        </TabsContent>

        <TabsContent value="search">
          <SearchPanel
            filters={filters}
            onFiltersChange={setFilters}
            recent={recent}
            onClearRecent={() => setRecent([])}
            onSearch={runSearch}
            cardProps={cardProps}
          />
        </TabsContent>

        <TabsContent value="alerts">
          <AlertsPanel
            alerts={alerts}
            matches={matches}
            checking={checking}
            notificationPermission={permission}
            onRequestNotifications={requestNotifications}
            onSave={saveAlert}
            onDelete={(id) => {
              setAlerts((prev) => prev.filter((alert) => alert.id !== id));
              setMatches((prev) => prev.filter((match) => match.alertId !== id));
            }}
            onCheckNow={checkAlert}
            onCheckAll={() => alerts.filter((alert) => alert.enabled).forEach((alert) => checkAlert(alert.id))}
            onMarkAllRead={() => setMatches((prev) => prev.map((match) => ({ ...match, read: true })))}
            onClearMatches={() => setMatches([])}
            cardProps={cardProps}
          />
        </TabsContent>

        <TabsContent value="atticus">
          <AtticusPanel
            messages={messages}
            sending={sending}
            onSend={askAtticus}
            onStop={() => atticusAbort.current?.abort()}
            onReset={() => {
              atticusAbort.current?.abort();
              setMessages([]);
            }}
          />
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {saved.length === 0 ? (
            <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
              Cases you save from search results and alerts appear here.
            </div>
          ) : (
            saved.map((match) => <CaseCard key={match.id} match={match} {...cardProps(match)} />)
          )}
        </TabsContent>

        <TabsContent value="fees">
          <SavingsPanel events={savings} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold">Account</h3>
            <p className="mt-1 text-sm text-muted-foreground">{account}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={async () => {
                await onLogout();
                router.push('/');
              }}
            >
              <LogOut />
              Log out
            </Button>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold">Your data</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Alerts, saved cases, search history, and Atticus chats are stored in this browser for your account. Alerts
              run while CASER is open in a tab.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                if (!window.confirm('Remove all alerts, saved cases, history, and chats from this browser?')) return;
                setAlerts([]);
                setMatches([]);
                setSaved([]);
                setRecent([]);
                setSavings([]);
                setMessages([]);
                setFilters(DEFAULT_FILTERS);
              }}
            >
              Clear data in this browser
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DashboardCard({
  title,
  icon,
  lines,
  actions,
}: {
  title: string;
  icon: React.ReactNode;
  lines: string[];
  actions: { label: string; onClick: () => void; icon?: React.ReactNode }[];
}) {
  return (
    <div className="flex flex-col rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">{icon}</div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {actions.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {actions.map((action) => (
            <Button key={action.label} variant="outline" size="sm" onClick={action.onClick}>
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
