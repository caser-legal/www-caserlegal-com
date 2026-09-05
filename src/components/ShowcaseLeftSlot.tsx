export default function ShowcaseLeftSlot() {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-primary-foreground text-xs font-bold">1</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Search & monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Keyword alerts across 300+ federal court feeds with exact and case-sensitive matching.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-primary-foreground text-xs font-bold">2</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Filing notifications</h3>
            <p className="text-sm text-muted-foreground">
              Notifications when filings match your keywords, with direct PACER links.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-primary-foreground text-xs font-bold">3</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Track cases, alerts, and PACER savings from a single interface.
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 mt-0">
        CASER surfaces public docket data and PACER links for research — not legal advice. Verify
        filings through official court sources.
      </p>
    </>
  );
}
