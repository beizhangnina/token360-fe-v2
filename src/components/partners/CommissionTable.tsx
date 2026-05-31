import { CalendarClock, Wallet } from "lucide-react";

export function CommissionTable() {
  return (
    <section id="commission" className="relative bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Earn up to 15% of referred usage
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] text-[var(--text-secondary)]">
            We share a percentage of what your referred customers actually pay for usage. The
            exact rate depends on which models they use — each model carries its own rate, and your
            live per-model rates appear in your dashboard once you&rsquo;re approved. Your blended
            rate is capped at 15%.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-purple-500)]/10 text-[var(--brand-purple-500)]">
              <CalendarClock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">How long you earn</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Earn for 24 months per referred customer — the full rate for the first 12 months,
              then half rate for months 13–24.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-purple-500)]/10 text-[var(--brand-purple-500)]">
              <Wallet className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">How you&rsquo;re paid</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Paid monthly via PayPal or USDC, after a short hold for refunds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
