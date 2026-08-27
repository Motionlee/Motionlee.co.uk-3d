"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { promises } from "@/lib/plans";
import "./promise-rail.css";

/**
 * The differentiators, as a horizontal rail.
 *
 * Framer's gallery pattern: heading and controls on one row, then a track of
 * cards that slides sideways and bleeds off the right edge so it reads as a
 * set you can move through rather than a grid that happens to be cut off.
 *
 * Movement is native overflow scrolling with snap points, so a trackpad,
 * touch and shift-wheel all work for free; the arrows drive the same
 * scrollLeft rather than a parallel animation of their own. That is the
 * whole reason there is no transform-based carousel here — two systems
 * moving the same track always drift apart eventually.
 */
export function PromiseRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // 2px of slack: sub-pixel layout means scrollLeft rarely lands exactly on
    // the maximum, which would leave the forward arrow enabled forever.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // A card that is flicked past faster than the observer can register it
  // stays hidden for good — measured on a phone, where the rail shows one
  // card at a time: a swipe to the end left card 03 invisible and card 04
  // still hidden while on screen. Once the rail has been moved at all, the
  // visitor has engaged with it and nothing in it should be able to hide.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    // Gated on real movement: a mandatory snap container emits scroll events
    // during layout without actually moving, and firing on those revealed
    // every card the moment the section arrived, killing the stagger.
    const origin = el.scrollLeft;
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - origin) < 24) return;
      el.querySelectorAll<HTMLElement>("[data-card]").forEach((c) =>
        c.style.setProperty("--in", "1"),
      );
      el.removeEventListener("scroll", onScroll);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Touch has no hover, so the card the rail has settled on is lit instead.
  // Nearest to the rail's centre rather than "first fully visible", because
  // at 86vw a card is centred long before the next one is fully in view.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    if (window.matchMedia("(hover: hover)").matches) return;

    const mark = () => {
      const box = el.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      const cards = [...el.querySelectorAll<HTMLElement>("[data-card]")];
      let closest: HTMLElement | null = null;
      let best = Infinity;
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < best) {
          best = d;
          closest = c;
        }
      }
      for (const c of cards) c.toggleAttribute("data-active", c === closest);
    };

    mark();
    el.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("resize", mark);
    return () => {
      el.removeEventListener("scroll", mark);
      window.removeEventListener("resize", mark);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    // Step by an actual card rather than a fixed pixel count, so the snap
    // points still line up when the card width changes with the viewport.
    const card = el.querySelector<HTMLElement>("[data-card]");
    const stride = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: stride * dir, behavior: "smooth" });
  };

  return (
    <div className="ml-rail-wrap">
      <div className="ml-rail-head">
        <div>
          <p className="ml-sec-eyebrow" data-reveal>
            <span />
            Why people stay
          </p>
          <h3 className="ml-rail-title" data-reveal style={{ ["--d" as string]: "70ms" }}>
            Five things nobody else
            <span>will put in writing.</span>
          </h3>
        </div>

        <div className="ml-rail-nav">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Previous"
          >
            ←
          </button>
          <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="Next">
            →
          </button>
        </div>
      </div>

      <div
        ref={rail}
        className="ml-rail"
        tabIndex={0}
        role="group"
        aria-label="What makes Motionlee different — scroll sideways"
      >
        {promises.map((p, i) => (
          <article
            className="ml-rail-card"
            data-card
            data-reveal
            key={p.title}
            style={{ ["--d" as string]: `${i * 90}ms` }}
          >
            <div className="ml-rail-shot">
              {/* Illustrative, not evidence. These are generated scenes of the
                  kind of business we build for — not photographs of real
                  clients — so they carry no name, quote or attribution. */}
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(max-width: 620px) 86vw, (max-width: 1100px) 46vw, 30vw"
              />
              <span className="ml-rail-no">{String(i + 1).padStart(2, "0")}</span>
            </div>

            <div className="ml-rail-body">
              <h4 className="ml-rail-card-title">{p.title}</h4>
              <p className="ml-prose ml-rail-card-text">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
