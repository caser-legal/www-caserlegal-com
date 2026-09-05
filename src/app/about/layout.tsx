import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'About CASER — Court Monitoring for Legal Professionals',
  description:
    'Learn how CASER helps litigation teams monitor 300+ federal court feeds, reduce PACER waste, and deliver keyword alerts on iOS.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
