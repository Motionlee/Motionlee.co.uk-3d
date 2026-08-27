"use client";

import { useEffect, useRef } from "react";
import { CHIPS, type Chip } from "./cards";
import { heroProgress } from "./progress";

/** How much scroll progress each chip takes to fully arrive.
 *  Tightened so the last chip is fully in at 0.46, leaving a beat with all
 *  five present before the sculpture starts its exit at 0.52. */
const SPAN = 0.13;

const ICONS: Record<Chip["icon"], React.ReactNode> = {
  booking: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  ),
  hosting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M6.5 18a4.5 4.5 0 0 1-.6-8.96 6 6 0 0 1 11.64-1.2A4.25 4.25 0 0 1 18 18H6.5Z"
        strokeLinejoin="round"
      />
    </svg>
  ),
  portal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 20a7.4 7.4 0 0 1 14.4 0" strokeLinecap="round" />
    </svg>
  ),
  payments: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6.5 14.5h3.5" strokeLinecap="round" />
    </svg>
  ),
  reminders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7 8.2 6 8.2-6" strokeLinejoin="round" />
    </svg>
  ),
};

/**
 * Capability pills orbiting the sculpture.
 *
 * They orbit the sculpture rather than overlapping it — small enough to
 * annotate it, never large enough to compete.
 *
 * Reveal state is written as a CSS variable from one rAF rather than React
 * state, so six chips animating costs zero re-renders.
 */
export function HeroCards() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-chip]").forEach((el) => {
        el.style.setProperty("--shown", "1");
      });
      return;
    }

    const shown = new Map<HTMLElement, number>();
    let raf = 0;

    const frame = () => {
      // Same measured progress the hero fade and rotation use, so the chips
      // cannot drift out of step with them.
      const p = heroProgress.value;

      root.querySelectorAll<HTMLElement>("[data-chip]").forEach((el) => {
        const inAt = Number(el.dataset.inAt ?? 0);
        const want = Math.min(1, Math.max(0, (p - inAt) / SPAN));

        const now = shown.get(el) ?? 0;
        const next = now + (want - now) * 0.1;
        shown.set(el, next);
        el.style.setProperty("--shown", next.toFixed(4));
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  const list = CHIPS;

  return (
    <div ref={wrap} className="ml-chips" aria-hidden="true">
      {list.map((chip) => (
        <div
          key={chip.id}
          data-chip
          data-in-at={chip.inAt}
          className="ml-chip-slot"
          style={{
            left: chip.left,
            top: chip.top,
            ["--rot" as string]: `${chip.rotY}deg`,
            ["--depth" as string]: chip.depth,
            ["--shown" as string]: 0,
          }}
        >
          <div className="ml-chip">
            <span className="ml-chip-icon">{ICONS[chip.icon]}</span>
            <span>
              <span className="ml-chip-title">{chip.title}</span>
              <span className="ml-chip-sub">{chip.sub}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
