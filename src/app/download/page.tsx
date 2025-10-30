'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ScalesOfJustice, 
  DownloadDocument,
  ProfessionalBriefcase,
  Gavel,
  CourthouseClock,
  DollarDocument,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Smartphone,
  Monitor,
  Apple
} from '@/components/ui/icons';
import Link from 'next/link';

export default function DownloadPage() {
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
              <Link href="/download" className="text-sm font-medium text-primary">Download</Link>
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
              <DownloadDocument className="w-3 h-3 mr-2" />
              Available Soon
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Download C.A.S.E.R
              <span className="text-primary"> for iOS</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Start monitoring 175+ U.S. federal courts in real-time. Eliminate wasteful PACER fees 
              and transform your court monitoring workflow today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                  <Apple className="w-5 h-5 mr-2" />
                  Download on App Store
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/pricing">
                  View Pricing Plans
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Professional Court Monitoring on Your Device
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of C.A.S.E.R wherever you are. Monitor cases, receive alerts, 
              and access documents right from your iPhone or iPad.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <CourthouseClock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-Time Monitoring</h3>
                    <p className="text-muted-foreground">
                      Monitor 175+ U.S. federal courts with instant notifications for new filings 
                      and docket updates. Never miss important case developments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarDocument className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Eliminate PACER Fees</h3>
                    <p className="text-muted-foreground">
                      Save thousands annually by eliminating wasteful search fees. Only pay for 
                      documents you actually need through direct PACER links.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Research</h3>
                    <p className="text-muted-foreground">
                      Get instant legal research assistance with Atticus, your AI legal expert. 
                      Research concepts, define terms, and connect legal domains.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-muted-foreground">
                      Bank-level encryption and privacy-first design. No PACER account required 
                      and your data is always protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-2xl border">
                <div className="aspect-[9/19] bg-black rounded-3xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
                      <ScalesOfJustice className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">C.A.S.E.R</h3>
                      <p className="text-sm opacity-80">Court Monitoring</p>
                    </div>
                    <div className="text-xs space-y-1 opacity-60">
                      <p>175+ Courts Monitored</p>
                      <p>Real-Time Alerts</p>
                      <p>AI Assistant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">
                System Requirements
              </h2>
              <p className="text-xl text-muted-foreground">
                Ensure your device meets the minimum requirements for optimal performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-6 h-6 text-primary" />
                    <CardTitle>iPhone & iPad</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">iOS Version</span>
                      <Badge variant="secondary">iOS 15.0+</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Storage</span>
                      <Badge variant="secondary">150 MB</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Network</span>
                      <Badge variant="secondary">Internet Required</Badge>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Compatible with iPhone 6s and later, iPad Pro (all models), iPad Air 2 and later, iPad mini 4 and later.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-6 h-6 text-primary" />
                    <CardTitle>Account Requirements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Email Address</div>
                        <div className="text-xs text-muted-foreground">Required for account creation</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Subscription</div>
                        <div className="text-xs text-muted-foreground">Free trial available</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">PACER Account</div>
                        <div className="text-xs text-muted-foreground">Optional, for document access</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      No PACER account required for monitoring and alerts. Only needed when accessing specific documents.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Everything You Need for Court Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade features designed for legal professionals who demand excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Real-Time Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Instant notifications for new filings, docket updates, and case developments across all monitored courts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Gavel className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get legal research help with Atticus, your AI expert for legal concepts, definitions, and domain connections.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarDocument className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your PACER savings with detailed analytics and reports showing exactly how much you're saving.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security with end-to-end encryption and privacy-first design protecting your data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ProfessionalBriefcase className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share cases, alerts, and insights with your team for seamless collaboration on complex matters.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DownloadDocument className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Document Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Direct links to PACER documents with one-click access and PDF export capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what attorneys and paralegals are saying about C.A.S.E.R
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "C.A.S.E.R has transformed how we monitor litigation. We're saving thousands monthly 
                  and never miss important filings. Essential for any modern practice."
                </p>
                <div>
                  <div className="font-semibold text-sm">Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">Partner, Am Law 100 Firm</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "The AI assistant alone is worth the subscription. Combined with real-time alerts, 
                  it's the most comprehensive court monitoring tool available."
                </p>
                <div>
                  <div className="font-semibold text-sm">Michael Chen</div>
                  <div className="text-xs text-muted-foreground">Litigation Attorney</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "As a paralegal, this app has made my job so much easier. I can monitor dozens 
                  of cases simultaneously and get instant alerts for any updates."
                </p>
                <div>
                  <div className="font-semibold text-sm">Emily Rodriguez</div>
                  <div className="text-xs text-muted-foreground">Senior Paralegal</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Start Your Free Trial Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the power of professional court monitoring risk-free. 
              No credit card required for your 14-day trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                  <Apple className="w-5 h-5 mr-2" />
                  Download on App Store
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/contact">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Schedule a Demo
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>TLS 1.3 Security</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Pro Se Discounts</span>
              </div>
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