"use client";

import { useCreatorAuth } from "@/lib/creators/auth";

export function DangerZone() {
  const { session } = useCreatorAuth();
  if (!session || session.plan === "free") return null;

  return (
    <div className="rounded-2xl border border-[var(--color-danger-border)] bg-[var(--color-danger-bg)] p-6">
      <h3 className="text-sm font-semibold text-[var(--color-danger-text)]">Cancel subscription</h3>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        You&rsquo;ll keep access until the end of your billing period. Credits do not roll over after
        cancellation.
      </p>
      <button
        type="button"
        className="mt-4 inline-flex items-center rounded-full border border-[var(--color-danger-border)] bg-transparent px-4 py-2 text-xs font-semibold text-[var(--color-danger-text)] transition-colors hover:bg-[var(--color-danger-bg)]"
      >
        Cancel plan
      </button>
    </div>
  );
}
