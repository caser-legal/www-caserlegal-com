import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { alertsGuide } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${alertsGuide.title} | CASER Support`,
  description: alertsGuide.description,
  path: '/support/alerts',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
