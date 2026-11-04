'use client';

import React from 'react';

import PageShell from '@/components/PageShell';
import Image from 'next/image';
import { AppStoreCtaRow, MatchedOutlineButton } from '@/components/AppStoreLink';
import Link from 'next/link';
import FeaturePopoutTile from '@/components/FeaturePopoutTile';

export default function Home() {
  const [headlineIndex, setHeadlineIndex] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setHeadlineIndex(index => (index + 1) % 3), 3200);
    return () => window.clearInterval(timer);
  }, []);

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
      <section className="caser-hero overflow-hidden py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-10">
            <div className="relative z-20 space-y-7 lg:py-8">
              <div className="space-y-4">
                <h1 className="max-w-[14ch] text-5xl font-bold leading-[1.02] tracking-[-.06em] sm:text-6xl lg:text-[4.4rem]">
                  <span className="block">Know what happened</span>
                  <span key={headlineIndex} className="hero-rotating-line block text-primary">
                    {['in any federal case.','before the mail comes.','in one app.'][headlineIndex]}
                  </span>
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Search federal court filings and open one. Atticus, powered by Meta Muse, builds the case page for you: a timeline, who&apos;s who, where it stands, and the sources it used.</p>
              </div>
              <AppStoreCtaRow badgeSize="lg" secondary={<MatchedOutlineButton href="#features" badgeSize="lg">Learn More</MatchedOutlineButton>}/>
              <div className="hero-stats flex gap-5 border-t border-border pt-5 text-left sm:gap-7"><div><b className="text-2xl">400+</b><div className="mt-1 text-xs text-muted-foreground">federal court feeds</div></div><div><b className="text-2xl">30 days</b><div className="mt-1 text-xs text-muted-foreground">of filings archived</div></div><div><b className="text-2xl">$0</b><div className="mt-1 text-xs text-muted-foreground">per search</div></div></div>
            </div>
            <div ref={heroPhoneRef} className={`phone-stage relative mx-auto flex min-h-[430px] w-full max-w-[650px] items-end justify-center transition-opacity duration-500 sm:min-h-[650px] lg:min-h-[690px] ${heroPhonesReady ? 'opacity-100' : 'opacity-0'}`}>
              <div className="phone-glow" aria-hidden="true"/>
              <Image src="/search.png?v=4" alt="CASER feature 01, federal case search on iPhone" width={1070} height={2149} priority className="phone-shot phone-shot-left absolute bottom-[-15px] left-[3%] z-10 hidden h-[460px] w-auto object-contain sm:block lg:h-[560px]"/>
              <Image src="/launch-screen.png?v=1" alt="CASER launch screen on iPhone" width={1070} height={2149} priority className="phone-shot phone-shot-center relative z-20 -mb-6 h-[520px] w-auto object-contain sm:h-[610px] lg:h-[680px]"/>
              <Image src="/ai.png?v=4" alt="Atticus, powered by Meta Muse, explaining Apple Inc. v. Shi in the CASER iPhone app" width={1070} height={2149} priority className="phone-shot phone-shot-right absolute bottom-[-15px] right-[3%] z-10 hidden h-[460px] w-auto object-contain sm:block lg:h-[560px]"/>
            </div>
          </div>
        </div>
      </section>


      <section id="features" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center"><p className="section-kicker">From filing to full case page</p><h2 className="text-4xl font-bold leading-tight sm:text-5xl">Everything you need to understand a case.</h2><p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">Find the filing, see the whole story behind it, and check every source yourself.</p></div>
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {n:'01', title:'Atticus builds the case page', body:'Open any filing and Atticus, powered by Meta Muse, builds the page in real time: a timeline, who\'s who, where it stands and recent news, with a source card for each.', img:'/screens/05-atticus.png?v=4', alt:'Atticus, powered by Meta Muse, explaining Apple Inc. v. Shi in CASER for iPhone', howTo:'Open any filing and the case page builds itself. Ask a follow-up in the box at the top and the answer streams in live; Atticus can pull related dockets from CASER search while it answers. It is information, not legal advice.'},
              {n:'02', title:'Search across federal courts', body:'Look up parties, case titles and keywords across 400+ federal court feeds, plus CASER\'s 30-day archive of filings that have already left the feed.', img:'/screens/01-search.png?v=4', alt:'Federal court case search results for Apple in the CASER iPhone app', howTo:'Type a party, case title or keyword, choose states and court types, then open any match. Results include filings from CASER\'s 30-day archive, not just what the court feed shows today.'},
              {n:'03', title:'Open the source filing', body:'Every case page links back to the court record, so you can read the filing itself.', img:'/screens/03-case-details.png?v=3', alt:'CASER case details with docket, document and PDF export options', howTo:'Open a case to view its docket or filing on PACER, or tap Export PDF for a free case report with the PACER links.'},
              {n:'04', title:'Get alerted when it moves', body:'Watch a name, company or case number. CASER checks the feeds and sends an alert when a new filing matches.', img:'/screens/02-alerts.png?v=4', alt:'CASER keyword alert with matching federal filings on iPhone', howTo:'Add a name or topic as a monitor. CASER checks the feeds and sends a local alert when something matches.'},
              {n:'05', title:'See what PACER would cost', body:'Track your searches and what the same searches would cost on PACER, with the assumptions shown.', img:'/screens/04-pacer-savings.png?v=4', alt:'CASER PACER savings tracker on iPhone', howTo:'See your search activity and estimated PACER costs, with the assumptions shown, so you know what you would save.'},
              {n:'06', title:'Keep your research close', body:'Search history, saved cases and settings stay on your device. Verify important filings with official sources.', img:'/screens/06-dashboard.png?v=4', alt:'CASER dashboard with saved cases, alerts and PACER savings on iPhone', howTo:'Saved cases, search history and settings stay on your device, so your research stays private.'},
            ].map((item)=><FeaturePopoutTile key={item.n} {...item} />)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border bg-[#f5f5f5] p-6 sm:p-9">
            <div className="mb-7 max-w-2xl"><p className="section-kicker">Powered by Meta Muse</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Built once, shared with everyone.</h2></div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ['Real structure, not a chat box','Muse searches the web and CASER\'s own court archive, then returns strict structured data. The app draws the timeline, who\'s who and source cards from it.'],
                ['The next person gets it instantly','PACER charges every person for every search, even the same one. CASER stores each public case page, so the next person who opens that case gets it right away, with no new AI call.'],
                ['Always an answer','If Muse can\'t answer, Atticus uses Apple Intelligence on your iPhone or Apple Private Cloud Compute, then a summary built from the docket itself, and tells you which one wrote it.'],
              ].map(([title, body]) => <div key={title} className="rounded-2xl border border-black/5 bg-white/80 p-5"><b className="block text-lg font-semibold">{title}</b><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></div>)}
            </div>
            <p className="pt-5 text-xs leading-relaxed text-muted-foreground">Case pages are built only from public court records and run in Muse Contributor mode. The questions you type are not used for training. Every request from the app is checked with Apple App Attest.</p>
          </div>
        </div>
      </section>



      <section id="pacer-problem" className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border bg-[#f5f5f5] p-6 sm:p-9 lg:flex-row lg:items-start">
            <div className="max-w-sm lg:pt-1"><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Public records without the PACER bill.</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">PACER charges 10 cents a page, search result pages included, for cases you often weren&apos;t even looking for. First-time users can get a surprise invoice.</p><Link href="/support/pacer-savings" className="mt-4 inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold">How fees work <span aria-hidden="true">→</span></Link></div>
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
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#f5f5f5] px-6 py-10 text-center sm:px-12">
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Court records are public. Let&apos;s keep it that way.</h2>
            
            <div className="mt-7"><AppStoreCtaRow badgeSize="lg" className="justify-center" secondary={<MatchedOutlineButton href="/support" badgeSize="lg">Visit Support</MatchedOutlineButton>}/></div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"><Link href="/privacy" className="underline underline-offset-4">Privacy</Link><Link href="/features" className="underline underline-offset-4">All features</Link><Link href="/download" className="underline underline-offset-4">Download details</Link></div>
          </div>
        </div>
      </section>


    </PageShell>
  );
}
