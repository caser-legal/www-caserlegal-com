'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ScalesOfJustice, 
  Gavel, 
  CourthouseClock, 
  LegalDocument,
  ProfessionalBriefcase,
  BrainScales 
} from '@/components/ui/icons';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
              <Link href="/about" className="text-sm font-medium text-primary">About</Link>
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
              <ScalesOfJustice className="w-3 h-3 mr-2" />
              About C.A.S.E.R
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Pioneering Legal Technology
              <span className="text-primary"> for Modern Practice</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded by legal technology experts with decades of experience in Am Law 100 firms, 
              C.A.S.E.R represents the culmination of extensive research into the evolving needs 
              of modern litigation teams and legal operations professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/features">
                  Explore Features
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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

      {/* Mission Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Our Mission: Democratizing Access to Court Intelligence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that every legal professional deserves access to real-time court docket 
                intelligence without the prohibitive costs and inefficiencies of traditional PACER research.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                C.A.S.E.R was engineered to eliminate the billions of dollars wasted annually on 
                unnecessary PACER searches while providing the critical court monitoring capabilities 
                that modern litigation demands.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>175+ U.S. Courts monitored in real-time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Thousands saved annually per user</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Enterprise-grade security and privacy</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-2xl border">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">$2.3B+</div>
                    <div className="text-sm text-muted-foreground">Wasted annually on PACER searches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">175+</div>
                    <div className="text-sm text-muted-foreground">Courts monitored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Legal professionals served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team brings together decades of experience from top-tier law firms, 
              leading legal tech companies, and federal court systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>Managing Partner</CardTitle>
                <CardDescription>Former Am Law 100 Litigation Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  20+ years of complex litigation experience at Cravath, Swaine & Moore. 
                  Recognized expert in legal technology and litigation strategy.
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Harvard Law School, JD</div>
                  <div className="text-xs text-muted-foreground">Former Federal Clerk</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BrainScales className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>CTO</CardTitle>
                <CardDescription>Former Legal Tech Architect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Lead architect at Thomson Reuters and LexisNexis. 
                  Specialized in court data integration and real-time monitoring systems.
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">MIT, Computer Science</div>
                  <div className="text-xs text-muted-foreground">15+ Patents in Legal Tech</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gavel className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>Head of Legal Affairs</CardTitle>
                <CardDescription>Former Federal Prosecutor</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Former U.S. Attorney with extensive experience in federal court procedures 
                  and electronic court record systems.
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Yale Law School, JD</div>
                  <div className="text-xs text-muted-foreground">Former DOJ Senior Counsel</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at C.A.S.E.R
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ScalesOfJustice className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Unwavering commitment to accuracy, transparency, and ethical conduct in all aspects of our service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Timeliness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time delivery of critical court information because in litigation, timing is everything.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <LegalDocument className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Meticulous attention to detail ensuring every alert, document, and data point meets the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Relentless pursuit of perfection in legal technology, matching the standards of top-tier law firms.
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
              Join the Future of Legal Technology
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the power of professional-grade court monitoring designed by 
              legal professionals, for legal professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                  Download C.A.S.E.R
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/support">
                  Contact Our Team
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
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
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