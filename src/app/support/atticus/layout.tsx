import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { atticusGuide } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${atticusGuide.title} | CASER Support`,
  description: atticusGuide.description,
  path: '/support/atticus',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
