"use client";

import Image from "next/image";
import {
  Copy,
  Download,
  Loader2,
  Pause,
  Play,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  MODELS,
  type ImageParams,
  type StudioTab,
  type VideoParams,
} from "@/lib/creators/studioData";
import type { MockResult } from "@/lib/creators/mockGenerate";

type Props = {
  tab: StudioTab;
  generating: boolean;
  results: MockResult[];
  modelId: string;
  prompt: string;
  imageParams: ImageParams;
  videoParams: VideoParams;
  onRegenerate: () => void;
  watermark?: boolean;
};

export function OutputPanel({
  tab,
  generating,
  results,
  modelId,
  prompt,
  imageParams,
  videoParams,
  onRegenerate,
  watermark = false,
}: Props) {
  const model = MODELS.find((m) => m.id === modelId);
  const aspectClass =
    tab === "image"
      ? aspectToClass(imageParams.aspect)
      : tab === "video"
      ? aspectToClass(videoParams.resolution === "1080p" ? "16:9" : "16:9")
      : "aspect-[16/9]";

  const skeletonCount =
    tab === "image" ? imageParams.count : tab === "video" ? 1 : 1;

  if (generating) {
    return (
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
        <Header
          title={`Generating with ${model?.name ?? "Token360"}…`}
          subtitle="Mock latency 1.8–2.4s · placeholder assets shown for demo"
        />
        <div className={gridClass(skeletonCount)}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className={
                "relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] " +
                aspectClass
              }
            >
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[var(--bg-muted)] via-[var(--bg-elevated)] to-[var(--bg-muted)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-[var(--brand-purple-500)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)] p-10 text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: "var(--bg-muted)" }}
        >
          <Sparkles className="h-6 w-6 text-[var(--brand-purple-500)]" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
          Your generations will appear here
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
          Type a prompt on the left, or pick a template below to pre-fill the studio.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
      <Header
        title={`${results.length} result${results.length > 1 ? "s" : ""} from ${model?.name ?? "Token360"}`}
        subtitle="Mock outputs · same prompt yields the same preview"
      />
      <div className={gridClass(results.length)}>
        {results.map((r) => (
          <ResultCard
            key={r.id}
            result={r}
            tab={tab}
            aspectClass={aspectClass}
            prompt={prompt}
            onRegenerate={onRegenerate}
            watermark={watermark}
          />
        ))}
      </div>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
    </div>
  );
}

function ResultCard({
  result,
  tab,
  aspectClass,
  prompt,
  onRegenerate,
  watermark,
}: {
  result: MockResult;
  tab: StudioTab;
  aspectClass: string;
  prompt: string;
  onRegenerate: () => void;
  watermark: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const model = MODELS.find((m) => m.id === result.modelId);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore — clipboard not available in some browsers
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className={"relative w-full overflow-hidden bg-[var(--bg-muted)] " + aspectClass}>
        {tab === "audio" ? (
          <AudioWaveform playing={playing} onToggle={() => setPlaying((p) => !p)} />
        ) : (
          <Image src={result.url} alt={prompt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        )}
        {tab === "video" && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <Play className="h-3 w-3 fill-white" /> Preview clip
          </div>
        )}
        {watermark && <WatermarkOverlay />}
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-3 py-2">
        <span className="truncate text-[11px] text-[var(--text-muted)]">
          {model?.vendor} · {model?.name}
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <IconAction onClick={copyPrompt} title={copied ? "Copied!" : "Copy prompt"}>
            <Copy className="h-3.5 w-3.5" />
          </IconAction>
          <IconAction asLink href={result.url} download title="Download">
            <Download className="h-3.5 w-3.5" />
          </IconAction>
          <IconAction onClick={onRegenerate} title="Re-generate">
            <RefreshCw className="h-3.5 w-3.5" />
          </IconAction>
        </div>
      </div>
    </div>
  );
}

function IconAction(
  props:
    | {
        asLink?: false;
        onClick: () => void;
        title: string;
        children: React.ReactNode;
      }
    | {
        asLink: true;
        href: string;
        download?: boolean;
        title: string;
        children: React.ReactNode;
      }
) {
  const cls =
    "flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]";
  if (props.asLink) {
    return (
      <a
        href={props.href}
        download={props.download ? "" : undefined}
        title={props.title}
        className={cls}
      >
        {props.children}
      </a>
    );
  }
  return (
    <button type="button" onClick={props.onClick} title={props.title} className={cls}>
      {props.children}
    </button>
  );
}

function WatermarkOverlay() {
  // Diagonal repeating watermark for anonymous previews. Sign-in lifts it.
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="grid grid-cols-3 gap-x-10 gap-y-6 opacity-40"
        style={{ transform: "rotate(-22deg) scale(1.2)" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="select-none whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.32em] text-white/85 drop-shadow"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,.4)" }}
          >
            Token360 · Preview
          </span>
        ))}
      </div>
    </div>
  );
}

function AudioWaveform({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const bars = 48;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(150,51,175,0.18) 0%, rgba(200,150,62,0.10) 100%)",
      }}
    >
      <div className="flex h-20 items-center gap-[3px]">
        {Array.from({ length: bars }).map((_, i) => {
          const h = 18 + ((i * 37) % 60);
          return (
            <span
              key={i}
              className={
                "block w-[3px] rounded-full bg-[var(--brand-purple-500)]/70 " +
                (playing ? "animate-pulse" : "")
              }
              style={{ height: `${h}%`, animationDelay: `${(i % 6) * 0.07}s` }}
            />
          );
        })}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm"
      >
        {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-white" />}
        {playing ? "0:14 / 0:30" : "0:00 / 0:30"}
      </button>
    </div>
  );
}

function aspectToClass(aspect: "1:1" | "16:9" | "9:16" | string): string {
  switch (aspect) {
    case "1:1":
      return "aspect-square";
    case "16:9":
      return "aspect-[16/9]";
    case "9:16":
      return "aspect-[9/16]";
    default:
      return "aspect-[16/9]";
  }
}

function gridClass(n: number): string {
  if (n <= 1) return "grid grid-cols-1 gap-3";
  if (n === 2) return "grid grid-cols-1 gap-3 sm:grid-cols-2";
  return "grid grid-cols-1 gap-3 sm:grid-cols-2";
}
