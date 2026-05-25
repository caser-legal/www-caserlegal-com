import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import JsonLd from '@/components/JsonLd';
import { homeMetadata, SITE_URL } from '@/lib/site-metadata';

export const metadataBase = new URL(SITE_URL);

export const metadata: Metadata = {
  ...homeMetadata,
  keywords: [
    'CASER',
    'Case Alerts & Search of Electronic Records',
    'Case Search & Alerts by CASER',
    'PACER',
    'Court Monitoring',
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
