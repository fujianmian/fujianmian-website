"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PROXIMITY_RADIUS = 520;
const REVEAL_ENTER_THRESHOLD = 0.22;
const REVEAL_EXIT_THRESHOLD = 0.08;
const CORRIDOR_RADIUS = 84;
const SMOOTHING = 0.17;

function nextInteraction(current, changes) {
  return { ...current, ...changes };
}

function getExpandedEventId(interaction) {
  return interaction.focusedId || interaction.hoveredId || interaction.selectedId;
}

function pointToSegmentDistance(point, start, end) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const segmentLengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (!segmentLengthSquared) return Math.hypot(point.x - start.x, point.y - start.y);

  const projection = Math.max(0, Math.min(1, ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / segmentLengthSquared));
  return Math.hypot(point.x - (start.x + deltaX * projection), point.y - (start.y + deltaY * projection));
}

function TimelineDiagnostics({ snapshot, probes }) {
  if (!snapshot) {
    return (
      <aside aria-live="polite" className="timeline-diagnostics pointer-events-none fixed bottom-4 left-4 z-[60] w-[min(29rem,calc(100vw-2rem))] border border-cyan-300/50 bg-slate-950/95 p-3 font-mono text-[11px] leading-5 text-slate-200 shadow-2xl shadow-slate-950/70 backdrop-blur">
        <p className="font-semibold tracking-[0.14em] text-cyan-200 uppercase">Timeline diagnostics active</p>
        <p className="mt-1 text-slate-300">Waiting for Timeline client diagnostics…</p>
      </aside>
    );
  }

  return (
    <aside aria-live="polite" className="timeline-diagnostics pointer-events-none fixed bottom-4 left-4 z-[60] w-[min(29rem,calc(100vw-2rem))] border border-cyan-300/50 bg-slate-950/95 p-3 font-mono text-[11px] leading-5 text-slate-200 shadow-2xl shadow-slate-950/70 backdrop-blur">
      <p className="font-semibold tracking-[0.14em] text-cyan-200 uppercase">Timeline diagnostics</p>
      {snapshot.phase && <p className="mt-1 text-cyan-100">phase: {snapshot.phase}</p>}
      <p className="mt-1 text-slate-300">motion: {snapshot.motionEnabled ? "enabled" : "disabled"} · desktop: {String(snapshot.isDesktop)} · reduced: {String(snapshot.prefersReducedMotion)}</p>
      <p className="text-slate-300">pointer: {snapshot.pointer.inside ? `${snapshot.pointer.x}, ${snapshot.pointer.y}` : "outside"} · dots: {snapshot.geometryCount}</p>
      <div className="mt-2 space-y-1 border-t border-slate-700 pt-2">
        {snapshot.events.map((event) => (
          <p key={event.id} className={event.expanded ? "text-cyan-100" : event.primed ? "text-amber-100" : "text-slate-400"}>
            {event.id}: i {event.influence} · {event.primed ? "primed" : "far"} · {event.inBridge ? "bridge" : "no-bridge"} · {event.expanded ? "full" : "preview"} · opacity {event.opacity} · {event.pointerEvents}
          </p>
        ))}
      </div>
      {probes.length > 0 && (
        <div className="mt-2 space-y-1 border-t border-slate-700 pt-2 text-slate-300">
          {probes.map((probe) => <p key={probe.step}>{probe.step}: strip {probe.stripSize} / dots {probe.dotCount} / {probe.cards}</p>)}
        </div>
      )}
    </aside>
  );
}

function TimelinePreview({ entry, imageSizes }) {
  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden border border-slate-800">
        <Image src={entry.image.src} alt={entry.image.alt} fill sizes={imageSizes} className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.16em] text-cyan-200 uppercase">{entry.year} · {entry.kind}</p>
        <time dateTime={entry.date} className="mt-2 block text-sm text-slate-400">{entry.dateLabel}</time>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{entry.title}</h3>
        <p className="mt-1 text-sm text-slate-300">{entry.organization}</p>
        <p className="mt-4 text-sm leading-6 text-slate-300">{entry.preview}</p>
      </div>
    </>
  );
}

function EventDetails({ entry, id, expanded = true, mobile = false }) {
  const content = (
    <>
      <p className="leading-6 text-slate-300">{entry.description}</p>
      {entry.technologies?.length > 0 && (
        <>
          <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-cyan-200 uppercase">Technologies</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {entry.technologies.map((technology) => <li key={technology} className="border border-slate-700 px-2 py-1 text-xs text-slate-200">{technology}</li>)}
          </ul>
        </>
      )}
    </>
  );

  if (mobile) return <div id={id} className="border-t border-slate-800 px-4 pt-4 pb-4 sm:col-span-2 sm:px-5">{content}</div>;

  return (
    <div id={id} aria-hidden={!expanded} className="timeline-card-details">
      <div>{content}</div>
    </div>
  );
}

function DesktopTimelineEvent({ entry, index, isExpanded, onToggle, onFocus, onBlur, onCardPointerEnter, onCardPointerLeave, onEscape }) {
  const isAboveLine = index % 2 === 1;
  const direction = isAboveLine ? "above" : "below";
  const cardPosition = isAboveLine ? "bottom-[calc(50%+1rem)]" : "top-[calc(50%+1rem)]";
  const connectorPosition = isAboveLine ? "bottom-1/2 h-4" : "top-1/2 h-4";
  const detailsId = `timeline-details-${entry.id}`;

  return (
    <div data-timeline-event={entry.id} className="relative h-full min-h-[26rem] w-[23rem] shrink-0">
      <button
        type="button"
        data-timeline-dot={entry.id}
        data-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${entry.title}`}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={() => onToggle(entry.id)}
        onFocus={() => onFocus(entry.id)}
        onBlur={onBlur}
        onKeyDown={(event) => {
          if (event.key === "Escape") onEscape(event);
        }}
        className="timeline-dot-control absolute left-1/2 top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
      >
        <span className="timeline-dot h-3 w-3 rounded-full border-2 border-slate-950 bg-cyan-300" aria-hidden="true" />
      </button>
      <span aria-hidden="true" data-timeline-connector={entry.id} data-direction={direction} className={`timeline-connector absolute left-1/2 z-10 w-px -translate-x-1/2 bg-slate-600 ${connectorPosition}`} />
      <article
        id={`timeline-event-${entry.id}`}
        data-timeline-card={entry.id}
        data-direction={direction}
        data-expanded={isExpanded}
        onPointerEnter={() => onCardPointerEnter(entry.id)}
        onPointerLeave={onCardPointerLeave}
        className={`timeline-event-card absolute left-1/2 z-10 w-[19rem] border border-slate-700 bg-slate-900/95 shadow-xl shadow-slate-950/30 ${cardPosition}`}
      >
        <div className="timeline-card-preview p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-cyan-200 uppercase">{entry.year} · {entry.kind}</p>
          <time dateTime={entry.date} className="mt-1 block text-xs text-slate-400">{entry.dateLabel}</time>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">{entry.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{entry.organization}</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">{entry.preview}</p>
        </div>
        <EventDetails entry={entry} id={detailsId} expanded={isExpanded} />
      </article>
    </div>
  );
}

function MobileTimelineEvents({ entries, selectedId, onToggle }) {
  return (
    <ol className="mt-8 border-l border-slate-700 pl-6 lg:hidden">
      {entries.map((entry) => {
        const isExpanded = selectedId === entry.id;
        const detailsId = `mobile-timeline-details-${entry.id}`;

        return (
          <li key={entry.id} className="relative pb-8 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[1.9rem] top-2 h-3 w-3 rounded-full border-2 border-slate-950 bg-cyan-300" />
            <article className="relative grid gap-4 border border-slate-800 bg-slate-900/70 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:p-5">
              <button
                type="button"
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${entry.title}`}
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                onClick={() => onToggle(entry.id)}
                className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <span className="sr-only">{isExpanded ? "Collapse" : "Expand"} full information for {entry.title}</span>
              </button>
              <TimelinePreview entry={entry} imageSizes="(max-width: 639px) 100vw, 9rem" />
              {isExpanded && <EventDetails entry={entry} id={detailsId} mobile />}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

export function TimelineInteractive({ entries, hintId, debugEnabled = false }) {
  const stripRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ inside: false, x: 0, y: 0 });
  const geometryRef = useRef(new Map());
  const currentValuesRef = useRef(new Map());
  const primedIdsRef = useRef(new Set());
  const debugLastUpdateRef = useRef(0);
  const debugSignatureRef = useRef("");
  const debugLastSentRef = useRef(0);
  const debugPointerSentRef = useRef(0);
  const debugHasReportedFrameRef = useRef(false);
  const initialInteraction = { hoveredId: null, focusedId: null, selectedId: null };
  const interactionRef = useRef(initialInteraction);
  const [interaction, setInteraction] = useState(initialInteraction);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [debugSnapshot, setDebugSnapshot] = useState(null);
  const [debugProbes, setDebugProbes] = useState([]);
  // The horizontal timeline only exists at the desktop breakpoint. Its own
  // pointer handlers already scope this enhancement, so a flaky media-query
  // result must never suppress mouse proximity inside a visible strip.
  const motionEnabled = !prefersReducedMotion;

  const refreshGeometry = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const geometry = new Map();
    strip.querySelectorAll("[data-timeline-event]").forEach((event) => {
      const dot = event.querySelector("[data-timeline-dot]");
      if (!dot) return;

      const dotRect = dot.getBoundingClientRect();
      geometry.set(event.dataset.timelineEvent, {
        centerX: dotRect.left + dotRect.width / 2,
        centerY: dotRect.top + dotRect.height / 2,
        direction: event.querySelector("[data-timeline-card]")?.dataset.direction,
      });
    });

    geometryRef.current = geometry;
  }, []);

  const runFrame = useCallback(() => {
    frameRef.current = null;
    const strip = stripRef.current;
    if (!strip) return;

    const expandedEventId = getExpandedEventId(interactionRef.current);
    const pointer = pointerRef.current;
    let needsAnotherFrame = motionEnabled && pointer.inside;

    const diagnosticEvents = [];
    strip.querySelectorAll("[data-timeline-card]").forEach((card) => {
      const id = card.dataset.timelineCard;
      const geometry = geometryRef.current.get(id);
      const isExpanded = id === expandedEventId;
      let rawInfluence = 0;

      if (motionEnabled && pointer.inside && geometry) {
        const distance = Math.hypot(pointer.x - geometry.centerX, (pointer.y - geometry.centerY) * 0.65);
        rawInfluence = Math.max(0, 1 - distance / PROXIMITY_RADIUS);
      }

      if (rawInfluence >= REVEAL_ENTER_THRESHOLD) primedIdsRef.current.add(id);

      const cardRect = card.getBoundingClientRect();
      const cardCenter = { x: cardRect.left + cardRect.width / 2, y: cardRect.top + cardRect.height / 2 };
      const dotCenter = geometry ? { x: geometry.centerX, y: geometry.centerY } : cardCenter;
      const isInBridge = pointer.inside && pointToSegmentDistance(pointer, dotCenter, cardCenter) <= CORRIDOR_RADIUS;
      const shouldRemainPrimed = rawInfluence >= REVEAL_EXIT_THRESHOLD || isInBridge || isExpanded;

      if (!shouldRemainPrimed) primedIdsRef.current.delete(id);

      const isPrimed = primedIdsRef.current.has(id);
      const previewInfluence = isExpanded ? 1 : rawInfluence;
      const restingOpacity = 0.68;
      const direction = geometry?.direction === "above" ? -1 : 1;
      const target = {
        scale: isExpanded ? 1.06 : 0.82 + previewInfluence * 0.2,
        lift: isExpanded ? direction * 10 : direction * previewInfluence * 5,
        opacity: isExpanded ? 1 : restingOpacity + previewInfluence * (1 - restingOpacity),
        dotScale: isExpanded ? 1.62 : 1 + previewInfluence * 0.42,
      };
      const current = currentValuesRef.current.get(id) || { ...target };
      const smoothing = motionEnabled ? SMOOTHING : 1;
      const next = {};

      Object.entries(target).forEach(([key, value]) => {
        next[key] = current[key] + (value - current[key]) * smoothing;
        if (Math.abs(next[key] - value) > 0.002) needsAnotherFrame = true;
      });

      currentValuesRef.current.set(id, next);
      card.style.setProperty("--timeline-card-scale", next.scale.toFixed(3));
      card.style.setProperty("--timeline-card-lift", `${next.lift.toFixed(2)}px`);
      card.style.setProperty("--timeline-card-opacity", next.opacity.toFixed(3));
      card.style.zIndex = isExpanded ? "30" : isPrimed ? "20" : "10";
      card.style.pointerEvents = "auto";
      card.style.willChange = pointer.inside || isExpanded ? "transform, opacity" : "auto";

      const connector = strip.querySelector(`[data-timeline-connector="${id}"]`);
      if (connector) connector.style.setProperty("--timeline-connector-opacity", next.opacity.toFixed(3));

      const dot = strip.querySelector(`[data-timeline-dot="${id}"]`);
      if (dot) {
        dot.style.setProperty("--timeline-dot-scale", next.dotScale.toFixed(3));
        dot.dataset.expanded = String(isExpanded);
      }

      diagnosticEvents.push({
        id,
        influence: rawInfluence.toFixed(3),
        primed: isPrimed,
        inBridge: isInBridge,
        expanded: isExpanded,
        opacity: next.opacity.toFixed(3),
        pointerEvents: card.style.pointerEvents || "none",
      });
    });

    if (debugEnabled) {
      const now = performance.now();
      const signature = diagnosticEvents.map((event) => `${event.id}:${event.primed}:${event.inBridge}:${event.expanded}:${event.pointerEvents}`).join("|");
      if (signature !== debugSignatureRef.current) {
        debugSignatureRef.current = signature;
        console.info("[Timeline diagnostics] interaction transition", {
          pointer: pointerRef.current,
          motionEnabled,
          geometryCount: geometryRef.current.size,
          events: diagnosticEvents,
        });
      }

      if (!debugHasReportedFrameRef.current || now - debugLastUpdateRef.current > 100) {
        debugHasReportedFrameRef.current = true;
        debugLastUpdateRef.current = now;
        const snapshot = {
          phase: "frame running",
          motionEnabled,
          isDesktop,
          prefersReducedMotion,
          pointer: { ...pointerRef.current },
          geometryCount: geometryRef.current.size,
          events: diagnosticEvents,
        };
        setDebugSnapshot(snapshot);

        if (now - debugLastSentRef.current > 500) {
          debugLastSentRef.current = now;
          fetch("/api/timeline-debug", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(snapshot),
            keepalive: true,
          }).catch(() => {});
        }
      }
    }

    if (needsAnotherFrame) frameRef.current = window.requestAnimationFrame(runFrame);
  }, [debugEnabled, isDesktop, motionEnabled, prefersReducedMotion]);

  const scheduleFrame = useCallback(() => {
    if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(runFrame);
  }, [runFrame]);

  const keepExpandedCardInView = useCallback((id) => {
    const strip = stripRef.current;
    const card = strip?.querySelector(`[data-timeline-card="${id}"]`);
    if (!strip || !card) return;

    const stripRect = strip.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const inset = 24;
    const leftLimit = stripRect.left + inset;
    const rightLimit = stripRect.right - inset;
    const delta = cardRect.left < leftLimit
      ? cardRect.left - leftLimit
      : cardRect.right > rightLimit
        ? cardRect.right - rightLimit
        : 0;

    if (delta) strip.scrollBy({ left: delta, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!debugEnabled) return undefined;

    const report = (phase, detail = {}) => {
      const snapshot = {
        phase,
        motionEnabled: false,
        isDesktop: window.matchMedia("(min-width: 1024px)").matches,
        prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        pointer: { ...pointerRef.current },
        geometryCount: geometryRef.current.size,
        events: [],
        ...detail,
      };

      setDebugSnapshot(snapshot);
      fetch("/api/timeline-debug", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(snapshot),
        keepalive: true,
      }).catch(() => {});
    };

    const probeDom = (step) => {
      const strip = stripRef.current;
      const stripRect = strip?.getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll("[data-timeline-card]")).map((card) => {
        const rect = card.getBoundingClientRect();
        const style = window.getComputedStyle(card);
        return `${card.dataset.timelineCard} size ${Math.round(rect.width)}x${Math.round(rect.height)} opacity ${style.opacity}`;
      });
      const probe = {
        step,
        stripSize: stripRect ? `${Math.round(stripRect.width)}x${Math.round(stripRect.height)}` : "missing",
        dotCount: strip?.querySelectorAll("[data-timeline-dot]").length ?? 0,
        cards: cards.length ? cards.join("; ") : "cards 0",
      };

      setDebugProbes((current) => [...current.filter((item) => item.step !== step), probe].slice(-3));
      fetch("/api/timeline-debug", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phase: step, ...probe }),
        keepalive: true,
      }).catch(() => {});
    };

    report("client mounted - awaiting first frame");
    probeDom("probe 1 (0ms)");
    const secondProbe = window.setTimeout(() => probeDom("probe 2 (250ms)"), 250);
    const thirdProbe = window.setTimeout(() => probeDom("probe 3 (1000ms)"), 1000);
    const reportError = (event) => report("client error", { error: String(event.error?.stack || event.message || "Unknown error") });
    const reportRejection = (event) => report("unhandled rejection", { error: String(event.reason?.stack || event.reason || "Unknown rejection") });
    window.addEventListener("error", reportError);
    window.addEventListener("unhandledrejection", reportRejection);

    return () => {
      window.clearTimeout(secondProbe);
      window.clearTimeout(thirdProbe);
      window.removeEventListener("error", reportError);
      window.removeEventListener("unhandledrejection", reportRejection);
    };
  }, [debugEnabled]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapabilities = () => {
      const stripIsVisible = (stripRef.current?.getBoundingClientRect().width ?? 0) > 0;
      setIsDesktop(desktopQuery.matches || stripIsVisible);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    updateCapabilities();
    desktopQuery.addEventListener("change", updateCapabilities);
    reducedMotionQuery.addEventListener("change", updateCapabilities);
    return () => {
      desktopQuery.removeEventListener("change", updateCapabilities);
      reducedMotionQuery.removeEventListener("change", updateCapabilities);
    };
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;

    const handleScroll = () => {
      refreshGeometry();
      scheduleFrame();
    };
    const resizeObserver = new ResizeObserver(handleScroll);

    refreshGeometry();
    strip.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    resizeObserver.observe(strip);

    return () => {
      strip.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      resizeObserver.disconnect();
    };
  }, [refreshGeometry, scheduleFrame]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;

    const handleWheel = (event) => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isMostlyVertical = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      const maximumScrollLeft = strip.scrollWidth - strip.clientWidth;
      const canScrollForward = event.deltaY > 0 && strip.scrollLeft < maximumScrollLeft - 1;
      const canScrollBackward = event.deltaY < 0 && strip.scrollLeft > 1;

      if (!hasFinePointer || !isMostlyVertical || maximumScrollLeft <= 0 || (!canScrollForward && !canScrollBackward)) return;

      event.preventDefault();
      strip.scrollLeft += event.deltaY;
    };

    strip.addEventListener("wheel", handleWheel, { passive: false });
    return () => strip.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || prefersReducedMotion) return undefined;

    const reportPointerInput = (event) => {
      if (!debugEnabled || performance.now() - debugPointerSentRef.current < 350) return;
      debugPointerSentRef.current = performance.now();
      const snapshot = {
        phase: "pointer input received",
        motionEnabled: true,
        isDesktop,
        prefersReducedMotion,
        pointer: { ...pointerRef.current },
        geometryCount: geometryRef.current.size,
        events: [],
        inputType: event.type,
      };
      setDebugSnapshot(snapshot);
      fetch("/api/timeline-debug", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(snapshot),
        keepalive: true,
      }).catch(() => {});
    };

    const updatePointer = (event) => {
      if (event.pointerType === "touch") return;
      pointerRef.current = { inside: true, x: event.clientX, y: event.clientY };
      refreshGeometry();
      reportPointerInput(event);
      scheduleFrame();
    };
    const clearPointer = () => {
      pointerRef.current.inside = false;
      setInteraction((current) => current.hoveredId ? nextInteraction(current, { hoveredId: null }) : current);
      scheduleFrame();
    };

    strip.addEventListener("pointermove", updatePointer, { passive: true });
    strip.addEventListener("mousemove", updatePointer, { passive: true });
    strip.addEventListener("pointerleave", clearPointer, { passive: true });
    strip.addEventListener("mouseleave", clearPointer, { passive: true });
    return () => {
      strip.removeEventListener("pointermove", updatePointer);
      strip.removeEventListener("mousemove", updatePointer);
      strip.removeEventListener("pointerleave", clearPointer);
      strip.removeEventListener("mouseleave", clearPointer);
    };
  }, [debugEnabled, isDesktop, prefersReducedMotion, refreshGeometry, scheduleFrame]);

  useEffect(() => {
    interactionRef.current = interaction;
    refreshGeometry();
    scheduleFrame();
  }, [interaction, refreshGeometry, scheduleFrame]);

  useEffect(() => {
    const expandedEventId = getExpandedEventId(interaction);
    if (!expandedEventId) return undefined;

    const frame = window.requestAnimationFrame(() => keepExpandedCardInView(expandedEventId));
    return () => window.cancelAnimationFrame(frame);
  }, [interaction, keepExpandedCardInView]);

  useEffect(() => {
    scheduleFrame();
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [scheduleFrame]);

  const toggleSelection = (id) => {
    setInteraction((current) => nextInteraction(current, { selectedId: current.selectedId === id ? null : id }));
  };

  const collapseFocused = (event) => {
    event.preventDefault();
    setInteraction((current) => nextInteraction(current, { focusedId: null, selectedId: null }));
    event.currentTarget.blur();
  };

  const handleStripKeyDown = (event) => {
    const strip = stripRef.current;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;

    const behavior = prefersReducedMotion ? "auto" : "smooth";
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      strip.scrollBy({ left: event.key === "ArrowRight" ? 320 : -320, behavior });
    }
    if (event.key === "Home") {
      event.preventDefault();
      strip.scrollTo({ left: 0, behavior });
    }
    if (event.key === "End") {
      event.preventDefault();
      strip.scrollTo({ left: strip.scrollWidth, behavior });
    }
  };

  const handleCardPointerEnter = (id) => {
    setInteraction((current) => current.hoveredId === id ? current : nextInteraction(current, { hoveredId: id }));
  };

  const handleCardPointerLeave = () => {
    setInteraction((current) => current.hoveredId ? nextInteraction(current, { hoveredId: null }) : current);
  };

  const handleFocus = (id) => {
    setInteraction((current) => current.focusedId === id ? current : nextInteraction(current, { focusedId: id }));
  };

  const handleBlur = () => {
    setInteraction((current) => current.focusedId ? nextInteraction(current, { focusedId: null }) : current);
  };

  return (
    <>
      <div
        ref={stripRef}
        role="region"
        aria-label="Timeline events"
        aria-describedby={hintId}
        tabIndex={0}
        onKeyDown={handleStripKeyDown}
        className="timeline-strip hidden h-[calc(100dvh-8rem)] overflow-x-auto overflow-y-hidden overscroll-x-contain lg:block"
      >
        <div className="relative flex h-full min-w-max border-y border-slate-800 px-40">
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-slate-600" />
          <span aria-hidden="true" className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-950 pl-2 text-lg text-slate-500">→</span>
          {entries.map((entry, index) => (
            <DesktopTimelineEvent
              key={entry.id}
              entry={entry}
              index={index}
              isExpanded={getExpandedEventId(interaction) === entry.id}
              onToggle={toggleSelection}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onCardPointerEnter={handleCardPointerEnter}
              onCardPointerLeave={handleCardPointerLeave}
              onEscape={collapseFocused}
            />
          ))}
        </div>
      </div>

      <MobileTimelineEvents entries={entries} selectedId={interaction.selectedId} onToggle={toggleSelection} />
      {debugEnabled && <TimelineDiagnostics snapshot={debugSnapshot} probes={debugProbes} />}
    </>
  );
}
