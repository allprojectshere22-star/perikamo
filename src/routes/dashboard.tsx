import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useCycleData,
  getCycleDay,
  getDaysUntilNext,
  getCycleRegularity,
} from "@/hooks/use-cycle-data";
import { phaseForDay } from "@/lib/phases";
import { LESSONS } from "@/lib/lessons";
import { GlassCard, SectionTitle, Chip } from "@/components/ui-kit";
import { Flame, BookOpen, Activity, Circle } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Progress — Perikoma" },
      {
        name: "description",
        content:
          "Your cycle regularity, learning streak, lessons completed, and phase overview at a glance.",
      },
      { property: "og:title", content: "Progress — Perikoma" },
      {
        property: "og:description",
        content: "Track your learning streak and cycle regularity.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data, hydrated } = useCycleData();
  if (!hydrated) return <div className="min-h-screen" />;

  const cycleDay = getCycleDay(data);
  const phase = cycleDay ? phaseForDay(cycleDay, data.cycleLength) : null;
  const daysUntil = getDaysUntilNext(data);
  const regularity = getCycleRegularity(data);
  const learningPct = Math.round((data.completedLessons.length / LESSONS.length) * 100);

  return (
    <main className="mx-auto max-w-5xl px-5 pt-8 md:pt-14 space-y-8">
      <SectionTitle
        eyebrow="Progress"
        title="Your health at a glance"
        subtitle="A gentle overview — not a diagnosis."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Circle className="size-5" />}
          label="Current phase"
          value={phase ? phase.name : "—"}
          hint={phase ? `Day ${cycleDay}` : "Log a period to start"}
          tone="blue"
        />
        <StatCard
          icon={<Activity className="size-5" />}
          label="Next period in"
          value={daysUntil !== null ? `${daysUntil}d` : "—"}
          hint={data.periods.length > 0 ? "Adaptive prediction" : "No data yet"}
          tone="gold"
        />
        <StatCard
          icon={<Flame className="size-5" />}
          label="Learning streak"
          value={`${data.streak}d`}
          hint="Open the app daily"
          tone="gold"
        />
        <StatCard
          icon={<BookOpen className="size-5" />}
          label="Lessons read"
          value={`${data.completedLessons.length} / ${LESSONS.length}`}
          hint={`${learningPct}% complete`}
          tone="blue"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Cycle regularity
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="text-3xl font-semibold">{regularity.label}</div>
            {regularity.variance !== null && (
              <span className="text-sm text-muted-foreground">
                ± {regularity.variance.toFixed(1)} days
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Regular cycles fall between 21 and 35 days. Perikoma's prediction adapts each
            time you log a new period.
          </p>
          <div className="mt-4 flex gap-2 text-xs">
            <Chip>Avg cycle: {data.cycleLength}d</Chip>
            <Chip>Avg period: {data.periodLength}d</Chip>
            <Chip>Periods logged: {data.periods.length}</Chip>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Learning progress
          </div>
          <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${learningPct}%`, background: "var(--gradient-royal)" }}
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {LESSONS.length - data.completedLessons.length} lessons to go. Small daily
            reads build real understanding.
          </p>
          <Link
            to="/learn"
            className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            Continue learning
          </Link>
        </GlassCard>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Perikoma is an educational companion. It does not diagnose medical conditions.
      </p>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
  tone = "blue",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  tone?: "blue" | "gold";
}) {
  const accent =
    tone === "gold"
      ? "text-[color:var(--gold)] bg-[color:var(--gold)]/15 border-[color:var(--gold)]/30"
      : "text-primary bg-primary/15 border-primary/30";
  return (
    <GlassCard>
      <div className={`inline-flex items-center justify-center size-10 rounded-xl border ${accent}`}>
        {icon}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </GlassCard>
  );
}
