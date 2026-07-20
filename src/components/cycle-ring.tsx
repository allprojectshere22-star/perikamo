import type { Phase } from "@/lib/phases";

interface Props {
  cycleDay: number | null;
  cycleLength: number;
  phase: Phase | null;
  size?: number;
}

export function CycleRing({ cycleDay, cycleLength, phase, size = 260 }: Props) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const progress = cycleDay ? (cycleDay / cycleLength) * c : 0;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${progress} ${c}`}
          style={{ transition: "stroke-dasharray 800ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {cycleDay ? (
          <>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cycle day</div>
            <div className="font-display text-6xl font-semibold">{cycleDay}</div>
            {phase && (
              <div className="mt-1 text-sm text-muted-foreground">
                {phase.emoji} {phase.name}
              </div>
            )}
          </>
        ) : (
          <div className="px-6 text-sm text-muted-foreground">
            Log your last period to see your cycle day
          </div>
        )}
      </div>
    </div>
  );
}
