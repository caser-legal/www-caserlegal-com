import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { troubleshooting } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${troubleshooting.title} | CASER Support`,
  description: troubleshooting.description,
  path: '/support/troubleshooting',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
