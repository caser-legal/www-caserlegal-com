'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ScalesOfJustice, 
  LegalSeal,
  Shield,
  ArrowRight
} from '@/components/ui/icons';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/logo-full.png" alt="CASER" className="h-11" />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/download">
                Download
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit">
              <LegalSeal className="w-3 h-3 mr-2" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Your Privacy is
              <span className="text-primary"> Our Priority</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              CASER is committed to protecting your personal information and maintaining 
              the highest standards of data privacy and security for legal professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/support">
                  Contact Privacy Team
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/terms">
                  View Terms of Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Introduction</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This Privacy Policy describes how CASER ("we," "our," or "us") collects, 
                  uses, and protects your information when you use our court monitoring application 
                  and related services. We are committed to protecting your privacy and ensuring 
                  the security of your personal information.
                </p>
                <p className="text-muted-foreground">
                  By using CASER, you agree to the collection and use of information in 
                  accordance with this policy. If you disagree with any aspect of this privacy 
                  policy, you should not use our application or services.
                </p>
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> January 1, 2024
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Personal Information</h4>
                  <p className="text-muted-foreground mb-3">
                    When you create an account, we collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Name and email address</li>
                    <li>Professional information (firm, role)</li>
                    <li>Payment information (processed securely by third parties)</li>
                    <li>Account preferences and settings</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Usage Information</h4>
                  <p className="text-muted-foreground mb-3">
                    We automatically collect information about how you use our service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Search queries and monitoring preferences</li>
                    <li>Cases and keywords you track</li>
                    <li>Alert configurations and notifications</li>
                    <li>App usage statistics and performance data</li>
                    <li>Device information and IP address</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Court Data</h4>
                  <p className="text-muted-foreground">
                    CASER monitors publicly available court docket information. 
                    We do not access or store confidential court documents - we only provide 
                    links to official PACER sources for verified access.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide and maintain our court monitoring service</li>
                  <li>Send real-time alerts and notifications</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Improve our services and develop new features</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing and Disclosure */}
            <Card>
              <CardHeader>
                <CardTitle>Data Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We do not sell, trade, or otherwise transfer your personal information to 
                  third parties, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Service Providers:</strong> We may share information with trusted 
                  third-party service providers who assist us in operating our service (payment processors, 
                  email services, analytics providers).</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required 
                  by law, court order, or government request.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or 
                  sale of assets, user information may be transferred as part of the transaction.</li>
                  <li><strong>Safety:</strong> We may share information to protect our rights, property, 
                  or safety, or that of our users or the public.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Data Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>End-to-end encryption for data transmission</li>
                  <li>AES-256 encryption for stored data</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure authentication and access controls</li>
                  <li>Compliance with industry security standards</li>
                </ul>
                <p className="text-muted-foreground">
                  However, no method of transmission over the internet or method of electronic 
                  storage is 100% secure. While we strive to use commercially acceptable means 
                  to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We retain your personal information only as long as necessary to fulfill the 
                  purposes outlined in this privacy policy, unless a longer retention period is 
                  required or permitted by law.
                </p>
                <p className="text-muted-foreground">
                  You may request deletion of your account and associated personal information at 
                  any time. We will delete your information within 30 days of your request, 
                  subject to legal retention requirements.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Restriction:</strong> Request restriction of processing your information</li>
                  <li><strong>Objection:</strong> Object to processing of your information</li>
                </ul>
                <p className="text-muted-foreground">
                  To exercise these rights, please contact us at privacy@caserlegal.com.
                </p>
              </CardContent>
            </Card>

            {/* International Data Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  CASER may transfer and process your personal information in countries 
                  other than your own. We ensure appropriate safeguards are in place to protect 
                  your information in accordance with applicable data protection laws.
                </p>
                <p className="text-muted-foreground">
                  If you are located in the European Union, we comply with the General Data 
                  Protection Regulation (GDPR) and ensure appropriate protections for international 
                  data transfers.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  CASER is not intended for use by individuals under the age of 18. 
                  We do not knowingly collect personal information from children under 18. 
                  If you become aware that a child has provided us with personal information, 
                  please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* Changes to This Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. We will notify you of 
                  any changes by posting the new policy on this page and updating the "Last Updated" date.
                </p>
                <p className="text-muted-foreground">
                  You are advised to review this privacy policy periodically for any changes. 
                  Changes to this privacy policy are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> privacy@caserlegal.com</p>
                  <p><strong>Website:</strong> www.caserlegal.com</p>
                  <p><strong>Address:</strong> Available upon request for legal correspondence</p>
                </div>
                <p className="text-muted-foreground">
                  For privacy-related inquiries specifically, please include "Privacy Request" 
                  in your email subject line.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Questions About Your Privacy?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our privacy team is here to help with any questions or concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="mailto:privacy@caserlegal.com">
                  Email Privacy Team
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/support">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-1">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <img src="/logo-icon.png" alt="CASER" className="h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Website: www.caserlegal.com</li>
                <li>Available on iOS</li>
                <li>MacOS and Web coming soon</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 CASER. All rights reserved. Supporting independent developers in legal technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}