import Link from 'next/link';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import { buildPageMetadata } from '@/lib/site-metadata';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Page Not Found — CASER',
    description: 'The page you requested could not be found on caserlegal.com.',
    path: '/404',
  }),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg text-center space-y-6">
          <p className="text-sm font-medium text-primary">404</p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground leading-relaxed">
            This URL is not on our site. Return home or download CASER on the App Store.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/download">Download CASER</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
