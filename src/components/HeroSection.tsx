"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    line1: "Multimodal AI, One Surface",
    line2: "End-to-End, Full Speed",
    subtitle:
      "Text, image, audio, and video models in one place — unified API, low-latency inference, from experiments to production.",
  },
  {
    line1: "Enterprise Features Are Live",
    line2: "Security at Scale",
    subtitle:
      "Team management, usage analytics, and compliance tools — built for production workloads from day one.",
  },
  {
    line1: "Nano Banana 2",
    line2: "Next-Gen Image Generation",
    subtitle:
      "A swift text-to-image model, tuned for crisp typography and product-ready visuals at unbeatable speed.",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative z-10 min-h-screen w-full overflow-hidden bg-[var(--bg-primary)]">
      {/* Clean background — no dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--bg-elevated)] via-[var(--bg-primary)] to-[var(--bg-primary)] dark:from-[#1E1B22] dark:via-[#1E1B22] dark:to-[#1E1B22]" />
      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Badge — no emoji, clean */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-purple-500)]"></span>
          Token360 · text · image · audio · video
        </div>

        {/* Heading carousel */}
        <div className="relative h-[140px] w-full max-w-[850px] md:h-[170px]">
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
            >
              <h1 className="whitespace-nowrap text-center text-[36px] font-bold leading-[1.15] text-[var(--text-primary)] md:text-[52px]">
                {s.line1}
              </h1>
              <h1 className="mt-1 whitespace-nowrap text-center text-[36px] font-bold italic leading-[1.15] text-[var(--text-primary)] md:text-[52px]">
                {s.line2}
              </h1>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-[var(--text-secondary)] md:max-w-lg md:text-lg">
          {slides[current].subtitle}
        </p>

        {/* CTA Buttons — gold primary action */}
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/explore"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ background: "var(--brand-purple-500)" }}
          >
            Explore Models <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[var(--border-subtle)] px-7 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
          >
            Documentation
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current
                ? "h-2 w-6 bg-[var(--text-primary)]"
                : "h-2 w-2 bg-[var(--text-muted)]"
            }`}
          />
        ))}
      </div>

      {/* Bottom right badges */}
      <div className="absolute bottom-6 right-4 z-20 flex gap-2 md:bottom-8 md:right-8">
        {[
          { label: "360" },
          { label: "⬡" },
          { label: "20%OFF" },
        ].map((badge, i) => (
          <div
            key={i}
            className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[10px] font-bold text-[var(--text-muted)] md:h-14 md:w-14"
          >
            {badge.label}
          </div>
        ))}
      </div>
    </section>
  );
}
