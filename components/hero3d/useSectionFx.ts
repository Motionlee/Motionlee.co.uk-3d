"use client";

import { useEffect, type RefObject } from "react";

/**
 * The two behaviours every section on this page shares.
 *
 * `[data-reveal]` elements fade up once when they arrive, driven by an
 * IntersectionObserver writing a --in custom property. `[data-spot]` panels
 * get a light that tracks the cursor, written as --mx/--my/--glow.
 *
 * Both are CSS-variable contracts rather than React state, so a section with
 * twenty revealing elements costs zero re-renders. Extracted here because it
 * was about to be copy-pasted into eight components, and a spotlight that
 * drifts out of sync between sections looks like a bug.
 */
export function useSectionFx(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) =>
        n.style.setProperty("--in", "1"),
      );
      return;
    }

    // --- spotlight ------------------------------------------------------
    let lit: HTMLElement | null = null;
    const clear = () => {
      lit?.style.setProperty("--glow", "0");
      lit = null;
    };
    const onMove = (e: PointerEvent) => {
      // Coarse pointers have no hover state; a light that only appears where
      // you already tapped is noise.
      if (e.pointerType === "touch") return;
      const card = (e.target as Element).closest<HTMLElement>("[data-spot]");
      if (card !== lit) clear();
      if (!card) return;
      lit = card;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
      card.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
      card.style.setProperty("--glow", "1");
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", clear, { passive: true });

    // --- reveal ---------------------------------------------------------
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.setProperty("--in", "1");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));

    // The rootMargin above pulls the trigger line 12% up from the bottom of
    // the viewport, which reads better mid-page but strands anything that
    // comes to rest below that line with no scroll left to lift it — the
    // footer's bottom bar never appeared at all. Once the page cannot scroll
    // any further, reveal whatever is still waiting.
    const sweep = () => {
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight < doc.scrollHeight - 2) return;
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => {
        n.style.setProperty("--in", "1");
        io.unobserve(n);
      });
      window.removeEventListener("scroll", sweep);
    };
    window.addEventListener("scroll", sweep, { passive: true });
    sweep();

    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", clear);
      window.removeEventListener("scroll", sweep);
    };
  }, [ref]);
}
