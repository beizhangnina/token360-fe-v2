"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";

const inputCls =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--brand-purple-500)] focus:ring-2 focus:ring-[var(--color-focus-ring)]";

export function ProfileSection() {
  const { session } = useCreatorAuth();
  const [name, setName] = useState(session?.name ?? "");
  const [saved, setSaved] = useState(false);

  if (!session) return null;
  const initial = (name || session.name).charAt(0).toUpperCase();

  return (
    <Section title="Profile" subtitle="How you appear inside the studio.">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white"
          style={{ background: "var(--brand-purple-500)" }}
        >
          {initial}
        </span>
        <div className="grid w-full gap-3">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Display name
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSaved(false);
              }}
              className={inputCls + " mt-1.5"}
            />
          </label>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Email
            <input value={session.email} readOnly className={inputCls + " mt-1.5 bg-[var(--bg-muted)] text-[var(--text-muted)]"} />
          </label>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-3">
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-purple-500)]">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        )}
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
        >
          Save changes
        </button>
      </div>
    </Section>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
      <header>
        <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">{subtitle}</p>
      </header>
      <div className="mt-5">{children}</div>
    </section>
  );
}
