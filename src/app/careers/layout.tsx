import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Careers at CASER — Legal Technology',
  description:
    'Join CASER and help democratize federal court access. View open roles and apply via careers@caserlegal.com.',
  path: '/careers',
});

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
