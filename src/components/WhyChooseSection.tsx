import Image from "next/image";

const cards = [
  { title: "Fast", img: "/images/fast.png", desc: "Blazing fast image and video generation to maximize your productivity." },
  { title: "Vast", img: "/images/vast.png", desc: "Integrate all cutting edge SOTA AI models in one API." },
  { title: "Efficient", img: "/images/efficient.png", desc: "Best prices without any sacrifice for quality and reliability" },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)] pb-16 pt-10">
      {/* Subtle warm gradient — no dot grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-gold-300)]/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1000px] px-6">
        <h2 className="text-center text-4xl font-bold italic text-[var(--text-primary)] md:text-5xl">
          Why choose Token360?
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:flex-row">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-1 flex-col items-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--text-primary)]">
                <Image src={card.img} alt={card.title} width={40} height={40} className="h-10 w-10 object-contain" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                {card.title}
              </h3>
              <p className="mt-2 max-w-[220px] text-sm text-[var(--text-muted)]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
