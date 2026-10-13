'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AtticusPassage, AtticusSource } from './firebase-atticus';

export type CourtType = 'district' | 'bankruptcy' | 'appellate';

export const DATE_RANGES = ['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'] as const;
export type DateRange = (typeof DATE_RANGES)[number];

export const COURT_TYPES: { value: CourtType; label: string }[] = [
  { value: 'district', label: 'District' },
  { value: 'bankruptcy', label: 'Bankruptcy' },
  { value: 'appellate', label: 'Appellate' },
];

export const STATES: { code: string; name: string }[] = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'],
  ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'],
  ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'],
  ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'],
  ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'], ['SD', 'South Dakota'],
  ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'],
  ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
  ['NATIONAL', 'National courts'],
].map(([code, name]) => ({ code, name }));

export type DocketMatch = {
  id: string;
  title: string;
  description: string;
  court: string;
  state: string;
  court_type: CourtType;
  published_at: string | null;
  parties: string[];
  link: string | null;
};

export type DocketSearchResult = {
  matches: DocketMatch[];
  match_count: number;
  truncated: boolean;
  scanned_courts: number;
  failed_courts: number;
  total_courts: number;
  incomplete: boolean;
  disclaimer: string;
};

export type SearchFilters = {
  states: string[];
  courtTypes: CourtType[];
  dateRange: DateRange;
};

export type Alert = {
  id: string;
  term: string;
  states: string[];
  courtTypes: CourtType[];
  exactMatch: boolean;
  caseSensitive: boolean;
  intervalMinutes: number;
  notify: boolean;
  enabled: boolean;
  createdAt: string;
  lastCheckedAt: string | null;
  lastError: string | null;
  seen: string[];
};

export type AlertMatch = {
  key: string;
  alertId: string;
  term: string;
  foundAt: string;
  read: boolean;
  match: DocketMatch;
};

export type SavingsEvent = { at: string; pages: number; kind: 'search' | 'alert' };

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  /** What was actually sent to Gemini when it differs from the visible text (case analysis). */
  prompt?: string;
  sources?: AtticusSource[];
  passages?: AtticusPassage[];
  searchEntryPointHTML?: string | null;
};

// Every search result and alert match counts as one PACER page; a search with no results still costs one.
export const PACER_PAGE_FEE = 0.1;

export function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** State mirrored to localStorage under a per-user key, so each Privy account keeps its own workspace. */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const loadedKey = useRef<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      setValue(raw ? (JSON.parse(raw) as T) : initial);
    } catch {
      setValue(initial);
    }
    loadedKey.current = key;
  }, [key]);

  useEffect(() => {
    if (loadedKey.current !== key) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: keep working in memory.
    }
  }, [key, value]);

  const update = useCallback((next: T | ((prev: T) => T)) => setValue(next), []);
  return [value, update] as const;
}

export function formatDate(value: string | null): string {
  if (!value) return 'Date unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unknown';
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function formatInterval(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  if (minutes % 1440 === 0) return minutes === 1440 ? 'Daily' : `${minutes / 1440} days`;
  if (minutes % 60 === 0) return minutes === 60 ? 'Hourly' : `${minutes / 60} hr`;
  return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
}

export function courtTypeLabel(type: CourtType): string {
  return COURT_TYPES.find((item) => item.value === type)?.label ?? type;
}
