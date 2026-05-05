import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Application received — Token360",
  description: "Your Ambassador application is in. We'll be in touch within 5 business days.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  const masked = email ? maskEmail(email) : null;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[var(--bg-primary)] px-6 pb-24 pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--brand-purple-500)] opacity-10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-[640px] text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-purple-500)]/10 text-[var(--brand-purple-500)]">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
            Application received
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[var(--text-secondary)]">
            {masked ? (
              <>
                We&rsquo;ll email a decision to{" "}
                <span className="font-mono font-medium text-[var(--text-primary)]">{masked}</span>{" "}
                within 5 business days.
              </>
            ) : (
              <>We&rsquo;ll email a decision within 5 business days.</>
            )}
          </p>

          {/* Next steps */}
          <div className="mt-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 text-left">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              While you wait
            </h2>
            <ul className="mt-4 space-y-4">
              <Item
                title="Follow @token360 on X"
                desc="We post weekly model drops and partner spotlights."
                href="https://x.com/token360"
              />
              <Item
                title="Join the Discord"
                desc="Connect with creators and the dev team. Approved partners get a private channel."
                href="https://discord.gg/token360"
              />
              <Item
                title="Browse the model catalog"
                desc="Get familiar with what you'll be promoting — text, image, audio, video."
                href="/explore"
              />
            </ul>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Item({ title, desc, href }: { title: string; desc: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-start justify-between gap-4 rounded-lg p-3 transition-colors hover:bg-[var(--bg-muted)]"
      >
        <div>
          <div className="font-medium text-[var(--text-primary)]">{title}</div>
          <div className="mt-0.5 text-sm text-[var(--text-secondary)]">{desc}</div>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--text-primary)]" />
      </Link>
    </li>
  );
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 2)}${"*".repeat(Math.max(local.length - 2, 3))}@${domain}`;
}
