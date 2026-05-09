"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { PLANS, type Plan } from "@/lib/creators/billing";
import { useCreatorAuth } from "@/lib/creators/auth";

type Cycle = "monthly" | "yearly";

export function PricingCards() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const { session, setPlan, hydrated } = useCreatorAuth();

  return (
    <section className="bg-[var(--bg-primary)] px-6 pb-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex justify-center">
          <CycleToggle value={cycle} onChange={setCycle} />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCardView
              key={plan.id}
              plan={plan}
              cycle={cycle}
              currentPlan={hydrated ? session?.plan ?? null : null}
              onSelect={() => {
                if (plan.id === "free") {
                  if (!session) window.location.href = "/for-creators/sign-in";
                  else setPlan(plan.id);
                  return;
                }
                if (!session) {
                  window.location.href = "/for-creators/sign-in?plan=" + plan.id;
                  return;
                }
                // TODO(api): redirect to Stripe checkout in production.
                setPlan(plan.id);
                window.location.href = "/for-creators/app/billing";
              }}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          Prices in USD. Yearly billing saves about 20% — shown as the equivalent monthly rate.
        </p>
      </div>
    </section>
  );
}

function CycleToggle({ value, onChange }: { value: Cycle; onChange: (v: Cycle) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={
          "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors " +
          (value === "monthly"
            ? "bg-[var(--brand-purple-500)] text-white"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")
        }
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("yearly")}
        className={
          "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors " +
          (value === "yearly"
            ? "bg-[var(--brand-purple-500)] text-white"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")
        }
      >
        Yearly
        <span
          className={
            "rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider " +
            (value === "yearly"
              ? "bg-white/20 text-white"
              : "bg-[var(--brand-purple-500)]/15 text-[var(--brand-purple-500)]")
          }
        >
          -20%
        </span>
      </button>
    </div>
  );
}

function PlanCardView({
  plan,
  cycle,
  currentPlan,
  onSelect,
}: {
  plan: Plan;
  cycle: Cycle;
  currentPlan: string | null;
  onSelect: () => void;
}) {
  const price = cycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
  const featured = !!plan.badge;
  const isCurrent = currentPlan === plan.id;

  return (
    <div
      className={
        "relative flex flex-col rounded-2xl border bg-[var(--bg-elevated)] p-6 transition-all " +
        (featured
          ? "border-[var(--brand-purple-500)] shadow-[var(--shadow-accent)]"
          : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]")
      }
    >
      {plan.badge && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
          style={{ background: "var(--brand-purple-500)" }}
        >
          {plan.badge}
        </span>
      )}

      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{plan.name}</h3>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{plan.tagline}</p>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          ${price}
        </span>
        <span className="text-sm text-[var(--text-muted)]">/ month</span>
      </div>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        {cycle === "yearly" && plan.priceMonthly > 0
          ? `Billed $${plan.priceYearly * 12} yearly`
          : plan.priceMonthly > 0
          ? `Billed monthly`
          : "Free forever"}
      </p>

      <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
        {plan.creditsPerMonth.toLocaleString()} credits / month
      </p>

      <ul className="mt-4 flex flex-1 flex-col gap-2.5">
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={
              "flex items-start gap-2 text-sm " +
              (f.include ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] line-through")
            }
          >
            {f.include ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-purple-500)]" />
            ) : (
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
            )}
            <span>{f.text}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        disabled={isCurrent}
        className={
          "mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-transform hover:scale-[1.01] disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100 " +
          (featured
            ? "bg-[var(--brand-purple-500)] text-white"
            : "border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)]")
        }
      >
        {isCurrent ? "Current plan" : plan.cta}
      </button>
    </div>
  );
}
