import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { dataPrivacy } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${dataPrivacy.title} | CASER Support`,
  description: dataPrivacy.description,
  path: '/support/data-and-privacy',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
