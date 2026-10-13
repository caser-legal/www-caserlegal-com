'use client';

import { PrivyProvider } from '@privy-io/react-auth';

// The Privy app ID is public; it ships in the client bundle either way.
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? 'cmv6w8rnv00200gjpv1pdax1v';

export default function PrivyProviders({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'light',
          logo: '/logo-full.png',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
