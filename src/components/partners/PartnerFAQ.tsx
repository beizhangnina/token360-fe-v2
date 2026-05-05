"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Who can apply to be an Ambassador?",
    a: "Anyone with an audience or developer network — YouTubers, TikTok creators, newsletter authors, indie devs, AI educators, and Discord/community moderators all qualify. We don't require a minimum follower count, but we'll ask how you plan to promote.",
  },
  {
    q: "How am I paid, and when?",
    a: "We pay weekly on a T+1 cycle via PayPal or USDC (on-chain). We also support bank transfer for select regions. There is no minimum payout threshold — your balance ships every cycle.",
  },
  {
    q: "How is attribution tracked?",
    a: "v0.1 uses a unique discount code per Ambassador, with manual reconciliation. We're rolling out cookie-based tracking with a 30-day attribution window in the next release; existing partners will be migrated automatically.",
  },
  {
    q: "What's the LATAM bonus?",
    a: "Partners with primary residence in Latin America receive an additional +5% commission across all tiers, plus higher free-credit allowances at the Growth and Top tiers. We verify region at payout, not at signup.",
  },
  {
    q: "Can I promote alongside other inference platforms?",
    a: "Yes. Token360 is the multimodal layer most creators add on top of single-vendor coverage. We only ask that you don't directly cannibalize an active Token360 customer's account.",
  },
  {
    q: "Are there content restrictions?",
    a: "Standard guardrails: no deceptive marketing, no unauthorized celebrity likenesses, no NSFW content distributed to minors, and FTC-compliant #ad disclosure. The full Ambassador Terms cover the details.",
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
