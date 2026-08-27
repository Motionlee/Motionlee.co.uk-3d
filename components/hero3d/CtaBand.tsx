"use client";

import { useRef } from "react";
import { useSectionFx } from "./useSectionFx";
import "./sections.css";

/**
 * A single ask, placed mid-page.
 *
 * Measured before writing this: there were 9.6 screens between the pricing
 * buttons and the next call to action. The fixed nav does carry a CTA
 * throughout, but relying on a 14px header to convert everyone who makes up
 * their mind in the middle of the page is not a plan.
 *
 * Deliberately short — one line and one button. A second full pitch here
 * would just rebuild the bloat this section exists to fix.
 */
export function CtaBand() {
  const root = useRef<HTMLElement>(null);
  useSectionFx(root);

  return (
    <section ref={root} className="ml-band">
      <div className="ml-band-inner" data-reveal>
        <div>
          <h2 className="ml-band-title">
            Ready when you are.
            <span>Live in five days.</span>
          </h2>
          <p className="ml-prose ml-band-note">
            £29 a month, no contract, and we set the whole thing up for you.
          </p>
        </div>
        <a href="#contact" className="ml-pill ml-band-cta">
          Get a quote
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
