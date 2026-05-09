"use client";

import { useState, useMemo, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, Sparkles } from "lucide-react";
import { useCreatorAuth, type CreatorPlan } from "@/lib/creators/auth";

const inputCls =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--brand-purple-500)] focus:ring-2 focus:ring-[var(--color-focus-ring)]";

type Mode = "sign-in" | "sign-up";

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const queryPlan = (params.get("plan") as CreatorPlan | null) ?? null;
  const initialMode: Mode = params.get("mode") === "sign-up" || queryPlan ? "sign-up" : "sign-in";
  const { signIn, signUp } = useCreatorAuth();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validPlan: CreatorPlan = useMemo(() => {
    if (queryPlan === "pro" || queryPlan === "studio" || queryPlan === "free") return queryPlan;
    return "free";
  }, [queryPlan]);

  function validate(): string | null {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setBusy(true);
    // Mock latency to feel real.
    await new Promise((r) => setTimeout(r, 600));
    if (mode === "sign-up") signUp(email, { plan: validPlan });
    else signIn(email, { plan: validPlan });
    router.push("/for-creators/app/studio");
  }

  function mockOAuth(provider: "google" | "github") {
    setBusy(true);
    setTimeout(() => {
      const fakeEmail = `${provider}-user-${Math.random().toString(36).slice(2, 6)}@token360.demo`;
      signIn(fakeEmail, { plan: validPlan });
      router.push("/for-creators/app/studio");
    }, 400);
  }

  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--bg-primary)] px-6 py-16">
      <div className="w-full max-w-[440px]">
        <div className="text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-muted)]">
            <Sparkles className="h-6 w-6 text-[var(--brand-purple-500)]" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            {mode === "sign-up" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {mode === "sign-up"
              ? "Sign up free — 50 credits, no credit card required."
              : "Sign in to keep creating with the Token360 Studio."}
          </p>
        </div>

        <div className="mt-8 inline-flex w-full items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1">
          {(["sign-in", "sign-up"] as const).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={
                  "flex-1 rounded-full py-2 text-sm font-semibold transition-colors " +
                  (active
                    ? "bg-[var(--brand-purple-500)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")
                }
              >
                {m === "sign-in" ? "Sign In" : "Sign Up"}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-2">
          <button
            type="button"
            onClick={() => mockOAuth("google")}
            disabled={busy}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)] disabled:opacity-60"
          >
            <GoogleMark />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => mockOAuth("github")}
            disabled={busy}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)] disabled:opacity-60"
          >
            <GithubMark />
            Continue with GitHub
          </button>
        </div>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
          <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          or
          <div className="h-px flex-1 bg-[var(--border-subtle)]" />
        </div>

        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              className={inputCls}
              required
            />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="password"
              autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className={inputCls}
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-xs text-[var(--color-danger-text)]">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            style={{ background: "var(--brand-purple-500)" }}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "sign-up" ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[var(--text-muted)]">
          By continuing you agree to the Token360{" "}
          <Link href="#" className="underline hover:text-[var(--text-secondary)]">Terms</Link> and{" "}
          <Link href="#" className="underline hover:text-[var(--text-secondary)]">Privacy Policy</Link>.
        </p>
        <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
          Looking for the developer API?{" "}
          <Link href="/sign-in" className="text-[var(--text-secondary)] underline">
            Token360 for developers →
          </Link>
        </p>
      </div>
    </section>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="fill-[var(--text-primary)]">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
