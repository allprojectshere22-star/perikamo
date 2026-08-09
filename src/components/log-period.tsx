import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCycleData, getLastPeriodStart } from "@/hooks/use-cycle-data";
import { GlassCard, Chip } from "@/components/ui-kit";
import { CalendarPlus, CalendarCheck, Settings2 } from "lucide-react";
import { toast } from "sonner";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const fmt = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

function QuickDate({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-primary/40 bg-primary/15 text-foreground"
          : "border-input text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export function LogPeriod() {
  const { data, hydrated, logPeriodStart, setPeriodEnd, update } = useCycleData();
  const navigate = useNavigate();
  const today = iso(new Date());
  const yesterday = iso(new Date(Date.now() - 86400000));
  const twoDaysAgo = iso(new Date(Date.now() - 2 * 86400000));

  const [tab, setTab] = useState<"start" | "end">("start");
  const [date, setDate] = useState(today);
  const [cycleLength, setCycleLength] = useState(data.cycleLength);
  const [periodLength, setPeriodLength] = useState(data.periodLength);

  useEffect(() => {
    if (hydrated) {
      setCycleLength(data.cycleLength);
      setPeriodLength(data.periodLength);
    }
  }, [hydrated, data.cycleLength, data.periodLength]);

  const last = hydrated ? getLastPeriodStart(data) : null;
  const ongoing = data.periods.length > 0 && !data.periods[data.periods.length - 1].end;

  const submit = () => {
    if (tab === "start") {
      logPeriodStart(date);
      toast.success(`Period start logged — ${fmt(new Date(date))}`);
      navigate({ to: "/" });
      return;
    }
    if (data.periods.length === 0) {
      toast.error("Log a start date first.");
      return;
    }
    setPeriodEnd(date);
    toast.success(`Period end logged — ${fmt(new Date(date))}`);
    navigate({ to: "/" });
  };

  return (
    <section className="space-y-6">

      <GlassCard className="space-y-5">
        {/* Segmented control */}
        <div className="grid grid-cols-2 gap-1 rounded-full border border-input bg-secondary/50 p-1">
          {(
            [
              { key: "start", label: "Started", icon: CalendarPlus },
              { key: "end", label: "Ended", icon: CalendarCheck },
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-colors ${
                  tab === t.key
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <QuickDate label="Today" active={date === today} onClick={() => setDate(today)} />
          <QuickDate label="Yesterday" active={date === yesterday} onClick={() => setDate(yesterday)} />
          <QuickDate label="2 days ago" active={date === twoDaysAgo} onClick={() => setDate(twoDaysAgo)} />
        </div>

        <label className="block text-sm">
          <span className="text-muted-foreground">Or pick a date</span>
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl bg-secondary border border-input px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {last && <Chip tone="blue">Last start {fmt(last)}</Chip>}
          {ongoing && <Chip tone="gold">Period ongoing</Chip>}
        </div>

        <button
          onClick={submit}
          className="w-full rounded-full bg-primary py-3.5 font-medium text-primary-foreground hover:opacity-90 shadow-[var(--shadow-elegant)]"
        >
          {tab === "start" ? "Save period start" : "Save period end"}
        </button>
      </GlassCard>

      <GlassCard className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-[color:var(--gold)]" />
          <h3 className="font-semibold">Your averages</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Set your typical cycle — Perikoma keeps adapting as you log.
        </p>
        <label className="block text-sm">
          <span className="text-muted-foreground">Cycle length: {cycleLength} days</span>
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
          <span className="text-muted-foreground">Period length: {periodLength} days</span>
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

    </section>
  );
}
