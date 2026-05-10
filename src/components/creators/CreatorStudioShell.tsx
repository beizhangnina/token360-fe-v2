"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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

  const [tab, setTab] = useState<StudioTab>("video");
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
  let actionLabel = "Roll the camera";
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
    actionLabel = `Roll the camera · ${cost} credit${cost === 1 ? "" : "s"}`;
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
          {/* Section intro */}
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Video Studio
            </span>
            <p className="mt-3 max-w-xl text-sm text-[var(--text-secondary)] md:text-base">
              Turn a prompt into a short cinematic clip. Tune duration, resolution, and motion.
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
