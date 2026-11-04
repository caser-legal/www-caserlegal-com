import { PRODUCT_FULL_NAME, PRODUCT_SHORT_NAME } from '@/lib/branding';
import { SITE_URL } from '@/lib/site-metadata';
import { APP_STORE_URL } from '@/lib/app-store';
import { CONTACT_EMAIL } from '@/lib/contact-email';

const organizationJsonLd = {
  '@type': 'Organization',
  name: 'CASER',
  founder: {
    '@type': 'Person',
    name: 'Adam Doherty',
  },
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.png`,
  email: CONTACT_EMAIL,
  sameAs: [APP_STORE_URL],
};

const softwareJsonLd = {
  '@type': 'SoftwareApplication',
  name: 'CASER',
  alternateName: [PRODUCT_FULL_NAME, PRODUCT_SHORT_NAME],
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    `${PRODUCT_FULL_NAME} (${PRODUCT_SHORT_NAME}). Search 400+ U.S. federal court feeds with no per-search fees. Atticus, powered by Meta Muse, builds a case page for any filing with a timeline, who's who and sources.`,
  url: APP_STORE_URL,
};

const websiteJsonLd = {
  '@type': 'WebSite',
  name: 'CASER',
  url: SITE_URL,
};

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [organizationJsonLd, softwareJsonLd, websiteJsonLd],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
