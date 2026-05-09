"use client";

import Link from "next/link";
import { Coins } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";

export function CreditsBadge() {
  const { session } = useCreatorAuth();
  if (!session) return null;
  const low = session.creditsRemaining < 50;
  return (
    <Link
      href="/for-creators/app/billing"
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors " +
        (low
          ? "border-[var(--brand-gold-500)]/60 bg-[var(--brand-gold-500)]/12 text-[var(--brand-gold-500)]"
          : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)]")
      }
      title={`${session.creditsRemaining.toLocaleString()} of ${session.creditsLimit.toLocaleString()} credits remaining`}
    >
      <Coins className="h-3.5 w-3.5" />
      {session.creditsRemaining.toLocaleString()}
      <span className="text-[var(--text-muted)]">credits</span>
    </Link>
  );
}
