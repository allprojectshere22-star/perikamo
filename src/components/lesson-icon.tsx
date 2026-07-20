import {
  BookOpen,
  Heart,
  FlaskConical,
  Sparkles,
  Palette,
  Compass,
  Droplets,
  Salad,
  Activity,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { Lesson } from "@/lib/lessons";

const BY_SLUG: Record<string, LucideIcon> = {
  "what-is-a-menstrual-cycle": BookOpen,
  "why-periods-happen": Heart,
  "hormones-101": FlaskConical,
  "ovulation-explained": Sparkles,
  "pms-and-mood": Palette,
  "period-products": Compass,
  "hygiene-and-care": Droplets,
  "nutrition-through-the-cycle": Salad,
  "moving-with-your-cycle": Activity,
  "when-to-see-a-doctor": Stethoscope,
};

const BY_CATEGORY: Record<Lesson["category"], LucideIcon> = {
  Basics: BookOpen,
  Body: Heart,
  Hormones: FlaskConical,
  Health: Stethoscope,
  Lifestyle: Salad,
};

export function LessonIcon({
  lesson,
  size = 24,
  className = "",
}: {
  lesson: Lesson;
  size?: number;
  className?: string;
}) {
  const Icon = BY_SLUG[lesson.slug] ?? BY_CATEGORY[lesson.category] ?? BookOpen;
  return (
    <Icon
      size={size}
      strokeWidth={1.75}
      className={`text-[color:var(--gold)] ${className}`}
    />
  );
}
