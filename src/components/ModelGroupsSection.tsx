import Image from "next/image";

const groups = [
  { title: "Wan 2.6 Models", desc: "Image-to-video, reference-to-video, text-to-video", img: "/images/groups/wan26.jpg" },
  { title: "Qwen Image 2", desc: "Text-to-image & editing workflows", img: "/images/groups/qwen.jpg" },
  { title: "Seedream AI", desc: "v4.5 edit & sequential generation", img: "/images/groups/seedream.jpg" },
  { title: "Kling Video", desc: "Motion control & cinematic I2V", img: "/images/groups/kling.jpg" },
  { title: "Google Nano", desc: "Nano Banana Pro / 2 — image pipelines", img: "/icon/logo.png" },
  { title: "Flux Image Tools", desc: "FLUX edit, flash & LoRA-friendly routes", img: "/images/groups/flux.jpg" },
  { title: "Video Edit", desc: "Extend, upscale, and refine clips", img: "/icon/logo.png" },
  { title: "Audio for Video", desc: "Music, VO, and SFX aligned to picture", img: "/images/groups/audio.jpg" },
];

export function ModelGroupsSection() {
  return (
    <section className="relative z-20 bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          Model Groups
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {groups.map((group) => (
            <div
              key={group.title}
              className="cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 transition-all hover:border-[var(--border-strong)]"
            >
              <Image
                src={group.img}
                alt={group.title}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                {group.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{group.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
