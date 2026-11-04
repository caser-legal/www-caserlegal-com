import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'CASER Features — Atticus Case Pages, Search, Alerts & PACER Savings',
  description:
    'Open any federal filing and Atticus, powered by Meta Muse, builds the case page: timeline, who\'s who and sources. Plus search across 400+ court feeds, a 30-day archive, alerts and PACER savings on iOS.',
  path: '/features',
});

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
