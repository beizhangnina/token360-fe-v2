import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export function PartnerProgram() {
  return (
    <section className="relative bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Partner with Token360
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[var(--text-secondary)]">
            One program for everyone who brings us customers — earn a share of what your referrals
            spend on Token360.
          </p>
        </div>

        <article className="group relative mx-auto flex max-w-[760px] flex-col overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 transition-all hover:shadow-[var(--shadow-accent)] md:p-12">
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
              Open now · apply online
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Token360 Partner Program
            </h3>
            <p className="mt-2 max-w-[560px] text-sm text-[var(--text-secondary)]">
              For creators, indie devs, KOLs, educators, communities, agencies, and resellers —
              anyone with an audience or a book of business.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-2.5 text-sm text-[var(--text-primary)] sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                Up to <span className="font-mono font-semibold">15%</span> commission on referred usage
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                24-month earning window per referred customer
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                Monthly PayPal payout
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
                No contract, no minimum
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

        <p className="mx-auto mt-6 max-w-[640px] text-center text-sm text-[var(--text-secondary)]">
          Running an agency, reselling at volume, or want custom terms?{" "}
          <a
            href="mailto:partners@token360.ai?subject=Partner%20Program%20Inquiry"
            className="font-medium text-[var(--brand-purple-500)] underline"
          >
            Talk to us
          </a>{" "}
          — we&rsquo;ll tailor a deal.
        </p>
      </div>
    </section>
  );
}
