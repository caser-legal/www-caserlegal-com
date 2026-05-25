import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'CASER Support & Help Center',
  description:
    'CASER iOS help: getting started, user guide, search, alerts, Atticus AI, PACER savings, subscriptions, and troubleshooting. Contact caserlegal@proton.me.',
  path: '/support',
});

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
