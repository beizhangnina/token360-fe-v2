"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";
import { PLAN_LABEL } from "@/lib/creators/billing";

export function SignedInBanner() {
  const { session, hydrated } = useCreatorAuth();
  if (!hydrated || !session) return null;

  return (
    <div className="border-b border-[var(--border-subtle)] bg-[linear-gradient(90deg,rgba(150,51,175,0.10),rgba(200,150,62,0.10))]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-2.5 text-sm">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <Sparkles className="h-4 w-4 text-[var(--brand-purple-500)]" />
          <span>
            Welcome back, <strong className="text-[var(--text-primary)]">{session.name}</strong> ·{" "}
            <span className="text-[var(--text-muted)]">{PLAN_LABEL[session.plan]} plan</span>
          </span>
        </div>
        <Link
          href="/for-creators/app/studio"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-purple-500)] hover:underline"
        >
          Open your Studio
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
