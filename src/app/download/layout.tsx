import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Download CASER for iOS',
  description:
    'Get CASER on the App Store. Monitor federal courts, set keyword alerts, and track PACER savings on iPhone.',
  path: '/download',
});

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
