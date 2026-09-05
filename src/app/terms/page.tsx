'use client';

import PageShell from '@/components/PageShell';
import { LegalParagraph, LegalSection } from '@/components/LegalProse';
import { Badge } from '@/components/ui/badge';
import { Gavel } from '@/components/ui/icons';
import { CONTACT_EMAIL } from '@/lib/contact-email';
import { PRODUCT_LEGAL_REFERENCE } from '@/lib/branding';

export default function TermsPage() {
  return (
    <PageShell>
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Badge variant="secondary" className="w-fit mb-4">
            <Gavel className="w-3 h-3 mr-2" />
            Terms of Service
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: September 4, 2026</p>

          <div className="space-y-8">
            <LegalSection title="1. Acceptance of Terms">
              <LegalParagraph>
                By accessing and using {PRODUCT_LEGAL_REFERENCE}, you accept and agree to be bound
                by these Terms of Service. If you do not agree, do not use this application.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="2. Service Description">
              <LegalParagraph>
                CASER provides access to federal district and bankruptcy case filings through
                search functionality, keyword monitoring alerts, AI-powered legal research
                assistance (Atticus), and case management tools. Individual use is offered through
                the CASER iOS app with a free tier and an optional CASER Pro annual subscription
                purchased via the Apple App Store.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="3. Legal Disclaimer">
              <LegalParagraph>
                CASER does not provide legal advice. This application is a monitoring and research
                tool only. You should not rely on CASER as a substitute for professional legal
                counsel. Always consult with a qualified attorney for legal advice specific to your
                situation.
              </LegalParagraph>
              <LegalParagraph>
                Atticus sends your question and relevant context to Google for AI processing and
                public-web research. Review the{' '}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{' '}
                before use, including Google&apos;s retention and data-use terms. Do not submit
                confidential, privileged, or sensitive information. AI answers can be incomplete or
                incorrect; verify the case identity, citations, and any deadlines independently.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="4. No Warranty on Accuracy">
              <LegalParagraph>
                While we strive for accuracy, CASER makes no warranties regarding the completeness,
                accuracy, or timeliness of case information, search results, or alert notifications.
                Case filings may be delayed, incomplete, or contain errors. Always verify critical
                information with official court records.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="5. Alert System Limitations">
              <LegalParagraph>
                The keyword monitoring system targets checks every 15 minutes while the app is open.
                iOS controls background timing; force-quitting stops background checks. Checks
                may be delayed or miss filings due to technical issues, data source
                delays, or system maintenance. Do not rely solely on CASER alerts for time-sensitive
                legal matters.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="6. User Responsibilities">
              <LegalParagraph>
                You are responsible for: (a) maintaining the confidentiality of your device and
                Apple ID, (b) all activities under your use of the app, (c) ensuring your use
                complies with applicable laws, and (d) verifying all case information with official
                sources.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="7. Acceptable Use">
              <LegalParagraph>
                You may not: (a) share your subscription access with others in violation of Apple&apos;s
                terms, (b) use automated systems to scrape or download bulk data, (c) reverse engineer
                the application, (d) use the service for any unlawful purpose, or (e) interfere with
                the service&apos;s operation.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="8. Search Fees and Savings Tracker">
              <LegalParagraph>
                Searching cases and accessing PACER document links through CASER incurs no per-search
                or per-result fees within the app. The PACER Savings Tracker provides illustrative estimates based on assumed billable
                search pages at $0.10 per page, with PACER&apos;s $30 quarterly waiver. A case result is
                not a billable page. Estimates exclude document fees and do not measure actual bills. CASER Pro is a yearly subscription ($14.99/year via the App
                Store). The tracker is informational only and does not represent actual PACER bills.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="9. Subscriptions and Billing">
              <LegalParagraph>
                CASER Pro subscriptions are processed by Apple. Payment, renewal, cancellation, and
                refunds are governed by Apple&apos;s terms. Manage subscriptions in your Apple ID
                settings or at{' '}
                <a
                  href="https://apps.apple.com/account/subscriptions"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Subscriptions
                </a>
                . See also the{' '}
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Media Services Terms
                </a>
                .
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="10. Account Termination">
              <LegalParagraph>
                We reserve the right to suspend access for violations of these terms or fraudulent
                activity. Contact{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>{' '}
                with questions about your use of the service.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="11. Limitation of Liability">
              <LegalParagraph>
                CASER and its operators shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of the service, including
                but not limited to missed filings, inaccurate information, or service interruptions.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="12. Changes to Terms">
              <LegalParagraph>
                We reserve the right to modify these terms at any time. Continued use of the service
                after changes constitutes acceptance of the modified terms. Material changes will be
                communicated when practicable.
              </LegalParagraph>
            </LegalSection>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
