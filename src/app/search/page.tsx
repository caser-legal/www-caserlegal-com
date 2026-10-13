import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CaserWebApp from '@/components/caser-app/CaserWebApp';

export const metadata: Metadata = {
  title: 'CASER Search',
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return (
    <PageShell>
      <CaserWebApp />
    </PageShell>
  );
}
