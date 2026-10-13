'use client';

import PageShell from '@/components/PageShell';
import { LegalParagraph, LegalSection } from '@/components/LegalProse';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/contact-email';

export default function SecurityPolicyPage() {
  return (
    <PageShell>
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Security Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: May 2026</p>

          <div className="space-y-8">
            <LegalSection title="Scope">
              <LegalParagraph>
                This policy applies to the CASER marketing website at caserlegal.com and related
                static web properties created and operated by Adam Doherty. The CASER iOS application has its own
                security and privacy practices documented in the App Store listing and in-app Terms
                &amp; Privacy.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="Reporting a vulnerability">
              <LegalParagraph>
                If you believe you have found a security issue, please report it responsibly to{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                . Include a clear description, steps to reproduce, and impact assessment. We aim to
                acknowledge reports within five business days.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="What we host">
              <LegalParagraph>
                The public website is a static site (HTML/CSS/JS) deployed on Vercel. We do not
                process payments, store user accounts, or collect form submissions on this domain.
                Contact requests use mailto links handled by your email client.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="Transport and headers">
              <LegalParagraph>
                We enforce HTTPS with HSTS, Content-Security-Policy, frame denial, and related
                browser protections via our hosting configuration. Third-party scripts are minimized;
                the site does not load advertising trackers.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="Dependencies">
              <LegalParagraph>
                We monitor npm advisories and apply patches to build dependencies. Production
                visitors receive pre-built static assets only.
              </LegalParagraph>
            </LegalSection>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
