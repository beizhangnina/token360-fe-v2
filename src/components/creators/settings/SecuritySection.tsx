"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const inputCls =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--brand-purple-500)] focus:ring-2 focus:ring-[var(--color-focus-ring)]";

export function SecuritySection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSave() {
    if (next.length < 6) return setError("New password must be at least 6 characters.");
    if (next !== confirm) return setError("Passwords don't match.");
    setError(null);
    setSuccess(true);
    setCurrent("");
    setNext("");
    setConfirm("");
    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
      <header>
        <h3 className="text-base font-semibold text-[var(--text-primary)]">Password</h3>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
          Protect your account with a strong password.
        </p>
      </header>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Input label="Current" value={current} onChange={setCurrent} />
        <Input label="New" value={next} onChange={setNext} />
        <Input label="Confirm new" value={confirm} onChange={setConfirm} />
      </div>
      {error && <p className="mt-3 text-xs text-[var(--color-danger-text)]">{error}</p>}
      <div className="mt-4 flex items-center justify-end gap-3">
        {success && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-purple-500)]">
            <Check className="h-3.5 w-3.5" /> Password updated
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full px-4 py-2 text-xs font-semibold text-white"
          style={{ background: "var(--brand-purple-500)" }}
        >
          Update password
        </button>
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
      {label}
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls + " mt-1.5"}
      />
    </label>
  );
}
