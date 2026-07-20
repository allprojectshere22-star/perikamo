import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LESSONS } from "@/lib/lessons";
import { GlassCard, Chip } from "@/components/ui-kit";
import { useCycleData } from "@/hooks/use-cycle-data";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { LessonIcon } from "@/components/lesson-icon";

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const lesson = LESSONS.find((l) => l.slug === params.slug);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.lesson.title} — Luna` },
          { name: "description", content: loaderData.lesson.summary },
          { property: "og:title", content: `${loaderData.lesson.title} — Luna` },
          { property: "og:description", content: loaderData.lesson.summary },
        ]
      : [{ title: "Lesson — Luna" }, { name: "robots", content: "noindex" }],
  }),
  component: LessonPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 pt-16 text-center">
      <p className="text-muted-foreground">Lesson not found.</p>
      <Link to="/learn" className="text-primary underline mt-4 inline-block">
        Back to Learn
      </Link>
    </div>
  ),
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const { data, toggleLesson, hydrated } = useCycleData();
  const done = hydrated && data.completedLessons.includes(lesson.slug);

  return (
    <main className="mx-auto max-w-3xl px-5 pt-8 md:pt-14 space-y-6">
      <Link
        to="/learn"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to Learn
      </Link>

      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Chip tone="blue">{lesson.category}</Chip>
          <span>•</span>
          <span>{lesson.readMinutes} min read</span>
        </div>
        <h1 className="flex items-center gap-3 text-4xl md:text-5xl font-semibold leading-tight">
          <LessonIcon lesson={lesson} size={40} />
          <span>{lesson.title}</span>
        </h1>
        <p className="text-lg text-muted-foreground">{lesson.summary}</p>
      </header>

      <div className="space-y-5">
        {lesson.content.map((s: { heading: string; body: string }) => (
          <GlassCard key={s.heading}>
            <h2 className="text-lg font-semibold">{s.heading}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">{s.body}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="relative overflow-hidden">
        <div
          className="absolute -right-8 -top-8 size-40 rounded-full opacity-25"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--gold)]">
            <Sparkles className="size-4" /> Did you know?
          </div>
          <p className="mt-3 text-lg leading-snug">{lesson.didYouKnow}</p>
        </div>
      </GlassCard>

      <div className="flex justify-center pb-4">
        <button
          onClick={() => toggleLesson(lesson.slug)}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
            done
              ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)] border border-[color:var(--gold)]/40"
              : "bg-primary text-primary-foreground hover:opacity-90 shadow-[var(--shadow-elegant)]"
          }`}
        >
          <Check className="size-4" />
          {done ? "Completed" : "Mark as read"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center pb-4">
        Educational content — not medical advice.
      </p>
    </main>
  );
}
