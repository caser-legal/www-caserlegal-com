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
      <Navigation />
      <main
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
