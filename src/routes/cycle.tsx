import { createFileRoute } from "@tanstack/react-router";
import { PHASES, dailyInsightFor } from "@/lib/phases";
import { GlassCard, SectionTitle, Chip } from "@/components/ui-kit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/cycle")({
  head: () => ({
    meta: [
      { title: "Cycle Journey — Luna" },
      {
        name: "description",
        content:
          "Explore the four phases of the menstrual cycle: menstrual, follicular, ovulation, and luteal. A new insight every day.",
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
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
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
        subtitle="A new insight for every phase, every day. Tap a section to expand."
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
              <Chip tone="gold">{p.energy}</Chip>
            </div>

            {/* Today's insight — rotates daily, no repetition with sections below */}
            <div className="mt-5 rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 p-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--gold)]">
                Today's insight
              </div>
              <p className="mt-1.5 text-sm leading-relaxed">
                {today ? dailyInsightFor(p, today) : p.dailyInsights[0]}
              </p>
            </div>

            <Accordion type="multiple" className="mt-4">
              <Item value={`${p.key}-body`} label="Inside your body">
                <p>{p.body}</p>
              </Item>
              <Item value={`${p.key}-hormones`} label="Hormones at play">
                <p>{p.hormones}</p>
              </Item>
              <Item value={`${p.key}-emotions`} label="How you might feel">
                <p>{p.emotions}</p>
              </Item>
              <Item value={`${p.key}-symptoms`} label="Common symptoms">
                <ul className="flex flex-wrap gap-2">
                  {p.symptoms.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </Item>
              <Item value={`${p.key}-selfcare`} label="Self-care">
                <BulletList items={p.selfCare} mark="✦" />
              </Item>
              <Item value={`${p.key}-nutrition`} label="Nutrition">
                <BulletList items={p.nutrition} mark="◆" tone="primary" />
              </Item>
              <Item value={`${p.key}-exercise`} label="Movement">
                <BulletList items={p.exercise} mark="▲" />
              </Item>
            </Accordion>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}

function Item({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-b border-white/5 last:border-0">
      <AccordionTrigger className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground hover:no-underline">
        {label}
      </AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed pt-1 pb-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

function BulletList({
  items,
  mark,
  tone,
}: {
  items: string[];
  mark: string;
  tone?: "primary";
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((s) => (
        <li key={s} className="flex gap-2">
          <span className={tone === "primary" ? "text-primary" : "text-[color:var(--gold)]"}>
            {mark}
          </span>
          {s}
        </li>
      ))}
    </ul>
  );
}
