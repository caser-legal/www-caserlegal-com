import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { bestPractices } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${bestPractices.title} | CASER Support`,
  description: bestPractices.description,
  path: '/support/best-practices',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
