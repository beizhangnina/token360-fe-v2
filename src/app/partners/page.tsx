import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnerProgram } from "@/components/partners/PartnerProgram";
import { CommissionTable } from "@/components/partners/CommissionTable";
import { HowItWorks } from "@/components/partners/HowItWorks";
import { PartnerFAQ } from "@/components/partners/PartnerFAQ";

export const metadata: Metadata = {
  title: "Partner Program — Token360",
  description:
    "Earn up to 15% by promoting Token360 — one Partner Program for creators, devs, communities, agencies, and resellers, with custom terms for high-volume partners.",
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PartnersHero />
        <PartnerProgram />
        <CommissionTable />
        <HowItWorks />
        <PartnerFAQ />
      </main>
      <Footer />
    </>
  );
}
