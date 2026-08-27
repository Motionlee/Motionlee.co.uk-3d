"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { PLAN_PICKED } from "./enquiry";
import "./contact.css";

/**
 * The enquiry form, in the hero's language.
 *
 * Posts to the same /api/enquiry route the original form uses — rate
 * limiting, honeypot, validation and the Supabase insert all live there and
 * are unchanged. This is a restyle and a re-layout, not a new pipeline.
 *
 * The options below must stay identical to the SERVICES whitelist in
 * app/api/enquiry/route.ts. The route rejects anything not on that list, and
 * the values are written straight into the Portal-adjacent `enquiries`
 * table, so they are not ours to reword casually.
 */
const services = [
  "Bookings only",
  "Bookings + Website",
  "Website design",
  "Product visuals",
  "Motion content",
  "Managed hosting",
  "Full growth package",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";

export function Contact3D() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Controlled, so a click on a pricing card can fill it in.
  const [service, setService] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => {
      const tag = (e as CustomEvent<string>).detail;
      if (services.includes(tag)) setService(tag);
    };
    window.addEventListener(PLAN_PICKED, onPick);
    return () => window.removeEventListener(PLAN_PICKED, onPick);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) =>
        n.style.setProperty("--in", "1"),
      );
      return;
    }

    // Spotlight on the form panel, matching the pricing cards.
    let lit: HTMLElement | null = null;
    const clear = () => {
      lit?.style.setProperty("--glow", "0");
      lit = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const card = (e.target as Element).closest<HTMLElement>("[data-spot]");
      if (card !== lit) clear();
      if (!card) return;
      lit = card;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
      card.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
      card.style.setProperty("--glow", "1");
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", clear, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.setProperty("--in", "1");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));

    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", clear);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(payload.error ?? `Something went wrong. Email us at ${site.email}.`);
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
      // form.reset() cannot clear a controlled select.
      setService("");
    } catch {
      setError(`We couldn't reach the server. Email us at ${site.email}.`);
      setStatus("error");
    }
  }

  return (
    <section ref={root} id="contact" className="ml-contact">
      <div className="ml-contact-inner">
        {/* ---- left: the ask ---- */}
        <div className="ml-contact-copy">
          <p className="ml-contact-eyebrow" data-reveal>
            <span />
            Get in touch
          </p>

          <h2 className="ml-contact-title" data-reveal style={{ ["--d" as string]: "60ms" }}>
            Let&rsquo;s build something
            <span>great together.</span>
          </h2>

          <p
            className="ml-prose ml-contact-lede"
            data-reveal
            style={{ ["--d" as string]: "120ms" }}
          >
            Tell us about your business and what you&rsquo;re trying to achieve.
            We come back within 24 hours with ideas and a fixed quote — no
            obligation, no sales call unless you want one.
          </p>

          <dl className="ml-contact-facts" data-reveal style={{ ["--d" as string]: "180ms" }}>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Response time</dt>
              <dd>Within 24 hours</dd>
            </div>
          </dl>
        </div>

        {/* ---- right: the form ---- */}
        <form
          onSubmit={handleSubmit}
          className="ml-contact-form"
          data-reveal
          data-spot
          style={{ ["--d" as string]: "100ms" }}
        >
          <div className="ml-field-row">
            <p className="ml-field">
              <label htmlFor="c-name">Your name</label>
              <input id="c-name" name="name" required placeholder="Jane Smith" />
            </p>
            <p className="ml-field">
              <label htmlFor="c-business">Business name</label>
              <input id="c-business" name="business" placeholder="Smith &amp; Co." />
            </p>
          </div>

          <p className="ml-field">
            <label htmlFor="c-email">Email address</label>
            <input
              id="c-email"
              name="email"
              type="email"
              required
              placeholder="jane@smithco.co.uk"
            />
          </p>

          <p className="ml-field">
            <label htmlFor="c-service">What do you need?</label>
            <select
              id="c-service"
              name="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="" disabled>
                Select a service…
              </option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </p>

          <p className="ml-field">
            <label htmlFor="c-message">Tell us more</label>
            <textarea
              id="c-message"
              name="message"
              rows={4}
              placeholder="What are you selling, and who buys it?"
            />
          </p>

          {/* Honeypot — hidden from people, irresistible to bots. */}
          <div aria-hidden="true" className="ml-honeypot">
            <label htmlFor="c-company-website">Company website</label>
            <input
              id="c-company-website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <button type="submit" className="ml-pill ml-contact-send" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send enquiry"}
            {status !== "sending" && <span aria-hidden="true">↗</span>}
          </button>

          <p aria-live="polite" className="ml-contact-status">
            {status === "sent" && (
              <span className="is-ok">Thanks — we&rsquo;ll be back to you within 24 hours.</span>
            )}
            {status === "error" && <span className="is-bad">{error}</span>}
          </p>
        </form>
      </div>
    </section>
  );
}
