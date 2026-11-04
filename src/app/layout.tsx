import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import JsonLd from '@/components/JsonLd';
import SiteMotion from '@/components/SiteMotion';
import PrivyProviders from '@/components/PrivyProviders';
import { homeMetadata, SITE_URL } from '@/lib/site-metadata';

export const metadataBase = new URL(SITE_URL);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  ...homeMetadata,
  keywords: [
    'CASER',
    'Case Alerts & Search of Electronic Records',
    'Case Search & Alerts by CASER',
    'PACER',
    'Court Monitoring',
    'Atticus',
    'Meta Muse',
    'Federal Case Search',
    'Legal Technology',
    'Federal Courts',
  ],
  authors: [{ name: 'CASER Legal' }],
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-sans">
        <JsonLd />
        <SiteMotion />
        <PrivyProviders>
          {children}
          <Toaster />
        </PrivyProviders>
      </body>
    </html>
  );
}
