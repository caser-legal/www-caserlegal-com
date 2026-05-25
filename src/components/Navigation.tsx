'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AppStoreNavBadge } from '@/components/AppStoreLink';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/download', label: 'Download' },
] as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 shadow-[0_1px_0_0_oklch(0.82_0_0)] backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image
              src="/logo-full.png"
              alt="CASER"
              width={120}
              height={48}
              className="h-9 w-auto max-w-[120px] object-contain"
              priority
            />
          </Link>

          <div className="pointer-events-none absolute inset-x-0 hidden md:flex justify-center">
            <div className="pointer-events-auto flex items-center gap-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative z-10 hidden md:flex items-center gap-2 min-w-[120px] justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <AppStoreNavBadge />
          </div>

          <button
            type="button"
            className="relative z-10 md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-nav-menu" className="md:hidden py-4 space-y-3 border-t">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2" onClick={() => setIsOpen(false)}>
              <AppStoreNavBadge />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
