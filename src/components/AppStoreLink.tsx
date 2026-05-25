import { APP_STORE_URL } from '@/lib/app-store';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { Download } from 'lucide-react';

type AppStoreLinkProps = {
  className?: string;
  children?: React.ReactNode;
};

export function AppStoreLink({ className, children }: AppStoreLinkProps) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children ?? 'Download on the App Store'}
    </a>
  );
}

type DownloadButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  label?: string;
  showIcon?: boolean;
};

export function DownloadButton({
  className,
  label = 'Download',
  showIcon = true,
  variant = 'default',
  size = 'default',
}: DownloadButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
        {showIcon && <Download className="w-4 h-4" />}
        {label}
      </a>
    </Button>
  );
}

export function AppStoreBadgeLink({ className }: { className?: string }) {
  return (
    <AppStoreLink className={cn('inline-block', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
        alt="Download on the App Store"
        width={156}
        height={52}
        className="h-[52px] w-auto"
      />
    </AppStoreLink>
  );
}
