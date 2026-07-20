import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",
        className
      )}
      {...props}
    />
  );
}

export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold)]">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "gold" | "blue" }) {
  const styles = {
    default: "bg-secondary text-secondary-foreground",
    gold: "bg-[color:var(--gold)]/15 text-[color:var(--gold)] border border-[color:var(--gold)]/30",
    blue: "bg-primary/15 text-primary-foreground border border-primary/30",
  }[tone];
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", styles)}>
      {children}
    </span>
  );
}
