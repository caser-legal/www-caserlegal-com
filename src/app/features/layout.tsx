import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'CASER Features — Monitoring, Alerts, Atticus AI & PACER Savings',
  description:
    'Explore federal court monitoring, push keyword alerts, Atticus AI research tools, analytics, and enterprise-grade security on iOS.',
  path: '/features',
});

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
