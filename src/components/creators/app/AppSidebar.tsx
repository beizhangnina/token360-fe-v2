"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  CreditCard,
  Image as ImageIcon,
  LogOut,
  Settings,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";
import { PLAN_LABEL } from "@/lib/creators/billing";

const NAV: { label: string; href: string; Icon: typeof Wand2 }[] = [
  { label: "Studio", href: "/for-creators/app/studio", Icon: Wand2 },
  { label: "Library", href: "/for-creators/app/library", Icon: ImageIcon },
  { label: "Billing", href: "/for-creators/app/billing", Icon: CreditCard },
  { label: "Settings", href: "/for-creators/app/settings", Icon: Settings },
];

export function AppSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, signOut } = useCreatorAuth();

  function onSignOut() {
    signOut();
    router.push("/for-creators");
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}
      <aside
        className={
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-transform md:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex h-16 items-center justify-between border-b border-[var(--border-subtle)] px-5">
          <Link href="/for-creators/app/studio" className="flex items-center" onClick={onClose}>
            <Image
              src="/icon/horizontal-light.svg"
              alt="Token360"
              width={140}
              height={32}
              className="h-12 w-auto dark:hidden"
            />
            <Image
              src="/icon/horizontal-dark.svg"
              alt="Token360"
              width={140}
              height={32}
              className="hidden h-12 w-auto dark:block"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-muted)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {NAV.map(({ label, href, Icon }) => {
              const active = pathname === href || pathname?.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={
                      "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors " +
                      (active
                        ? "bg-[var(--bg-muted)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]")
                    }
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
                        style={{ background: "var(--brand-purple-500)" }}
                      />
                    )}
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-[var(--border-subtle)] p-3">
          {session && (
            <div className="mb-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Plan
                </span>
                <span className="rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-primary)]">
                  {PLAN_LABEL[session.plan]}
                </span>
              </div>
              {session.plan !== "studio" && (
                <Link
                  href="/for-creators/pricing"
                  onClick={onClose}
                  className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white"
                  style={{ background: "var(--brand-purple-500)" }}
                >
                  <Sparkles className="h-3 w-3" />
                  Upgrade plan
                </Link>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
