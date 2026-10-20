'use client';

import React from 'react';

import PageShell from '@/components/PageShell';
import Image from 'next/image';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import FeaturePopoutTile from '@/components/FeaturePopoutTile';

export default function Home() {
  const [headlineIndex, setHeadlineIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = window.setInterval(() => setHeadlineIndex(index => (index + 1) % 3), 3200);
    return () => window.clearInterval(timer);
  }, []);

  // Keep the three hero phones hidden until all of them have loaded, then reveal them together.
  const [heroPhonesReady, setHeroPhonesReady] = React.useState(false);
  const heroPhoneRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const stage = heroPhoneRef.current;
    if (!stage) return;
    const images = Array.from(stage.querySelectorAll('img'));
    let pending = images.filter((img) => !img.complete).length;
    const reveal = () => setHeroPhonesReady(true);
    if (pending === 0) {
      reveal();
      return;
    }
    const onSettled = () => {
      pending -= 1;
      if (pending <= 0) reveal();
    };
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', onSettled, { once: true });
      img.addEventListener('error', onSettled, { once: true });
    });
    const fallback = window.setTimeout(reveal, 3000);
    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <PageShell mainUnpadded>
      {/* Hero Section */}
      <section className="caser-hero overflow-hidden py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-10">
            <div className="relative z-20 space-y-7 lg:py-8">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">Case Automated Search of Electronic Records</p>
                <h1 className="max-w-[13ch] text-5xl font-bold leading-[1.02] tracking-[-.06em] sm:text-6xl lg:text-[4.4rem]">
                  <span className="block">Know what moved</span>
                  <span key={headlineIndex} className="hero-rotating-line block text-primary">
                    {['in the cases you follow.','across 300+ federal feeds.','when a filing matches.'][headlineIndex]}
                  </span>
                </h1>
                
              </div>
              <AppStoreCtaRow badgeSize="lg" secondary={<MatchedOutlineButton href="#features" badgeSize="lg">Learn More</MatchedOutlineButton>}/>
              <div className="flex gap-7 border-t border-border pt-5 text-left"><div><b className="text-2xl">300+</b><div className="mt-1 text-xs text-muted-foreground">federal court feeds</div></div><div><b className="text-2xl">$0</b><div className="mt-1 text-xs text-muted-foreground">in-app search fees</div></div></div>
            </div>
            <div ref={heroPhoneRef} className={`phone-stage relative mx-auto flex min-h-[520px] w-full max-w-[650px] items-end justify-center transition-opacity duration-500 sm:min-h-[650px] lg:min-h-[690px] ${heroPhonesReady ? 'opacity-100' : 'opacity-0'}`}>
              <div className="phone-glow" aria-hidden="true"/>
              <Image src="/search.png?v=3" alt="CASER feature 01, federal case search on iPhone" width={1070} height={2149} priority className="phone-shot phone-shot-left absolute bottom-[-15px] left-[3%] z-10 hidden h-[460px] w-auto object-contain sm:block lg:h-[560px]"/>
              <Image src="/launch-screen.png?v=1" alt="CASER launch screen on iPhone" width={1070} height={2149} priority className="phone-shot phone-shot-center relative z-20 -mb-6 h-[520px] w-auto object-contain sm:h-[610px] lg:h-[680px]"/>
              <Image src="/screenshot-3.png?v=3" alt="CASER feature 06, case dashboard on iPhone" width={1070} height={2149} priority className="phone-shot phone-shot-right absolute bottom-[-15px] right-[3%] z-10 hidden h-[460px] w-auto object-contain sm:block lg:h-[560px]"/>
            </div>
          </div>
        </div>
      </section>


      <section id="features" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center"><h2 className="text-4xl font-bold leading-tight sm:text-5xl">Everything you need to follow a case.</h2></div>
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {n:'01', title:'Search across federal courts', body:'Look up parties, case titles, and keywords across 300+ supported feeds.', img:'/screens/01-search.png?v=3', alt:'Federal court case search results for Apple in the CASER iPhone app', howTo:'Type a party, case title or keyword, choose states and court types, then open any match for details.'},
              {n:'02', title:'Monitor keywords', body:'Create monitors for names and topics. CASER checks feeds and schedules local alerts when it finds a match.', img:'/screens/02-alerts.png?v=3', alt:'CASER keyword alert with matching federal filings on iPhone', howTo:'Add a name or topic as a monitor. CASER checks the feeds and sends a local alert when something matches.'},
              {n:'03', title:'Open the source filing', body:'Follow direct document links to the source court when you need to review a filing.', img:'/screens/03-case-details.png?v=3', alt:'CASER case details with docket, document and PDF export options', howTo:'Open a case to view its docket or filing on PACER, or tap Export PDF for a free case report with the PACER links.'},
              {n:'04', title:'Understand your usage', body:'Review search activity and estimate PACER costs with transparent assumptions.', img:'/screens/04-pacer-savings.png?v=3', alt:'CASER PACER savings tracker on iPhone', howTo:'See your search activity and estimated PACER costs, with the assumptions shown, so you know what you would save.'},
              {n:'05', title:'Ask Atticus', body:'Explore legal concepts and terms with the optional AI research assistant. It is not legal advice.', img:'/screens/05-atticus.png?v=3', alt:'Atticus AI research assistant inside CASER for iPhone', howTo:'Ask about a legal term or concept and get a plain-language explanation. It is not legal advice.'},
              {n:'06', title:'Keep your research close', body:'Search history, saved cases, and settings stay on your device. Verify important filings with official sources.', img:'/screens/06-dashboard.png?v=3', alt:'CASER dashboard with saved cases, alerts and PACER savings on iPhone', howTo:'Saved cases, search history and settings stay on your device, so your research stays private.'},
            ].map((item)=><FeaturePopoutTile key={item.n} {...item} />)}
          </div>
        </div>
      </section>



      <section id="pacer-problem" className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border bg-[#f5f0e4] p-6 sm:p-9 lg:flex-row lg:items-start">
            <div className="max-w-sm lg:pt-1"><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Keep up without random fees.</h2><Link href="/support/pacer-savings" className="mt-4 inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold">How fees work <span aria-hidden="true">→</span></Link></div>
            <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3">{[['$0.00','per search'],['$0','document cap'],['$1000+','in savings*']].map(([value,label])=><div key={label} className="min-w-0 rounded-2xl border border-black/5 bg-white/80 p-3 sm:p-5"><b className="block whitespace-nowrap text-lg font-bold sm:text-3xl">{value}</b><span className="mt-1 block text-xs leading-snug text-muted-foreground sm:text-sm">{label}</span></div>)}<p className="col-span-3 pt-2 text-xs leading-relaxed text-muted-foreground">* Search-result charges and eligible free copies affect totals. Actual fees depend on your use. CASER is not a complete historical docket archive; verify records with official sources. Savings will vary by individual and usage.</p></div>
          </div>
        </div>
      </section>

      <section id="savings" className="py-10 lg:py-12">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl border bg-card px-6 py-7 sm:flex-row sm:px-9">
          <div><h2 className="mt-2 text-2xl font-bold">Details for your practice.</h2></div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3"><MatchedOutlineButton href="/pricing">Pricing</MatchedOutlineButton><MatchedOutlineButton href="/contact">Team inquiries</MatchedOutlineButton></div>
        </div>
      </section>

      <section id="download" className="py-14 lg:py-18 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#f5f0e4] px-6 py-10 text-center sm:px-12">
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Follow the cases that matter.</h2>
            
            <div className="mt-7"><AppStoreCtaRow badgeSize="lg" className="justify-center" secondary={<MatchedOutlineButton href="/support" badgeSize="lg">Visit Support</MatchedOutlineButton>}/></div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"><Link href="/privacy" className="underline underline-offset-4">Privacy</Link><Link href="/features" className="underline underline-offset-4">All features</Link><Link href="/download" className="underline underline-offset-4">Download details</Link></div>
          </div>
        </div>
      </section>


    </PageShell>
  );
}
