import type { StudioTab } from "./studioData";

export type LibraryItem = {
  id: string;
  tab: StudioTab;
  modelId: string;
  modelName: string;
  prompt: string;
  thumb: string;
  createdAt: string; // human-readable for the prototype
};

/**
 * Mock library — replace with a paginated DB query in production.
 * TODO(api): GET /api/creators/library?cursor=... → LibraryItem[]
 */
export const MOCK_LIBRARY: LibraryItem[] = [
  { id: "lib-1",  tab: "image", modelId: "nano-banana-2", modelName: "Nano Banana 2",
    prompt: "Cinematic product photo of a matte-black wireless headphone on glossy obsidian, rim light, soft purple haze",
    thumb: "/images/groups/seedream.jpg", createdAt: "Today · 2:14 PM" },
  { id: "lib-2",  tab: "image", modelId: "seedream-4-5", modelName: "Seedream 4.5",
    prompt: "Anime portrait of a young inventor with goggles, golden-hour lighting, painterly background",
    thumb: "/images/models/seedream.webp", createdAt: "Today · 11:08 AM" },
  { id: "lib-3",  tab: "video", modelId: "wan-2-6", modelName: "Wan 2.6",
    prompt: "A luxury watch slowly rotating on a black turntable, studio lighting, seamless 8-second loop",
    thumb: "/images/models/wan26.webp", createdAt: "Yesterday · 6:42 PM" },
  { id: "lib-4",  tab: "audio", modelId: "audio-studio", modelName: "Audio Studio",
    prompt: "A confident, warm narrator says: 'When ideas move at the speed of thought, you ship faster.'",
    thumb: "/images/groups/audio.jpg", createdAt: "Yesterday · 4:20 PM" },
  { id: "lib-5",  tab: "image", modelId: "qwen-image-2", modelName: "Qwen Image 2 Pro",
    prompt: "Wide-angle architectural photo of a brutalist concrete museum at dusk, dramatic shadows, atmospheric fog",
    thumb: "/images/groups/flux.jpg", createdAt: "Yesterday · 1:15 PM" },
  { id: "lib-6",  tab: "video", modelId: "kling-v3-pro", modelName: "Kling V3 Pro",
    prompt: "A friendly tech reviewer in a neutral studio explaining a product to camera, subtle hand gestures",
    thumb: "/images/groups/kling.jpg", createdAt: "Apr 28 · 3:55 PM" },
  { id: "lib-7",  tab: "image", modelId: "nano-banana-2", modelName: "Nano Banana 2",
    prompt: "Hyperreal close-up of a single drop of espresso splashing into a porcelain cup, dramatic side light",
    thumb: "/images/models/nano-banana.webp", createdAt: "Apr 28 · 11:30 AM" },
  { id: "lib-8",  tab: "audio", modelId: "infinitetalk", modelName: "InfiniteTalk",
    prompt: "An English-speaking avatar reads a 30-second product intro about Token360's unified AI platform",
    thumb: "/images/models/infinitetalk.webp", createdAt: "Apr 27 · 8:02 PM" },
  { id: "lib-9",  tab: "video", modelId: "sora-class", modelName: "Sora-class",
    prompt: "Aerial flyover of a rain-soaked cyberpunk city at night, neon signs reflected in puddles, slow push-in",
    thumb: "/images/models/sora.webp", createdAt: "Apr 27 · 2:11 PM" },
  { id: "lib-10", tab: "image", modelId: "seedream-4-5", modelName: "Seedream 4.5",
    prompt: "Editorial fashion photo, monochrome cream palette, model holding an analog camera, 35mm film grain",
    thumb: "/images/groups/qwen.jpg", createdAt: "Apr 26 · 9:45 AM" },
  { id: "lib-11", tab: "image", modelId: "qwen-image-2", modelName: "Qwen Image 2 Pro",
    prompt: "Isometric pixel art of a tiny coffee shop with warm window light and rain falling outside",
    thumb: "/images/groups/seedream.jpg", createdAt: "Apr 25 · 5:30 PM" },
  { id: "lib-12", tab: "video", modelId: "wan-2-6", modelName: "Wan 2.6",
    prompt: "Slow-motion ink drop diffusing in clear water, top-down view, vibrant magenta and gold pigments",
    thumb: "/images/groups/wan26.jpg", createdAt: "Apr 25 · 10:18 AM" },
  { id: "lib-13", tab: "audio", modelId: "audio-studio", modelName: "Audio Studio",
    prompt: "Upbeat 10-second podcast intro, female host: 'Welcome back to The Build Loop.'",
    thumb: "/images/groups/audio.jpg", createdAt: "Apr 24 · 6:00 PM" },
  { id: "lib-14", tab: "image", modelId: "nano-banana-2", modelName: "Nano Banana 2",
    prompt: "Magazine cover concept: a single avocado split open on a marble surface, soft natural light",
    thumb: "/images/models/qwen.webp", createdAt: "Apr 24 · 12:09 PM" },
  { id: "lib-15", tab: "video", modelId: "kling-v3-pro", modelName: "Kling V3 Pro",
    prompt: "Drone shot rising over a misty pine forest at sunrise, golden hour, atmospheric haze",
    thumb: "/images/models/kling.webp", createdAt: "Apr 23 · 7:25 PM" },
  { id: "lib-16", tab: "image", modelId: "seedream-4-5", modelName: "Seedream 4.5",
    prompt: "Studio Ghibli-inspired animation still: a young girl reading on a sunny windowsill with a cat",
    thumb: "/images/models/seedream.webp", createdAt: "Apr 22 · 3:48 PM" },
  { id: "lib-17", tab: "image", modelId: "qwen-image-2", modelName: "Qwen Image 2 Pro",
    prompt: "Concept art of a futuristic train station, soft volumetric light, travelers in long coats, painterly",
    thumb: "/images/models/wan22.webp", createdAt: "Apr 22 · 9:11 AM" },
  { id: "lib-18", tab: "audio", modelId: "infinitetalk", modelName: "InfiniteTalk",
    prompt: "Lip-synced avatar saying: 'Welcome to Token360 — let's build something extraordinary today.'",
    thumb: "/images/models/infinitetalk.webp", createdAt: "Apr 21 · 5:12 PM" },
];
