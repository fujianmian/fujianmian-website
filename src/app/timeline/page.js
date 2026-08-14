import { SectionHero } from "@/components/section-hero";
import { TimelineInteractive } from "@/components/timeline/timeline-interactive";
import { timeline } from "@/content/timeline";

export const metadata = {
  title: "Timeline",
  description: "Milestones and activities from Heng Jun Yong's journey.",
};

export default async function TimelinePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const scrollHintId = "timeline-scroll-hint";
  const debugEnabled = resolvedSearchParams?.timelineDebug === "1";

  return (
    <section className="mx-auto w-full max-w-[100rem]">
      {/* <SectionHero
        title="Timeline"
        titleId="timeline-title"
        decorativeWord="TIMELINE"
      />

      <p id={scrollHintId} className="mt-5 hidden items-center gap-2 text-sm text-slate-400 lg:flex">
        <span aria-hidden="true">←</span> Scroll or use arrow keys to explore the chronology <span aria-hidden="true">→</span>
      </p> */}

      <TimelineInteractive entries={timeline} hintId={scrollHintId} debugEnabled={debugEnabled} />
    </section>
  );
}
