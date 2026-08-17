"use client";

import { useHorizontalScroll } from "@/components/hooks/use-horizontal-scroll";

export function ResumeStrip({ children, hintId, className = "" }) {
  const { scrollRef, handleHorizontalKeyDown } = useHorizontalScroll();

  return (
    <div
      ref={scrollRef}
      role="region"
      aria-label="Resume sections"
      aria-describedby={hintId}
      tabIndex={0}
      onKeyDown={handleHorizontalKeyDown}
      className={`resume-strip mt-7 overflow-x-visible lg:mt-8 lg:overflow-x-auto lg:overflow-y-hidden lg:overscroll-x-contain ${className}`}
    >
      <div className="border-y border-slate-800 lg:flex lg:h-full lg:w-max lg:min-w-full lg:items-start lg:border-l">
        {children}
      </div>
    </div>
  );
}
