'use client';

import PageShell from '@/components/PageShell';
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
import { CheckCircle, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import {
  careersApplicationMailto,
  careersResumeMailto,
} from '@/lib/careers-mail';

export default function CareersPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="route-hero relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight route-title">
              Shape the Future of
              <span className="text-primary"> Legal Technology</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" className="w-full sm:w-auto" asChild>
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
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Join CASER?
            </h2>
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
                  Make a real impact by democratizing access to justice and reducing avoidable research costs
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
                    <a href={careersApplicationMailto()}>
                      <Mail className="w-4 h-4 mr-2" />
                      Apply via Email
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
            <p className="text-xs text-muted-foreground mb-3 max-w-md mx-auto">
              Opens your email app with a pre-filled message to caserlegal@proton.me
            </p>
            <Button variant="outline" asChild>
              <a href={careersResumeMailto()}>
                <Mail className="w-4 h-4 mr-2" />
                Send Resume via Email
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Shape the Future of Legal Tech?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={careersApplicationMailto()}>
                  <Mail className="w-4 h-4 mr-2" />
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

    </PageShell>
  );
}