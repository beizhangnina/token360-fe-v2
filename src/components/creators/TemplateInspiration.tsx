"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TEMPLATES, type Template, type StudioTab } from "@/lib/creators/studioData";

const TAB_LABEL: Record<StudioTab, string> = {
  image: "Image",
  video: "Video",
  audio: "Audio",
};

export function TemplateInspiration({
  onApply,
}: {
  onApply: (t: Template) => void;
}) {
  return (
    <section
      id="templates"
      className="relative z-10 bg-[var(--bg-primary)] px-6 pt-8 pb-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Start from a template
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--text-secondary)] md:text-base">
            Curated prompts across image, video, and audio. One click to load into the studio.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onApply(t)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-left transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-accent)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-muted)]">
                <Image
                  src={t.thumb}
                  alt={t.title}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {TAB_LABEL[t.tab]}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {t.title}
                  </h3>
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    {t.category}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {t.prompt}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-purple-500)]">
                  Use this prompt <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
