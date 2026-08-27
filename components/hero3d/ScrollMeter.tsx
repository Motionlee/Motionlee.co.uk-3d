"use client";

import { useEffect, useRef } from "react";
import "./scroll-meter.css";

/**
 * Scroll position readout.
 *
 * Doubles as a design tool: it gives a shared coordinate to point at, so
 * feedback can be "the card is wrong at 38%" rather than "somewhere after the
 * hero". Sections are labelled for the same reason — the percentage alone
 * doesn't say where you are once the page grows.
 *
 * Updated from one rAF writing directly to the DOM, not React state, so it
 * costs nothing per frame no matter how long the page gets.
 */

type Marker = { id: string; label: string };

const MARKERS: Marker[] = [
  { id: "hero", label: "Hero" },
  { id: "work", label: "Work" },
];

export function ScrollMeter() {
  const value = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let lastPct = -1;
    let lastLabel = "";

    const frame = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;

      // Only touch the DOM when the rounded value actually changes — this
      // runs every frame, and text writes are the expensive part.
      if (pct !== lastPct) {
        lastPct = pct;
        if (value.current) value.current.textContent = String(pct);
        if (fill.current) fill.current.style.transform = `scaleY(${pct / 100})`;
      }

      // Whichever labelled section currently covers the viewport middle.
      const mid = window.innerHeight / 2;
      let current = "";
      for (const m of MARKERS) {
        const el = document.getElementById(m.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) current = m.label;
      }
      if (current !== lastLabel) {
        lastLabel = current;
        if (label.current) label.current.textContent = current;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    // Decorative: assistive tech already conveys scroll position, and a value
    // updating every frame would be noise rather than help.
    <div className="ml-meter" aria-hidden="true">
      <span className="ml-meter-rail">
        <span ref={fill} className="ml-meter-fill" />
      </span>
      <span className="ml-meter-read">
        <span ref={value} className="ml-meter-num">0</span>
        <span className="ml-meter-pct">%</span>
      </span>
      <span ref={label} className="ml-meter-label" />
    </div>
  );
}
