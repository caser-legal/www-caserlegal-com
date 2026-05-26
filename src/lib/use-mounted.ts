'use client';

import { useEffect, useState } from 'react';

/** True after the first client paint — avoids Radix SSR thumbs stuck at display:none on static export. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
