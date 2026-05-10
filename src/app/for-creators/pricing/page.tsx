import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { PricingHero } from "@/components/creators/pricing/PricingHero";
import { PricingCards } from "@/components/creators/pricing/PricingCards";
import { PricingFAQ } from "@/components/creators/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing · Token360 for Creators",
  description:
    "Simple plans for AI video generation. Free to start, Pro at $19, Studio at $49. Cancel any time.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingHero />
        <PricingCards />
        <PricingFAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
