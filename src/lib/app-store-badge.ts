/** Apple App Store Marketing Guidelines: minimum 40px onscreen badge height. */
export const APP_STORE_BADGE_SRC = '/download-on-the-app-store.svg';
export const APP_STORE_BADGE_ASPECT = 250 / 83;

export type AppStoreBadgeSize = 'sm' | 'md' | 'lg';

/** Tailwind height classes aligned across badge + adjacent CTAs */
export const APP_STORE_BADGE_HEIGHT: Record<AppStoreBadgeSize, string> = {
  sm: 'h-10', // 40px — Apple onscreen minimum
  md: 'h-11', // 44px
  lg: 'h-12', // 48px — hero / primary promos
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
