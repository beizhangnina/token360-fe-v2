"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";
import { PLANS, PLAN_LABEL } from "@/lib/creators/billing";

export function PlanCard() {
  const { session } = useCreatorAuth();
  if (!session) return null;
  const plan = PLANS.find((p) => p.id === session.plan);
  const isStudio = session.plan === "studio";
  const renews = new Date(session.renewsAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Current plan
          </span>
          <h3 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
            {PLAN_LABEL[session.plan]}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{plan?.tagline}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[var(--text-primary)]">
            ${plan?.priceMonthly ?? 0}
            <span className="text-sm font-normal text-[var(--text-muted)]"> / month</span>
          </p>
          {session.plan !== "free" && (
            <p className="mt-1 text-xs text-[var(--text-muted)]">Renews {renews}</p>
          )}
        </div>
      </div>

      <ul className="mt-4 grid gap-1.5 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
        {plan?.features.filter((f) => f.include).slice(0, 4).map((f) => (
          <li key={f.text} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple-500)]" />
            {f.text}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        {!isStudio && (
          <Link
            href="/for-creators/pricing"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
            style={{ background: "var(--brand-purple-500)" }}
          >
            <Sparkles className="h-4 w-4" />
            {session.plan === "free" ? "Upgrade plan" : "Compare plans"}
          </Link>
        )}
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
        >
          Manage subscription
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
