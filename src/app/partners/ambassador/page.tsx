import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AmbassadorHeroPanel } from "@/components/partners/AmbassadorHeroPanel";
import { AmbassadorForm } from "@/components/partners/AmbassadorForm";

export const metadata: Metadata = {
  title: "Apply — Token360 Ambassador Program",
  description:
    "Join the Token360 Ambassador program. Earn up to 15% of referred usage. Monthly PayPal or USDC payout, no contract.",
};

export default function AmbassadorApplyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr]">
        {/* Left: dark hero panel */}
        <AmbassadorHeroPanel />

        {/* Right: form */}
        <section className="flex flex-col bg-[var(--bg-primary)]">
          {/* Top breadcrumb */}
          <div className="flex items-center justify-between px-6 py-5 lg:px-12">
            <Link
              href="/partners"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Partner Program
            </Link>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              Already a partner? Sign in
            </Link>
          </div>

          {/* Form container */}
          <div className="flex flex-1 items-start justify-center px-6 pb-16 pt-4 lg:px-12">
            <div className="w-full max-w-[560px]">
              <AmbassadorForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
