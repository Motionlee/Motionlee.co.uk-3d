"use client";

import { useEffect, useRef, useState } from "react";
import { HeroOverlay } from "./HeroOverlay";
import { Bubbles } from "./Bubbles";
import { HeroCards } from "./HeroCards";
import { ScrubSculpture } from "./ScrubSculpture";
import { heroProgress } from "./progress";

/**
 * Light burst over the hero→work handover. Off while we judge the plain
 * crossfade; the styling stays in hero.css, so flipping this back on restores
 * it exactly. The handover does not depend on it — the work section is pulled
 * up under the hero, which is what removes the dark gap.
 */
const SHOW_PORTAL = false;
import "./hero.css";

/**
 * Full-bleed cinematic hero.
 *
 * The render is the page, not an object placed on it. Everything else — scrim,
 * type, cards, particles — composites on top, which is how the Figma
 * references are built and the only arrangement where a video hero has no
 * visible rectangle.
 *
 * Motion is one rAF writing three custom properties; every layer derives its
 * own parallax from them, so depth costs no extra work and no React renders.
 */
export function Hero3D() {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const root = ref.current;
    if (!root) return;

    let raf = 0;
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0, scroll: 0 };

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const frame = () => {
      // Progress is measured from the hero's own pinned travel rather than a
      // hardcoded pixel count, so changing the section's height cannot put the
      // rotation and the fade out of step with each other.
      const range = root.parentElement;
      const travel = range
        ? range.offsetHeight - window.innerHeight
        : window.innerHeight;
      const scrollTarget =
        travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;

      // Damped, never instant. This is where the weight comes from.
      eased.x += (pointer.x - eased.x) * 0.045;
      eased.y += (pointer.y - eased.y) * 0.045;
      eased.scroll += (scrollTarget - eased.scroll) * 0.07;

      root.style.setProperty("--px", eased.x.toFixed(4));
      root.style.setProperty("--py", eased.y.toFixed(4));
      root.style.setProperty("--sc", eased.scroll.toFixed(4));
      heroProgress.value = eased.scroll;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={ref}
      className="ml-hero sticky top-0 h-[100svh] min-h-[600px] w-full overflow-hidden"
    >
      {/* 1 — the render, edge to edge */}
      <ScrubSculpture />

      {/* 2 — scrim: full-bleed imagery needs a gradient behind the copy, or the
             headline sits on whatever the picture happens to be doing there */}
      <div className="ml-scrim" aria-hidden="true" />

      {/* 3 — violet lift + vignette, keeps the eye on the sculpture */}
      <div className="ml-grade" aria-hidden="true" />

      {/* 4 — capability pills.
             There used to be a keyed still of the sculpture layered here so
             chips could pass behind the M. It had to go: the clip rotates and
             the overlay does not, so it ghosted as a second, static M.
             Occluding a moving object needs a moving matte, which CSS cannot
             do from an MP4. */}
      <HeroCards />

      {/* 5 — drifting glass bubbles */}
      {!reduced && (
        <div className="ml-bubbles" aria-hidden="true">
          <Bubbles count={7} />
        </div>
      )}

      {/* 6 — typography */}
      <HeroOverlay />

      {SHOW_PORTAL && (
        <div className="ml-portal" aria-hidden="true">
          <span className="ml-portal-core" />
          <span className="ml-portal-ring" />
          <span className="ml-portal-rays" />
        </div>
      )}

      <div className="ml-hero-fade" aria-hidden="true" />
    </section>
  );
}
