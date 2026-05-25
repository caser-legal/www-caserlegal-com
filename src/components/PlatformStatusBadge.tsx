import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PlatformStatus = 'available' | 'planned';

type PlatformStatusBadgeProps = {
  status: PlatformStatus;
  className?: string;
};

const labels: Record<PlatformStatus, string> = {
  available: 'Available',
  planned: 'Planned',
};

export function PlatformStatusBadge({ status, className }: PlatformStatusBadgeProps) {
  if (status === 'available') {
    return (
      <Badge
        className={cn(
          'border-emerald-500/50 bg-emerald-500/15 text-emerald-400 font-medium',
          className
        )}
      >
        {labels.available}
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        'border-border/80 bg-transparent text-foreground font-normal',
        className
      )}
    >
      {labels.planned}
    </Badge>
  );
}
