import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCycleData, getLastPeriodStart } from "@/hooks/use-cycle-data";
import { GlassCard, SectionTitle } from "@/components/ui-kit";
import { PhaseIcon } from "@/components/phase-icon";
import { Trash2 } from "lucide-react";
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
  const { data, hydrated, logPeriodStart, setPeriodEnd, deletePeriod, update } = useCycleData();
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

      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">History</h3>
          <span className="text-xs text-muted-foreground">{data.periods.length} logged</span>
        </div>

        {data.periods.length === 0 ? (
          <p className="text-sm text-muted-foreground">No periods logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {data.periods.slice().reverse().map((period) => {
              const start = new Date(period.start);
              const end = period.end ? new Date(period.end) : null;
              return (
                <li
                  key={period.start}
                  className="flex items-center justify-between rounded-xl border border-input bg-secondary/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <PhaseIcon phase="menstrual" className="h-5 w-5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {start.toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {end && (
                          <>
                            {" "}
                            —{" "}
                            {end.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </>
                        )}
                      </p>
                      {!end && (
                        <p className="text-xs text-muted-foreground">Ongoing</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      deletePeriod(period.start);
                      toast.success("Period deleted");
                    }}
                    className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Delete period"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </GlassCard>

      <div className="text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          Back to Today
        </Link>
      </div>
    </main>
  );
}
