import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCycleData, getNextPeriodDate, getLastPeriodStart } from "@/hooks/use-cycle-data";
import { phaseForDay, type PhaseKey } from "@/lib/phases";
import { GlassCard, SectionTitle, Chip } from "@/components/ui-kit";
import { PhaseIcon } from "@/components/phase-icon";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Luna" },
      {
        name: "description",
        content:
          "See past periods, predicted periods, ovulation, and your current phase on a calendar timeline.",
      },
      { property: "og:title", content: "Calendar — Luna" },
      {
        property: "og:description",
        content: "Cycle calendar with periods, ovulation, and phase overview.",
      },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const { data, hydrated } = useCycleData();
  const [monthOffset, setMonthOffset] = useState(0);

  const view = new Date();
  view.setDate(1);
  view.setMonth(view.getMonth() + monthOffset);
  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = view.toLocaleString(undefined, { month: "long", year: "numeric" });

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const isPeriodDay = (d: Date) => {
    return data.periods.some((p) => {
      const start = new Date(p.start);
      const end = p.end ? new Date(p.end) : new Date(start.getTime() + data.periodLength * 86400000);
      return d >= stripTime(start) && d <= stripTime(end);
    });
  };

  const nextStart = getNextPeriodDate(data);
  const predictedRange: Date[] = [];
  if (nextStart) {
    for (let i = 0; i < data.periodLength; i++) {
      const d = new Date(nextStart);
      d.setDate(d.getDate() + i);
      predictedRange.push(stripTime(d));
    }
    // Also add cycle after that for visibility
    for (let i = 0; i < data.periodLength; i++) {
      const d = new Date(nextStart);
      d.setDate(d.getDate() + data.cycleLength + i);
      predictedRange.push(stripTime(d));
    }
  }
  const isPredicted = (d: Date) =>
    predictedRange.some((p) => p.getTime() === stripTime(d).getTime());

  const isOvulation = (d: Date) => {
    if (!nextStart) return false;
    // ovulation ~ 14 days before next period
    const ov = new Date(nextStart);
    ov.setDate(ov.getDate() - 14);
    // also add previous cycle's ovulation
    const ov2 = new Date(ov);
    ov2.setDate(ov2.getDate() - data.cycleLength);
    const target = stripTime(d).getTime();
    return stripTime(ov).getTime() === target || stripTime(ov2).getTime() === target;
  };

  // Compute the phase for any date, based on cycle position from most recent period start
  const lastStart = getLastPeriodStart(data);
  const phaseKeyFor = (d: Date): PhaseKey | null => {
    if (!lastStart) return null;
    const cl = data.cycleLength || 28;
    const diff = Math.floor((stripTime(d).getTime() - stripTime(lastStart).getTime()) / 86400000);
    if (diff < 0) return null;
    const cycleDay = (diff % cl) + 1;
    return phaseForDay(cycleDay, cl).key;
  };

  const today = stripTime(new Date()).getTime();

  return (
    <main className="mx-auto max-w-4xl px-5 pt-8 md:pt-14 space-y-8">
      <SectionTitle
        eyebrow="Calendar"
        title="Your cycle at a glance"
        subtitle="Past periods, predictions, ovulation window, and today's phase."
      />

      {!hydrated || data.periods.length === 0 ? (
        <GlassCard className="text-center py-10">
          <p className="text-muted-foreground">
            Log a period start date to see your calendar predictions.
          </p>
          <Link
            to="/log"
            className="inline-block mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Log period
          </Link>
        </GlassCard>
      ) : null}

      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMonthOffset(monthOffset - 1)}
            className="rounded-full border border-input size-9 hover:bg-accent"
          >
            ‹
          </button>
          <div className="font-semibold">{monthName}</div>
          <button
            onClick={() => setMonthOffset(monthOffset + 1)}
            className="rounded-full border border-input size-9 hover:bg-accent"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 text-xs text-muted-foreground mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-center">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const period = isPeriodDay(d);
            const predicted = !period && isPredicted(d);
            const ovulation = !period && !predicted && isOvulation(d);
            const isToday = stripTime(d).getTime() === today;
            const phaseKey = !period && !predicted && !ovulation ? phaseKeyFor(d) : null;

            const phaseBg =
              phaseKey === "follicular"
                ? "bg-primary/15 border border-primary/25"
                : phaseKey === "luteal"
                ? "bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/20"
                : phaseKey === "menstrual"
                ? "bg-destructive/15 border border-destructive/25"
                : phaseKey === "ovulation"
                ? "bg-[color:var(--gold)]/15 border border-[color:var(--gold)]/30"
                : "bg-secondary/40";

            return (
              <div
                key={i}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm relative
                  ${period ? "bg-destructive/80 text-white" : ""}
                  ${predicted ? "border-2 border-dashed border-destructive/50 text-foreground/80" : ""}
                  ${ovulation ? "bg-[color:var(--gold)]/25 text-[color:var(--gold)] border border-[color:var(--gold)]/40" : ""}
                  ${!period && !predicted && !ovulation ? phaseBg : ""}
                  ${isToday ? "ring-2 ring-primary" : ""}
                `}
              >
                {d.getDate()}
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 text-xs">
          <Legend swatch="bg-destructive/80" label="Period" />
          <Legend swatch="border-2 border-dashed border-destructive/50" label="Predicted" />
          <Legend swatch="bg-[color:var(--gold)]/40 border border-[color:var(--gold)]/40" label="Ovulation" />
          <Legend swatch="bg-destructive/15 border border-destructive/25" label="Menstrual" />
          <Legend swatch="bg-primary/15 border border-primary/25" label="Follicular" />
          <Legend swatch="bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/20" label="Luteal" />
          <Legend swatch="ring-2 ring-primary" label="Today" />
        </div>
      </GlassCard>

      {data.periods.length > 0 && (
        <GlassCard>
          <h3 className="font-semibold mb-3">Period history</h3>
          <ul className="space-y-2">
            {[...data.periods]
              .slice(-8)
              .reverse()
              .map((p, i) => {
                return (
                  <li key={p.start + i} className="flex items-center justify-between text-sm">
                    <span>
                      {new Date(p.start).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {p.end && (
                        <>
                          {" → "}
                          {new Date(p.end).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </>
                      )}
                    </span>
                    <Chip>
                      <PhaseIcon phaseKey="menstrual" size={12} className="mr-1 inline" />
                      logged
                    </Chip>
                  </li>
                );
              })}
          </ul>
        </GlassCard>
      )}
    </main>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-4 rounded ${swatch}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function stripTime(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
