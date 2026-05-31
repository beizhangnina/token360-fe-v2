"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  channelUrl: string;
  promoPlan: string;
  agree: boolean;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  channelUrl: "",
  promoPlan: "",
  agree: false,
};

const PROMO_MAX = 300;

/** Read a silent referral value from the `?ref=` param or a `ref` cookie, if present. */
function readRef(): string | null {
  if (typeof window === "undefined") return null;
  const fromParam = new URLSearchParams(window.location.search).get("ref");
  if (fromParam) return fromParam;
  const m = document.cookie.match(/(?:^|;\s*)ref=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function AmbassadorForm() {
  const router = useRouter();
  const [v, setV] = useState<FormState>(INITIAL);
  const [company, setCompany] = useState(""); // honeypot — real users leave this empty
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, val: FormState[K]) {
    setV((s) => ({ ...s, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!v.name.trim()) next.name = "Required";
    if (!v.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) next.email = "Enter a valid email";
    if (!v.channelUrl.trim()) next.channelUrl = "Required";
    if (!v.promoPlan.trim()) next.promoPlan = "Tell us how you'll promote";
    else if (v.promoPlan.length > PROMO_MAX) next.promoPlan = `Max ${PROMO_MAX} characters`;
    if (!v.agree) next.agree = "You must agree to the terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, company, ref: readRef() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitError(
          res.status === 429
            ? "Too many submissions. Please try again in a few minutes."
            : data?.error ?? "Something went wrong. Please try again."
        );
        setSubmitting(false);
        return;
      }
      router.push(`/partners/thank-you?email=${encodeURIComponent(v.email)}`);
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Complete your application
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Takes about a minute. We&rsquo;ll review and reply within 5 business days.
        </p>
      </div>

      {/* Honeypot — visually hidden, off-screen (not display:none so bots still fill it) */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {/* Name */}
      <Field label="Name" required error={errors.name}>
        <input
          type="text"
          value={v.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputCls}
          autoComplete="name"
        />
      </Field>

      {/* Email */}
      <Field label="Email" required error={errors.email}>
        <input
          type="email"
          value={v.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputCls}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Field>

      {/* Channel / audience link */}
      <Field
        label="Where can we see your audience? YouTube, newsletter, X, Discord, your product, etc."
        required
        error={errors.channelUrl}
      >
        <input
          type="text"
          value={v.channelUrl}
          onChange={(e) => update("channelUrl", e.target.value)}
          className={inputCls}
          placeholder="https://youtube.com/@yourhandle or @yourhandle"
        />
      </Field>

      {/* Promo plan */}
      <Field
        label="How will you promote Token360?"
        required
        error={errors.promoPlan}
        hint={
          <span className="text-xs text-[var(--text-muted)]">
            {v.promoPlan.length}/{PROMO_MAX}
          </span>
        }
      >
        <textarea
          value={v.promoPlan}
          onChange={(e) => update("promoPlan", e.target.value.slice(0, PROMO_MAX))}
          className={`${inputCls} min-h-[96px] resize-y`}
          placeholder="A sentence or two: audience, content cadence, models you plan to feature."
        />
      </Field>

      {/* Agree */}
      <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
        <input
          type="checkbox"
          checked={v.agree}
          onChange={(e) => update("agree", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-[var(--border-strong)] text-[var(--brand-purple-500)] focus:ring-[var(--color-focus-ring)]"
        />
        <span>
          I agree to the{" "}
          <Link href="/legal/ambassador-terms" className="underline">
            Partner Program Terms
          </Link>
          .
        </span>
      </label>
      {errors.agree && (
        <p className="-mt-3 text-xs text-[var(--color-danger-text)]">{errors.agree}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-purple-500)] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit application"
        )}
      </button>
      {submitError && (
        <p className="text-center text-xs text-[var(--color-danger-text)]">{submitError}</p>
      )}
      <p className="text-center text-xs text-[var(--text-muted)]">
        We&rsquo;ll email a decision within 5 business days.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--brand-purple-500)] focus:ring-2 focus:ring-[var(--color-focus-ring)]";

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {label}
          {required && <span className="ml-0.5 text-[var(--brand-purple-500)]">*</span>}
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p className="mt-1 text-xs text-[var(--color-danger-text)]">{error}</p>
      )}
    </div>
  );
}
