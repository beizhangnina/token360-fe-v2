const STEPS = [
  {
    num: "01",
    title: "You write a sentence.",
    body:
      "Plain language. Doesn't have to be poetry. Token360 reads it, turns it into a shot list, picks the right model, and starts rolling. Reference photos help — never required.",
    demo: "> a quiet morning, my\n  coffee, the dog still\n  asleep, soft light",
  },
  {
    num: "02",
    title: "The router casts a model.",
    body:
      "Behind the scenes, Token360 dispatches the prompt. Quiet domestic? Seedance. Long-form realism? Veo. Anime character? Kling. You never pick. The right tool just shows up.",
    demo: 'scene_type → "domestic"\nmotion → low\naudio → ambient\n→ routing to seedance 2.0',
  },
  {
    num: "03",
    title: "You watch your film.",
    body:
      "Forty seconds later, on your phone. 1080p, native audio, ready to share. Like it? Keep it. Want it different? Tweak the sentence. The film changes. No timelines, no exports.",
    demo: "✓ rendered · 0:08 · 1080p\n→ tap to share\n→ tap to remix",
  },
];

export function HowItWorks() {
  return (
    <section className="relative z-10 bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
            Three things between your sentence and a film.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-sm text-[var(--text-secondary)] md:text-base">
            Two of them are us. The router is the product — not the models.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6"
            >
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[var(--brand-purple-500)]">
                {s.num}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{s.body}</p>
              <pre className="mt-5 whitespace-pre rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3 font-mono text-[11px] leading-relaxed text-[var(--text-muted)]">
                {s.demo}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
