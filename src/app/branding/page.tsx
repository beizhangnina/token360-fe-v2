import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token360 — Branding Guidelines",
};

/* ── data ── */

const brandColors = [
  { name: "Purple 500", hex: "#9633AF", var: "--brand-purple-500", usage: "Primary accent, links, active states" },
  { name: "Purple 400", hex: "#B44FD0", var: "--brand-purple-400", usage: "Gradient mid, dark-mode accent hover" },
  { name: "Purple 700", hex: "#7B22A0", var: "--brand-purple-700", usage: "Light-mode hover state" },
  { name: "Purple 300", hex: "#D07AEB", var: "--brand-purple-300", usage: "Gradient end, lighter accent" },
  { name: "Teal 500", hex: "#06D6A0", var: "--brand-teal-500", usage: "Functional: success states, tags" },
];

const lightBg = [
  { name: "Primary", hex: "#F8F5FA", var: "--bg-primary" },
  { name: "Elevated", hex: "#FFFFFF", var: "--bg-elevated" },
  { name: "Muted", hex: "#EEE8F3", var: "--bg-muted" },
  { name: "Glass", hex: "#FFFFFFC7", var: "--surface-glass" },
];

const darkBg = [
  { name: "Primary", hex: "#0C0A10", var: "--bg-primary" },
  { name: "Elevated", hex: "#14121A", var: "--bg-elevated" },
  { name: "Muted", hex: "#1D1A26", var: "--bg-muted" },
  { name: "Glass", hex: "#FFFFFF0F", var: "--surface-glass" },
];

const lightText = [
  { name: "Primary", hex: "#0F172A", var: "--text-primary" },
  { name: "Secondary", hex: "#334155", var: "--text-secondary" },
  { name: "Muted", hex: "#64748B", var: "--text-muted" },
];

const darkText = [
  { name: "Primary", hex: "#FFFFFF", var: "--text-primary" },
  { name: "Secondary", hex: "#FFFFFFB8", var: "--text-secondary" },
  { name: "Muted", hex: "#FFFFFF94", var: "--text-muted" },
];

const lightBorders = [
  { name: "Subtle", hex: "#0F172A1F", var: "--border-subtle" },
  { name: "Strong", hex: "#0F172A3D", var: "--border-strong" },
];

const darkBorders = [
  { name: "Subtle", hex: "#FFFFFF1F", var: "--border-subtle" },
  { name: "Strong", hex: "#FFFFFF3D", var: "--border-strong" },
];

const typographyScale = [
  { element: "H1 (Hero)", font: "Inter", size: "56–72px", weight: "700", lineHeight: "1.05", note: "Tight tracking, bold" },
  { element: "H2 (Section title)", font: "Inter", size: "36–60px", weight: "600–700", lineHeight: "1.1", note: "Semibold to bold" },
  { element: "H3 (Card title)", font: "Inter", size: "18–24px", weight: "600", lineHeight: "1.3", note: "Semibold" },
  { element: "Body / Subtitle", font: "Inter", size: "18–20px", weight: "400", lineHeight: "1.6", note: "Regular" },
  { element: "Body (small)", font: "Inter", size: "16px", weight: "400", lineHeight: "1.5", note: "Descriptions" },
  { element: "Label / Caption", font: "Inter", size: "14px", weight: "500–600", lineHeight: "20px", note: "Buttons, nav links" },
  { element: "Badge / Overline", font: "Inter", size: "12px", weight: "500", lineHeight: "16px", note: "Pills, tags" },
  { element: "Code", font: "JetBrains Mono", size: "14px", weight: "400", lineHeight: "1.6", note: "Code blocks, inline code" },
];

const buttonSpecs = [
  { name: "CTA Primary", height: "52px", padding: "0 40px", radius: "full", font: "16px / 600", bg: "--text-primary", text: "--bg-primary" },
  { name: "CTA Secondary", height: "52px", padding: "0 40px", radius: "full", font: "16px / 600", bg: "transparent", text: "--text-primary" },
  { name: "Nav Button", height: "42px", padding: "10px 20px", radius: "full", font: "14px / 600", bg: "--text-primary", text: "--bg-primary" },
  { name: "Gradient CTA", height: "48px", padding: "12px 32px", radius: "full", font: "16px / 600", bg: "solid #9633AF", text: "white" },
];

const spacingSpecs = [
  { section: "Hero", spacing: "min-h-screen, centered vertically" },
  { section: "Developer", spacing: "py: 80px (5rem)" },
  { section: "Stats", spacing: "pt: 80px, pb: 32px" },
  { section: "Featured Models", spacing: "py: 80px" },
  { section: "Model Groups", spacing: "py: 80px" },
  { section: "Why Choose", spacing: "pt: 40px, pb: 64px" },
  { section: "AI Era", spacing: "py: 80px" },
  { section: "CTA", spacing: "py: 128px" },
  { section: "Footer", spacing: "py: 64px" },
];

const radiusSpecs = [
  { name: "Full", value: "9999px", usage: "Buttons, pills, badges, avatars, search" },
  { name: "3xl", value: "24px", usage: "CTA card container" },
  { name: "2xl", value: "16px", usage: "Code blocks, feature cards, model cards" },
  { name: "xl", value: "12px", usage: "Model group cards, stat cards" },
  { name: "lg", value: "8px", usage: "Hero bottom badges, icon containers" },
];

/* ── components ── */

function Swatch({ hex, name, cssVar, dark }: { hex: string; name: string; cssVar?: string; dark?: boolean }) {
  const border = hex === "#FFFFFF" || hex === "#FFFFFFC7" || hex === "#FFFFFF0F"
    ? "1px solid #e0e0e0" : hex === "#0C0A10" || hex === "#14121A" || hex === "#1D1A26"
    ? "1px solid #333" : "1px solid transparent";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-16 w-full rounded-lg" style={{ backgroundColor: hex, border }} />
      <span className={`text-sm font-semibold ${dark ? "text-white" : "text-[#0F172A]"}`}>{name}</span>
      <span className={`font-mono text-xs ${dark ? "text-white/60" : "text-[#64748B]"}`}>{hex}</span>
      {cssVar && <span className={`font-mono text-[10px] ${dark ? "text-white/40" : "text-[#64748B]/60"}`}>{cssVar}</span>}
    </div>
  );
}

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#9633AF] to-[#D07AEB]" />
      <h2 className="text-3xl font-semibold text-[var(--text-primary)]">{children}</h2>
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 mt-8 text-lg font-semibold text-[var(--text-primary)]">{children}</h3>;
}

/* ── page ── */

export default function BrandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
          <span className="text-lg font-semibold text-[var(--text-primary)]">Token360 <span className="font-normal text-[var(--text-muted)]">/ Brand Guidelines</span></span>
          <div className="hidden gap-6 text-sm font-medium text-[var(--text-secondary)] md:flex">
            <a href="#colors" className="hover:text-[var(--color-accent)] transition-colors">Colors</a>
            <a href="#typography" className="hover:text-[var(--color-accent)] transition-colors">Typography</a>
            <a href="#spacing" className="hover:text-[var(--color-accent)] transition-colors">Spacing</a>
            <a href="#components" className="hover:text-[var(--color-accent)] transition-colors">Components</a>
            <a href="#gradients" className="hover:text-[var(--color-accent)] transition-colors">Gradients</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[#0C0A10] px-6 py-24 text-center">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #ffffff1f 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10">
          <h1 className="text-5xl font-semibold text-white md:text-7xl">Token360</h1>
          <p className="mt-2 text-xl text-white/60">Brand Guidelines</p>
          <div className="mx-auto mt-6 flex justify-center gap-3">
            {["#7B22A0", "#9633AF", "#D07AEB"].map(c => (
              <div key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/40">
            This document defines the visual identity system for v5-purple, featuring Inter + JetBrains Mono typography and a purple-teal color system built around #9633AF.
          </p>
          <p className="mt-4 text-xs text-white/25">Version 5.0 — April 2026</p>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 py-16">

        {/* ═══ COLORS ═══ */}
        <section className="mb-20">
          <SectionTitle id="colors">Color Palette</SectionTitle>

          <SubTitle>Brand Colors</SubTitle>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {brandColors.map(c => (
              <div key={c.hex} className="flex flex-col gap-1.5">
                <div className="h-20 w-full rounded-lg" style={{ backgroundColor: c.hex }} />
                <span className="text-sm font-semibold text-[var(--text-primary)]">{c.name}</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">{c.hex}</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]/60">{c.var}</span>
                <span className="text-xs text-[var(--text-secondary)]">{c.usage}</span>
              </div>
            ))}
          </div>

          {/* Light theme */}
          <SubTitle>Light Theme — Backgrounds</SubTitle>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {lightBg.map(c => <Swatch key={c.hex} hex={c.hex} name={c.name} cssVar={c.var} />)}
          </div>

          <SubTitle>Light Theme — Text</SubTitle>
          <div className="grid grid-cols-3 gap-4">
            {lightText.map(c => <Swatch key={c.hex} hex={c.hex} name={c.name} cssVar={c.var} />)}
          </div>

          <SubTitle>Light Theme — Borders</SubTitle>
          <div className="grid grid-cols-3 gap-4">
            {lightBorders.map(c => <Swatch key={c.hex} hex={c.hex} name={c.name} cssVar={c.var} />)}
          </div>

          {/* Dark theme */}
          <div className="mt-12 rounded-2xl bg-[#0C0A10] p-8">
            <h3 className="mb-6 text-lg font-semibold text-white">Dark Theme</h3>

            <p className="mb-4 text-sm text-white/50">Backgrounds</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {darkBg.map(c => <Swatch key={c.hex} hex={c.hex} name={c.name} cssVar={c.var} dark />)}
            </div>

            <p className="mb-4 mt-8 text-sm text-white/50">Text</p>
            <div className="grid grid-cols-3 gap-4">
              {darkText.map(c => <Swatch key={c.hex} hex={c.hex} name={c.name} cssVar={c.var} dark />)}
            </div>

            <p className="mb-4 mt-8 text-sm text-white/50">Borders</p>
            <div className="grid grid-cols-3 gap-4">
              {darkBorders.map(c => <Swatch key={c.hex} hex={c.hex} name={c.name} cssVar={c.var} dark />)}
            </div>

            <p className="mt-8 text-xs text-white/30">
              Theme toggled via <code className="rounded bg-white/10 px-1.5 py-0.5">class=&quot;dark&quot;</code> on <code className="rounded bg-white/10 px-1.5 py-0.5">&lt;html&gt;</code>. Persisted with next-themes in localStorage.
            </p>
          </div>
        </section>

        {/* ═══ GRADIENTS ═══ */}
        <section className="mb-20">
          <SectionTitle id="gradients">Gradients</SectionTitle>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium text-[var(--text-primary)]">Hero Text Gradient</p>
              <div className="h-10 w-full rounded-lg" style={{ background: "linear-gradient(to right, #7B22A0, #B44FD0, #D07AEB)" }} />
              <p className="mt-1.5 font-mono text-xs text-[var(--text-muted)]">from-[--brand-purple-700] via-[--brand-purple-400] to-[--brand-purple-300]</p>
              <p className="text-xs text-[var(--text-secondary)]">Applied with bg-clip-text for transparent text effect on hero subtitle line</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[var(--text-primary)]">CTA Button Gradient</p>
              <div className="h-10 w-full rounded-lg" style={{ background: "#9633AF" }} />
              <p className="mt-1.5 font-mono text-xs text-[var(--text-muted)]">solid #9633AF</p>
              <p className="text-xs text-[var(--text-secondary)]">CTA button uses solid brand purple — no gradient</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[var(--text-primary)]">Stat Value Gradient</p>
              <div className="h-10 w-full rounded-lg" style={{ background: "linear-gradient(to right, #9633AF, #D07AEB)" }} />
              <p className="mt-1.5 font-mono text-xs text-[var(--text-muted)]">from-[--color-accent] to-[--color-warning]</p>
              <p className="text-xs text-[var(--text-secondary)]">bg-clip-text gradient on &quot;1 API&quot;, &quot;EU/US Ready&quot;, &quot;Up to -30%&quot; stat values</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[var(--text-primary)]">Card Decorative Glow</p>
              <div className="flex h-24 items-center justify-center rounded-lg bg-[#14121A]">
                <div className="h-20 w-20 rounded-full" style={{ background: "radial-gradient(circle, rgba(150,51,175,0.4) 0%, transparent 70%)" }} />
              </div>
              <p className="mt-1.5 font-mono text-xs text-[var(--text-muted)]">radial-gradient(circle, rgba(150,51,175,0.4) 0%, transparent 70%)</p>
              <p className="text-xs text-[var(--text-secondary)]">Purple glow overlay on AI Era feature cards, positioned absolute top-right</p>
            </div>
          </div>
        </section>

        {/* ═══ TYPOGRAPHY ═══ */}
        <section className="mb-20">
          <SectionTitle id="typography">Typography</SectionTitle>

          {/* Font families */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-accent)]">Primary / Display Font</p>
              <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">Inter</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Headings, body text, labels, buttons, nav — all UI</p>
              <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">&quot;Inter&quot;, ui-sans-serif, system-ui, sans-serif</p>
              <p className="font-mono text-xs text-[var(--text-muted)]/60">var: --font-sans</p>
              <div className="mt-4 text-lg text-[var(--text-primary)]">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789
              </div>
            </div>

            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-accent)]">Monospace Font</p>
              <p className="mt-2 font-mono text-3xl font-semibold text-[var(--text-primary)]">JetBrains Mono</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Code blocks, variable names, technical values</p>
              <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">&quot;JetBrains Mono&quot;, &quot;SF Mono&quot;, &quot;Fira Code&quot;, Menlo, monospace</p>
              <p className="font-mono text-xs text-[var(--text-muted)]/60">var: --font-mono</p>
              <div className="mt-4 font-mono text-lg text-[var(--text-primary)]">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789 !@#$%^&*()
              </div>
            </div>
          </div>

          {/* Type scale table */}
          <SubTitle>Type Scale</SubTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  <th className="pb-3 pr-4">Element</th>
                  <th className="pb-3 pr-4">Font</th>
                  <th className="pb-3 pr-4">Size</th>
                  <th className="pb-3 pr-4">Weight</th>
                  <th className="pb-3 pr-4">Line Height</th>
                  <th className="pb-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {typographyScale.map(row => (
                  <tr key={row.element} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{row.element}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[var(--text-muted)]">{row.font}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[var(--text-primary)]">{row.size}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[var(--text-primary)]">{row.weight}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[var(--text-muted)]">{row.lineHeight}</td>
                    <td className="py-3 text-xs text-[var(--text-secondary)]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Live preview */}
          <SubTitle>Live Preview</SubTitle>
          <div className="space-y-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8">
            <p className="text-[72px] font-bold leading-none text-[var(--text-primary)]">Aa</p>
            <p className="text-5xl font-semibold text-[var(--text-primary)]">One API. Global AI.</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">Built For Developers</p>
            <p className="text-xl text-[var(--text-secondary)]">Text, image, audio, and video models in one place.</p>
            <p className="text-base text-[var(--text-secondary)]">Token360 helps teams ship AI products worldwide with unified model access.</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Explore Models →</p>
            <p className="font-mono text-sm text-[var(--text-muted)]">import &#123; Token360 &#125; from &quot;@token360/sdk&quot;</p>
          </div>
        </section>

        {/* ═══ SPACING ═══ */}
        <section className="mb-20">
          <SectionTitle id="spacing">Spacing &amp; Layout</SectionTitle>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <SubTitle>Containers</SubTitle>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span><strong className="text-[var(--text-primary)]">1200px</strong> — Main content max-width</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span><strong className="text-[var(--text-primary)]">1000px</strong> — Why Choose section</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span><strong className="text-[var(--text-primary)]">900px</strong> — CTA section</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span><strong className="text-[var(--text-primary)]">24px</strong> — Horizontal page padding (px-6)</span></li>
              </ul>
            </div>

            <div>
              <SubTitle>Navbar</SubTitle>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span>Position: <code className="rounded bg-[var(--bg-muted)] px-1 text-xs">fixed top-0</code>, z-50</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span>Height: <code className="rounded bg-[var(--bg-muted)] px-1 text-xs">h-16</code> (64px)</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span>Background: glass surface + <code className="rounded bg-[var(--bg-muted)] px-1 text-xs">backdrop-blur-md</code></span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" /><span>Border: 1px solid --border-subtle</span></li>
              </ul>
            </div>
          </div>

          <SubTitle>Section Spacing</SubTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-[var(--border-subtle)] text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]"><th className="pb-3 pr-4">Section</th><th className="pb-3">Padding</th></tr></thead>
              <tbody>
                {spacingSpecs.map(s => (
                  <tr key={s.section} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2.5 pr-4 font-medium text-[var(--text-primary)]">{s.section}</td>
                    <td className="py-2.5 font-mono text-xs text-[var(--text-muted)]">{s.spacing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubTitle>Border Radius</SubTitle>
          <div className="flex flex-wrap gap-6">
            {radiusSpecs.map(r => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-24 items-center justify-center border-2 border-[var(--color-accent)] bg-[var(--bg-muted)]" style={{ borderRadius: r.value === "9999px" ? "9999px" : r.value }} />
                <span className="text-xs font-semibold text-[var(--text-primary)]">{r.name}</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">{r.value}</span>
                <span className="max-w-[120px] text-center text-[10px] text-[var(--text-secondary)]">{r.usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ COMPONENTS ═══ */}
        <section className="mb-20">
          <SectionTitle id="components">Component Specs</SectionTitle>

          <SubTitle>Buttons</SubTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-[var(--border-subtle)] text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                <th className="pb-3 pr-4">Variant</th><th className="pb-3 pr-4">Height</th><th className="pb-3 pr-4">Padding</th><th className="pb-3 pr-4">Radius</th><th className="pb-3 pr-4">Font</th><th className="pb-3">Background</th>
              </tr></thead>
              <tbody>
                {buttonSpecs.map(b => (
                  <tr key={b.name} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2.5 pr-4 font-medium text-[var(--text-primary)]">{b.name}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-[var(--text-muted)]">{b.height}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-[var(--text-muted)]">{b.padding}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-[var(--text-muted)]">{b.radius}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-[var(--text-muted)]">{b.font}</td>
                    <td className="py-2.5 font-mono text-xs text-[var(--text-muted)]">{b.bg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button className="inline-flex h-[52px] items-center rounded-full bg-[var(--text-primary)] px-10 text-base font-semibold text-[var(--bg-primary)]">Explore Models →</button>
            <button className="inline-flex h-[52px] items-center rounded-full border border-[var(--border-subtle)] px-10 text-base font-semibold text-[var(--text-primary)]">Documentation</button>
            <button className="inline-flex h-[42px] items-center rounded-full bg-[var(--text-primary)] px-5 text-sm font-semibold text-[var(--bg-primary)]">API Docs</button>
            <button className="inline-flex h-12 items-center rounded-full px-8 text-base font-semibold text-white" style={{ background: "#9633AF" }}>Sign Up</button>
          </div>

          <SubTitle>Card Variants</SubTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Featured Model Card", specs: "w-280/320px, h-384px, rounded-2xl, border purple-500/20, image fill with gradient overlay, text white on dark" },
              { name: "Model Group Card", specs: "rounded-xl, p-6, bg-muted (light) / gray-800/30 (dark), border purple-500/20, 48px avatar circle" },
              { name: "Stat Card", specs: "rounded-xl, p-6, border, bg-elevated, value: 3xl bold, label: sm muted" },
              { name: "AI Era Feature Card", specs: "rounded-2xl, p-8, glass surface + backdrop-blur, radial purple glow, accent icon, gradient stat text" },
              { name: "Why Choose Card", specs: "rounded-2xl, p-8, bg-elevated, 80px dark circle icon, centered text layout" },
              { name: "Code Block", specs: "rounded-2xl, border, bg-elevated, header with filename, 3 tab switcher, mono font, copy button" },
            ].map(card => (
              <div key={card.name} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{card.name}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{card.specs}</p>
              </div>
            ))}
          </div>

          <SubTitle>Shadows</SubTitle>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Light Mode — Accent Shadow</p>
              <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">0 0 12px rgba(150, 51, 175, 0.30)</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Dark Mode — Accent Shadow</p>
              <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">0 0 16px rgba(150, 51, 175, 0.40)</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-[var(--border-subtle)] pt-8 text-center text-xs text-[var(--text-muted)]">
          <p>Token360 v5-purple Branding Guidelines — Version 5.0 — April 2026</p>
        </footer>
      </main>
    </div>
  );
}
