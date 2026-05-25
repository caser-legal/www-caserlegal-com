'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supportNav } from '@/lib/support-docs';
import { cn } from '@/lib/utils';

export default function SupportDocNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Support documentation" className="space-y-4">
      <label htmlFor="support-doc-select" className="sr-only">
        Jump to a guide
      </label>
      <select
        id="support-doc-select"
        className="w-full md:hidden rounded-md border border-border bg-background px-3 py-2 text-sm"
        value={pathname}
        onChange={(e) => {
          window.location.href = e.target.value;
        }}
      >
        <option value="/support">Help Center</option>
        {supportNav.map((item) => (
          <option key={item.path} value={item.path}>
            {item.title}
          </option>
        ))}
      </select>

      <ul className="hidden md:block space-y-1 text-sm">
        <li>
          <Link
            href="/support"
            className={cn(
              'block rounded-md px-3 py-2 transition-colors',
              pathname === '/support'
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            Help Center
          </Link>
        </li>
        {supportNav.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={cn(
                'block rounded-md px-3 py-2 transition-colors',
                pathname === item.path
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
