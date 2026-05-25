'use client';

import Link from 'next/link';
import PageShell from '@/components/PageShell';
import SupportDocNav from '@/components/SupportDocNav';
import { LegalParagraph, LegalSection } from '@/components/LegalProse';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gavel } from '@/components/ui/icons';
import { CONTACT_EMAIL, mailto } from '@/lib/contact-email';
import type { SupportDoc } from '@/lib/support-docs';
import { SUPPORT_LAST_UPDATED } from '@/lib/support-docs';
import { ArrowLeft } from 'lucide-react';

type SupportDocPageProps = {
  doc: SupportDoc;
};

export default function SupportDocPage({ doc }: SupportDocPageProps) {
  return (
    <PageShell>
      <section className="relative py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <aside className="lg:col-span-3">
              <SupportDocNav />
            </aside>

            <div className="lg:col-span-9 max-w-3xl">
              <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
                <Link href="/support">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Help Center
                </Link>
              </Button>

              <Badge variant="secondary" className="w-fit mb-4">
                <Gavel className="w-3 h-3 mr-2" />
                {doc.badgeLabel}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">{doc.title}</h1>
              <p className="text-muted-foreground mb-2">{doc.description}</p>
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: {SUPPORT_LAST_UPDATED}
              </p>

              {doc.sections.length > 1 && (
                <nav aria-label="On this page" className="mb-10 rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm font-semibold mb-2">On this page</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {doc.sections.map((section) => (
                      <li key={section.heading}>
                        <a
                          href={`#${slugify(section.heading)}`}
                          className="hover:text-foreground underline-offset-4 hover:underline"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="space-y-8">
                {doc.sections.map((section) => (
                  <div key={section.heading} id={slugify(section.heading)}>
                    <LegalSection title={section.heading}>
                      {section.paragraphs?.map((p) => (
                        <LegalParagraph key={p.slice(0, 40)}>{p}</LegalParagraph>
                      ))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                          {section.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </LegalSection>
                  </div>
                ))}
              </div>

              {doc.relatedLinks && doc.relatedLinks.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h2 className="text-lg font-semibold mb-4">Related</h2>
                  <ul className="flex flex-wrap gap-3">
                    {doc.relatedLinks.map((link) => (
                      <li key={link.href}>
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={link.href}
                            {...(link.href.startsWith('http')
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                          >
                            {link.label}
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 rounded-lg border border-border bg-muted/50 p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Need more help? Email {CONTACT_EMAIL} — we typically respond within 24–48 hours.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href={mailto({ subject: `CASER Support: ${doc.title}` })}>Contact Support</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
