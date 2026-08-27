"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "./Mark";
import "./sections.css";

const links = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
];

/**
 * Fixed nav: invisible over the hero, glass once past it.
 *
 * The hero used to carry its own header, which was fine while this page was
 * one screen — but with eight sections the CTA has to stay reachable, so it
 * moved out here and the hero's copy was removed to avoid two logos fading
 * past each other.
 *
 * The scrolled state is a floating translucent island, not an opaque bar. A
 * full-width dark bar ruled a line straight across the sculpture; this keeps
 * the render visible underneath and lets the controls sit on top of it.
 */
export function Nav3D() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Threshold well inside the hero, so it cannot flicker between states
    // while a scroll is settling near the boundary.
    const onScroll = () => setStuck(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu — an overlay with no keyboard exit is a trap for
  // anyone not using a mouse.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`ml-nav${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
      {/* One shell around the bar and the panel, so the glass is a single
          floating object and an open mobile menu is part of it rather than a
          second surface beneath it. */}
      <div className="ml-nav-shell">
        <div className="ml-nav-bar">
          <a href="/#hero" className="ml-nav-logo" aria-label="Motionlee home">
            <Mark className="h-9 w-9 text-white" />
            <span>MOTIONLEE</span>
          </a>

          <nav className="ml-nav-links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-nav-right">
            <a href="/#contact" className="ml-pill ml-nav-cta">
              Get a quote
              <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              className="ml-nav-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="ml-nav-panel"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className="ml-nav-panel" id="ml-nav-panel" ref={panel} hidden={!open}>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="/#contact" className="ml-pill ml-nav-panel-cta" onClick={() => setOpen(false)}>
            Get a quote
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
