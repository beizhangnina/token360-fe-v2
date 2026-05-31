import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { TrackSelector } from "@/components/partners/TrackSelector";
import { CommissionTable } from "@/components/partners/CommissionTable";
import { HowItWorks } from "@/components/partners/HowItWorks";
import { PartnerFAQ } from "@/components/partners/PartnerFAQ";

export const metadata: Metadata = {
  title: "Partner Program — Token360",
  description:
    "Earn up to 15% by promoting Token360. Two tracks: Ambassador (creators, indie devs) and Channel Partner (agencies, SIs, resellers).",
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PartnersHero />
        <TrackSelector />
        <CommissionTable />
        <HowItWorks />
        <PartnerFAQ />
      </main>
      <Footer />
    </>
  );
}
