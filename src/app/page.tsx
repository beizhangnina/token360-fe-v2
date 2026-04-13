import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DeveloperSection } from "@/components/DeveloperSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturedModelsSection } from "@/components/FeaturedModelsSection";
import { ModelGroupsSection } from "@/components/ModelGroupsSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { AIEraSection } from "@/components/AIEraSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DeveloperSection />
        <StatsSection />
        <FeaturedModelsSection />
        <ModelGroupsSection />
        <WhyChooseSection />
        <AIEraSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
