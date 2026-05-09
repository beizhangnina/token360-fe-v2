import { SAMPLE_OUTPUTS, type StudioTab } from "./studioData";

export type MockResult = {
  id: string;
  url: string;
  tab: StudioTab;
  modelId: string;
  prompt: string;
};

export type MockGenerateInput = {
  tab: StudioTab;
  modelId: string;
  prompt: string;
  count: number;
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Mock generation for the Creator Studio prototype.
 *
 * TODO(api): replace with a real call to the Token360 inference API, e.g.
 *   POST https://api.token360.com/v1/models/<vendor>/<modelId>/<endpoint>
 *   { prompt, ...params }   →  { outputs: [{ url, ... }] }
 *
 * The component contract (input shape, returned MockResult[]) should stay the
 * same so the swap is a one-file change.
 */
export async function mockGenerate(input: MockGenerateInput): Promise<MockResult[]> {
  const { tab, modelId, prompt, count } = input;
  const delay = 1800 + Math.floor(Math.random() * 600);
  await new Promise((r) => setTimeout(r, delay));

  const pool = SAMPLE_OUTPUTS[tab];
  const base = hashString(prompt + modelId);
  const n = Math.max(1, Math.min(count, pool.length, 4));
  const results: MockResult[] = [];
  for (let i = 0; i < n; i++) {
    const url = pool[(base + i) % pool.length];
    results.push({
      id: `${modelId}-${base}-${i}`,
      url,
      tab,
      modelId,
      prompt,
    });
  }
  return results;
}
