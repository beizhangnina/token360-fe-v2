import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const assets = [
  // Logo
  { url: "https://www.token360.ai/icon/logo.png", dest: "public/icon/logo.png" },
  { url: "https://www.token360.ai/icon/logo.svg", dest: "public/icon/logo.svg" },
  // Why Choose icons
  { url: "https://www.token360.ai/static-remote/85ca52ba08f7805e.png", dest: "public/images/fast.png" },
  { url: "https://www.token360.ai/static-remote/94ccbe8937053e52.png", dest: "public/images/vast.png" },
  { url: "https://www.token360.ai/static-remote/35afa7c8b51dc33f.png", dest: "public/images/efficient.png" },
  // Featured model images
  { url: "https://www.token360.ai/site-media/1773962750924385948_Ty3dmwFP.webp", dest: "public/images/models/wan26.webp" },
  { url: "https://www.token360.ai/site-media/1773962750383987480_n3hqzHRZ.webp", dest: "public/images/models/seedream.webp" },
  { url: "https://www.token360.ai/site-media/1773982485839899969_Xn1blvFP.webp", dest: "public/images/models/nano-banana.webp" },
  { url: "https://www.token360.ai/site-media/1773982488033922443_4GhqzJT3.webp", dest: "public/images/models/kling.webp" },
  { url: "https://www.token360.ai/site-media/1773962750558085840_71aX5fox.webp", dest: "public/images/models/infinitetalk.webp" },
  { url: "https://www.token360.ai/site-media/1773962750571484976_JuAKU3bj.webp", dest: "public/images/models/wan22.webp" },
  { url: "https://www.token360.ai/site-media/1773983575227260340_BNIR3cmw.webp", dest: "public/images/models/qwen.webp" },
  { url: "https://www.token360.ai/site-media/1773982489037596683_QmZ7irAK.webp", dest: "public/images/models/sora.webp" },
  // Model group thumbnails (unsplash)
  { url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=64&h=64&fit=crop", dest: "public/images/groups/wan26.jpg" },
  { url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=64&h=64&fit=crop", dest: "public/images/groups/qwen.jpg" },
  { url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=64&h=64&fit=crop", dest: "public/images/groups/seedream.jpg" },
  { url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=64&h=64&fit=crop", dest: "public/images/groups/kling.jpg" },
  { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&h=64&fit=crop", dest: "public/images/groups/flux.jpg" },
  { url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=64&h=64&fit=crop", dest: "public/images/groups/audio.jpg" },
];

async function download(asset) {
  const dir = path.dirname(asset.dest);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  try {
    const res = await fetch(asset.url);
    if (!res.ok) { console.log(`SKIP ${asset.url}: ${res.status}`); return; }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(asset.dest, buf);
    console.log(`OK ${asset.dest}`);
  } catch (e) {
    console.log(`ERR ${asset.url}: ${e.message}`);
  }
}

// Download 4 at a time
const chunks = [];
for (let i = 0; i < assets.length; i += 4) chunks.push(assets.slice(i, i + 4));
for (const chunk of chunks) await Promise.all(chunk.map(download));
console.log("Done!");
