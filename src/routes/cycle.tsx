import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui-kit";
import { LogPeriod } from "@/components/log-period";

export const Route = createFileRoute("/cycle")({
  head: () => ({
    meta: [
      { title: "Log Period — Perikoma" },
      {
        name: "description",
        content:
          "Log the start and end of your period, set your cycle averages, and let Perikoma adapt its predictions.",
      },
      { property: "og:title", content: "Log Period — Perikoma" },
      {
        property: "og:description",
        content: "Log your period in two taps and keep your cycle predictions accurate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CyclePage,
});

function CyclePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-8 md:pt-14 space-y-8">
      <SectionTitle
        eyebrow="Track"
        title="Log your period"
        subtitle="Two taps is all it takes — Perikoma learns from each entry."
      />

      <LogPeriod />
    </main>
  );
}
