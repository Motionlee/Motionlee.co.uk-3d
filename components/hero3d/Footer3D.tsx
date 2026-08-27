"use client";

import { useRef } from "react";
import { Mark } from "./Mark";
import { useSectionFx } from "./useSectionFx";
import { site } from "@/lib/site";
import { legalDocs } from "@/lib/legal";
import "./sections.css";

const columns = [
  {
    title: "Product",
    links: [
      { label: "What you get", href: "/#pricing" },
      { label: "Pricing", href: "/#pricing" },
      { label: "How it works", href: "/#process" },
      { label: "Design services", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Work", href: "/#work" },
      { label: "About Us", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export function Footer3D() {
  const root = useRef<HTMLElement>(null);
  useSectionFx(root);

  return (
    <footer className="ml-footer" ref={root}>
      <div className="ml-footer-inner">
        <div className="ml-footer-grid">
          <div className="ml-footer-brand" data-reveal>
            <a href="/#hero" className="ml-footer-logo">
              <Mark className="h-9 w-9 text-white" />
              <span>MOTIONLEE</span>
            </a>
            <p className="ml-prose ml-footer-blurb">
              Design studio for businesses that mean business.
            </p>
            <p className="ml-footer-place">{site.location}</p>
          </div>

          {columns.map((col, i) => (
            <nav
              className="ml-footer-col"
              key={col.title}
              aria-label={col.title}
              data-reveal
              style={{ ["--d" as string]: `${(i + 1) * 80}ms` }}
            >
              <p className="ml-label">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="ml-footer-col" data-reveal style={{ ["--d" as string]: "240ms" }}>
            <p className="ml-label">Get in touch</p>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                {/* Opens the Portal, which is a separate app on its own
                    domain — hence the explicit rel, not a bare target. */}
                <a href={site.portal} target="_blank" rel="noreferrer noopener">
                  Client Portal ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ml-footer-base" data-reveal style={{ ["--d" as string]: "300ms" }}>
          <p>© {new Date().getFullYear()} Motionlee Studio · {site.location}</p>

          {/* A privacy policy has to be reachable from every page to be worth
              having. On the previous site these opened as a JavaScript overlay,
              so they could not be linked to or indexed. */}
          <nav className="ml-footer-legal" aria-label="Legal">
            {legalDocs.map(d => (
              <a key={d.slug} href={`/legal/${d.slug}`}>
                {d.title}
              </a>
            ))}
          </nav>

          <p>Portfolio shown is self-initiated studio concept work.</p>
        </div>
      </div>
    </footer>
  );
}
