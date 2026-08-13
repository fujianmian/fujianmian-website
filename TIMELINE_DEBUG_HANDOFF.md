# Timeline magnetic interaction — Codex handoff

## Goal

Finish the desktop magnetic-proximity interaction on `/timeline` without breaking the existing card click, keyboard focus, mobile accordion, or horizontal scrolling behavior.

## Current verified state

- Production inspection server runs on `http://localhost:3150/timeline?timelineDebug=1` when started with `npx next start -p 3150` after `npm run build`.
- The horizontal strip and all four cards render correctly at rest.
- Cards have a readable resting state and direct hover/click can reveal full details.
- Pointer input is definitely delivered: `/api/timeline-debug` recorded 57 `pointer input received` entries with changing `x`/`y` coordinates and `geometryCount: 4`.
- Before the current fix, there were zero `frame running` records. The cause was an animation-frame cleanup which canceled a pending frame but did not reset `frameRef.current` to `null`; all later scheduler calls were rejected as if a frame were still pending.

## Current targeted fix

In `src/components/timeline/timeline-interactive.js`, the cleanup for the `scheduleFrame` effect now does both:

```js
window.cancelAnimationFrame(frameRef.current);
frameRef.current = null;
```

This must be preserved. Verify that moving over the strip produces `phase: frame running` diagnostic entries after this change.

## Debugging workflow

1. Run `npm run lint` and `npm run build`.
2. Start `npx next start -p 3150`.
3. Open `/timeline?timelineDebug=1` and move through the timeline.
4. Inspect `GET /api/timeline-debug`.
5. Expected chain:
   - `pointer input received` with changing coordinates;
   - `frame running` with `geometryCount: 4`;
   - nearby events show non-zero `influence`, changing opacity, and an updated scale CSS variable.

## Interaction design constraints

- At rest: every card remains partially visible and readable. Do not set resting opacity to zero.
- Near the pointer: cards should scale continuously, not by breakpoints. Current radius is 520 px; target scale is approximately `0.82 + influence * 0.20`.
- Direct hover, click, and keyboard focus reveal full details.
- Do not use React state for every pointer movement; use pointer refs, one requestAnimationFrame loop, and CSS custom properties.
- Ignore touch pointer proximity; mobile keeps its vertical tap/accordion interaction.
- Remove all diagnostics and `/api/timeline-debug` only once visual interaction is verified in a real browser.

## Relevant files

- `src/components/timeline/timeline-interactive.js` — pointer input, geometry cache, rAF loop, interaction state, temporary diagnostics.
- `src/app/globals.css` — card transform/opacity custom properties and expanded card fallback.
- `src/app/api/timeline-debug/route.js` — temporary in-memory debug endpoint.
- `src/content/timeline.js` — verified event data.

## Safety

Do not commit, push, reset, or discard existing working-tree changes. Do not add animation dependencies.
