"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CreditCard, LogOut, Settings, User } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";
import { PLAN_LABEL } from "@/lib/creators/billing";

export function UserMenu() {
  const router = useRouter();
  const { session, signOut } = useCreatorAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  if (!session) return null;
  const initial = session.name.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-1.5 transition-colors hover:bg-[var(--bg-muted)]"
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: "var(--brand-purple-500)" }}
        >
          {initial}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-xl">
          <div className="border-b border-[var(--border-subtle)] px-4 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{session.name}</p>
            <p className="truncate text-xs text-[var(--text-muted)]">{session.email}</p>
            <span className="mt-2 inline-block rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-primary)]">
              {PLAN_LABEL[session.plan]} plan
            </span>
          </div>
          <ul className="py-1.5 text-sm">
            <MenuItem href="/for-creators/app/settings" Icon={User} label="Profile & API key" onClick={() => setOpen(false)} />
            <MenuItem href="/for-creators/app/billing" Icon={CreditCard} label="Billing" onClick={() => setOpen(false)} />
            <MenuItem href="/for-creators/app/settings" Icon={Settings} label="Settings" onClick={() => setOpen(false)} />
          </ul>
          <div className="border-t border-[var(--border-subtle)] py-1.5">
            <button
              type="button"
              onClick={() => {
                signOut();
                setOpen(false);
                router.push("/for-creators");
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  href,
  Icon,
  label,
  onClick,
}: {
  href: string;
  Icon: typeof User;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    </li>
  );
}
