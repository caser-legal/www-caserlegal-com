import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { subscriptionsGuide } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${subscriptionsGuide.title} | CASER Support`,
  description: subscriptionsGuide.description,
  path: '/support/subscriptions',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
