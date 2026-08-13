"use client";

import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AUTOPLAY_INTERVAL = 6500;

function getSlideIndex(index, total) {
  return (index + total) % total;
}

export function FeaturedCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef(null);
  const swipeOccurred = useRef(false);
  const swipeResetTimer = useRef(null);

  useEffect(() => () => {
    if (swipeResetTimer.current !== null) window.clearTimeout(swipeResetTimer.current);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const isAutoplayActive = isAutoplayEnabled && !prefersReducedMotion;

  useEffect(() => {
    if (!isAutoplayActive || items.length < 2) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => getSlideIndex(index + 1, items.length));
    }, AUTOPLAY_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isAutoplayActive, items.length]);

  if (!items.length) return null;

  const activeItem = items[activeIndex];

  const selectSlide = (index, stopAutoplay = true) => {
    setActiveIndex(getSlideIndex(index, items.length));
    if (stopAutoplay) setIsAutoplayEnabled(false);
  };

  const selectPrevious = () => selectSlide(activeIndex - 1);
  const selectNext = () => selectSlide(activeIndex + 1);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectNext();
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (event.pointerType !== "touch" || touchStartX.current === null) return;

    const distance = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 48) return;

    swipeOccurred.current = true;
    if (distance < 0) selectNext();
    else selectPrevious();

    if (swipeResetTimer.current !== null) window.clearTimeout(swipeResetTimer.current);
    swipeResetTimer.current = window.setTimeout(() => {
      swipeOccurred.current = false;
    }, 0);
  };

  return (
    <section
      aria-label="Featured work and experiences"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="mx-auto w-full max-w-[100rem]"
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative min-h-[min(76svh,42rem)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-cyan-950/20 sm:min-h-[min(78svh,48rem)] lg:min-h-[calc(100dvh-8rem)]"
      >
        <Link
          href={activeItem.href}
          aria-label={`Explore ${activeItem.title} in ${activeItem.category}`}
          onClick={(event) => {
            if (swipeOccurred.current) event.preventDefault();
          }}
          className="group absolute inset-0 block"
        >
          <Image
            key={activeItem.id}
            src={activeItem.image.src}
            alt={activeItem.image.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 1023px) 100vw, calc(100vw - 10rem)"
            style={{ objectPosition: activeItem.objectPosition }}
            className="featured-carousel-image object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/15" aria-hidden="true" />
          <span className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 sm:inset-x-8 sm:top-8">
            <span className="max-w-[65%] text-xs font-medium tracking-[0.16em] text-white/75 uppercase sm:text-sm">{activeItem.context}</span>
            <span className="rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] text-white uppercase" style={{ borderColor: activeItem.accent, color: activeItem.accent }}>
              {activeItem.category}
            </span>
          </span>
          <div className="absolute inset-x-5 bottom-16 sm:inset-x-8 sm:bottom-20">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {activeItem.title}
            </h1>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/80">
              Explore <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>

        <div className="absolute right-5 bottom-5 z-10 sm:right-8 sm:bottom-8">
          <button
            type="button"
            onClick={() => setIsAutoplayEnabled((enabled) => !enabled)}
            disabled={prefersReducedMotion}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-slate-950/50 text-white backdrop-blur transition-colors hover:border-white/70 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isAutoplayActive ? "Pause automatic slides" : "Resume automatic slides"}
          >
            {isAutoplayActive ? <Pause aria-hidden="true" size={15} /> : <Play aria-hidden="true" size={15} />}
          </button>
        </div>
      </div>
    </section>
  );
}
