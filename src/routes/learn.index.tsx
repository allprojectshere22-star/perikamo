import { createFileRoute, Link } from "@tanstack/react-router";
import { LESSONS, CATEGORIES } from "@/lib/lessons";
import { GlassCard, SectionTitle, Chip } from "@/components/ui-kit";
import { useCycleData } from "@/hooks/use-cycle-data";
import { Check, ArrowRight } from "lucide-react";
import { LessonIcon } from "@/components/lesson-icon";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Learn — Perikoma" },
      {
        name: "description",
        content:
          "A beginner-friendly library of lessons on the menstrual cycle: hormones, ovulation, PMS, hygiene, nutrition, exercise, and myths vs facts.",
      },
      { property: "og:title", content: "Learn — Perikoma" },
      {
        property: "og:description",
        content: "Short science-backed lessons on the menstrual cycle for students.",
      },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const { data, hydrated } = useCycleData();
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? LESSONS : LESSONS.filter((l) => l.category === active)),
    [active]
  );

  const completedCount = hydrated ? data.completedLessons.length : 0;
  const pct = Math.round((completedCount / LESSONS.length) * 100);

  return (
    <main className="mx-auto max-w-5xl px-5 pt-8 md:pt-14 space-y-8">
      <SectionTitle
        eyebrow="Learn"
        title="Understand your body, one lesson at a time"
        subtitle="Short, beginner-friendly reads written for students."
      />

      <GlassCard className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Your progress
          </div>
          <div className="mt-1 text-2xl font-semibold">
            {completedCount} / {LESSONS.length} lessons
          </div>
        </div>
        <div className="flex-1 min-w-[180px] max-w-md">
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: "var(--gradient-royal)",
              }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{pct}% complete</div>
        </div>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
              active === c
                ? "bg-primary/15 border-primary/40 text-foreground"
                : "border-input text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((l) => {
          const done = data.completedLessons.includes(l.slug);
          return (
            <Link key={l.slug} to="/learn/$slug" params={{ slug: l.slug }}>
              <GlassCard className="h-full group hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-4">
                  <LessonIcon lesson={l} size={28} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{l.category}</span>
                      <span>•</span>
                      <span>{l.readMinutes} min</span>
                      {done && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[color:var(--gold)]">
                          <Check className="size-3" /> Done
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-semibold text-lg">{l.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {l.summary}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
