"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Download, Film, Image as ImageIcon, Music, Play, RefreshCw, Share2, Trash2 } from "lucide-react";
import { MOCK_LIBRARY, type LibraryItem } from "@/lib/creators/library";
import type { StudioTab } from "@/lib/creators/studioData";

type Filter = "all" | StudioTab;

const FILTERS: { id: Filter; label: string; Icon?: typeof ImageIcon }[] = [
  { id: "all", label: "All" },
  { id: "image", label: "Image", Icon: ImageIcon },
  { id: "video", label: "Video", Icon: Film },
  { id: "audio", label: "Audio", Icon: Music },
];

export function LibraryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<"newest" | "model">("newest");

  const items = useMemo(() => {
    let arr = [...MOCK_LIBRARY];
    if (filter !== "all") arr = arr.filter((i) => i.tab === filter);
    if (sort === "model") arr.sort((a, b) => a.modelName.localeCompare(b.modelName));
    return arr;
  }, [filter, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(({ id, label, Icon }) => {
            const active = id === filter;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors " +
                  (active
                    ? "border-transparent bg-[var(--brand-purple-500)] text-white"
                    : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]")
                }
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {label}
              </button>
            );
          })}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "newest" | "model")}
          className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] outline-none"
        >
          <option value="newest">Newest first</option>
          <option value="model">By model</option>
        </select>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)] p-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">No creations match this filter yet.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ item }: { item: LibraryItem }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-all hover:border-[var(--border-strong)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-muted)]">
        <Image
          src={item.thumb}
          alt={item.prompt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.tab === "video" && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <Play className="h-3 w-3 fill-white" /> Video
          </span>
        )}
        {item.tab === "audio" && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <Music className="h-3 w-3" /> Audio
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {item.modelName}
        </span>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--text-primary)]">{item.prompt}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-[var(--text-muted)]">{item.createdAt}</span>
          <div className="flex shrink-0 items-center gap-1">
            <IconAction title="Re-create" Icon={RefreshCw} />
            <IconAction title="Download" Icon={Download} href={item.thumb} />
            <IconAction title="Share" Icon={Share2} />
            <IconAction title="Delete" Icon={Trash2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconAction({
  title,
  Icon,
  href,
}: {
  title: string;
  Icon: typeof Download;
  href?: string;
}) {
  const cls =
    "flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]";
  if (href) {
    return (
      <a href={href} download title={title} className={cls}>
        <Icon className="h-3.5 w-3.5" />
      </a>
    );
  }
  return (
    <button type="button" title={title} className={cls}>
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
