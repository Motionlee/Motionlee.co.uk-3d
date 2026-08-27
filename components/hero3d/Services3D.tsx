"use client";

import { useRef } from "react";
import { useSectionFx } from "./useSectionFx";
import "./sections.css";

const services = [
  {
    n: "01",
    title: "Web Design",
    body: "A standalone website, designed and built for you. Mobile-first and live within days.",
    price: "From £499 one-off",
  },
  {
    n: "02",
    title: "Product Visuals",
    body: "Product and lifestyle imagery that makes what you sell impossible to scroll past.",
    price: "From £149 per pack",
  },
  {
    n: "03",
    title: "Motion Content",
    body: "Short-form video and animation for Instagram and TikTok, built to stop the scroll.",
    price: "From £199 per month",
  },
];

/** Standalone studio work — the one-off projects, not the monthly plan. */
export function Services3D() {
  const root = useRef<HTMLElement>(null);
  useSectionFx(root);

  return (
    <section
      ref={root}
      id="services"
      className="ml-sec"
      style={{ ["--ax" as string]: "88%", ["--ay" as string]: "70%" }}
    >
      <div className="ml-sec-inner">
        <header>
          <p className="ml-sec-eyebrow" data-reveal>
            <span />
            Also from the studio
          </p>
          <h2 className="ml-sec-title" data-reveal style={{ ["--d" as string]: "60ms" }}>
            Need design work
            <span>without the bookings?</span>
          </h2>
          <p className="ml-prose ml-sec-lede" data-reveal style={{ ["--d" as string]: "120ms" }}>
            We take on standalone studio work too. If you only want a website,
            or imagery and video for what you already have, these are one-off
            projects rather than a monthly plan.
          </p>
        </header>

        <div className="ml-grid-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="ml-tile ml-service"
              data-reveal
              data-spot
              style={{ ["--d" as string]: `${i * 80}ms` }}
            >
              <span className="ml-service-n">{s.n}</span>
              <h3 className="ml-service-title">{s.title}</h3>
              <p className="ml-prose ml-service-body">{s.body}</p>
              <p className="ml-service-price">{s.price}</p>
            </article>
          ))}
        </div>

        <p className="ml-sec-note" data-reveal>
          Not sure which you need? <a href="#contact">Tell us what you sell</a>{" "}
          and we&rsquo;ll say what would actually help.
        </p>
      </div>
    </section>
  );
}
