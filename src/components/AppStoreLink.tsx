import Image from 'next/image';
import Link from 'next/link';
import { APP_STORE_URL } from '@/lib/app-store';
import {
  APP_STORE_BADGE_HEIGHT,
  APP_STORE_BADGE_SRC,
  appStoreBadgeWidthClass,
  type AppStoreBadgeSize,
} from '@/lib/app-store-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AppStoreBadgeProps = {
  size?: AppStoreBadgeSize;
  className?: string;
};

export function AppStoreBadge({ size = 'md', className }: AppStoreBadgeProps) {
  const heightClass = APP_STORE_BADGE_HEIGHT[size];
  const widthClass = appStoreBadgeWidthClass(size);

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      aria-label="Download on the App Store"
    >
      <Image
        src={APP_STORE_BADGE_SRC}
        alt="Download on the App Store"
        width={250}
        height={83}
        className={cn(heightClass, widthClass, 'w-auto max-w-none object-contain object-left')}
        priority={size === 'lg'}
      />
    </a>
  );
}

export function AppStoreBadgeLink(props: AppStoreBadgeProps) {
  return <AppStoreBadge {...props} />;
}

type MatchedOutlineButtonProps = {
  href: string;
  children: React.ReactNode;
  badgeSize?: AppStoreBadgeSize;
  className?: string;
  internal?: boolean;
};

export function MatchedOutlineButton({
  href,
  children,
  badgeSize = 'lg',
  className,
  internal = true,
}: MatchedOutlineButtonProps) {
  const heightClass = APP_STORE_BADGE_HEIGHT[badgeSize];
  const classes = cn(
    heightClass,
    'px-6 text-sm font-medium inline-flex items-center justify-center gap-2',
    className
  );

  if (internal) {
    return (
      <Button variant="outline" className={classes} asChild>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button variant="outline" className={classes} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
}

type AppStoreCtaRowProps = {
  badgeSize?: AppStoreBadgeSize;
  className?: string;
  secondary?: React.ReactNode;
};

export function AppStoreCtaRow({
  badgeSize = 'lg',
  className,
  secondary,
}: AppStoreCtaRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-stretch sm:items-center gap-4',
        className
      )}
    >
      <AppStoreBadge size={badgeSize} className="self-center sm:self-auto" />
      {secondary}
    </div>
  );
}

export function AppStoreNavBadge() {
  return <AppStoreBadge size="sm" />;
}
