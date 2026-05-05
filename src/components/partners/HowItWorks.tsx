import { FileText, ShieldCheck, Megaphone, Wallet } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Apply",
    body: "Submit a 1-minute form with your channel and audience.",
  },
  {
    icon: ShieldCheck,
    title: "Get approved",
    body: "We review and reply within 5 business days.",
  },
  {
    icon: Megaphone,
    title: "Promote",
    body: "Get a unique discount code, branded assets, and demo prompts.",
  },
  {
    icon: Wallet,
    title: "Earn",
    body: "Track referrals in your dashboard. T+1 payout via PayPal or USDC.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Four steps. From signup to first payout in under a week.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-purple-500)]/10 text-[var(--brand-purple-500)]">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mb-1 font-mono text-xs text-[var(--text-muted)]">
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
