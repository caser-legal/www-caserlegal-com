'use client';

import PageShell from '@/components/PageShell';
import { DownloadButton } from '@/components/AppStoreLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ScalesOfJustice, 
  Mail, 
  MessageCircle,
  ProfessionalBriefcase,
  Gavel,
  CourthouseClock,
  DollarDocument
} from '@/components/ui/icons';
import { CheckCircle, ArrowRight, Send, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit">
              <MessageCircle className="w-3 h-3 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Let's Discuss How CASER
              <span className="text-primary"> Can Transform Your Practice</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you're a solo practitioner or managing a large litigation team, 
              we're here to help you understand how CASER can eliminate wasteful PACER fees 
              and streamline your court monitoring workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <DownloadButton size="lg" label="Download on the App Store" />
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:hi@caserlegal.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </a>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* General Inquiries */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>General Inquiries</CardTitle>
                <CardDescription>
                  Questions about CASER features, pricing, or how we can help your practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">hi@caserlegal.com</span>
                  </div>
                  <p className="text-sm text-muted-foreground h-10"></p>
                </div>
                <Button className="w-full" asChild>
                  <a href="mailto:hi@caserlegal.com?subject=General Inquiry - CASER">
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
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
                  <p className="text-sm text-muted-foreground h-10"></p>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/support">
                    Visit Support Center
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Business</CardTitle>
                <CardDescription>
                  Firm workflows, volume licensing, and custom alert programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <a href="mailto:hi@caserlegal.com?subject=Business%20Inquiry%20-%20CASER">
                    <Send className="w-4 h-4 mr-2" />
                    Contact Sales
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>
                  Custom integrations, data services, and enterprise deployments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <a href="mailto:hi@caserlegal.com?subject=Enterprise%20Inquiry%20-%20CASER">
                    <Send className="w-4 h-4 mr-2" />
                    Contact Sales
                  </a>
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
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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
                        <div className="font-medium">Product Support</div>
                        <div className="text-sm text-muted-foreground">Help with features and setup</div>
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
                    <a href="mailto:hi@caserlegal.com?subject=Practice Consultation Request - CASER&body=Hi CASER Team,%0D%0A%0D%0AI'm interested in learning more about how CASER can help my practice. Here are some details about my firm:%0D%0A%0D%0AFirm Size: %0D%0APractice Areas: %0D%0ACurrent PACER Usage: %0D%0ASpecific Needs: %0D%0A%0D%0ALooking forward to hearing from you.">
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
                <a href="mailto:hi@caserlegal.com?subject=Demo Request - CASER">
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

    </PageShell>
  );
}