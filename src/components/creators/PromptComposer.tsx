"use client";

import { Loader2, Wand2 } from "lucide-react";
import {
  MODELS,
  PROMPT_PLACEHOLDERS,
  type AudioParams,
  type ImageParams,
  type StudioTab,
  type VideoParams,
} from "@/lib/creators/studioData";

const PROMPT_MAX = 500;

const inputCls =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--brand-purple-500)] focus:ring-2 focus:ring-[var(--color-focus-ring)]";

type Props = {
  tab: StudioTab;
  prompt: string;
  onPromptChange: (s: string) => void;
  modelId: string;
  onModelChange: (id: string) => void;
  imageParams: ImageParams;
  onImageParamsChange: (p: ImageParams) => void;
  videoParams: VideoParams;
  onVideoParamsChange: (p: VideoParams) => void;
  audioParams: AudioParams;
  onAudioParamsChange: (p: AudioParams) => void;
  generating: boolean;
  error: string | null;
  onGenerate: () => void;
};

export function PromptComposer(props: Props) {
  const {
    tab,
    prompt,
    onPromptChange,
    modelId,
    onModelChange,
    imageParams,
    onImageParamsChange,
    videoParams,
    onVideoParamsChange,
    audioParams,
    onAudioParamsChange,
    generating,
    error,
    onGenerate,
  } = props;

  const tabModels = MODELS.filter((m) => m.tab === tab);

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
      {/* Model picker */}
      <Label>Model</Label>
      <div className="mt-2 flex flex-wrap gap-2">
        {tabModels.map((m) => {
          const active = m.id === modelId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModelChange(m.id)}
              className={
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors " +
                (active
                  ? "border-transparent bg-[var(--brand-purple-500)] text-white"
                  : "border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]")
              }
              title={m.blurb}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {/* Prompt */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <Label>Prompt</Label>
          <span className="text-[11px] text-[var(--text-muted)]">
            {prompt.length} / {PROMPT_MAX}
          </span>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value.slice(0, PROMPT_MAX))}
          placeholder={PROMPT_PLACEHOLDERS[tab]}
          rows={5}
          className={inputCls + " mt-2 resize-none leading-relaxed"}
        />
      </div>

      {/* Per-tab parameters */}
      <div className="mt-5 space-y-4">
        {tab === "image" && (
          <ImageParamsRow value={imageParams} onChange={onImageParamsChange} />
        )}
        {tab === "video" && (
          <VideoParamsRow value={videoParams} onChange={onVideoParamsChange} />
        )}
        {tab === "audio" && (
          <AudioParamsRow value={audioParams} onChange={onAudioParamsChange} />
        )}
      </div>

      {error && (
        <p className="mt-4 text-xs text-[var(--color-danger-text)]">{error}</p>
      )}

      <button
        type="button"
        onClick={onGenerate}
        disabled={generating || prompt.trim().length === 0}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        style={{ background: "var(--brand-purple-500)" }}
      >
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4" />
            Generate
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] text-[var(--text-muted)]">
        Powered by Token360 API · No credits used in preview
      </p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
      {children}
    </span>
  );
}

function PillGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
              (active
                ? "border-[var(--brand-purple-500)] bg-[var(--brand-purple-500)]/10 text-[var(--brand-purple-500)]"
                : "border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]")
            }
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ImageParamsRow({
  value,
  onChange,
}: {
  value: ImageParams;
  onChange: (p: ImageParams) => void;
}) {
  return (
    <>
      <div>
        <Label>Aspect ratio</Label>
        <div className="mt-2">
          <PillGroup
            options={["1:1", "16:9", "9:16"] as const}
            value={value.aspect}
            onChange={(v) => onChange({ ...value, aspect: v })}
          />
        </div>
      </div>
      <div>
        <Label>Style</Label>
        <div className="mt-2">
          <PillGroup
            options={["Photoreal", "Illustration", "3D"] as const}
            value={value.style}
            onChange={(v) => onChange({ ...value, style: v })}
          />
        </div>
      </div>
      <div>
        <Label>Outputs</Label>
        <div className="mt-2 inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-1">
          {([1, 2, 3, 4] as const).map((n) => {
            const active = n === value.count;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ ...value, count: n })}
                className={
                  "h-7 w-9 rounded-full text-xs font-semibold transition-colors " +
                  (active
                    ? "bg-[var(--brand-purple-500)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")
                }
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function VideoParamsRow({
  value,
  onChange,
}: {
  value: VideoParams;
  onChange: (p: VideoParams) => void;
}) {
  return (
    <>
      <div>
        <Label>Duration</Label>
        <div className="mt-2">
          <PillGroup
            options={["4s", "8s", "12s"] as const}
            value={value.duration}
            onChange={(v) => onChange({ ...value, duration: v })}
          />
        </div>
      </div>
      <div>
        <Label>Resolution</Label>
        <div className="mt-2">
          <PillGroup
            options={["720p", "1080p"] as const}
            value={value.resolution}
            onChange={(v) => onChange({ ...value, resolution: v })}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label>Motion intensity</Label>
          <span className="text-[11px] text-[var(--text-muted)]">{value.motion} / 5</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value.motion}
          onChange={(e) =>
            onChange({ ...value, motion: Number(e.target.value) as VideoParams["motion"] })
          }
          className="mt-2 w-full accent-[var(--brand-purple-500)]"
        />
      </div>
    </>
  );
}

function AudioParamsRow({
  value,
  onChange,
}: {
  value: AudioParams;
  onChange: (p: AudioParams) => void;
}) {
  return (
    <>
      <div>
        <Label>Voice</Label>
        <div className="mt-2">
          <PillGroup
            options={["Narrator", "Casual", "Anchor"] as const}
            value={value.voice}
            onChange={(v) => onChange({ ...value, voice: v })}
          />
        </div>
      </div>
      <div>
        <Label>Language</Label>
        <div className="mt-2">
          <PillGroup
            options={["EN", "中文", "ES"] as const}
            value={value.language}
            onChange={(v) => onChange({ ...value, language: v })}
          />
        </div>
      </div>
      <div>
        <Label>Duration</Label>
        <div className="mt-2">
          <PillGroup
            options={["10s", "30s", "60s"] as const}
            value={value.duration}
            onChange={(v) => onChange({ ...value, duration: v })}
          />
        </div>
      </div>
    </>
  );
}
