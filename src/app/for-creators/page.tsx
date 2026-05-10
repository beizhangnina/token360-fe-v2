import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { CreatorHero } from "@/components/creators/CreatorHero";
import { CreatorStudioShell } from "@/components/creators/CreatorStudioShell";
import { HowItWorks } from "@/components/creators/HowItWorks";
import { SignedInBanner } from "@/components/creators/SignedInBanner";
import { PricingCards } from "@/components/creators/pricing/PricingCards";

export const metadata: Metadata = {
  title: "For Creators · Token360",
  description:
    "Generate cinematic video clips with Token360's creator studio — one prompt, the world's best video models, the same API your favorite apps use.",
};

export default function ForCreatorsPage() {
  return (
    <>
      <Navbar />
      <SignedInBanner />
      <main>
        <CreatorHero />
        <CreatorStudioShell mode="anonymous" />
        <HowItWorks />
        <section className="bg-[var(--bg-primary)] px-6 pt-20">
          <div className="mx-auto max-w-[1100px] text-center">
            <h2 className="text-[36px] font-bold leading-[1.15] tracking-tight text-[var(--text-primary)] md:text-[48px]">
              Start free. <span className="text-[var(--brand-purple-500)]">Upgrade when you scale.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-base text-[var(--text-secondary)] md:text-lg">
              One subscription unlocks every Token360 video model. Cancel any time.
            </p>
          </div>
        </section>
        <PricingCards />
        <div className="bg-[var(--bg-primary)] px-6 pb-10 text-center">
          <Link
            href="/for-creators/pricing"
            className="text-sm font-semibold text-[var(--brand-purple-500)] hover:underline"
          >
            See full pricing details and FAQ →
          </Link>
        </div>
        <CTASection
          heading="Action is one sentence away."
          subheading="The world's been waiting for the moment when making a film became as easy as posting a thought. We think this is that moment."
          ctaLabel="Start free — no card"
          ctaHref="/for-creators/sign-in"
        />
      </main>
      <Footer />
    </>
  );
}
