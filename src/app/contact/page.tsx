'use client';

import PageShell from '@/components/PageShell';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import {
  ContactCard,
  ContactCardAction,
} from '@/components/ContactCard';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageCircle, ProfessionalBriefcase } from '@/components/ui/icons';
import { Briefcase, Send } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_EMAIL, mailto } from '@/lib/contact-email';

export default function ContactPage() {
  return (
    <PageShell>
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="w-fit mx-auto">
              <MessageCircle className="w-3 h-3 mr-2" />
              Contact
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Get in touch with <span className="text-primary">CASER</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Product questions, support, or firm and enterprise programs — we respond at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <AppStoreCtaRow
              badgeSize="lg"
              className="justify-center"
              secondary={
                <MatchedOutlineButton href={mailto()} badgeSize="lg" internal={false}>
                  <Mail className="w-4 h-4" />
                  Email Us
                </MatchedOutlineButton>
              }
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold">How can we help?</h2>
            <p className="text-muted-foreground mt-2">
              Get help using CASER, discuss your team’s needs, or share feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-6 sm:gap-x-10 md:gap-x-14 gap-y-6 max-w-5xl mx-auto items-stretch">
            <ContactCard
              title="App & product"
              description={['Features, pricing, setup,', 'and troubleshooting']}
              icon={<Mail className="w-6 h-6 text-primary" />}
            >
              <p className="text-sm font-medium text-center">{CONTACT_EMAIL}</p>
              <div className="mt-auto">
                <ContactCardAction href="/support" label="Support Center" internal />
              </div>
            </ContactCard>

            <ContactCard
              title="Business"
              description={['Firm workflows, volume licensing,', 'and custom alerts']}
              icon={<Briefcase className="w-6 h-6 text-primary" />}
            >
              <div className="flex-1" />
              <ContactCardAction
                href={mailto({ subject: 'Business Inquiry - CASER' })}
                label="Contact Sales"
                icon={<Send className="w-4 h-4 mr-2" />}
              />
            </ContactCard>

            <ContactCard
              title="Enterprise"
              description={['Integrations, data services,', 'and large deployments']}
              icon={<ProfessionalBriefcase className="w-6 h-6 text-primary" />}
            >
              <div className="flex-1" />
              <ContactCardAction
                href={mailto({ subject: 'Enterprise Inquiry - CASER' })}
                label="Contact Sales"
                variant="outline"
                icon={<Send className="w-4 h-4 mr-2" />}
              />
            </ContactCard>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold">Firm or enterprise?</h2>
            <p className="text-muted-foreground">
              Email us with your firm size, practice areas, and PACER usage — we&apos;ll follow up with options for Business or Enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto w-full">
              <ContactCardAction
                href={mailto({
                  subject: 'CASER Firm Inquiry',
                  body: 'Firm size:\nPractice areas:\nPACER usage:\nNeeds:',
                })}
                label="Email firm details"
                icon={<Mail className="w-4 h-4 mr-2" />}
              />
              <ContactCardAction
                href="/pricing"
                label="View pricing"
                variant="outline"
                internal
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Individual plans: download on the{' '}
              <Link href="/download" className="text-primary hover:underline">
                App Store
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
