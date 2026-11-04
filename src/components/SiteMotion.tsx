'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/muse') return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'))
      .filter((section) => !section.classList.contains('caser-hero'));
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    sections.forEach((section, index) => {
      section.classList.add('site-reveal');
      section.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
