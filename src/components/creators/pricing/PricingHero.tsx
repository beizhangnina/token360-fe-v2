import { Sparkles } from "lucide-react";

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)] pt-28 pb-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(150,51,175,0.16) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(200,150,62,0.10) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--brand-purple-500)]" />
          Plans for every creator
        </div>
        <h1 className="mt-5 text-[40px] font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-[56px]">
          Start free. <span className="text-[var(--brand-purple-500)]">Upgrade when you scale.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
          One subscription unlocks every Token360 video model. Cancel any time. No surprise
          overages.
        </p>
      </div>
    </section>
  );
}
