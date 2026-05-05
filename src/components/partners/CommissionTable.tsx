export function CommissionTable() {
  return (
    <section id="commission" className="relative bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Ambassador commission
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Earn more as your referrals grow. LATAM partners receive an extra +5% across the board.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--bg-muted)] text-[var(--text-secondary)]">
                <tr>
                  <Th>Tier</Th>
                  <Th>Monthly referred volume</Th>
                  <Th align="right">North America</Th>
                  <Th align="right">LATAM (+5%)</Th>
                  <Th>Perks</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <Row
                  tier="Starter"
                  volume="< $10k"
                  na="15%"
                  latam="20%"
                  perks="—"
                />
                <Row
                  tier="Growth"
                  volume="$10k – $50k"
                  na="20%"
                  latam="25%"
                  perks="$100 / $150 free credits"
                />
                <Row
                  tier="Top"
                  volume="$50k+"
                  na="25%"
                  latam="30%"
                  perks="Compute points 1:1, early model access, official feature"
                  highlight
                />
              </tbody>
            </table>
          </div>
        </div>

        <ul className="mt-6 space-y-1.5 text-xs text-[var(--text-muted)]">
          <li>
            <span className="font-mono text-[var(--text-secondary)]">Video models</span> earn an
            additional +2% across all tiers.
          </li>
          <li>
            <span className="font-mono text-[var(--text-secondary)]">New paying customer</span>{" "}
            triggers a one-time +3% bonus.
          </li>
          <li>
            Settlement basis is the actual paid amount (after discount), not list price.
          </li>
        </ul>
      </div>
    </section>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Row({
  tier,
  volume,
  na,
  latam,
  perks,
  highlight,
}: {
  tier: string;
  volume: string;
  na: string;
  latam: string;
  perks: string;
  highlight?: boolean;
}) {
  return (
    <tr className={highlight ? "bg-[var(--brand-purple-500)]/5" : undefined}>
      <td className="px-5 py-4">
        <span className="font-semibold text-[var(--text-primary)]">{tier}</span>
        {highlight && (
          <span className="ml-2 inline-flex items-center rounded-full bg-[var(--brand-purple-500)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--brand-purple-500)]">
            Best
          </span>
        )}
      </td>
      <td className="px-5 py-4 text-[var(--text-secondary)]">{volume}</td>
      <td className="px-5 py-4 text-right font-mono font-semibold text-[var(--text-primary)]">
        {na}
      </td>
      <td className="px-5 py-4 text-right font-mono font-semibold text-[var(--brand-purple-500)]">
        {latam}
      </td>
      <td className="px-5 py-4 text-[var(--text-secondary)]">{perks}</td>
    </tr>
  );
}
