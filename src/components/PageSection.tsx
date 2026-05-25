import { cn } from '@/lib/utils';

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Muted background band */
  muted?: boolean;
  /** Default marketing section vertical rhythm */
  size?: 'default' | 'compact' | 'hero';
};

const sizeClasses = {
  hero: 'py-20 lg:py-32',
  default: 'py-16 lg:py-24',
  compact: 'py-12 lg:py-16',
};

export default function PageSection({
  children,
  className,
  id,
  muted = false,
  size = 'default',
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        sizeClasses[size],
        muted && 'bg-muted/50',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
