"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Who can apply?",
    a: "Anyone with an audience or developer network: video/image creators, newsletter authors, indie devs, educators, community moderators. No fixed follower threshold — we assess fit and your promotion plan. (Agencies and resellers looking for wholesale or custom terms should email partners@token360.ai instead.)",
  },
  {
    q: "How am I paid, and when?",
    a: "Monthly, via PayPal, after a short hold to clear refunds. There's a $50 minimum payout threshold and no cap on total earnings.",
  },
  {
    q: "How is attribution tracked?",
    a: "Through your unique referral link. When someone signs up after clicking it, they're attributed to you for the 24-month earning window.",
  },
  {
    q: "What does “up to 15%” mean?",
    a: "Your commission is a share of what your referred customers actually pay Token360 for usage — not a flat fee. Each model carries its own commission rate, so your effective rate is a blend that shifts with the mix of models your referrals use. That blended rate is capped at 15%, and your current per-model rates are always visible in your dashboard once you're approved.",
  },
  {
    q: "How is the 24-month earning window calculated?",
    a: "The clock starts when your referred customer signs up through your link. For months 1–12 you earn your full rate (up to 15% blended). For months 13–24 you earn half that rate (up to 7.5%). After month 24, earnings on that customer stop — but every new customer you refer starts their own fresh 24-month window.",
  },
  {
    q: "Can I promote alongside other inference platforms?",
    a: "Yes. Token360 is the multimodal layer most creators add on top of single-vendor coverage. We only ask that you don't directly cannibalize an active Token360 customer's account.",
  },
  {
    q: "Are there content restrictions?",
    a: "Standard guardrails: no deceptive marketing, no unauthorized celebrity likenesses, no NSFW content distributed to minors, and FTC-compliant #ad disclosure. The full Partner Program Terms cover the details.",
  },
];

export function PartnerFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Frequently asked
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Still have questions?{" "}
            <a
              href="mailto:partners@token360.ai"
              className="font-medium text-[var(--brand-purple-500)] underline"
            >
              partners@token360.ai
            </a>
          </p>
        </div>

        <ul className="divide-y divide-[var(--border-subtle)] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-[var(--bg-muted)]"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-[var(--text-primary)]">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {f.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
