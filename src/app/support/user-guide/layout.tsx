import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';
import { userGuide } from '@/lib/support-docs';

export const metadata: Metadata = buildPageMetadata({
  title: `${userGuide.title} | CASER Support`,
  description: userGuide.description,
  path: '/support/user-guide',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
