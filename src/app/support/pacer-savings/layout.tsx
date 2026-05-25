import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { pacerSavingsGuide } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${pacerSavingsGuide.title} | CASER Support`,
  description: pacerSavingsGuide.description,
  path: '/support/pacer-savings',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
