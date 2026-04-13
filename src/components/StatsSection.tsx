import { Zap } from "lucide-react";

const stats = [
  { value: "80+", label: "Global AI Models" },
  { value: "< 60s", label: "First Integration Time" },
  { value: "30%", label: "Lower Total Cost" },
  { value: "24/7", label: "Compliance Monitoring" },
];

export function StatsSection() {
  return (
    <section className="relative z-20 bg-[var(--bg-primary)] px-6 pb-8 pt-20">
      <div className="mx-auto max-w-[1200px] text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2 text-sm text-[var(--text-secondary)]">
          <Zap className="h-4 w-4 text-[var(--text-muted)]" />
          AI-Native Infrastructure for Builders and Enterprises
        </div>

        <h2 className="mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          One API. Global AI. Trusted Scale.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Token360 helps teams ship AI products worldwide with unified model access, compliant
          operations, and clearer cost control.
        </p>

        {/* Stats grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 text-left"
            >
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
