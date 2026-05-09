"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PRICING_FAQ } from "@/lib/creators/billing";

export function PricingFAQ() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section className="bg-[var(--bg-primary)] px-6 pb-24">
      <div className="mx-auto max-w-[800px]">
        <h2 className="text-center text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
          Frequently asked
        </h2>
        <div className="mt-10 divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          {PRICING_FAQ.map((item, i) => {
            const open = openId === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{item.q}</span>
                  <ChevronDown
                    className={
                      "h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform " +
                      (open ? "rotate-180" : "")
                    }
                  />
                </button>
                {open && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
