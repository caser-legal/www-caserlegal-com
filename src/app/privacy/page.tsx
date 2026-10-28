'use client';

import PageShell from '@/components/PageShell';
import { LegalParagraph, LegalSection } from '@/components/LegalProse';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { CONTACT_EMAIL, PRIVACY_RIGHTS_EMAIL } from '@/lib/contact-email';

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: October 27, 2026</p>

          <div className="space-y-8">
            <LegalSection title="1. Information We Collect">
              <LegalParagraph>
                The iPhone app stores search history, keyword monitors, saved cases, Atticus
                conversations, settings, and activity statistics locally. Requests to court feeds
                disclose network information such as your IP address to the source. Content you send
                to Atticus is processed remotely as described below.
              </LegalParagraph>
              <LegalParagraph>
                Apple processes App Store purchases; CASER keeps subscription and credit accounting
                on your device. Google receives Atticus requests and associated app, network, model-use,
                and integrity information to operate and protect its services. CASER does not include
                advertising, Firebase Analytics, or Crashlytics in the current iPhone app.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="2. How We Use Your Information">
              <LegalParagraph>
                We use collected information to: (a) provide and maintain the service, (b) process
                searches and deliver alerts, (c) track PACER savings, (d) improve service
                performance and features, (e) provide AI-powered research assistance, and (f) ensure
                security.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="3. Data Storage and Security">
              <LegalParagraph>
                Your data is stored securely on your device using: (a) iOS Keychain for sensitive
                data, (b) TLS encryption for network requests, (c) local storage with iOS data
                protection. The local history and settings stay on your device; content included in
                an Atticus request is also processed by Google.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="4. Third-Party Services">
              <LegalParagraph>
                Atticus uses Google Gemini through Firebase AI Logic, including app integrity verification
                and Google Search grounding. Apple processes App Store subscriptions and purchases.
                Court RSS, PACER, and GovInfo provide source records. These providers apply their own
                privacy policies to requests they receive.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="5. Data Sharing">
              <LegalParagraph>
                We do not sell, rent, or share your personal information with third parties for
                marketing purposes. We may share data only: (a) with service providers necessary to
                operate the application, (b) when required by law or legal process, (c) to protect
                our rights or prevent fraud, or (d) with your explicit consent.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="6. AI Assistant (Atticus)">
              <LegalParagraph>
                Atticus sends your question, relevant conversation context, and included case information
                to Google through Firebase AI Logic. This includes the request-size check before an
                answer is generated. Google may create web search queries from that content to find
                public sources. The provider processes the content; this is not end-to-end encrypted
                messaging. Using Atticus is optional.
              </LegalParagraph>
              <LegalParagraph>
                In CASER version 8.0 and later, Atticus uses Meta&apos;s Muse AI instead of Google. When you
                open a case&apos;s Details, only the public court record for that filing is sent through
                CASER&apos;s server to Meta, and Meta may search the web for public sources. Meta may use this
                public court information to train its models. CASER saves the resulting case briefing on its
                server so anyone who opens the same filing sees it without a new AI request; these briefings
                contain only public court information and nothing about you.
              </LegalParagraph>
              <LegalParagraph>
                When you ask Atticus a follow-up question, your question, the case details and your earlier
                questions about that case are sent through CASER&apos;s server to Meta. Meta does not use this
                content to train its models. CASER&apos;s server does not store your questions or answers;
                they are saved only on your device.
              </LegalParagraph>
              <LegalParagraph>
                Google retains prompts, context, and output used for Google Search grounding for 30 days,
                including for debugging and testing its grounding systems. Other handling follows{' '}
                <a href="https://ai.google.dev/gemini-api/terms" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Google&apos;s Gemini API terms
                </a>
                . Those terms distinguish paid and unpaid processing; unpaid processing can include
                product improvement and human review. CASER does not promise zero provider retention
                or that AI content will never be used to improve Google&apos;s services. Do not send
                confidential, privileged, or sensitive information to Atticus.
              </LegalParagraph>
              <LegalParagraph>
                Your local chat history is separate from Google&apos;s processing. Deleting it does not
                delete copies retained by Google. See{' '}
                <a href="https://firebase.google.com/docs/ai-logic/data-governance" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Firebase AI Logic data governance
                </a>{' '}
                and the Google terms linked above for provider handling and available rights.
              </LegalParagraph>
              <LegalParagraph>
                Before Atticus sends anything, the app shows a disclaimer that explains Atticus is AI,
                is not legal advice, and sends your questions to Google (Gemini). Atticus stays off until
                you tap Accept. When you accept, the app saves a record on your device of the disclaimer
                version and text you accepted, the time, a random install identifier, and your app version,
                iOS version, device model, locale, and time zone. This record is encrypted on your device,
                is not sent to CASER or Google, and is kept if you erase app data so there is a history of
                what you agreed to. Deleting the app removes it.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="7. Notifications">
              <LegalParagraph>
                The current iPhone app schedules local notifications after feed scans. It does not
                register an APNs device token with a CASER monitoring server. iOS controls background
                execution, so notifications are not guaranteed at a fixed interval. You can disable
                notifications or lock-screen previews in iOS Settings. Match notifications use a generic
                message; case titles and matched keywords remain inside CASER.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="8. Data Retention">
              <LegalParagraph>
                Search history, saved cases, conversations, and settings can be cleared in the app.
                Protected local files are excluded from device backups. Keychain records, including
                purchase-credit accounting, may survive an uninstall on the same device but are not
                portable to a different device. Restore Purchases restores eligible subscriptions; it
                does not restore spent consumables or provide cloud recovery of local history. Clearing
                app content does not cancel an Apple subscription or erase its purchase records.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="9. Your Rights">
              <LegalParagraph>
                You have the right to: (a) access your personal data, (b) correct inaccurate data,
                (c) request deletion of your data, (d) export your data, (e) opt-out of non-essential
                communications, and (f) withdraw consent for data processing. Contact{' '}
                <a
                  href={`mailto:${PRIVACY_RIGHTS_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {PRIVACY_RIGHTS_EMAIL}
                </a>{' '}
                to exercise these rights.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="10. Children's Privacy">
              <LegalParagraph>
                CASER is not intended for users under 18 years of age. We do not knowingly collect
                information from children. If you believe a child has provided information, contact us
                immediately.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="11. California Privacy Rights">
              <LegalParagraph>
                California residents have additional rights under CCPA, including the right to know
                what personal information is collected, the right to delete personal information, and
                the right to opt-out of sale (we do not sell personal information).
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="12. Changes to Privacy Policy">
              <LegalParagraph>
                We may update this privacy policy periodically. Material changes will be communicated
                when practicable. Continued use after changes constitutes acceptance of the updated
                policy.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="13. Contact Information">
              <LegalParagraph>
                For privacy-related questions, data requests, or to exercise your rights, contact{' '}
                <a
                  href={`mailto:${PRIVACY_RIGHTS_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {PRIVACY_RIGHTS_EMAIL}
                </a>
                . For general support, use{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </LegalParagraph>
            </LegalSection>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
