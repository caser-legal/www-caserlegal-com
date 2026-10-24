import { cn } from '@/lib/utils';

export type ProductStat = {
  value: string;
  /** Two lines keep “Courts”, “Sign Up”, and “Fees” aligned with equal column gaps */
  lines: readonly [string, string];
};

export const PRODUCT_STATS: ProductStat[] = [
  { value: '400+', lines: ['Federal Court', 'Feeds'] },
  { value: 'No', lines: ['Account or', 'Sign Up'] },
  { value: '$0', lines: ['Search', 'Fees'] },
];

type ProductStatRowProps = {
  className?: string;
  stats?: ProductStat[];
};

/**
 * Standard three-up product stats (federal courts, no signup, $0 search).
 * Equal column gaps; labels split on two lines for even spacing.
 */
export function ProductStatRow({ className, stats = PRODUCT_STATS }: ProductStatRowProps) {
  return (
    <div
      className={cn(
        'grid w-full max-w-md sm:max-w-xl mx-auto grid-cols-3',
        'gap-x-6 sm:gap-x-10 md:gap-x-14',
        className
      )}
      aria-label="Product highlights"
    >
      {stats.map((stat) => (
        <div
          key={`${stat.value}-${stat.lines[0]}`}
          className="flex min-w-0 flex-1 flex-col items-center px-0.5 text-center"
        >
          <div className="text-3xl font-bold text-primary tabular-nums leading-none">
            {stat.value}
          </div>
          <div className="mt-1.5 flex min-h-[2.5rem] w-full flex-col items-center justify-start">
            <span className="block text-sm leading-snug text-muted-foreground">
              {stat.lines[0]}
            </span>
            <span className="block text-sm leading-snug text-muted-foreground">
              {stat.lines[1]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export type StatHighlight = {
  value: string;
  lines: readonly string[];
};

type StatHighlightGridProps = {
  items: StatHighlight[];
  className?: string;
  valueClassName?: string;
  lineClassName?: string;
};

/** Same equal-gap grid layout for other three-stat blocks sitewide */
export function StatHighlightGrid({
  items,
  className,
  valueClassName = 'text-2xl font-bold text-primary',
  lineClassName = 'text-sm text-muted-foreground leading-snug',
}: StatHighlightGridProps) {
  const labelLines = Math.max(2, ...items.map((item) => item.lines.length));

  return (
    <div
      className={cn(
        'grid w-full grid-cols-3 gap-x-6 sm:gap-x-10 md:gap-x-14 text-center',
        className
      )}
    >
      {items.map((item) => (
        <div key={item.value} className="flex min-w-0 flex-col items-center px-0.5">
          <div className={cn('mb-2 tabular-nums leading-none', valueClassName)}>
            {item.value}
          </div>
          <div
            className="flex w-full flex-col items-center justify-start"
            style={{ minHeight: `${labelLines * 1.25}rem` }}
          >
            {item.lines.map((line) => (
              <span key={line} className={cn('block', lineClassName)}>
                {line}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
