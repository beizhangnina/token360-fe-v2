import Link from "next/link";

type Props = {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CTASection({
  heading = "Build Once. Scale Worldwide.",
  subheading = "From model orchestration to payments and compliance, Token360 gives your team one foundation to ship faster.",
  ctaLabel = "Sign Up",
  ctaHref = "/sign-in",
}: Props = {}) {
  return (
    <section className="relative z-20 bg-[var(--bg-primary)] px-6 py-32">
      <div className="mx-auto max-w-[900px]">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-8 py-16 text-center">
          {/* Subtle gold accent line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--brand-purple-500)]" />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">{subheading}</p>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center rounded-full px-8 py-3 font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: "var(--brand-purple-500)" }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
