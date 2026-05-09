import type { Metadata } from "next";
import { PlanCard } from "@/components/creators/billing/PlanCard";
import { CreditsUsage } from "@/components/creators/billing/CreditsUsage";
import { InvoiceTable } from "@/components/creators/billing/InvoiceTable";
import { DangerZone } from "@/components/creators/billing/DangerZone";

export const metadata: Metadata = {
  title: "Billing · Token360 Creators",
};

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Billing & credits</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your plan, credits, and invoices.
        </p>
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        <PlanCard />
        <CreditsUsage />
      </div>
      <div className="mt-5">
        <InvoiceTable />
      </div>
      <div className="mt-5">
        <DangerZone />
      </div>
    </div>
  );
}
