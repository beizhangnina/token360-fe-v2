"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const models = [
  { title: "Wan 2.6 · Image to Video", img: "/images/models/wan26.webp", desc: "High-quality image-to-video with strong motion and prompt adherence. REST API, no cold start." },
  { title: "Seedream 4.5 · Edit", img: "/images/models/seedream.webp", desc: "Advanced image editing with natural language — ideal for creative iteration and brand assets." },
  { title: "Nano Banana 2 · Text to Image", img: "/images/models/nano-banana.webp", desc: "Fast, vivid text-to-image generation tuned for crisp typography and product shots." },
  { title: "Kling V3 Pro · Image to Video", img: "/images/models/kling.webp", desc: "Cinematic motion control and camera-aware video generation from a single image." },
  { title: "InfiniteTalk · Digital Human", img: "/images/models/infinitetalk.webp", desc: "Talking avatars with lip-sync and expressive motion for marketing and education." },
  { title: "Wan 2.2 · Animate", img: "/images/models/wan22.webp", desc: "Motion control and animation from reference — great for stylized shorts and ads." },
  { title: "Qwen Image 2 Pro · Text to Image", img: "/images/models/qwen.webp", desc: "Photoreal and illustration styles with strong bilingual prompt understanding." },
  { title: "Sora-class · Image to Video", img: "/images/models/sora.webp", desc: "Long-form coherent video from image + prompt — mock route for exploration." },
];

export function FeaturedModelsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="relative z-20 bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          Featured Models
        </h2>

        <div className="relative mt-10">
          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {models.map((model) => (
              <div
                key={model.title}
                className="group relative h-96 w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] transition-all hover:border-[var(--border-strong)] hover:scale-[1.02] md:w-[320px]"
              >
                <Image
                  src={model.img}
                  alt={model.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-base font-semibold text-white">{model.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-white/70">{model.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
