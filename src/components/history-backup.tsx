import { useCycleData, backupPayload, type CycleData } from "@/hooks/use-cycle-data";
import { GlassCard } from "@/components/ui-kit";
import { PhaseIcon } from "@/components/phase-icon";
import { Switch } from "@/components/ui/switch";
import { Trash2, Download, Upload, History } from "lucide-react";
import { toast } from "sonner";

const fmt = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export function BackupCard() {
  const { data, update } = useCycleData();

  const downloadBackup = () => {
    const blob = new Blob([JSON.stringify(backupPayload(data), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `perikoma-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    update({ lastBackupAt: new Date().toISOString() });
    toast.success("Backup file downloaded");
  };

  const restoreBackup = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      const restored: Partial<CycleData> = parsed?.data ?? parsed;
      if (!restored || !Array.isArray(restored.periods)) throw new Error("bad file");
      update((prev) => ({ ...prev, ...restored }));
      toast.success("Backup restored");
    } catch {
      toast.error("That doesn't look like a Perikoma backup file.");
    }
  };

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold">Automatic backup</h3>
          <p className="text-sm text-muted-foreground">
            Keeps a JSON snapshot of your data saved on this device after every change.
          </p>
        </div>
        <Switch
          checked={data.autoBackup}
          onCheckedChange={(v) => {
            update({
              autoBackup: v,
              lastBackupAt: v ? new Date().toISOString() : data.lastBackupAt,
            });
            toast.success(v ? "Auto backup on" : "Auto backup off");
          }}
          aria-label="Automatic backup"
        />
      </div>
      {data.lastBackupAt && (
        <p className="text-xs text-muted-foreground">
          Last backup {new Date(data.lastBackupAt).toLocaleString()}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={downloadBackup}
          className="inline-flex items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          <Download className="h-4 w-4" /> Download backup
        </button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium hover:bg-accent">
          <Upload className="h-4 w-4" /> Restore
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) restoreBackup(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
    </GlassCard>
  );
}

export function HistoryCard() {
  const { data, deletePeriod } = useCycleData();

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-[color:var(--gold)]" />
          <h3 className="font-semibold">History</h3>
        </div>
        <span className="text-xs text-muted-foreground">{data.periods.length} logged</span>
      </div>

      {data.periods.length === 0 ? (
        <p className="text-sm text-muted-foreground">No periods logged yet.</p>
      ) : (
        <ul className="space-y-2">
          {data.periods
            .slice()
            .reverse()
            .map((period) => {
              const start = new Date(period.start);
              const end = period.end ? new Date(period.end) : null;
              return (
                <li
                  key={period.start}
                  className="flex items-center justify-between rounded-xl border border-input bg-secondary/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <PhaseIcon phaseKey="menstrual" className="h-5 w-5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {fmt(start)}
                        {end && <> — {fmt(end)}</>}
                      </p>
                      {!end && <p className="text-xs text-muted-foreground">Ongoing</p>}
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
  );
}
