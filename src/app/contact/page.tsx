'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ScalesOfJustice, 
  Mail, 
  Phone, 
  MessageCircle,
  ProfessionalBriefcase,
  Gavel,
  CourthouseClock,
  DollarDocument,
  MapPin,
  Clock
} from '@/components/ui/icons';
import { CheckCircle, ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
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
              <Link href="/contact" className="text-sm font-medium text-primary">Contact</Link>
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
              <MessageCircle className="w-3 h-3 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Let's Discuss How C.A.S.E.R
              <span className="text-primary"> Can Transform Your Practice</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you're a solo practitioner or managing a large litigation team, 
              we're here to help you understand how C.A.S.E.R can eliminate wasteful PACER fees 
              and streamline your court monitoring workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:hi@caserlegal.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">
                  View Pricing Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              How Can We Help You?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* General Inquiries */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>General Inquiries</CardTitle>
                <CardDescription>
                  Questions about C.A.S.E.R features, pricing, or how we can help your practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">hi@caserlegal.com</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Response within 24 business hours
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <a href="mailto:hi@caserlegal.com?subject=General Inquiry - C.A.S.E.R">
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Business Development */}
            <Card className="text-center hover:shadow-lg transition-shadow border-primary">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle>Business Development</CardTitle>
                <CardDescription>
                  Enterprise solutions, custom integrations, and partnership opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">hi@caserlegal.com</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Priority response for enterprise inquiries
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <a href="mailto:hi@caserlegal.com?subject=Business Development Inquiry - C.A.S.E.R">
                    <Send className="w-4 h-4 mr-2" />
                    Contact Business Team
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Technical Support</CardTitle>
                <CardDescription>
                  Help with setup, troubleshooting, and feature questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">hi@caserlegal.com</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Support available 9 AM - 6 PM EST
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/support">
                    Visit Support Center
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Inquiry Form */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Tell Us About Your Practice
              </h2>
              <p className="text-xl text-muted-foreground">
                Help us understand your needs so we can provide the best solution
              </p>
            </div>

            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Practice Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Firm Size</div>
                        <div className="text-sm text-muted-foreground">Solo, boutique, or large firm</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Practice Areas</div>
                        <div className="text-sm text-muted-foreground">Litigation, bankruptcy, corporate, etc.</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Current PACER Usage</div>
                        <div className="text-sm text-muted-foreground">Monthly search volume and costs</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Integration Needs</div>
                        <div className="text-sm text-muted-foreground">Existing tools and workflows</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">What We Can Help With</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <DollarDocument className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Cost Savings Analysis</div>
                        <div className="text-sm text-muted-foreground">Calculate your potential PACER savings</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CourthouseClock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Workflow Optimization</div>
                        <div className="text-sm text-muted-foreground">Streamline court monitoring processes</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Gavel className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Custom Solutions</div>
                        <div className="text-sm text-muted-foreground">Tailored features for your practice</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ProfessionalBriefcase className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Team Training</div>
                        <div className="text-sm text-muted-foreground">Onboarding and best practices</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <div className="text-center space-y-4">
                  <h4 className="text-lg font-semibold">Ready to Get Started?</h4>
                  <p className="text-muted-foreground">
                    Send us an email with your practice details and we'll provide a personalized consultation
                  </p>
                  <Button size="lg" asChild>
                    <a href="mailto:hi@caserlegal.com?subject=Practice Consultation Request - C.A.S.E.R&body=Hi C.A.S.E.R Team,%0D%0A%0D%0AI'm interested in learning more about how C.A.S.E.R can help my practice. Here are some details about my firm:%0D%0A%0D%0AFirm Size: %0D%0APractice Areas: %0D%0ACurrent PACER Usage: %0D%0ASpecific Needs: %0D%0A%0D%0ALooking forward to hearing from you.">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Practice Details
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Available When You Need Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <Clock className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday<br />
                  9:00 AM - 6:00 PM EST
                </p>
              </div>
              <div className="text-center space-y-3">
                <Mail className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-muted-foreground">
                  24-hour response time<br />
                  hi@caserlegal.com
                </p>
              </div>
              <div className="text-center space-y-3">
                <MapPin className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold">Remote First</h3>
                <p className="text-sm text-muted-foreground">
                  Serving legal professionals<br />
                  across all 50 states
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Start Saving on PACER Fees Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of legal professionals who've already transformed their court monitoring workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:hi@caserlegal.com?subject=Demo Request - C.A.S.E.R">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Schedule a Demo
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">
                  View Pricing
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
                <li><Link href="/download" className="hover:text-primary transition-colors">Download</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Support Center</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 C.A.S.E.R. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}