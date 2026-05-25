import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact CASER — Business & Enterprise Inquiries',
  description:
    'Contact CASER for product support, firm licensing, and enterprise integrations. Email caserlegal@proton.me.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
