"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-in reveal.
 *
 * Reveals on a plain scroll/resize check rather than framer-motion's
 * `whileInView`. That prop — and a hand-rolled IntersectionObserver — both
 * left content stranded at opacity 0 when the page loaded already scrolled,
 * which is what happens on a hash deep-link like `/#pricing` from the nav.
 *
 * Content that never appears is a far worse failure than an animation that
 * doesn't play, so every path here errs toward showing:
 *
 *   - checked once on mount, so anything already on screen shows immediately
 *   - re-checked on scroll and resize, throttled to one rAF
 *   - listeners removed after the element has shown (once semantics)
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let done = false;

    const check = () => {
      frame = 0;
      if (done || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const visible = rect.top < window.innerHeight - 80 && rect.bottom > 0;
      if (visible) {
        done = true;
        setShown(true);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };

    const schedule = () => {
      if (frame || done) return;
      frame = requestAnimationFrame(check);
    };

    check();

    if (!done) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }

    return () => {
      done = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      data-reveal={shown ? "shown" : "hidden"}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
