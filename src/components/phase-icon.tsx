import { Droplet, Sprout, Sun, Moon, type LucideIcon } from "lucide-react";
import type { PhaseKey } from "@/lib/phases";

const MAP: Record<PhaseKey, LucideIcon> = {
  menstrual: Droplet,
  follicular: Sprout,
  ovulation: Sun,
  luteal: Moon,
};

export function PhaseIcon({
  phaseKey,
  size = 20,
  className = "",
}: {
  phaseKey: PhaseKey;
  size?: number;
  className?: string;
}) {
  const Icon = MAP[phaseKey];
  return (
    <Icon
      size={size}
      strokeWidth={1.75}
      className={`text-[color:var(--gold)] ${className}`}
    />
  );
}
