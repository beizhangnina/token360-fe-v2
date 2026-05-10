import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const SHOWCASE = [
  { src: "/images/models/wan22.webp", label: "Seedance 2.0" },
  { src: "/images/models/sora.webp", label: "Veo 3.1" },
  { src: "/images/models/kling.webp", label: "Kling 2.5 Turbo" },
  { src: "/images/models/wan26.webp", label: "Hailuo 2.3" },
  { src: "/images/groups/kling.jpg", label: "Cinematic" },
];

export function CreatorHero() {
  return (
    <section className="relative z-10 overflow-hidden bg-[var(--bg-primary)] pt-28 pb-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(150,51,175,0.18) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(200,150,62,0.12) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--brand-purple-500)]" />
            For Creators · Studio · Beta
          </div>

          <h1 className="mt-6 text-[40px] font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-[64px]">
            Everyone, <span className="text-[var(--brand-purple-500)]">a director.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            The world&rsquo;s best video models —{" "}
            <span className="font-semibold text-[var(--text-primary)]">Seedance 2.0, Veo, Kling, Hailuo</span>{" "}
            — pooled into one place, routed for you. Type a sentence. Walk away. Come back to a
            film. No timelines, no plug-ins, no learning curve. The way home video should have
            always been.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#studio"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: "var(--brand-purple-500)" }}
            >
              Start Creating <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#templates"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[var(--border-subtle)] px-7 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
            >
              See Examples
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-5">
          {SHOWCASE.map((item) => (
            <div
              key={item.src}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)]"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(min-width: 768px) 220px, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[11px] font-semibold text-white/85">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
