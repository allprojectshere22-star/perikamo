import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  useCycleData,
  getCycleDay,
  getDaysUntilNext,
} from "@/hooks/use-cycle-data";
import { phaseForDay, PHASES } from "@/lib/phases";
import { DAILY_TIPS, DID_YOU_KNOW } from "@/lib/tips";
import { CycleRing } from "@/components/cycle-ring";
import { GlassCard, SectionTitle, Chip } from "@/components/ui-kit";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { PhaseIcon } from "@/components/phase-icon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Perikoma" },
      {
        name: "description",
        content:
          "See your cycle day, current phase, and what to expect today — a calm, science-backed period tracker.",
      },
      { property: "og:title", content: "Today — Perikoma" },
      {
        property: "og:description",
        content: "Your cycle day, current phase, and what to expect today.",
      },
    ],
  }),
  component: TodayPage,
});

function pickDaily<T>(arr: T[], seedDate = new Date()): T {
  const seed = Math.floor(seedDate.getTime() / 86400000);
  return arr[seed % arr.length];
}

function TodayPage() {
  const { data, hydrated } = useCycleData();

  const cycleDay = useMemo(() => getCycleDay(data), [data]);
  const phase = cycleDay ? phaseForDay(cycleDay, data.cycleLength) : null;
  const daysUntil = getDaysUntilNext(data);
  const tip = pickDaily(DAILY_TIPS);
  const fact = pickDaily(DID_YOU_KNOW);

  if (!hydrated) return <div className="min-h-screen" />;

  return (
    <main className="mx-auto max-w-6xl px-5 pt-8 md:pt-14 space-y-8">
      {/* Hero */}
      <section className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex justify-center md:justify-start">
          <CycleRing cycleDay={cycleDay} cycleLength={data.cycleLength} phase={phase} />
        </div>
        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)]">
              Today
            </div>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold leading-tight">
              {phase ? phase.tagline : "Welcome to Perikoma."}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-lg">
              {phase
                ? phase.body
                : "Log your last period start date on the Cycle page so Perikoma can show what's happening in your body — and predict what's next."}
            </p>
          </div>

          {phase && (
            <Chip tone="blue">
              <PhaseIcon phaseKey={phase.key} size={14} className="mr-1.5 inline" />
              {phase.name}
            </Chip>
          )}

          {/* Cycle length + explore — new stacked layout */}
          <div className="grid gap-3 sm:grid-cols-2">
            <GlassCard className="py-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Cycle length
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold">{data.cycleLength}</span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
              <div className="mt-1 text-xs text-[color:var(--gold)]">
                {daysUntil !== null
                  ? `Next period in ${daysUntil} ${daysUntil === 1 ? "day" : "days"}`
                  : "No prediction yet"}
              </div>
            </GlassCard>

            <Link to="/journey" className="group">
              <GlassCard className="h-full py-4 transition-colors group-hover:border-primary/40">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Explore
                </div>
                <div className="mt-1 flex items-center gap-2 font-display text-xl font-semibold">
                  Cycle journey
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Phases, insights, and period logging
                </div>
              </GlassCard>
            </Link>
          </div>
        </div>
      </section>

      {/* Body today */}
      {phase && (
        <section className="grid gap-4 md:grid-cols-3">
          <GlassCard>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Hormones today
            </div>
            <p className="mt-3 text-sm leading-relaxed">{phase.hormones}</p>
          </GlassCard>
          <GlassCard>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              How you might feel
            </div>
            <p className="mt-3 text-sm leading-relaxed">{phase.emotions}</p>
            <div className="mt-3 text-xs text-[color:var(--gold)]">Energy: {phase.energy}</div>
          </GlassCard>
          <GlassCard>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              What to try today
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {phase.selfCare.slice(0, 3).map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-[color:var(--gold)]">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>
      )}

      {/* Did you know + Tip */}
      <section className="grid gap-4 md:grid-cols-2">
        <GlassCard className="relative overflow-hidden">
          <div
            className="absolute -right-8 -top-8 size-40 rounded-full opacity-20"
            style={{ background: "var(--gradient-gold)" }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--gold)]">
              <Sparkles className="size-4" /> Did you know?
            </div>
            <p className="mt-3 text-lg leading-snug">{fact}</p>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
            <BookOpen className="size-4" /> Daily tip
          </div>
          <p className="mt-3 text-lg leading-snug">{tip}</p>
        </GlassCard>
      </section>

      {/* Phase names */}
      <section className="space-y-4">
        <SectionTitle
          eyebrow="Four phases"
          title="Your cycle is a journey"
          subtitle="Tap any phase to open it on the Cycle page."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <Link key={p.key} to="/journey" hash={p.key} className="group">
              <GlassCard className="h-full transition-transform group-hover:-translate-y-1">
                <PhaseIcon phaseKey={p.key} size={28} />
                <div className="mt-3 font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Days {p.dayRange[0]}–{p.dayRange[1]}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted-foreground text-center pt-4">
        Perikoma provides educational information only and does not diagnose medical conditions.
        If something feels off, talk to a healthcare provider.
      </p>
    </main>
  );
}
