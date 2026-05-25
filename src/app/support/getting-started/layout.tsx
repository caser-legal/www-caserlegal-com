import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { gettingStarted } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${gettingStarted.title} | CASER Support`,
  description: gettingStarted.description,
  path: '/support/getting-started',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
