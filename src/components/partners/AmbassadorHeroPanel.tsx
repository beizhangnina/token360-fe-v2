import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AmbassadorHeroPanel() {
  return (
    <div className="relative flex h-full min-h-[640px] flex-col justify-between overflow-hidden bg-[#0E0B14] p-10 text-white lg:min-h-screen lg:p-14">
      {/* Top: small link */}
      <div className="relative z-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
        >
          Get to know us more <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Center: logo + headline */}
      <div className="relative z-10 mt-16">
        <Image
          src="/icon/horizontal-dark.svg"
          alt="Token360"
          width={140}
          height={32}
          className="mb-10 h-8 w-auto opacity-90"
        />
        <h1 className="text-[44px] font-bold leading-[1.05] tracking-tight md:text-[56px]">
          Welcome to
          <br />
          Token360<span className="text-[var(--brand-purple-400)]">{"'"}</span>s
          <br />
          Ambassador
          <br />
          Program
        </h1>
        <p className="mt-6 text-lg text-white/70">
          Earn up to 30% on every paid customer.
        </p>
      </div>

      {/* Bottom: stat row + decorative ring */}
      <div className="relative z-10 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
        <span>
          <span className="font-mono text-white">$1k+/mo</span> avg top earner
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-white/30 md:inline-block" />
        <span>
          <span className="font-mono text-white">T+1</span> payout
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-white/30 md:inline-block" />
        <span>No contract</span>
      </div>

      {/* Decorative ring (bottom-right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-[260px] w-[260px] rounded-full border border-white/10"
      />

      {/* Subtle purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-[var(--brand-purple-700)] opacity-25 blur-[120px]"
      />
    </div>
  );
}
