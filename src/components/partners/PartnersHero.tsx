import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PartnersHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)] px-6 pb-20 pt-32 md:pt-40">
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--bg-elevated)] via-[var(--bg-primary)] to-[var(--bg-primary)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--brand-purple-500)] opacity-10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1100px] text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-purple-500)]"></span>
          Partner Program · Now open
        </div>

        {/* Headline */}
        <h1 className="text-[44px] font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-[64px]">
          Earn with <span className="gradient-text">Token360</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[640px] text-lg text-[var(--text-secondary)] md:text-xl">
          Promote the multimodal AI API and earn up to{" "}
          <span className="font-mono font-semibold text-[var(--text-primary)]">30%</span>{" "}
          revenue share — for the life of the customer.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/partners/ambassador"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ background: "var(--brand-purple-500)" }}
          >
            Become an Ambassador <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#commission"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[var(--border-subtle)] px-7 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
          >
            See commission table
          </a>
        </div>

        {/* Stat strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--text-secondary)]">
          <span>
            <span className="font-mono font-semibold text-[var(--text-primary)]">Up to 30%</span>{" "}
            commission
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[var(--text-muted)] md:inline-block" />
          <span>
            <span className="font-mono font-semibold text-[var(--text-primary)]">T+1</span>{" "}
            settlement
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[var(--text-muted)] md:inline-block" />
          <span>
            <span className="font-mono font-semibold text-[var(--text-primary)]">+5%</span>{" "}
            LATAM bonus
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[var(--text-muted)] md:inline-block" />
          <span>No contract, no minimum</span>
        </div>
      </div>
    </section>
  );
}
