"use client";

import { Download } from "lucide-react";
import { MOCK_INVOICES } from "@/lib/creators/billing";

const STATUS_COLOR: Record<string, string> = {
  paid: "bg-[var(--brand-purple-500)]/15 text-[var(--brand-purple-500)]",
  pending: "bg-[var(--brand-gold-500)]/15 text-[var(--brand-gold-500)]",
  refunded: "bg-[var(--bg-muted)] text-[var(--text-muted)]",
};

export function InvoiceTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
      <div className="border-b border-[var(--border-subtle)] px-6 py-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Billing history</h3>
        <p className="mt-1 text-xs text-[var(--text-muted)]">Last 12 months · download invoices anytime</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
              <Th>Invoice</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th className="text-right">Amount</Th>
              <Th>Status</Th>
              <Th className="text-right">Receipt</Th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICES.map((inv) => (
              <tr key={inv.id} className="border-b border-[var(--border-subtle)] last:border-0">
                <Td className="font-mono text-xs text-[var(--text-secondary)]">{inv.id}</Td>
                <Td className="text-[var(--text-secondary)]">{inv.date}</Td>
                <Td className="text-[var(--text-primary)]">{inv.description}</Td>
                <Td className="text-right text-[var(--text-primary)]">${inv.amount.toFixed(2)}</Td>
                <Td>
                  <span
                    className={
                      "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider " +
                      (STATUS_COLOR[inv.status] ?? "")
                    }
                  >
                    {inv.status}
                  </span>
                </Td>
                <Td className="text-right">
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    title="Download receipt"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={
        "whitespace-nowrap px-6 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] " +
        (className ?? "")
      }
    >
      {children}
    </th>
  );
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={"whitespace-nowrap px-6 py-3.5 " + (className ?? "")}>{children}</td>;
}
