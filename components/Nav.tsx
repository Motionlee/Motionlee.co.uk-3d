"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";
import { AnchorLink } from "@/components/AnchorLink";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/8 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Motionlee home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {item.label}
            </AnchorLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AnchorLink
            href="/#contact"
            className="hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Get a Quote
          </AnchorLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/8 bg-ink lg:hidden"
      >
        <nav className="mx-auto max-w-[1240px] px-5 py-6 sm:px-8" aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <AnchorLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/8 py-4 font-display text-2xl font-bold tracking-tight"
                >
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
          <AnchorLink
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-lime px-6 py-3.5 text-center font-semibold text-ink"
          >
            Get a Quote
          </AnchorLink>
        </nav>
      </div>
    </header>
  );
}
