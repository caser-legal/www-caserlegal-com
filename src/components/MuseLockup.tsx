'use client';

import { useEffect, useRef, useState } from 'react';

const LINES = [
  { text: 'finds federal filings', emoji: '⚖️' },
  { text: 'searches every court', emoji: '🏛️' },
  { text: 'pulls the docket', emoji: '📄' },
  { text: 'brings the case back', emoji: '🔗' },
];

export default function MuseLockup() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function playMuse() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
    setPlaying(true);
  }

  function stopMuse() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  }

  useEffect(() => {
    const next = window.setTimeout(() => {
      setIndex((current) => (current + 1) % LINES.length);
    }, 2400);
    return () => window.clearTimeout(next);
  }, [index]);

  const line = LINES[index];

  return (
    <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
      <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
        <span>CASER on</span>
        <span
          className="relative inline-block h-[0.9em] w-[0.9em] overflow-hidden rounded-full bg-muted align-middle"
          onMouseEnter={playMuse}
          onMouseLeave={stopMuse}
        >
          <img
            src="/muse/jolly.png"
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-top ${playing ? 'opacity-0' : 'opacity-100'}`}
          />
          <video
            ref={videoRef}
            src="/muse/hatch-working.mp4"
            muted
            playsInline
            loop
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover ${playing ? 'opacity-100' : 'opacity-0'}`}
          />
        </span>
        <span>,</span>
      </span>
      <span className="mt-1 block h-[1.15em] overflow-hidden">
        <span
          key={line.text}
          className="inline-flex items-center gap-3 text-primary animate-[muse-rise_450ms_ease-out]"
        >
          {line.text}
          <span aria-hidden className="text-[0.72em] leading-none">
            {line.emoji}
          </span>
        </span>
      </span>
    </h1>
  );
}
