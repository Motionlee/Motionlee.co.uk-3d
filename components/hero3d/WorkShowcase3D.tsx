"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { useSectionFx } from "./useSectionFx";
import "./work.css";

/**
 * Selected work, as a scroll-driven conveyor.
 *
 * The section is tall; its inner frame is sticky. Vertical scroll inside that
 * range moves the cards horizontally, so one concept holds the centre, slides
 * left and clears as the next arrives. Same copy and content as the flat
 * version on the home page — restaged to match the hero's language rather
 * than sitting under it as a plain grid.
 *
 * Position drives everything (never time), so it reverses exactly on the way
 * back up, and one rAF writes CSS variables rather than React state.
 */
export function WorkShowcase3D() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useSectionFx(section);

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.style.setProperty("--p", "0");
      return;
    }

    let raf = 0;
    let eased = 0;

    const frame = () => {
      const rect = root.getBoundingClientRect();
      // How far through the section's scroll range we are, 0-1. Measured from
      // the element rather than absolute scrollY so the section can sit
      // anywhere on the page without recalibration.
      const travel = root.offsetHeight - window.innerHeight;
      const raw = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;

      eased += (raw - eased) * 0.09;
      // On the section, not the rail. The heading and the progress bar are
      // siblings of the track, so a --p set on the track never reached them —
      // they were silently reading the 0 fallback and never animating.
      root.style.setProperty("--p", eased.toFixed(4));

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  /* Three, not six. The full section was 5.3 screens — 38% of the page — for
     work the footer itself labels as self-initiated concept work. These
     three are a salon, a barbershop and a detailer, which is precisely who
     buys booking software; the other three (brewery, estates, restaurant)
     make a weaker case to that reader. All six still live on /work. */
  const shown = projects.slice(0, 3);
  const count = shown.length;

  return (
    <section
      ref={section}
      id="work"
      className="ml-work"
      style={{ height: `${count * 90 + 60}vh` }}
    >
      <div className="ml-work-pin">
        <div className="ml-work-head">
          <div className="ml-work-head-row">
            <p className="ml-work-eyebrow" data-reveal>
              <span />
              Selected work
            </p>

            {/* Sits up here rather than bottom-right, where it landed on top
                of the last card's strapline and the scroll meter. */}
            <a href="/work" className="ml-work-all" data-reveal style={{ ["--d" as string]: "140ms" }}>
              See all six concepts
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <h2 className="ml-work-title" data-reveal style={{ ["--d" as string]: "70ms" }}>
            Designed to inspire.
            <span>Built to convert.</span>
          </h2>
          <p className="ml-work-lede" data-reveal style={{ ["--d" as string]: "130ms" }}>
            Six brands built end to end — identity, website, imagery and motion.
            Each one is a studio concept: a brand we invented, designed and
            produced ourselves to prove what the work can do.
          </p>
        </div>

        <div className="ml-work-rail-in" data-reveal style={{ ["--d" as string]: "180ms" }}>
        <div
          ref={track}
          className="ml-work-track"
          style={{ ["--count" as string]: count }}
        >
          {shown.map((p, i) => (
            <article
              key={p.slug}
              className="ml-work-card"
              style={{ ["--i" as string]: i }}
            >
              <div className="ml-work-shot">
                {/* next/image rather than a CSS background. A background-image
                    on an element already in the DOM is fetched eagerly, so
                    these three shots — 949KB between them — were downloading
                    on first paint for a section 43% down the page. */}
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 86vw, 42vw"
                  quality={82}
                />
                <span className="ml-work-badge">Studio Concept</span>
                <div className="ml-work-shot-fade" />
              </div>

              <div className="ml-work-body">
                <p className="ml-work-sector">{p.sector}</p>
                <h3 className="ml-work-name">{p.name}</h3>
                <p className="ml-work-strap">{p.strapline}</p>
              </div>

              <span className="ml-work-index">
                {String(i + 1).padStart(2, "0")}
                <i>/ {String(count).padStart(2, "0")}</i>
              </span>
            </article>
          ))}
        </div>
        </div>

        <div className="ml-work-progress" aria-hidden="true">
          <span />
        </div>

      </div>
    </section>
  );
}
