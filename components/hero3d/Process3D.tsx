"use client";

import { useRef } from "react";
import { useSectionFx } from "./useSectionFx";
import "./sections.css";

const steps = [
  {
    n: "01",
    title: "Tell us about the business",
    body: "A short call or a filled-in form. We want to know who buys from you and what stops them.",
    meta: "Day 0",
  },
  {
    n: "02",
    title: "We design the first pass",
    body: "You see a real page in your browser, not a flat mockup. Two rounds of revisions are included.",
    meta: "Day 1–3",
  },
  {
    n: "03",
    title: "Build, test, launch",
    body: "Mobile, speed and SEO checked before anything goes live. Domain and hosting handled for you.",
    meta: "Day 4–5",
  },
  {
    n: "04",
    title: "Looked after",
    body: "Managed hosting, monitoring and content updates through your own client portal.",
    meta: "Ongoing",
  },
];

/** How it works — four steps, with the timeline stated rather than implied. */
export function Process3D() {
  const root = useRef<HTMLElement>(null);
  useSectionFx(root);

  return (
    <section
      ref={root}
      id="process"
      className="ml-sec"
      style={{ ["--ax" as string]: "12%", ["--ay" as string]: "20%" }}
    >
      <div className="ml-sec-inner">
        <header>
          <p className="ml-sec-eyebrow" data-reveal>
            <span />
            How it works
          </p>
          <h2 className="ml-sec-title" data-reveal style={{ ["--d" as string]: "60ms" }}>
            Live in five days.
            <span>No agency theatre.</span>
          </h2>
          <p className="ml-prose ml-sec-lede" data-reveal style={{ ["--d" as string]: "120ms" }}>
            No lengthy discovery phase, no 40-page proposal, no account manager
            relaying messages. You talk to the people doing the work.
          </p>
        </header>

        <ol className="ml-grid-4 ml-steps">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="ml-tile ml-step"
              data-reveal
              data-spot
              style={{ ["--d" as string]: `${i * 80}ms` }}
            >
              <p className="ml-step-top">
                <span className="ml-step-n">{s.n}</span>
                <span className="ml-step-meta">{s.meta}</span>
              </p>
              <h3 className="ml-tile-title ml-step-title">{s.title}</h3>
              <p className="ml-prose ml-tile-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
