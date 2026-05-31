import Link from "next/link";
import { ArrowRight, Building2, Users } from "lucide-react";

export function TrackSelector() {
  return (
    <section className="relative bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Two ways to partner
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Pick the track that fits how you reach customers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Ambassador (active) */}
          <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent)] md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--brand-purple-500)] opacity-10 blur-3xl transition-opacity group-hover:opacity-20"
            />
            <div className="relative">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-purple-500)]/10 text-[var(--brand-purple-500)]">
                <Users className="h-5 w-5" />
              </div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--brand-purple-500)]/30 bg-[var(--brand-purple-500)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--brand-purple-500)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-purple-500)]" />
                Open now
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">Ambassador</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                For creators, indie devs, KOLs, and educators with an audience.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-[var(--text-primary)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                  Up to <span className="font-mono font-semibold">15%</span> commission on referred usage
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                  Monthly PayPal or USDC payout
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                  No contract, no minimum volume
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                  24-month earning window per referred customer
                </li>
              </ul>

              <Link
                href="/partners/ambassador"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-500)] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Apply now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Channel (coming soon / email-only) */}
          <article className="relative flex flex-col overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 md:p-10">
            <div className="relative">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-gold-500)]/10 text-[var(--brand-gold-500)]">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                Email-only · Self-serve coming soon
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">Channel Partner</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                For agencies, system integrators, cloud resellers, and SaaS platforms.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-[var(--text-primary)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-gold-500)]" />
                  Tiered wholesale discount up to <span className="font-mono font-semibold">35%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-gold-500)]" />
                  Annual rebate + delivery share (up to 15%)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-gold-500)]" />
                  Dedicated cluster + 99.9% SLA at Tier 3
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-gold-500)]" />
                  Co-marketing, training, white-label API
                </li>
              </ul>

              <a
                href="mailto:partners@token360.ai?subject=Channel%20Partner%20Inquiry"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
              >
                Email partners@token360.ai <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
