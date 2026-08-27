"use client";

import { useEffect, useRef } from "react";
import { plans } from "@/lib/plans";
import { PromiseRail } from "./PromiseRail";
import { announcePlan } from "./enquiry";
import "./proposition.css";

/**
 * The sales argument, immediately after the hero.
 *
 * The hero is pure impact — a sculpture and almost no words. That only works
 * if the pitch lands the moment someone scrolls, so this section does the job
 * the headline used to: what it is, what it costs, and the promises that
 * actually differentiate it.
 *
 * Two behaviours are wired here, both position- or pointer-driven and neither
 * touching React state: the section's entrance (it wipes in from the left
 * across the hero) and a spotlight that tracks the cursor across each card.
 */

const Tick = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="m3.4 8.4 3 3 6.2-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Proposition() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) =>
        n.style.setProperty("--in", "1"),
      );
      el.style.setProperty("--enter", "1");
      el.style.setProperty("--hold", "0px");
    }

    // --- entrance: wipes in from the left over the hero ------------------
    // Position-driven, never time-driven, so it reverses exactly on the way
    // back up and cannot desync from the hero's exit.
    let raf = 0;
    if (!reduced) {
      const enterFrame = () => {
        // offsetTop, not getBoundingClientRect: the rect is the *transformed*
        // box, so reading it here would feed this element's own translate
        // back into the input and the section would chase itself.
        const past = window.scrollY - el.offsetTop;
        const lead = window.innerHeight * 0.44;

        const t = Math.min(1, Math.max(0, past / lead));
        // Ease out, so it decelerates into place instead of stopping dead
        // against the edge of the screen.
        el.style.setProperty("--enter", (1 - Math.pow(1 - t, 3)).toFixed(4));

        // Cancel the section's own vertical scroll for the length of the
        // wipe. Without this it slides in and rides upward at the same time,
        // which reads as a diagonal drift rather than a wipe. Held
        // afterwards, and the matching margin-bottom returns that offset to
        // the layout.
        el.style.setProperty(
          "--hold",
          `${Math.min(Math.max(past, 0), lead).toFixed(1)}px`,
        );

        raf = requestAnimationFrame(enterFrame);
      };
      raf = requestAnimationFrame(enterFrame);
    }

    // --- spotlight: a light that follows the cursor across a card ---------
    // One delegated listener rather than two per card, and it writes custom
    // properties the card's own gradient reads — so the highlight costs no
    // re-render and no extra element per hover.
    let lit: HTMLElement | null = null;
    const clear = () => {
      lit?.style.setProperty("--glow", "0");
      lit = null;
    };
    const onMove = (e: PointerEvent) => {
      // Coarse pointers have no hover state; a "spotlight" that only appears
      // where you already tapped is noise.
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
    if (!reduced) {
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", clear, { passive: true });
    }

    if (reduced) {
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", clear);
      };
    }

    // IntersectionObserver rather than a scroll loop: the content below is a
    // static layout, so it only needs to know when each row has arrived, not
    // where the page is on every frame.
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

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", clear);
    };
  }, []);

  return (
    <section ref={root} id="pricing" className="ml-prop">
      <div className="ml-prop-inner">
        <header className="ml-prop-head" data-reveal>
          <p className="ml-prop-eyebrow">
            <span />
            What we do
          </p>
          <h2 className="ml-prop-title">
            Bookings and websites
            <span>for small businesses.</span>
          </h2>
          <p className="ml-prose ml-prop-lede">
            Your customers pay no booking fee. Card payments run through your
            own Stripe, so the money goes straight to your bank — never through
            us. No contract, cancel any time.
          </p>
        </header>

        {/* Plans */}
        <div className="ml-prop-plans">
          {plans.map((plan, i) => (
            <article
              key={plan.id}
              className={`ml-prop-plan${plan.featured ? " is-featured" : ""}`}
              data-reveal
              data-spot
              style={{ ["--d" as string]: `${i * 90}ms` }}
            >
              {plan.featured && <span className="ml-prop-flag">Most popular</span>}

              <p className="ml-label ml-prop-tag">{plan.tag}</p>

              <p className="ml-prop-price">
                {plan.price}
                <span>{plan.unit}</span>
              </p>

              <p className="ml-prose ml-prop-pitch">{plan.pitch}</p>

              <ul className="ml-prop-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <Tick />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`ml-prop-cta ${plan.featured ? "ml-pill" : "ml-ghost"}`}
                onClick={() => announcePlan(plan.tag)}
              >
                Get started
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        {/* The differentiators — the part that actually wins the sale */}
        <PromiseRail />

      </div>
    </section>
  );
}
