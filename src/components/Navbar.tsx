"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        {/* Logo — horizontal mark + text */}
        <Link href="/" className="flex items-center">
          <Image
            src="/icon/horizontal-light.svg"
            alt="Token360"
            width={160}
            height={36}
            className="h-14 w-auto dark:hidden"
          />
          <Image
            src="/icon/horizontal-dark.svg"
            alt="Token360"
            width={160}
            height={36}
            className="hidden h-14 w-auto dark:block"
          />
        </Link>

        {/* Center */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2 text-sm">
            <Search className="h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search model..."
              className="w-32 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none lg:w-40"
            />
          </div>
          <Link href="/explore" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Explore
          </Link>
          <Link href="/for-creators" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            For Creators
          </Link>
          <Link href="/partners" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Partners
          </Link>
          <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Resources <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
