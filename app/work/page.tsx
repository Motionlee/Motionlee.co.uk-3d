import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav3D } from "@/components/hero3d/Nav3D";
import { Footer3D } from "@/components/hero3d/Footer3D";
import { projects } from "@/lib/projects";
import "@/components/hero3d/case.css";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Six brands designed and built end to end by Motionlee — identity, website, product visuals and motion content. Self-initiated studio concept work.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <>
      <Nav3D />

      <main id="main" className="ml-case ml-index">
        <div className="ml-case-inner">
          <p className="ml-sec-eyebrow">
            <span />
            Selected work
          </p>

          <h1 className="ml-index-title">
            Six brands, built
            <span>from nothing.</span>
          </h1>

          <p className="ml-prose ml-index-lede">
            Every project below is self-initiated studio work — a brand we invented,
            designed and produced ourselves, from the wordmark to the website to the
            photography. Two of them, Élan and Apex, now have real product ranges
            behind them.
          </p>

          <p className="ml-index-note">
            <strong>Why concept work?</strong> We would rather show you what we do when
            nobody is limiting the brief than a watered-down version of someone else&rsquo;s.
            Client projects are under NDA or in progress — ask and we&rsquo;ll walk you
            through them privately.
          </p>

          <div className="ml-index-grid">
            {projects.map((p, i) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="ml-index-card">
                <span className="ml-index-shot">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 92vw, (max-width: 1180px) 46vw, 380px"
                    /* The first row is above the fold on most screens. */
                    priority={i < 2}
                  />
                </span>
                <span className="ml-index-body">
                  <span className="ml-case-more-sector">{p.sector}</span>
                  <span className="ml-index-name">{p.name}</span>
                  <span className="ml-index-strap">{p.strapline}</span>
                  <span className="ml-index-meta">
                    {p.timeline} · {p.disciplines.length} disciplines
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <aside className="ml-case-cta ml-index-cta">
            <h2>
              Like what you see?
              <span>Let&rsquo;s build yours next.</span>
            </h2>
            <a href="/#contact" className="ml-pill">
              Get a quote
              <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </main>

      <Footer3D />
    </>
  );
}
