'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ScalesOfJustice, 
  Gavel,
  LegalDocument,
  ArrowRight
} from '@/components/ui/icons';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CASER</span>
              </div>
              <span className="font-semibold text-lg">C.A.S.E.R</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                App Store
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
              <Gavel className="w-3 h-3 mr-2" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Terms of Service
              <span className="text-primary"> for C.A.S.E.R</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              These terms govern your use of C.A.S.E.R court monitoring services. 
              Please read them carefully before using our application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/privacy">
                  View Privacy Policy
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/support">
                  Contact Legal Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Agreement to Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LegalDocument className="w-5 h-5 text-primary" />
                  <span>Agreement to Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By accessing and using C.A.S.E.R (Court Automated Search of Electronic Records), 
                  you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-muted-foreground">
                  These Terms of Service ("Terms") govern your access to and use of the C.A.S.E.R 
                  mobile application, website, and related services (collectively, the "Service") 
                  operated by C.A.S.E.R ("we," "us," or "our").
                </p>
                <p className="text-muted-foreground">
                  <strong>Effective Date:</strong> January 1, 2024
                </p>
              </CardContent>
            </Card>

            {/* Description of Service */}
            <Card>
              <CardHeader>
                <CardTitle>Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  C.A.S.E.R is a court monitoring service that provides:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Real-time monitoring of 175+ U.S. federal courts</li>
                  <li>Alert notifications for new court filings</li>
                  <li>Direct links to PACER documents</li>
                  <li>Search and filtering capabilities</li>
                  <li>Analytics and reporting tools</li>
                  <li>AI-powered legal research assistance</li>
                </ul>
                <p className="text-muted-foreground">
                  C.A.S.E.R is a research tool designed to monitor publicly available court docket 
                  information. We do not provide legal advice, and our service is not a substitute 
                  for professional legal counsel or official court records.
                </p>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  As a user of C.A.S.E.R, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the service in compliance with all applicable laws and regulations</li>
                  <li>Not use the service for any illegal or unauthorized purpose</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not interfere with or disrupt the service or servers</li>
                  <li>Verify all information through official court sources</li>
                  <li>Use PACER links responsibly and in accordance with PACER terms</li>
                </ul>
              </CardContent>
            </Card>

            {/* Account Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Account Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Registration</h4>
                  <p className="text-muted-foreground">
                    You must create an account to use certain features of C.A.S.E.R. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                    <li>Provide truthful, accurate, and complete information</li>
                    <li>Update your information to keep it accurate</li>
                    <li>Maintain the confidentiality of your account</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Subscription and Payment</h4>
                  <p className="text-muted-foreground">
                    C.A.S.E.R offers subscription-based services. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                    <li>Provide current, complete, and accurate payment information</li>
                    <li>Pay all charges incurred under your account</li>
                    <li>Authorize automatic billing for subscription renewals</li>
                    <li>Review and understand our refund policy</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Cancellation</h4>
                  <p className="text-muted-foreground">
                    You may cancel your subscription at any time. Cancellation will take effect 
                    at the end of the current billing period. No refunds will be provided for 
                    partial months or unused portions of your subscription.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The service and its original content, features, and functionality are and 
                  will remain the exclusive property of C.A.S.E.R and its licensors. The 
                  service is protected by copyright, trademark, and other laws.
                </p>
                <p className="text-muted-foreground">
                  You may not modify, reproduce, distribute, create derivative works, publicly 
                  display, publicly perform, republish, download, store, or transmit any of the 
                  material on our service, except as permitted by these Terms.
                </p>
                <p className="text-muted-foreground">
                  Court data and documents accessed through C.A.S.E.R remain the property of 
                  the respective courts and are subject to PACER terms and conditions.
                </p>
              </CardContent>
            </Card>

            {/* Privacy and Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our Privacy Policy, which also 
                  governs your use of the service, to understand our practices.
                </p>
                <p className="text-muted-foreground">
                  By using C.A.S.E.R, you consent to the collection and use of information 
                  in accordance with our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Disclaimers and Warranties */}
            <Card>
              <CardHeader>
                <CardTitle>Disclaimers and Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  <strong>Important Disclaimer:</strong> C.A.S.E.R is a research tool and does 
                  not provide legal advice. The information provided through our service is 
                  for informational purposes only and should not be considered legal advice.
                </p>
                <p className="text-muted-foreground">
                  We make no warranties or representations about the accuracy, completeness, 
                  or timeliness of the information provided. You should always verify information 
                  through official court sources and consult with qualified legal counsel for 
                  specific legal matters.
                </p>
                <p className="text-muted-foreground">
                  C.A.S.E.R is provided "as is" and "as available" without warranties of any 
                  kind, either express or implied, including but not limited to warranties of 
                  merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  In no event shall C.A.S.E.R, its directors, employees, partners, agents, 
                  suppliers, or affiliates be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including without limitation, loss of 
                  profits, data, use, goodwill, or other intangible losses, resulting from 
                  your use of the service.
                </p>
                <p className="text-muted-foreground">
                  Our total liability to you for any cause of action whatsoever, and regardless 
                  of the form of the action, will at all times be limited to the amount paid, 
                  if any, by you to us for the service during the term of subscription.
                </p>
              </CardContent>
            </Card>

            {/* Indemnification */}
            <Card>
              <CardHeader>
                <CardTitle>Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You agree to defend, indemnify, and hold harmless C.A.S.E.R and its licensee 
                  and licensors, and their employees, contractors, agents, officers and directors, 
                  from and against any and all claims, damages, obligations, losses, liabilities, 
                  costs or debt, and expenses (including but not limited to attorney's fees).
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may terminate or suspend your account and bar access to the service 
                  immediately, without prior notice or liability, under our sole discretion, 
                  for any reason whatsoever and without limitation.
                </p>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the service will cease immediately. 
                  All provisions of the Terms which by their nature should survive termination 
                  shall survive, including ownership provisions, warranty disclaimers, 
                  indemnity, and limitations of liability.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These Terms shall be interpreted and governed by the laws of the State of 
                  New York, without regard to its conflict of law provisions.
                </p>
                <p className="text-muted-foreground">
                  Any disputes arising from these Terms shall be resolved through binding 
                  arbitration in New York, New York, in accordance with the rules of the 
                  American Arbitration Association.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We reserve the right, at our sole discretion, to modify or replace these 
                  Terms at any time. If a revision is material, we will provide at least 
                  30 days notice prior to any new terms taking effect.
                </p>
                <p className="text-muted-foreground">
                  What constitutes a material change will be determined at our sole discretion. 
                  By continuing to access or use our service after those revisions become 
                  effective, you agree to be bound by the revised terms.
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
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> legal@caserlegal.com</p>
                  <p><strong>Website:</strong> www.caserlegal.com</p>
                  <p><strong>Address:</strong> Available upon request for legal correspondence</p>
                </div>
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
              Questions About Our Terms?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our legal team is available to answer any questions about our Terms of Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="mailto:legal@caserlegal.com">
                  Contact Legal Team
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/privacy">
                  View Privacy Policy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">CASER</span>
                </div>
                <span className="font-semibold">C.A.S.E.R</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Court Automated Search of Electronic Records
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Website: www.caserlegal.com</li>
                <li>Available on iOS</li>
                <li>MacOS and Web coming soon</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 CASER. All rights reserved. Supporting independent developers in legal technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}