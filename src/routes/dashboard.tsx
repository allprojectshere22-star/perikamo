import { createFileRoute } from "@tanstack/react-router";
import {
  useCycleData,
  getCycleDay,
  getDaysUntilNext,
  getCycleRegularity,
} from "@/hooks/use-cycle-data";
import { phaseForDay } from "@/lib/phases";
import { GlassCard, SectionTitle, Chip } from "@/components/ui-kit";
import { Activity, Circle, CalendarDays, Droplet } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Progress — Perikoma" },
      {
        name: "description",
        content: "Your cycle regularity, current phase, and prediction overview at a glance.",
      },
      { property: "og:title", content: "Progress — Perikoma" },
      {
        property: "og:description",
        content: "Track your cycle regularity and predictions.",
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
          icon={<CalendarDays className="size-5" />}
          label="Cycle length"
          value={`${data.cycleLength}d`}
          hint="Adapts as you log"
          tone="blue"
        />
        <StatCard
          icon={<Droplet className="size-5" />}
          label="Periods logged"
          value={`${data.periods.length}`}
          hint={`Avg period ${data.periodLength}d`}
          tone="gold"
        />
      </div>

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
          Regular cycles fall between 21 and 35 days. Perikoma's prediction adapts each time you
          log a new period.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Chip>Avg cycle: {data.cycleLength}d</Chip>
          <Chip>Avg period: {data.periodLength}d</Chip>
          <Chip>Periods logged: {data.periods.length}</Chip>
        </div>
      </GlassCard>

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
      <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </GlassCard>
  );
}
