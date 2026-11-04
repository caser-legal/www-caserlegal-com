import type { Metadata } from 'next';
import { LOGO_ALT, PRODUCT_FULL_NAME, PRODUCT_SHORT_NAME } from '@/lib/branding';

export const SITE_URL = 'https://www.caserlegal.com';
export const SITE_NAME = 'CASER';

function defaultOgImage() {
  return {
    url: `${SITE_URL}/logo-full.png`,
    width: 875,
    height: 352,
    alt: LOGO_ALT,
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}` | '/';
}): Metadata {
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [defaultOgImage()],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/logo-full.png`],
    },
  };
}

export const homeMetadata = buildPageMetadata({
  title: 'CASER — Understand Any Federal Case on iPhone',
  description:
    `${PRODUCT_FULL_NAME} (${PRODUCT_SHORT_NAME}). Search 400+ federal court feeds with no per-search fees. Open any filing and Atticus, powered by Meta Muse, builds the case page: timeline, who's who and sources. Download on the App Store.`,
  path: '/',
});
