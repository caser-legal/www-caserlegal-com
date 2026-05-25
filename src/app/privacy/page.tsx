'use client';

import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import { LegalParagraph, LegalSection } from '@/components/LegalProse';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Badge variant="secondary" className="w-fit mb-4">
            <Shield className="w-3 h-3 mr-2" />
            Privacy Policy
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: May 2026</p>

          <div className="space-y-8">
            <LegalSection title="1. Information We Collect">
              <LegalParagraph>
                Usage Data: Search queries, keyword monitors, saved cases, search history, AI
                assistant conversations, and usage statistics (search counts, monitor matches, pages
                viewed). All data is stored locally on your device.
              </LegalParagraph>
              <LegalParagraph>
                Technical Data: Device type, iOS version, app version, and performance metrics.
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
                protection. Search history and settings remain on your device.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="4. Third-Party Services">
              <LegalParagraph>
                We use Google Gemini AI for the Atticus assistant and Apple for push notifications.
                These services have their own privacy policies and data handling practices.
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
                Conversations with Atticus are processed using Google&apos;s Gemini AI. Your questions
                are sent to Google&apos;s servers for processing. AI responses and conversation history
                are stored locally on your device. Case information provided to the AI is limited to
                search results from our database.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="7. Push Notifications">
              <LegalParagraph>
                If you enable push notifications for case alerts, we collect your device push token
                to deliver notifications. You can disable notifications at any time in iOS Settings.
                Notification content includes matched keywords and case titles.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="8. Data Retention">
              <LegalParagraph>
                Your data is stored locally on your device and retained until you delete it. Search
                history, saved cases, and settings can be cleared from within the app. Uninstalling the
                app removes all local data.
              </LegalParagraph>
            </LegalSection>

            <LegalSection title="9. Your Rights">
              <LegalParagraph>
                You have the right to: (a) access your personal data, (b) correct inaccurate data,
                (c) request deletion of your data, (d) export your data, (e) opt-out of non-essential
                communications, and (f) withdraw consent for data processing. Contact{' '}
                <a href="mailto:rights@caserlegal.com" className="text-primary hover:underline">
                  rights@caserlegal.com
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
                <a href="mailto:rights@caserlegal.com" className="text-primary hover:underline">
                  rights@caserlegal.com
                </a>
                .
              </LegalParagraph>
            </LegalSection>
          </div>

          <div className="flex gap-4 mt-12">
            <Button asChild>
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
