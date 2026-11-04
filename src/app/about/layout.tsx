import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'About CASER — Built Inside a Real Federal Case',
  description:
    'CASER started as an Automator workflow watching one Pro Se federal case. Today it searches 400+ federal court feeds and builds full case pages with Atticus, powered by Meta Muse.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
