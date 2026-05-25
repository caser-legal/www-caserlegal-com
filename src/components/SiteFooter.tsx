'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AppStoreBadge } from '@/components/AppStoreLink';
import { getCopyrightYear } from '@/lib/copyright';

const productLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/download', label: 'Download' },
] as const;

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
] as const;

const supportLinks = [
  { href: '/support', label: 'Help Center' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/security-policy', label: 'Security Policy' },
] as const;

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground tracking-tight mb-4">
        {title}
      </h2>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  const year = getCopyrightYear();

  return (
    <footer className="border-t border-border bg-muted/50 mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Image
                src="/logo-full.png"
                alt="CASER — Case Automated Search of Electronic Records"
                width={120}
                height={48}
                className="h-10 w-auto max-w-[140px] object-contain object-left"
                priority={false}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Federal court case search and keyword alerts for iOS. Monitor 300+ court feeds with
              no in-app search fees.
            </p>
            <AppStoreBadge size="sm" className="opacity-90 hover:opacity-100 transition-opacity" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-7 lg:grid-cols-3">
            <FooterLinkColumn title="Product" links={productLinks} />
            <FooterLinkColumn title="Company" links={companyLinks} />
            <div>
              <h2 className="text-sm font-semibold text-foreground tracking-tight mb-4">
                Support
              </h2>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {supportLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:hi@caserlegal.com"
                    className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  >
                    hi@caserlegal.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 space-y-2 text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            &copy; {year} CASER, LLC. All rights reserved.
          </p>
          <p className="max-w-3xl mx-auto leading-relaxed">
            CASER and Case Automated Search of Electronic Records are trademarks of CASER, LLC.
            Apple, App Store, and related marks are trademarks of Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
