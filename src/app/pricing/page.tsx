'use client';

import Navigation from '@/components/Navigation';
import dynamic from 'next/dynamic';

const PACERCalculator = dynamic(() => import('@/components/PACERCalculator'), {
  loading: () => <div className="py-16 lg:py-24 animate-pulse" />,
});
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ProfessionalBriefcase,
  CourthouseClock,
  DollarDocument,
  LegalSeal,
} from '@/components/ui/icons';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit">
              <DollarDocument className="w-3 h-3 mr-2" />
              Pricing Plans
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Professional Pricing
              <span className="text-primary"> for Every Practice Size</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transparent pricing designed to deliver exceptional value. 
              Save thousands annually while accessing premium court monitoring capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Purchase Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">
                  View Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Professional Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription className="text-base">
                  Perfect for individual attorneys and small firms
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">$49</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                <Badge variant="secondary" className="mt-4">Most Popular</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Monitor up to 25 cases</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Real-time alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Direct PACER links</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Basic analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Email support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Mobile app access</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/contact">
                    Get Started Now
                  </Link>
                </Button>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    AES-256
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    TLS 1.3
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    Pro Se
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Business Plan */}
            <Card className="relative border-primary shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Best Value
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Business</CardTitle>
                <CardDescription className="text-base">
                  Ideal for mid-sized firms and legal departments
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">$149</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                <Badge className="mt-4 bg-primary text-primary-foreground">Recommended</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Monitor up to 100 cases</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Priority real-time alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Advanced filtering</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Team collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">AI Assistant access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Custom reports</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/contact">
                    Get Started Now
                  </Link>
                </Button>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    AES-256
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    TLS 1.3
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    Pro Se
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <LegalSeal className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-base">
                  Custom solutions for large firms and organizations
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">Custom</div>
                  <div className="text-muted-foreground">contact us</div>
                </div>
                <Badge variant="outline" className="mt-4">Enterprise</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Unlimited case monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">White-label options</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">API access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">SSO integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Dedicated support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Custom training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">SLA guarantees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">On-premise options</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link href="/support">
                    Contact Sales
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Custom pricing • Tailored solutions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PACERCalculator standalone />

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/download" className="hover:text-primary transition-colors">Download</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 CASER. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
