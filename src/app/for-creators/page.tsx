import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { CreatorHero } from "@/components/creators/CreatorHero";
import { CreatorStudioShell } from "@/components/creators/CreatorStudioShell";
import { SignedInBanner } from "@/components/creators/SignedInBanner";

export const metadata: Metadata = {
  title: "For Creators · Token360",
  description:
    "Generate images, video, and voice with Token360's creator studio — one prompt, every modality, the same API your favorite apps use.",
};

export default function ForCreatorsPage() {
  return (
    <>
      <Navbar />
      <SignedInBanner />
      <main>
        <CreatorHero />
        <CreatorStudioShell mode="anonymous" />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
