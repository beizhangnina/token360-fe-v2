"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Mock client-side auth for the For Creators C-end prototype.
 *
 * TODO(api): replace with real auth (NextAuth / Clerk / custom JWT).
 * The session shape and the public hook surface should stay the same so
 * components don't need to change.
 */

export type CreatorPlan = "free" | "pro" | "studio";

export type CreatorSession = {
  email: string;
  name: string;
  plan: CreatorPlan;
  creditsRemaining: number;
  creditsLimit: number;
  apiKey: string;
  signedInAt: number;
  renewsAt: number;
};

const STORAGE_KEY = "t360_creator_session";
const ANON_USES_KEY = "t360_anon_uses";
export const ANON_USE_LIMIT = 3;

const PLAN_DEFAULT_CREDITS: Record<CreatorPlan, number> = {
  free: 50,
  pro: 1500,
  studio: 5000,
};

function fakeApiKey(email: string): string {
  // Deterministic fake key for the demo so it stays stable across reloads.
  let h = 0;
  for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) | 0;
  const tail = Math.abs(h).toString(36).padStart(8, "0");
  return `tk360_live_${tail}${"x".repeat(24)}`.slice(0, 38);
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "creator";
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function readSession(): CreatorSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CreatorSession;
  } catch {
    return null;
  }
}

function writeSession(s: CreatorSession | null) {
  if (typeof window === "undefined") return;
  if (s === null) window.localStorage.removeItem(STORAGE_KEY);
  else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  // Notify same-tab listeners (the storage event only fires across tabs).
  window.dispatchEvent(new Event("t360:session-change"));
}

export function buildSession(
  email: string,
  opts?: { plan?: CreatorPlan; name?: string }
): CreatorSession {
  const plan: CreatorPlan = opts?.plan ?? "free";
  const credits = PLAN_DEFAULT_CREDITS[plan];
  const now = Date.now();
  return {
    email,
    name: opts?.name ?? nameFromEmail(email),
    plan,
    creditsRemaining: credits,
    creditsLimit: credits,
    apiKey: fakeApiKey(email),
    signedInAt: now,
    renewsAt: now + 30 * 24 * 60 * 60 * 1000,
  };
}

export function useCreatorAuth() {
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<CreatorSession | null>(null);

  useEffect(() => {
    // Hydrate from localStorage on mount — accepted pattern to avoid SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(readSession());
    setHydrated(true);
    const onChange = () => setSession(readSession());
    window.addEventListener("storage", onChange);
    window.addEventListener("t360:session-change", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("t360:session-change", onChange);
    };
  }, []);

  const signIn = useCallback((email: string, opts?: { plan?: CreatorPlan }) => {
    // TODO(api): swap for real auth — POST /api/creators/sign-in with credentials.
    const s = buildSession(email, opts);
    writeSession(s);
    setSession(s);
    return s;
  }, []);

  const signUp = useCallback((email: string, opts?: { plan?: CreatorPlan }) => {
    // TODO(api): swap for real sign-up endpoint.
    const s = buildSession(email, opts);
    writeSession(s);
    setSession(s);
    return s;
  }, []);

  const signOut = useCallback(() => {
    writeSession(null);
    setSession(null);
  }, []);

  const consumeCredits = useCallback((amount: number) => {
    setSession((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        creditsRemaining: Math.max(0, prev.creditsRemaining - amount),
      };
      writeSession(next);
      return next;
    });
  }, []);

  const setPlan = useCallback((plan: CreatorPlan) => {
    setSession((prev) => {
      if (!prev) return prev;
      const limit = PLAN_DEFAULT_CREDITS[plan];
      const next: CreatorSession = {
        ...prev,
        plan,
        creditsLimit: limit,
        creditsRemaining: limit,
      };
      writeSession(next);
      return next;
    });
  }, []);

  return { session, hydrated, signIn, signUp, signOut, consumeCredits, setPlan };
}

// ── Anonymous (unauthenticated) generation tracking ─────────────────────────
export function getAnonUses(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.sessionStorage.getItem(ANON_USES_KEY);
  return raw ? Number(raw) || 0 : 0;
}

export function bumpAnonUses(): number {
  if (typeof window === "undefined") return 0;
  const next = getAnonUses() + 1;
  window.sessionStorage.setItem(ANON_USES_KEY, String(next));
  window.dispatchEvent(new Event("t360:anon-uses-change"));
  return next;
}

export function useAnonUses(enabled = true) {
  const [uses, setUses] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUses(getAnonUses());
    const onChange = () => setUses(getAnonUses());
    window.addEventListener("t360:anon-uses-change", onChange);
    return () => window.removeEventListener("t360:anon-uses-change", onChange);
  }, [enabled]);
  return { uses, remaining: Math.max(0, ANON_USE_LIMIT - uses) };
}
