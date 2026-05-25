import type { Metadata } from 'next';

export const SITE_URL = 'https://www.caserlegal.com';
export const SITE_NAME = 'CASER';

function defaultOgImage() {
  return {
    url: `${SITE_URL}/logo-full.png`,
    width: 875,
    height: 352,
    alt: 'CASER — Case Automated Search of Electronic Records',
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
  title: 'CASER — Federal Court Monitoring for iOS',
  description:
    'Federal court case search and keyword alerts for iOS. Monitor 300+ court feeds with no in-app search fees. Download on the App Store.',
  path: '/',
});
