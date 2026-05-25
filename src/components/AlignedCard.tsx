import { cn } from '@/lib/utils';

type AlignedCardProps = {
  children: React.ReactNode;
  className?: string;
};

/** Wrapper for equal-height cards in a stretch grid */
export function AlignedCard({ children, className }: AlignedCardProps) {
  return <div className={cn('flex flex-col h-full', className)}>{children}</div>;
}

type TwoLineLabelProps = {
  line1: string;
  line2: string;
  className?: string;
};

/** Fixed two-line title block so prices/stats align across columns */
export function TwoLineLabel({ line1, line2, className }: TwoLineLabelProps) {
  return (
    <div className={cn('min-h-[3.25rem] flex flex-col items-center justify-center', className)}>
      <div className="font-semibold text-lg leading-tight">{line1}</div>
      <div className="font-semibold text-lg leading-tight">{line2}</div>
    </div>
  );
}
