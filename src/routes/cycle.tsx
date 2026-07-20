import { createFileRoute } from "@tanstack/react-router";
import { PHASES } from "@/lib/phases";
import { GlassCard, SectionTitle, Chip } from "@/components/ui-kit";
import { useEffect } from "react";

export const Route = createFileRoute("/cycle")({
  head: () => ({
    meta: [
      { title: "Cycle Journey — Luna" },
      {
        name: "description",
        content:
          "Explore the four phases of the menstrual cycle: menstrual, follicular, ovulation, and luteal. Learn what happens inside your body in each phase.",
      },
      { property: "og:title", content: "Cycle Journey — Luna" },
      {
        property: "og:description",
        content:
          "The four phases of your cycle, explained clearly. Body, hormones, mood, energy, nutrition, and movement.",
      },
    ],
  }),
  component: CyclePage,
});

function CyclePage() {
  // scroll to hash on load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-5 pt-8 md:pt-14 space-y-8">
      <SectionTitle
        eyebrow="Cycle journey"
        title="Four phases, one continuous rhythm"
        subtitle="Each phase shapes how you think, feel, and move. Here's what's happening — and what helps."
      />

      <div className="flex flex-wrap gap-2">
        {PHASES.map((p) => (
          <a
            key={p.key}
            href={`#${p.key}`}
            className="rounded-full border border-input px-4 py-1.5 text-sm hover:bg-accent"
          >
            {p.emoji} {p.name}
          </a>
        ))}
      </div>

      <div className="space-y-6">
        {PHASES.map((p, idx) => (
          <GlassCard key={p.key} id={p.key} className="scroll-mt-24">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Phase {idx + 1} • Days {p.dayRange[0]}–{p.dayRange[1]}
                </div>
                <h2 className="mt-1 text-3xl font-semibold">
                  <span className="mr-2">{p.emoji}</span>
                  {p.name}
                </h2>
                <p className="mt-2 text-muted-foreground max-w-2xl">{p.tagline}</p>
              </div>
              <Chip tone="gold">Energy: {p.energy.split("—")[0].trim()}</Chip>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Section title="Inside your body">{p.body}</Section>
              <Section title="Hormones">{p.hormones}</Section>
              <Section title="How you might feel">{p.emotions}</Section>
              <Section title="Common symptoms">
                <ul className="flex flex-wrap gap-2 mt-1">
                  {p.symptoms.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Self-care">
                <ul className="space-y-1.5">
                  {p.selfCare.map((s) => (
                    <li key={s} className="flex gap-2 text-sm">
                      <span className="text-[color:var(--gold)]">✦</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Nutrition">
                <ul className="space-y-1.5">
                  {p.nutrition.map((s) => (
                    <li key={s} className="flex gap-2 text-sm">
                      <span className="text-primary">◆</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Exercise">
                <ul className="space-y-1.5">
                  {p.exercise.map((s) => (
                    <li key={s} className="flex gap-2 text-sm">
                      <span className="text-[color:var(--gold)]">▲</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Fun fact">
                <p className="text-sm italic text-muted-foreground">✨ {p.funFact}</p>
              </Section>
            </div>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</div>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
