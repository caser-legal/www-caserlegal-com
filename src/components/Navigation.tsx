'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AppStoreNavBadge } from '@/components/AppStoreLink';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLogin, usePrivy } from '@privy-io/react-auth';

const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/download', label: 'Download' },
  { href: '/support', label: 'Support' },
] as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const { login } = useLogin({
    onComplete: ({ wasAlreadyAuthenticated }) => {
      if (!wasAlreadyAuthenticated) router.push('/search');
    },
  });
  const authLabel = authenticated ? 'Logout' : 'Login';
  const handleLogin = async () => {
    if (!authenticated) return login();
    await logout();
    router.push('/');
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      aria-label="Main navigation"
    >
      <div className="container mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image
              src="/logo-full.png"
              alt="CASER"
              width={120}
              height={58}
              className="h-8 w-auto max-w-[108px] object-contain"
              priority
            />
          </Link>

          <div className="pointer-events-none absolute inset-x-[150px] hidden xl:flex justify-center">
            <div className="pointer-events-auto flex items-center gap-5">
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

          <div className="relative z-10 hidden xl:flex items-center gap-2 min-w-[180px] justify-end mr-[max(0px,calc(31px_-_max(0px,(100vw_-_1320px)/2)))]">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <AppStoreNavBadge />
            <button
              type="button"
              onClick={handleLogin}
              disabled={!ready}
              className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap text-sm font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {authLabel}
            </button>
          </div>

          <button
            type="button"
            className="relative z-10 xl:hidden inline-flex h-11 w-11 items-center justify-center -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-nav-menu" className="xl:hidden py-4 space-y-1 border-t">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-11 items-center py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="flex min-h-11 items-center py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                handleLogin();
              }}
              disabled={!ready}
              className="flex min-h-11 w-full items-center py-2 text-left text-base font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {authLabel}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
