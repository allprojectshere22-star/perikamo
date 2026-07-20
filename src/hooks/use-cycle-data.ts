import { useEffect, useState, useCallback } from "react";

export interface PeriodEntry {
  start: string; // ISO date
  end?: string; // ISO date
}

export interface CycleData {
  periods: PeriodEntry[];
  cycleLength: number; // avg cycle length
  periodLength: number;
  completedLessons: string[]; // slugs
  lastOpenedDate?: string;
  streak: number;
  onboarded: boolean;
}

const KEY = "flow.cycle.v1";

const DEFAULT: CycleData = {
  periods: [],
  cycleLength: 28,
  periodLength: 5,
  completedLessons: [],
  streak: 0,
  onboarded: false,
};

function read(): CycleData {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function write(data: CycleData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function useCycleData() {
  const [data, setData] = useState<CycleData>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const d = read();
    // streak logic
    const today = new Date().toISOString().slice(0, 10);
    if (d.lastOpenedDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const nextStreak = d.lastOpenedDate === yesterday ? (d.streak || 0) + 1 : 1;
      const updated = { ...d, lastOpenedDate: today, streak: nextStreak };
      write(updated);
      setData(updated);
    } else {
      setData(d);
    }
    setHydrated(true);
  }, []);

  const update = useCallback((patch: Partial<CycleData> | ((prev: CycleData) => CycleData)) => {
    setData((prev) => {
      const next =
        typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      write(next);
      return next;
    });
  }, []);

  const logPeriodStart = useCallback(
    (dateISO: string) => {
      update((prev) => {
        // Adaptive cycle length from last start
        let cycleLength = prev.cycleLength;
        if (prev.periods.length > 0) {
          const last = prev.periods[prev.periods.length - 1];
          const diff = Math.round(
            (new Date(dateISO).getTime() - new Date(last.start).getTime()) / 86400000
          );
          if (diff >= 20 && diff <= 40) {
            // weighted average
            cycleLength = Math.round((prev.cycleLength * 2 + diff) / 3);
          }
        }
        return {
          ...prev,
          periods: [...prev.periods, { start: dateISO }].sort((a, b) =>
            a.start.localeCompare(b.start)
          ),
          cycleLength,
        };
      });
    },
    [update]
  );

  const setPeriodEnd = useCallback(
    (dateISO: string) => {
      update((prev) => {
        if (prev.periods.length === 0) return prev;
        const periods = [...prev.periods];
        periods[periods.length - 1] = { ...periods[periods.length - 1], end: dateISO };
        const last = periods[periods.length - 1];
        const len =
          Math.round(
            (new Date(last.end!).getTime() - new Date(last.start).getTime()) / 86400000
          ) + 1;
        return {
          ...prev,
          periods,
          periodLength: len >= 2 && len <= 10 ? len : prev.periodLength,
        };
      });
    },
    [update]
  );

  const toggleLesson = useCallback(
    (slug: string) => {
      update((prev) => ({
        ...prev,
        completedLessons: prev.completedLessons.includes(slug)
          ? prev.completedLessons.filter((s) => s !== slug)
          : [...prev.completedLessons, slug],
      }));
    },
    [update]
  );

  return {
    data,
    hydrated,
    update,
    logPeriodStart,
    setPeriodEnd,
    toggleLesson,
  };
}

/** Derived helpers */

export function getLastPeriodStart(data: CycleData): Date | null {
  if (data.periods.length === 0) return null;
  return new Date(data.periods[data.periods.length - 1].start);
}

export function getCycleDay(data: CycleData, on: Date = new Date()): number | null {
  const last = getLastPeriodStart(data);
  if (!last) return null;
  const day = Math.floor((on.getTime() - last.getTime()) / 86400000) + 1;
  if (day < 1) return null;
  // Wrap around if we've passed the predicted cycle
  const cl = data.cycleLength || 28;
  return ((day - 1) % cl) + 1;
}

export function getNextPeriodDate(data: CycleData): Date | null {
  const last = getLastPeriodStart(data);
  if (!last) return null;
  const cl = data.cycleLength || 28;
  const next = new Date(last);
  next.setDate(next.getDate() + cl);
  // If already past, roll forward
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  while (next < today) next.setDate(next.getDate() + cl);
  return next;
}

export function getDaysUntilNext(data: CycleData): number | null {
  const next = getNextPeriodDate(data);
  if (!next) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((next.getTime() - today.getTime()) / 86400000));
}

export function getCycleRegularity(data: CycleData): {
  label: string;
  variance: number | null;
} {
  if (data.periods.length < 3) return { label: "Learning…", variance: null };
  const gaps: number[] = [];
  for (let i = 1; i < data.periods.length; i++) {
    gaps.push(
      Math.round(
        (new Date(data.periods[i].start).getTime() -
          new Date(data.periods[i - 1].start).getTime()) /
          86400000
      )
    );
  }
  const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  const variance = Math.sqrt(
    gaps.reduce((s, g) => s + (g - mean) ** 2, 0) / gaps.length
  );
  const label =
    variance < 2 ? "Very regular" : variance < 5 ? "Regular" : "Irregular";
  return { label, variance };
}
