import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCycleData, getLastPeriodStart } from "@/hooks/use-cycle-data";
import { GlassCard, SectionTitle } from "@/components/ui-kit";
import { toast } from "sonner";

export const Route = createFileRoute("/log")({
  head: () => ({
    meta: [
      { title: "Log period — Luna" },
      { name: "description", content: "Log the start or end of your period." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LogPage,
});

function LogPage() {
  const { data, hydrated, logPeriodStart, setPeriodEnd, update } = useCycleData();
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [cycleLength, setCycleLength] = useState(data.cycleLength);
  const [periodLength, setPeriodLength] = useState(data.periodLength);

  const last = hydrated ? getLastPeriodStart(data) : null;

  return (
    <main className="mx-auto max-w-2xl px-5 pt-8 md:pt-14 space-y-6">
      <SectionTitle
        eyebrow="Track"
        title="Log your period"
        subtitle="Luna learns from each entry to make better predictions."
      />

      {last && (
        <p className="text-sm text-muted-foreground">
          Last logged start:{" "}
          <span className="text-foreground font-medium">
            {last.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </p>
      )}

      <GlassCard className="space-y-4">
        <h3 className="font-semibold">Period started</h3>
        <label className="block text-sm">
          <span className="text-muted-foreground">Start date</span>
          <input
            type="date"
            value={startDate}
            max={today}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-xl bg-secondary border border-input px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <button
          onClick={() => {
            logPeriodStart(startDate);
            toast.success("Period start logged");
            navigate({ to: "/" });
          }}
          className="w-full rounded-full bg-primary py-3 font-medium text-primary-foreground hover:opacity-90 shadow-[var(--shadow-elegant)]"
        >
          Log start
        </button>
      </GlassCard>

      <GlassCard className="space-y-4">
        <h3 className="font-semibold">Period ended</h3>
        <label className="block text-sm">
          <span className="text-muted-foreground">End date</span>
          <input
            type="date"
            value={endDate}
            max={today}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full rounded-xl bg-secondary border border-input px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <button
          onClick={() => {
            if (data.periods.length === 0) {
              toast.error("Log a start date first.");
              return;
            }
            setPeriodEnd(endDate);
            toast.success("Period end logged");
            navigate({ to: "/" });
          }}
          className="w-full rounded-full border border-input py-3 font-medium hover:bg-accent"
        >
          Log end
        </button>
      </GlassCard>

      <GlassCard className="space-y-4">
        <h3 className="font-semibold">Your averages</h3>
        <p className="text-sm text-muted-foreground">
          If you know your typical cycle, set it here. Luna will still adapt as you log.
        </p>
        <label className="block text-sm">
          <span className="text-muted-foreground">Average cycle length: {cycleLength} days</span>
          <input
            type="range"
            min={21}
            max={35}
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="mt-2 w-full accent-[color:var(--primary)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Average period length: {periodLength} days</span>
          <input
            type="range"
            min={2}
            max={10}
            value={periodLength}
            onChange={(e) => setPeriodLength(Number(e.target.value))}
            className="mt-2 w-full accent-[color:var(--primary)]"
          />
        </label>
        <button
          onClick={() => {
            update({ cycleLength, periodLength });
            toast.success("Averages saved");
          }}
          className="w-full rounded-full border border-input py-3 font-medium hover:bg-accent"
        >
          Save averages
        </button>
      </GlassCard>

      <div className="text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          Back to Today
        </Link>
      </div>
    </main>
  );
}
