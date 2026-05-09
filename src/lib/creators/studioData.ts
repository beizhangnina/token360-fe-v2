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
  // Image
  {
    id: "nano-banana-2",
    name: "Nano Banana 2",
    vendor: "Token360",
    tab: "image",
    thumb: "/images/models/nano-banana.webp",
    blurb: "Fast text-to-image, crisp typography",
  },
  {
    id: "seedream-4-5",
    name: "Seedream 4.5",
    vendor: "Bytedance",
    tab: "image",
    thumb: "/images/models/seedream.webp",
    blurb: "Edit & remix with natural language",
  },
  {
    id: "qwen-image-2",
    name: "Qwen Image 2 Pro",
    vendor: "Alibaba",
    tab: "image",
    thumb: "/images/models/qwen.webp",
    blurb: "Bilingual prompts, photoreal & illustration",
  },

  // Video
  {
    id: "wan-2-6",
    name: "Wan 2.6",
    vendor: "Alibaba",
    tab: "video",
    thumb: "/images/models/wan26.webp",
    blurb: "Image-to-video with strong motion",
  },
  {
    id: "kling-v3-pro",
    name: "Kling V3 Pro",
    vendor: "Kuaishou",
    tab: "video",
    thumb: "/images/models/kling.webp",
    blurb: "Cinematic motion, camera-aware",
  },
  {
    id: "sora-class",
    name: "Sora-class",
    vendor: "OpenAI",
    tab: "video",
    thumb: "/images/models/sora.webp",
    blurb: "Long-form coherent video",
  },

  // Audio
  {
    id: "infinitetalk",
    name: "InfiniteTalk",
    vendor: "Token360",
    tab: "audio",
    thumb: "/images/models/infinitetalk.webp",
    blurb: "Lip-synced talking-head narration",
  },
  {
    id: "audio-studio",
    name: "Audio Studio",
    vendor: "Token360",
    tab: "audio",
    thumb: "/images/groups/audio.jpg",
    blurb: "Voice clips, narration & SFX",
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
    id: "tpl-product",
    title: "Cinematic product shot",
    tab: "image",
    modelId: "nano-banana-2",
    prompt:
      "Cinematic product photo of a matte-black wireless headphone on a glossy obsidian surface, rim light, soft purple haze, ultra-detailed, 50mm lens",
    thumb: "/images/groups/seedream.jpg",
    category: "Product",
  },
  {
    id: "tpl-anime",
    title: "Anime portrait",
    tab: "image",
    modelId: "seedream-4-5",
    prompt:
      "Anime portrait of a young inventor with goggles, golden-hour lighting, painterly background, Studio Ghibli inspired",
    thumb: "/images/groups/qwen.jpg",
    category: "Character",
  },
  {
    id: "tpl-architecture",
    title: "Brutalist architecture",
    tab: "image",
    modelId: "qwen-image-2",
    prompt:
      "Wide-angle architectural photo of a brutalist concrete museum at dusk, dramatic shadows, atmospheric fog, ultra-detailed",
    thumb: "/images/groups/flux.jpg",
    category: "Architecture",
  },
  {
    id: "tpl-talking-head",
    title: "Talking-head explainer",
    tab: "video",
    modelId: "kling-v3-pro",
    prompt:
      "A friendly tech reviewer in a neutral studio background explaining a product to camera, subtle hand gestures, 4-second loop",
    thumb: "/images/groups/kling.jpg",
    category: "Marketing",
  },
  {
    id: "tpl-product-loop",
    title: "Product 360° loop",
    tab: "video",
    modelId: "wan-2-6",
    prompt:
      "A luxury watch slowly rotating on a black turntable, studio lighting, reflective surface, seamless 8-second loop",
    thumb: "/images/groups/wan26.jpg",
    category: "Product",
  },
  {
    id: "tpl-cityscape",
    title: "Cyberpunk cityscape",
    tab: "video",
    modelId: "sora-class",
    prompt:
      "Aerial flyover of a rain-soaked cyberpunk city at night, neon signs reflected in puddles, dense traffic, slow camera push-in",
    thumb: "/images/models/sora.webp",
    category: "Scenic",
  },
  {
    id: "tpl-narrator",
    title: "Brand narrator voice",
    tab: "audio",
    modelId: "audio-studio",
    prompt:
      "A confident, warm male narrator says: 'When ideas move at the speed of thought, you ship faster — Token360.'",
    thumb: "/images/groups/audio.jpg",
    category: "Voiceover",
  },
  {
    id: "tpl-talking-avatar",
    title: "Lip-synced avatar",
    tab: "audio",
    modelId: "infinitetalk",
    prompt:
      "An English-speaking avatar reads a 30-second product intro about Token360's unified AI platform, friendly tone",
    thumb: "/images/models/infinitetalk.webp",
    category: "Avatar",
  },
  {
    id: "tpl-podcast",
    title: "Podcast intro bumper",
    tab: "audio",
    modelId: "audio-studio",
    prompt:
      "A 10-second upbeat podcast intro, female host says: 'Welcome back to The Build Loop — where AI meets craft.'",
    thumb: "/images/groups/audio.jpg",
    category: "Podcast",
  },
];
