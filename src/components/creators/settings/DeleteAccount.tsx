"use client";

import { useRouter } from "next/navigation";
import { useCreatorAuth } from "@/lib/creators/auth";

export function DeleteAccount() {
  const router = useRouter();
  const { signOut } = useCreatorAuth();

  function handleDelete() {
    if (typeof window === "undefined") return;
    const ok = window.confirm(
      "This will sign you out and clear your demo account. Continue?"
    );
    if (!ok) return;
    signOut();
    router.push("/for-creators");
  }

  return (
    <section className="rounded-2xl border border-[var(--color-danger-border)] bg-[var(--color-danger-bg)] p-6">
      <h3 className="text-sm font-semibold text-[var(--color-danger-text)]">Delete account</h3>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        Permanently remove your account, library, and API key. This cannot be undone.
      </p>
      <button
        type="button"
        onClick={handleDelete}
        className="mt-4 inline-flex items-center rounded-full border border-[var(--color-danger-border)] bg-transparent px-4 py-2 text-xs font-semibold text-[var(--color-danger-text)] transition-colors hover:bg-[var(--color-danger-bg)]"
      >
        Delete account
      </button>
    </section>
  );
}
