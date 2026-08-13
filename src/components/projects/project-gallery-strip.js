"use client";

import { useHorizontalScroll } from "@/components/hooks/use-horizontal-scroll";

export function ProjectGalleryStrip({ children, hintId }) {
  const { scrollRef, handleHorizontalKeyDown } = useHorizontalScroll({ step: 360 });

  return (
    <div
      ref={scrollRef}
      role="region"
      aria-label="Project gallery"
      aria-describedby={hintId}
      tabIndex={0}
      onKeyDown={handleHorizontalKeyDown}
      className="project-gallery-strip mt-8 overflow-visible lg:mt-10 lg:overflow-x-auto lg:overscroll-x-contain"
    >
      <div className="flex flex-col gap-6 pb-1 lg:w-max lg:min-w-full lg:flex-row lg:items-end lg:gap-8 lg:pb-3">
        {children}
      </div>
    </div>
  );
}
