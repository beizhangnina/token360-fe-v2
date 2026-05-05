"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { COUNTRIES, CHANNEL_TYPES, type ChannelType } from "@/lib/partners/countries";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  channelTypes: ChannelType[];
  channelUrl: string;
  audienceSize: string;
  promoPlan: string;
  payout: "PayPal" | "USDC" | "Bank" | "";
  agree: boolean;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  channelTypes: [],
  channelUrl: "",
  audienceSize: "",
  promoPlan: "",
  payout: "",
  agree: false,
};

const PROMO_MAX = 200;

export function AmbassadorForm() {
  const router = useRouter();
  const [v, setV] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const selectedCountry = COUNTRIES.find((c) => c.code === v.country);
  const isLatam = selectedCountry?.latam === true;

  function update<K extends keyof FormState>(key: K, val: FormState[K]) {
    setV((s) => ({ ...s, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleChannel(t: ChannelType) {
    setV((s) =>
      s.channelTypes.includes(t)
        ? { ...s, channelTypes: s.channelTypes.filter((x) => x !== t) }
        : { ...s, channelTypes: [...s.channelTypes, t] }
    );
    setErrors((e) => ({ ...e, channelTypes: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!v.firstName.trim()) next.firstName = "Required";
    if (!v.lastName.trim()) next.lastName = "Required";
    if (!v.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) next.email = "Enter a valid email";
    if (!v.country) next.country = "Select your country";
    if (v.channelTypes.length === 0) next.channelTypes = "Pick at least one";
    if (!v.channelUrl.trim()) next.channelUrl = "Required";
    else if (!/^https?:\/\//i.test(v.channelUrl)) next.channelUrl = "Must start with http:// or https://";
    if (!v.audienceSize.trim()) next.audienceSize = "Required";
    if (!v.promoPlan.trim()) next.promoPlan = "Tell us how you'll promote";
    else if (v.promoPlan.length > PROMO_MAX) next.promoPlan = `Max ${PROMO_MAX} characters`;
    if (!v.payout) next.payout = "Choose a payout method";
    if (!v.agree) next.agree = "You must agree to the terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock: log payload, simulate latency, then route to thank-you
    if (typeof window !== "undefined") {
      window.console.log("[mock] ambassador application submitted:", v);
    }
    await new Promise((r) => setTimeout(r, 600));
    router.push(`/partners/thank-you?email=${encodeURIComponent(v.email)}`);
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

      {/* Name row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="First name" required error={errors.firstName}>
          <input
            type="text"
            value={v.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputCls}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last name" required error={errors.lastName}>
          <input
            type="text"
            value={v.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={inputCls}
            autoComplete="family-name"
          />
        </Field>
      </div>

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

      {/* Country */}
      <Field
        label="Country / Region"
        required
        error={errors.country}
        hint={
          isLatam ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-purple-500)]/10 px-2 py-0.5 text-xs font-medium text-[var(--brand-purple-500)]">
              <Check className="h-3 w-3" /> LATAM bonus +5% applied
            </span>
          ) : null
        }
      >
        <select
          value={v.country}
          onChange={(e) => update("country", e.target.value)}
          className={inputCls}
        >
          <option value="">Select country</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
              {c.latam ? " — LATAM (+5%)" : ""}
            </option>
          ))}
        </select>
      </Field>

      {/* Channel types */}
      <Field label="Where do you have an audience?" required error={errors.channelTypes}>
        <div className="flex flex-wrap gap-2">
          {CHANNEL_TYPES.map((t) => {
            const on = v.channelTypes.includes(t);
            return (
              <button
                type="button"
                key={t}
                onClick={() => toggleChannel(t)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  on
                    ? "border-[var(--brand-purple-500)] bg-[var(--brand-purple-500)] text-white"
                    : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </Field>

      {/* Channel URL + audience */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Field label="Primary channel URL" required error={errors.channelUrl}>
            <input
              type="url"
              value={v.channelUrl}
              onChange={(e) => update("channelUrl", e.target.value)}
              className={inputCls}
              placeholder="https://youtube.com/@yourhandle"
            />
          </Field>
        </div>
        <div>
          <Field label="Audience size" required error={errors.audienceSize}>
            <input
              type="text"
              value={v.audienceSize}
              onChange={(e) => update("audienceSize", e.target.value)}
              className={inputCls}
              placeholder="e.g. 25k"
              inputMode="numeric"
            />
          </Field>
        </div>
      </div>

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
          placeholder="Brief: audience, content cadence, models you plan to feature."
        />
      </Field>

      {/* Payout */}
      <Field label="Payout preference" required error={errors.payout}>
        <div className="flex flex-wrap gap-2">
          {(["PayPal", "USDC", "Bank"] as const).map((p) => {
            const on = v.payout === p;
            return (
              <button
                type="button"
                key={p}
                onClick={() => update("payout", p)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  on
                    ? "border-[var(--brand-purple-500)] bg-[var(--brand-purple-500)] text-white"
                    : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          We collect the wallet/account details after approval.
        </p>
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
            Ambassador Terms
          </Link>{" "}
          and to disclose sponsored content per FTC guidelines (#ad).
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
