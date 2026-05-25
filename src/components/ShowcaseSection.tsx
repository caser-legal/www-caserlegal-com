'use client';

import PACERCalculator from '@/components/PACERCalculator';
import ShowcaseLeftSlot from '@/components/ShowcaseLeftSlot';

export default function ShowcaseSection() {
  return <PACERCalculator showcase leftSlot={<ShowcaseLeftSlot />} />;
}
