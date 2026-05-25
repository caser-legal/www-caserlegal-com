import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'CASER Security Policy',
  description:
    'Security practices for caserlegal.com, vulnerability reporting, and how we protect the CASER marketing site.',
  path: '/security-policy',
});

export default function SecurityPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
