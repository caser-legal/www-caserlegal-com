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
          <p className="text-muted-foreground mb-8">Last Updated: October 28, 2026</p>

          <div className="space-y-8">
            <LegalSection title="1. Information We Collect">
              <LegalParagraph>
                The iPhone app stores search history, keyword monitors, saved cases, Atticus
                conversations, settings, and activity statistics locally. Requests to court feeds
                disclose network information such as your IP address to the source. Content you send
                to Atticus is processed remotely as described below.
              </LegalParagraph>
              <LegalParagraph>
                In CASER version 8.0 and later, Atticus requests go through CASER&apos;s server. To confirm
                that requests come from the genuine CASER app, the app uses Apple App Attest: the server
                receives a key identifier created for this installation of the app, with Apple&apos;s
                attestation of it, and turns it into an anonymous install ID. It contains no name, email
                address, Apple ID or other personal information. The server keeps usage counters (how many
                Atticus case briefings and questions were used each month) under that anonymous install ID
                or, for CASER Pro subscribers, under the Apple subscription&apos;s transaction ID so the
                allowance follows the subscription across devices. Purchased Atticus credits are kept on the
                server under a random account identifier created by the app.
              </LegalParagraph>
              <LegalParagraph>
                To verify that each Atticus request comes from that installation, CASER&apos;s server stores
                the App Attest public key created for the installation, together with a usage counter, under
                the anonymous install ID. To limit abuse, the server keeps short-lived rate-limit counters
                keyed by a one-way hash of your IP address, not the address itself; these counters expire
                within a day.
              </LegalParagraph>
              <LegalParagraph>
                Apple processes App Store purchases. CASER never receives your payment details or Apple ID.
                To check a subscription or add purchased credits, the app sends CASER&apos;s server only
                Apple-signed transaction records (such as the product, transaction ID, and purchase and
                expiry dates). Apple also sends CASER&apos;s server App Store Server Notifications about
                refunds, revocations, renewals and expirations, which CASER uses to keep subscriptions and
                purchased uses accurate. Google receives Atticus requests and associated app, network, model-use,
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
                and Google Search grounding. In version 8.0 and later, Atticus uses Meta&apos;s Muse API
                instead, Apple App Attest to verify genuine app requests, and, as a fallback, Apple
                Intelligence on your device or Apple Private Cloud Compute. CASER&apos;s server and usage
                counters are run on its hosting and database providers. Apple processes App Store
                subscriptions and purchases.
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
                In CASER version 8.0 and later, Atticus uses Meta&apos;s Muse API instead of Google. When you
                open a case&apos;s Details, only the public court record for that filing is sent through
                CASER&apos;s server to Meta to research the case and explain the filing, and Meta may search
                the web for public sources. These requests use Meta&apos;s Contributor mode, in which Meta may
                use this public court information to improve its models. CASER saves the resulting case briefing on its
                server so anyone who opens the same filing sees it without a new AI request; these briefings
                contain only public court information and nothing about you.
              </LegalParagraph>
              <LegalParagraph>
                When you ask Atticus a follow-up question, your question, the case details and your earlier
                questions about that case are sent through CASER&apos;s server to Meta. These requests use
                Meta&apos;s Standard mode, in which Meta does not use your questions to train its models.
                CASER&apos;s server does not store your questions or answers; they are saved only on your
                device.
              </LegalParagraph>
              <LegalParagraph>
                If Muse is unavailable, the app may answer using Apple Intelligence on your device or Apple
                Private Cloud Compute instead. On-device answers are generated on your iPhone. Private Cloud
                Compute requests are processed by Apple under Apple&apos;s privacy terms, not sent to Meta or
                to CASER&apos;s server.
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
              <LegalParagraph>
                In version 8.0 and later, monthly Atticus usage counters on CASER&apos;s server expire about
                40 days after the month they count, and short-term rate-limit counters expire within a day.
                Purchased credit balances and records of redeemed purchases are kept so credits are not lost
                or granted twice. Shared case briefings contain only public court information.
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
