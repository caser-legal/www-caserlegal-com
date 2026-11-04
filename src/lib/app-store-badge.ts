export const APP_STORE_BADGE_SRC = '/download-on-the-app-store.svg';
export const APP_STORE_BADGE_ASPECT = 250 / 83;

export type AppStoreBadgeSize = 'sm' | 'md' | 'lg';

export const APP_STORE_BADGE_HEIGHT: Record<AppStoreBadgeSize, string> = {
  sm: 'h-10',
  md: 'h-11',
  lg: 'h-12',
};

export function appStoreBadgeWidthClass(size: AppStoreBadgeSize): string {
  switch (size) {
    case 'sm':
      return 'w-[120px]';
    case 'md':
      return 'w-[132px]';
    case 'lg':
      return 'w-[144px]';
  }
}
