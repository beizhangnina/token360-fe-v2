"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { CreditsBadge } from "./CreditsBadge";
import { UserMenu } from "./UserMenu";
import { useCreatorAuth } from "@/lib/creators/auth";

const TITLES: Record<string, string> = {
  "/for-creators/app/studio": "Studio",
  "/for-creators/app/library": "Library",
  "/for-creators/app/billing": "Billing",
  "/for-creators/app/settings": "Settings",
};

export function AppTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const pathname = usePathname();
  const title = (pathname && TITLES[pathname]) ?? "Studio";
  const { theme, setTheme } = useTheme();
  const { session } = useCreatorAuth();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-muted)] md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-base font-semibold text-[var(--text-primary)] md:text-lg">{title}</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <CreditsBadge />
          {session && session.plan !== "studio" && (
            <Link
              href="/for-creators/pricing"
              className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white sm:inline-flex"
              style={{ background: "var(--brand-purple-500)" }}
            >
              <Sparkles className="h-3 w-3" />
              Upgrade
            </Link>
          )}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-muted)]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
