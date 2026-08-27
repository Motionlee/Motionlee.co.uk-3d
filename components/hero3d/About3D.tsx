"use client";

import { useRef } from "react";
import { site } from "@/lib/site";
import { useSectionFx } from "./useSectionFx";
import "./sections.css";

const facts = [
  { value: "2", label: "People, no middlemen" },
  { value: "0%", label: "Cut of your takings" },
  { value: "£0", label: "Setup cost" },
];

/** Who is actually behind this. The two-people fact is the whole argument. */
export function About3D() {
  const root = useRef<HTMLElement>(null);
  useSectionFx(root);

  return (
    <section
      ref={root}
      id="about"
      className="ml-sec"
      style={{ ["--ax" as string]: "8%", ["--ay" as string]: "40%" }}
    >
      <div className="ml-sec-inner ml-about-grid">
        <div className="ml-about-card ml-tile" data-reveal data-spot>
          <p className="ml-sec-eyebrow">
            <span />
            The studio
          </p>
          <p className="ml-about-mark">Motionlee</p>
          <p className="ml-prose ml-about-card-body">
            A two-person design studio in {site.location}, building the booking
            software we wanted our own clients to have.
          </p>
          <p className="ml-about-badge">
            <span aria-hidden="true" />
            Taking on new clients
          </p>
        </div>

        <div className="ml-about-copy">
          <p className="ml-sec-eyebrow" data-reveal>
            <span />
            About us
          </p>
          <h2 className="ml-sec-title" data-reveal style={{ ["--d" as string]: "60ms" }}>
            Built by two people
            <span>who answer the phone.</span>
          </h2>

          <div className="ml-about-prose" data-reveal style={{ ["--d" as string]: "120ms" }}>
            <p className="ml-prose">
              Motionlee is {site.founders}, working out of {site.location}. We
              kept watching good local businesses hand over a slice of every
              booking to software built by people who had never met them.
            </p>
            <p className="ml-prose">
              So we built the alternative and we set it up for you. No
              per-booking cut, no contract, and your Stripe account and your
              website stay yours. When something needs changing, you message the
              two people who built it — not a support queue.
            </p>
          </div>

          <dl className="ml-about-facts" data-reveal style={{ ["--d" as string]: "180ms" }}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="ml-about-fact-value">{f.value}</span>
                  <span className="ml-about-fact-label">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
