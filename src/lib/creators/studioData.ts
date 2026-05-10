export type StudioTab = "image" | "video" | "audio";

export type StudioModel = {
  id: string;
  name: string;
  vendor: string;
  tab: StudioTab;
  thumb: string;
  blurb: string;
};

export const MODELS: StudioModel[] = [
  {
    id: "seedance-2-0",
    name: "Seedance 2.0",
    vendor: "ByteDance",
    tab: "video",
    thumb: "/images/models/wan22.webp",
    blurb: "Native multimodal audio + video, cinematic camera planning",
  },
  {
    id: "veo-3-1",
    name: "Veo 3.1",
    vendor: "Google",
    tab: "video",
    thumb: "/images/models/sora.webp",
    blurb: "Long-form coherence and physical realism",
  },
  {
    id: "kling-2-5-turbo",
    name: "Kling 2.5 Turbo",
    vendor: "Kuaishou",
    tab: "video",
    thumb: "/images/models/kling.webp",
    blurb: "Character consistency, anime stylization",
  },
  {
    id: "hailuo-2-3",
    name: "Hailuo 2.3",
    vendor: "MiniMax",
    tab: "video",
    thumb: "/images/models/wan26.webp",
    blurb: "Rapid iteration, fast drafts at speed",
  },
];

export type ImageParams = {
  aspect: "1:1" | "16:9" | "9:16";
  style: "Photoreal" | "Illustration" | "3D";
  count: 1 | 2 | 3 | 4;
};

export type VideoParams = {
  duration: "4s" | "8s" | "12s";
  resolution: "720p" | "1080p";
  motion: 1 | 2 | 3 | 4 | 5;
};

export type AudioParams = {
  voice: "Narrator" | "Casual" | "Anchor";
  language: "EN" | "中文" | "ES";
  duration: "10s" | "30s" | "60s";
};

export const DEFAULT_IMAGE_PARAMS: ImageParams = {
  aspect: "1:1",
  style: "Photoreal",
  count: 2,
};
export const DEFAULT_VIDEO_PARAMS: VideoParams = {
  duration: "4s",
  resolution: "720p",
  motion: 3,
};
export const DEFAULT_AUDIO_PARAMS: AudioParams = {
  voice: "Narrator",
  language: "EN",
  duration: "30s",
};

export const SAMPLE_OUTPUTS: Record<StudioTab, string[]> = {
  image: [
    "/images/models/nano-banana.webp",
    "/images/models/seedream.webp",
    "/images/models/qwen.webp",
    "/images/groups/flux.jpg",
    "/images/groups/seedream.jpg",
    "/images/groups/qwen.jpg",
  ],
  video: [
    "/images/models/wan26.webp",
    "/images/models/kling.webp",
    "/images/models/sora.webp",
    "/images/models/wan22.webp",
    "/images/groups/wan26.jpg",
    "/images/groups/kling.jpg",
  ],
  audio: [
    "/images/models/infinitetalk.webp",
    "/images/groups/audio.jpg",
  ],
};

export const PROMPT_PLACEHOLDERS: Record<StudioTab, string> = {
  image:
    "A cinematic close-up of a vintage espresso machine on a marble counter, warm morning light, shallow depth of field…",
  video:
    "A 4-second clip of neon raindrops falling on a Tokyo street, slow camera dolly-in, reflections on wet asphalt…",
  audio:
    "A warm narrator voice saying: 'Token360 brings the world's best AI to one place — start creating in seconds.'",
};

export type Template = {
  id: string;
  title: string;
  tab: StudioTab;
  modelId: string;
  prompt: string;
  thumb: string;
  category: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "tpl-talking-head",
    title: "Talking-head explainer",
    tab: "video",
    modelId: "kling-2-5-turbo",
    prompt:
      "A friendly tech reviewer in a neutral studio background explaining a product to camera, subtle hand gestures, 4-second loop",
    thumb: "/images/groups/kling.jpg",
    category: "Marketing",
  },
  {
    id: "tpl-product-loop",
    title: "Product 360° loop",
    tab: "video",
    modelId: "seedance-2-0",
    prompt:
      "A luxury watch slowly rotating on a black turntable, studio lighting, reflective surface, seamless 8-second loop",
    thumb: "/images/groups/wan26.jpg",
    category: "Product",
  },
  {
    id: "tpl-cityscape",
    title: "Cyberpunk cityscape",
    tab: "video",
    modelId: "veo-3-1",
    prompt:
      "Aerial flyover of a rain-soaked cyberpunk city at night, neon signs reflected in puddles, dense traffic, slow camera push-in",
    thumb: "/images/models/sora.webp",
    category: "Scenic",
  },
];
