import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { searchGuide } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${searchGuide.title} | CASER Support`,
  description: searchGuide.description,
  path: '/support/search',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
