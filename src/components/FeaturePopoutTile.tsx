'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

type FeaturePopoutTileProps = {
  n: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  howTo: string;
};

export default function FeaturePopoutTile({ n, title, body, img, alt, howTo }: FeaturePopoutTileProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group feature-tile w-full overflow-hidden rounded-2xl border bg-card text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex h-[300px] items-center justify-center overflow-hidden bg-[#f5f5f5] px-4 py-5 sm:h-[340px]">
          <Image
            src={img}
            alt={alt}
            width={1070}
            height={2149}
            className="h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex min-h-[230px] flex-col p-5 sm:p-6">
          <div className="mb-3 text-[10px] font-semibold tracking-[.16em] text-primary">{n} /</div>
          <span className="block text-xl font-semibold">{title}</span>
          <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">{body}</span>
          <span className="mt-auto inline-block pt-5 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
            See how it works →
          </span>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl sm:max-w-4xl overflow-y-auto rounded-3xl border-0 bg-[#f5f5f5] p-0 sm:grid-cols-2">
          <div className="flex self-stretch items-center justify-center bg-[#f5f5f5] px-6 py-5 sm:px-8 sm:py-6">
            <Image
              src={img}
              alt={alt}
              width={1070}
              height={2149}
              className="h-[min(560px,64vh)] w-auto shrink-0 object-contain drop-shadow-xl"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
            <div className="text-[10px] font-semibold tracking-[.16em] text-primary">{n} /</div>
            <DialogTitle className="text-3xl font-bold leading-tight">{title}</DialogTitle>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">How to use it</p>
              <p className="text-base leading-relaxed text-foreground">{howTo}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
