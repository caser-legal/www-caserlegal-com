import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import { cn } from '@/lib/utils';

type PageShellProps = {
  children: React.ReactNode;
  /** Applied to the main content wrapper */
  mainClassName?: string;
  /** Skip default horizontal padding on main (e.g. full-bleed sections) */
  mainUnpadded?: boolean;
};

/**
 * Standard page chrome: sticky nav, flex-growing main, unified footer.
 */
export default function PageShell({
  children,
  mainClassName,
  mainUnpadded = false,
}: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Navigation />
      <main
        id="main-content"
        className={cn(
          'flex-1 w-full',
          !mainUnpadded && 'min-w-0',
          mainClassName
        )}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
