import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'CASER Pricing — Free Tier & CASER Pro',
  description:
    'Download CASER free on the App Store. CASER Pro is $14.99/year in-app. Business and Enterprise plans available by inquiry.',
  path: '/pricing',
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
