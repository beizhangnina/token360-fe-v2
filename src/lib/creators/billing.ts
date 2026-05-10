import type { CreatorPlan } from "./auth";
import type { StudioTab } from "./studioData";

export type Plan = {
  id: CreatorPlan;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number; // monthly equivalent when billed yearly
  creditsPerMonth: number;
  cta: string;
  badge?: string;
  features: { text: string; include: boolean }[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Try the studio with no commitment",
    priceMonthly: 0,
    priceYearly: 0,
    creditsPerMonth: 50,
    cta: "Start free",
    features: [
      { text: "50 credits / month", include: true },
      { text: "Short clips, 720p", include: true },
      { text: "Watermarked outputs", include: true },
      { text: "Community models only", include: true },
      { text: "1080p & longer clips", include: false },
      { text: "Personal commercial license", include: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators shipping daily",
    priceMonthly: 19,
    priceYearly: 15,
    creditsPerMonth: 1500,
    cta: "Upgrade to Pro",
    badge: "Most popular",
    features: [
      { text: "1,500 credits / month", include: true },
      { text: "All video models", include: true },
      { text: "No watermark, 1080p output", include: true },
      { text: "Faster generation queue", include: true },
      { text: "Personal commercial license", include: true },
      { text: "Email support (24h)", include: true },
    ],
  },
  {
    id: "studio",
    name: "Studio",
    tagline: "For pros and small teams running campaigns",
    priceMonthly: 49,
    priceYearly: 39,
    creditsPerMonth: 5000,
    cta: "Get Studio",
    features: [
      { text: "5,000 credits / month", include: true },
      { text: "Everything in Pro", include: true },
      { text: "Priority queue + concurrent renders", include: true },
      { text: "Full commercial & resale license", include: true },
      { text: "API access (your own key)", include: true },
      { text: "Priority support (4h)", include: true },
    ],
  },
];

export const PLAN_LABEL: Record<CreatorPlan, string> = {
  free: "Free",
  pro: "Pro",
  studio: "Studio",
};

/**
 * Credit cost per generation, per tab + model id.
 * Image cheap, audio mid, video heavy — mirrors the real cost shape.
 */
export const CREDIT_COSTS: Record<StudioTab, Record<string, number>> = {
  image: {
    "nano-banana-2": 1,
    "seedream-4-5": 2,
    "qwen-image-2": 1,
  },
  video: {
    "seedance-2-0": 30,
    "veo-3-1": 50,
    "kling-2-5-turbo": 30,
    "hailuo-2-3": 20,
  },
  audio: {
    infinitetalk: 10,
    "audio-studio": 5,
  },
};

export function creditCost(tab: StudioTab, modelId: string, count = 1): number {
  const base = CREDIT_COSTS[tab]?.[modelId] ?? 1;
  return base * count;
}

export type Invoice = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "refunded" | "pending";
};

export const MOCK_INVOICES: Invoice[] = [
  { id: "INV-2026-04", date: "Apr 12, 2026", description: "Pro plan · monthly", amount: 19, status: "paid" },
  { id: "INV-2026-03", date: "Mar 12, 2026", description: "Pro plan · monthly", amount: 19, status: "paid" },
  { id: "INV-2026-03B", date: "Mar 04, 2026", description: "Credit pack · 1,000 credits", amount: 9, status: "paid" },
  { id: "INV-2026-02", date: "Feb 12, 2026", description: "Pro plan · monthly", amount: 19, status: "paid" },
  { id: "INV-2026-01", date: "Jan 12, 2026", description: "Pro plan · monthly", amount: 19, status: "paid" },
];

export type FaqItem = { q: string; a: string };

export const PRICING_FAQ: FaqItem[] = [
  {
    q: "What's a credit?",
    a: "One generation typically costs 20–50 credits depending on the model, duration, and resolution. The exact cost is shown next to the Generate button.",
  },
  {
    q: "Do unused credits roll over?",
    a: "Free credits reset each month. Pro and Studio credits roll over for 30 days, capped at 2× your monthly allowance.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes — you can cancel from Billing in one click. You keep access until the end of your billing period.",
  },
  {
    q: "Are outputs commercial-use?",
    a: "Personal commercial use is included on Pro. Studio adds a full commercial & resale license, suitable for client work and SaaS products.",
  },
  {
    q: "How is this different from the Token360 API?",
    a: "Same models, same backbone — the studio is the no-code surface. Studio plan includes an API key so you can graduate to direct API calls when ready.",
  },
];
