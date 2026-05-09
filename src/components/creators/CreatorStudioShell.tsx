"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Image as ImageIcon, Music } from "lucide-react";
import { OutputPanel } from "./OutputPanel";
import { PromptComposer } from "./PromptComposer";
import { TemplateInspiration } from "./TemplateInspiration";
import {
  DEFAULT_AUDIO_PARAMS,
  DEFAULT_IMAGE_PARAMS,
  DEFAULT_VIDEO_PARAMS,
  MODELS,
  type AudioParams,
  type ImageParams,
  type StudioTab,
  type Template,
  type VideoParams,
} from "@/lib/creators/studioData";
import { mockGenerate, type MockResult } from "@/lib/creators/mockGenerate";
import {
  ANON_USE_LIMIT,
  bumpAnonUses,
  useAnonUses,
  useCreatorAuth,
} from "@/lib/creators/auth";
import { creditCost } from "@/lib/creators/billing";

const TABS: { id: StudioTab; label: string; Icon: typeof ImageIcon }[] = [
  { id: "image", label: "Image", Icon: ImageIcon },
  { id: "video", label: "Video", Icon: Film },
  { id: "audio", label: "Audio", Icon: Music },
];

function defaultModelFor(tab: StudioTab): string {
  return MODELS.find((m) => m.tab === tab)?.id ?? "";
}

type Props = {
  mode?: "anonymous" | "authenticated";
  showTemplates?: boolean;
};

export function CreatorStudioShell({
  mode = "anonymous",
  showTemplates = true,
}: Props) {
  const router = useRouter();
  const { session, consumeCredits } = useCreatorAuth();
  const { uses: anonUses } = useAnonUses(mode === "anonymous");
  const anonExhausted = mode === "anonymous" && anonUses >= ANON_USE_LIMIT;

  const [tab, setTab] = useState<StudioTab>("image");
  const [modelByTab, setModelByTab] = useState<Record<StudioTab, string>>({
    image: defaultModelFor("image"),
    video: defaultModelFor("video"),
    audio: defaultModelFor("audio"),
  });
  const [promptByTab, setPromptByTab] = useState<Record<StudioTab, string>>({
    image: "",
    video: "",
    audio: "",
  });
  const [imageParams, setImageParams] = useState<ImageParams>(DEFAULT_IMAGE_PARAMS);
  const [videoParams, setVideoParams] = useState<VideoParams>(DEFAULT_VIDEO_PARAMS);
  const [audioParams, setAudioParams] = useState<AudioParams>(DEFAULT_AUDIO_PARAMS);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<MockResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const prompt = promptByTab[tab];
  const modelId = modelByTab[tab];
  const count = tab === "image" ? imageParams.count : 1;
  const cost = creditCost(tab, modelId, count);
  const creditsRemaining = session?.creditsRemaining ?? 0;
  const insufficientCredits = mode === "authenticated" && creditsRemaining < cost;

  const setPrompt = (s: string) => {
    setPromptByTab((p) => ({ ...p, [tab]: s }));
    if (error) setError(null);
  };
  const setModel = (id: string) => setModelByTab((m) => ({ ...m, [tab]: id }));

  const switchTab = (next: StudioTab) => {
    if (next === tab) return;
    setTab(next);
    setResults([]);
    setError(null);
  };

  const generate = useCallback(async () => {
    if (anonExhausted) {
      router.push("/for-creators/sign-in");
      return;
    }
    if (!prompt.trim()) {
      setError("Add a prompt to generate.");
      return;
    }
    if (mode === "authenticated" && creditsRemaining < cost) {
      setError("Not enough credits — upgrade your plan or buy a credit pack.");
      return;
    }
    setError(null);
    setGenerating(true);
    try {
      const out = await mockGenerate({ tab, modelId, prompt, count });
      setResults(out);
      if (mode === "anonymous") bumpAnonUses();
      else consumeCredits(cost);
    } finally {
      setGenerating(false);
    }
  }, [
    anonExhausted,
    prompt,
    mode,
    creditsRemaining,
    cost,
    tab,
    modelId,
    count,
    router,
    consumeCredits,
  ]);

  const applyTemplate = useCallback((t: Template) => {
    setTab(t.tab);
    setModelByTab((m) => ({ ...m, [t.tab]: t.modelId }));
    setPromptByTab((p) => ({ ...p, [t.tab]: t.prompt }));
    setResults([]);
    setError(null);
    if (typeof document !== "undefined") {
      const el = document.getElementById("studio");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Action label for the Generate button.
  let actionLabel = "Generate";
  let actionHelper: string;
  if (mode === "anonymous") {
    if (anonExhausted) {
      actionLabel = "Sign up to keep creating";
      actionHelper = "Free previews used — sign up for 50 credits, no credit card required";
    } else {
      const remaining = ANON_USE_LIMIT - anonUses;
      actionHelper = `${remaining} free preview${remaining === 1 ? "" : "s"} remaining · Outputs are watermarked`;
    }
  } else {
    actionLabel = `Generate · ${cost} credit${cost === 1 ? "" : "s"}`;
    actionHelper = insufficientCredits
      ? `Need ${cost} credits — you have ${creditsRemaining}. Upgrade or buy more.`
      : `${creditsRemaining.toLocaleString()} credits remaining`;
  }

  return (
    <>
      <section
        id="studio"
        className="relative z-10 scroll-mt-20 bg-[var(--bg-primary)] px-6 py-12"
      >
        <div className="mx-auto max-w-[1200px]">
          {/* Tabs */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1">
              {TABS.map(({ id, label, Icon }) => {
                const active = id === tab;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => switchTab(id)}
                    className={
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
                      (active
                        ? "bg-[var(--brand-purple-500)] text-white shadow-[var(--shadow-accent)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 max-w-xl text-center text-sm text-[var(--text-secondary)]">
              {tab === "image" &&
                "Generate stills for products, characters, or scenes. Output is square or widescreen."}
              {tab === "video" &&
                "Turn a prompt into a short cinematic clip. Tune duration, resolution, and motion."}
              {tab === "audio" &&
                "Create voiceovers, narration, or talking-head audio in EN, 中文, or ES."}
            </p>
          </div>

          {/* Composer + Output */}
          <div className="mt-8 grid gap-5 md:grid-cols-[420px_1fr]">
            <PromptComposer
              tab={tab}
              prompt={prompt}
              onPromptChange={setPrompt}
              modelId={modelId}
              onModelChange={setModel}
              imageParams={imageParams}
              onImageParamsChange={setImageParams}
              videoParams={videoParams}
              onVideoParamsChange={setVideoParams}
              audioParams={audioParams}
              onAudioParamsChange={setAudioParams}
              generating={generating}
              error={error}
              onGenerate={generate}
              actionLabel={actionLabel}
              actionHelper={actionHelper}
              actionDisabled={!anonExhausted && (insufficientCredits || prompt.trim().length === 0)}
            />
            <OutputPanel
              tab={tab}
              generating={generating}
              results={results}
              modelId={modelId}
              prompt={prompt}
              imageParams={imageParams}
              videoParams={videoParams}
              onRegenerate={generate}
              watermark={mode === "anonymous"}
            />
          </div>
        </div>
      </section>

      {showTemplates && <TemplateInspiration onApply={applyTemplate} />}
    </>
  );
}
