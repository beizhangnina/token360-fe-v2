import { Globe, ShieldCheck, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
}

const cards: Card[] = [
  {
    icon: Globe,
    title: "One API, All AI",
    desc: "One integration to connect global models, routing, and payment rails for faster launches.",
    stat: "1 API",
    statLabel: "Multi-model + payment access",
  },
  {
    icon: ShieldCheck,
    title: "Compliance by Default",
    desc: "GDPR-friendly workflows with risk scoring and auditable trails for enterprise-grade trust.",
    stat: "EU/US Ready",
    statLabel: "Policy-aligned architecture",
  },
  {
    icon: TrendingDown,
    title: "Lean Cost, Full Power",
    desc: "Enterprise performance without heavy overhead, with transparent billing and smarter spend.",
    stat: "Up to -30%",
    statLabel: "Lower platform cost (mock)",
  },
];

export function AIEraSection() {
  return (
    <section className="relative z-20 bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
          Built for the AI Era
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 transition-all hover:border-[var(--border-strong)]"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-purple-500)]/8 text-[var(--brand-purple-500)]">
                <card.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{card.desc}</p>

              <div className="my-6 border-t border-[var(--border-subtle)]" />

              {/* Solid gold stat — no gradient */}
              <div className="text-4xl font-bold text-[var(--brand-purple-500)]">
                {card.stat}
              </div>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{card.statLabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
