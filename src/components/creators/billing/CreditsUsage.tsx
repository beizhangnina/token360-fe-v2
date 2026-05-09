"use client";

import { Coins } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";

export function CreditsUsage() {
  const { session } = useCreatorAuth();
  if (!session) return null;
  const used = Math.max(0, session.creditsLimit - session.creditsRemaining);
  const pct = session.creditsLimit === 0 ? 0 : Math.min(100, (used / session.creditsLimit) * 100);
  const renews = new Date(session.renewsAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Credits this period
          </span>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
            {used.toLocaleString()}
            <span className="text-sm font-normal text-[var(--text-muted)]">
              {" "}/ {session.creditsLimit.toLocaleString()}
            </span>
          </p>
        </div>
        <p className="text-xs text-[var(--text-muted)]">Resets on {renews}</p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg-muted)]">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, var(--brand-purple-500), var(--brand-purple-300))",
          }}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-secondary)]">
          Need more? Buy a credit pack — used after your monthly allowance.
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
        >
          <Coins className="h-3.5 w-3.5" />
          Buy 1,000 credits — $9
        </button>
      </div>
    </div>
  );
}
