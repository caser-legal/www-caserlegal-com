'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ScalesOfJustice, 
  Mail, 
  ProfessionalBriefcase,
  Gavel,
  CourthouseClock,
  DollarDocument,
  BrainScales,
  Users,
  Target,
  Lightbulb,
  MapPin,
  Clock
} from '@/components/ui/icons';
import { CheckCircle, ArrowRight, Send, Briefcase, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
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
              <Link href="/careers" className="text-sm font-medium text-primary">Careers</Link>
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
              <ProfessionalBriefcase className="w-3 h-3 mr-2" />
              Join Our Team
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Shape the Future of
              <span className="text-primary"> Legal Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join a team of legal technology pioneers dedicated to democratizing access to court records 
              and eliminating wasteful PACER fees for legal professionals across the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#open-positions">
                  <Briefcase className="w-4 h-4 mr-2" />
                  View Open Positions
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">
                  Learn About CASER
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Join CASER?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be part of a mission-driven company that's transforming how legal professionals access court information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Mission-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Make a real impact by democratizing access to justice and eliminating billions in wasteful fees
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Innovation First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Work with cutting-edge technology and solve complex problems in legal tech
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Expert Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Collaborate with legal professionals, engineers, and industry experts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CourthouseClock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Flexibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Remote-first culture with flexible work arrangements and work-life balance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Open Positions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're always looking for talented individuals who share our vision
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* General Application */}
            <Card className="border-primary hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-primary text-primary-foreground">Open</Badge>
                      <Badge variant="outline">Remote</Badge>
                    </div>
                    <CardTitle className="text-2xl">General Application</CardTitle>
                    <CardDescription className="text-base">
                      We're always interested in connecting with talented individuals who are passionate about legal technology
                    </CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ProfessionalBriefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Who We're Looking For</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm">Legal professionals with tech interest</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm">Software engineers passionate about legal tech</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm">Product managers with legal domain experience</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm">Sales and business development professionals</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm">Customer success and support specialists</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm">Marketing and content creators</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">What We Value</h4>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <BrainScales className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Passion for Legal Technology</div>
                        <div className="text-xs text-muted-foreground">Genuine interest in improving legal workflows</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ScalesOfJustice className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Mission Alignment</div>
                        <div className="text-xs text-muted-foreground">Commitment to democratizing access to justice</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Innovation Mindset</div>
                        <div className="text-xs text-muted-foreground">Creative problem-solving and adaptability</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Remote-First Culture</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We're a distributed team serving legal professionals across all 50 states. 
                    Work from anywhere while making a meaningful impact.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1" asChild>
                    <a href="mailto:careers@caserlegal.com?subject=General Application - CASER&body=Hi CASER Team,%0D%0A%0D%0AI'm interested in joining your team. Here's some information about me:%0D%0A%0D%0AName: %0D%0ABackground: %0D%0AExperience: %0D%0AWhy I'm interested in CASER: %0D%0A%0D%0AI've attached my resume and look forward to discussing how I can contribute to your mission.">
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/about">
                      Learn More About Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see a specific role that matches your skills?
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:careers@caserlegal.com?subject=General Inquiry - CASER">
                <Mail className="w-4 h-4 mr-2" />
                Send Us Your Resume
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Benefits & Perks
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We take care of our team so they can focus on our mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <DollarDocument className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Competitive Compensation</h3>
              <p className="text-sm text-muted-foreground">
                Salary, equity, and performance bonuses
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <CourthouseClock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Flexible Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Work when and where you're most productive
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Professional Development</h3>
              <p className="text-sm text-muted-foreground">
                Budget for courses, conferences, and certifications
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Health & Wellness</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive health, dental, and vision insurance
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Impact-Driven Work</h3>
              <p className="text-sm text-muted-foreground">
                Make a real difference in the legal industry
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Innovation Time</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated time for research and side projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Shape the Future of Legal Tech?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join us in our mission to democratize access to court records and eliminate wasteful PACER fees
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:careers@caserlegal.com?subject=General Application - CASER">
                  <Send className="w-4 h-4 mr-2" />
                  Apply Today
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">
                  Learn About Our Mission
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
                <li><Link href="/download" className="hover:text-primary transition-colors">Download</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Download</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/support" className="hover:text-primary transition-colors">Support Center</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
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