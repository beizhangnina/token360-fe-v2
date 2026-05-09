"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Eye, EyeOff, Lock, RefreshCw } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";

export function ApiKeySection() {
  const { session } = useCreatorAuth();
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!session) return null;
  const studioOnly = session.plan !== "studio";
  const masked = session.apiKey.slice(0, 12) + "•".repeat(20);

  async function copy() {
    try {
      await navigator.clipboard.writeText(session!.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* no-op */
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">API access</h3>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            Use your account&rsquo;s API key with the Token360 SDK or curl. Studio plan only.
          </p>
        </div>
        {studioOnly && (
          <Link
            href="/for-creators/pricing"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
            style={{ background: "var(--brand-purple-500)" }}
          >
            <Lock className="h-3 w-3" />
            Upgrade to Studio
          </Link>
        )}
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-2">
        <code
          className={
            "flex-1 truncate px-3 py-2 font-mono text-xs " +
            (studioOnly ? "text-[var(--text-muted)] blur-sm select-none" : "text-[var(--text-primary)]")
          }
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          {revealed ? session.apiKey : masked}
        </code>
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          disabled={studioOnly}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:opacity-50"
          title={revealed ? "Hide" : "Reveal"}
        >
          {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          onClick={copy}
          disabled={studioOnly}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:opacity-50"
          title={copied ? "Copied" : "Copy"}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[var(--brand-purple-500)]" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          disabled={studioOnly}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:opacity-50"
          title="Rotate key"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="border-b border-[var(--border-subtle)] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Quick start · curl
        </div>
        <pre
          className="overflow-x-auto px-4 py-3 text-xs leading-relaxed text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
{`curl https://api.token360.com/v1/models/alibaba/wan-2.6/text-to-video \\
  -H "Authorization: Bearer ${revealed && !studioOnly ? session.apiKey : "$TOKEN360_API_KEY"}" \\
  -H "Content-Type: application/json" \\
  -d '{ "prompt": "...", "duration": "4s", "resolution": "720p" }'`}
        </pre>
      </div>
    </section>
  );
}
