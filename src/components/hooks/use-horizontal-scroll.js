"use client";

import { useEffect, useRef } from "react";

export function useHorizontalScroll({ step = 320, desktopOnly = true } = {}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return undefined;

    const canUseHorizontalMode = () => !desktopOnly || window.matchMedia("(min-width: 1024px)").matches;
    const handleWheel = (event) => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isMostlyVertical = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      const maximumScrollLeft = viewport.scrollWidth - viewport.clientWidth;

      if (!canUseHorizontalMode() || !hasFinePointer || !isMostlyVertical || maximumScrollLeft <= 0) return;

      const canScrollForward = event.deltaY > 0 && viewport.scrollLeft < maximumScrollLeft - 1;
      const canScrollBackward = event.deltaY < 0 && viewport.scrollLeft > 1;

      if (!canScrollForward && !canScrollBackward) return;

      event.preventDefault();
      viewport.scrollLeft += event.deltaY;
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [desktopOnly]);

  const handleHorizontalKeyDown = (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    const viewport = scrollRef.current;
    const maximumScrollLeft = viewport ? viewport.scrollWidth - viewport.clientWidth : 0;
    const isDesktop = !desktopOnly || window.matchMedia("(min-width: 1024px)").matches;

    if (!viewport || !isDesktop || maximumScrollLeft <= 0) return;

    event.preventDefault();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    if (event.key === "Home") {
      viewport.scrollTo({ left: 0, behavior });
      return;
    }

    if (event.key === "End") {
      viewport.scrollTo({ left: maximumScrollLeft, behavior });
      return;
    }

    viewport.scrollBy({ left: event.key === "ArrowRight" ? step : -step, behavior });
  };

  return { scrollRef, handleHorizontalKeyDown };
}
