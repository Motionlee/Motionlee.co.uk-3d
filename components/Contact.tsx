"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const services = [
  "Website design",
  "Product visuals",
  "Motion content",
  "Managed hosting",
  "Full growth package",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
    } catch {
      setError(`We couldn't reach the server. Email us at ${site.email}.`);
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-white/25 transition-colors focus:border-lime/50 focus:bg-white/[0.05] focus:outline-none";
  const label = "eyebrow mb-2.5 block text-white/45";

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute -right-40 top-10 -z-10 h-[440px] w-[440px] rounded-full bg-indigo/22 blur-[140px]" />

      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-indigo-2">
              <span className="h-px w-8 bg-indigo-2" />
              Get in touch
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.5rem)]">
              Let&rsquo;s build something
              <span className="block text-lime">great together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-[17px] leading-relaxed text-white/55">
              Tell us about your business and what you&rsquo;re trying to
              achieve. We come back within 24 hours with ideas and a fixed
              quote — no obligation, no sales call unless you want one.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <dl className="mt-10 space-y-6 border-t border-white/10 pt-8">
              <div>
                <dt className="eyebrow text-white/40">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg font-medium text-white underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/40">Based in</dt>
                <dd className="mt-2 text-lg font-medium">{site.location}</dd>
              </div>
              <div>
                <dt className="eyebrow text-white/40">Response time</dt>
                <dd className="mt-2 text-lg font-medium">Within 24 hours</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-white/10 bg-ink-2 p-7 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">
                  Your name
                </label>
                <input id="name" name="name" required className={field} placeholder="Jane Smith" />
              </div>
              <div>
                <label className={label} htmlFor="business">
                  Business name
                </label>
                <input id="business" name="business" className={field} placeholder="Smith & Co." />
              </div>
            </div>

            <div className="mt-5">
              <label className={label} htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={field}
                placeholder="jane@smithco.co.uk"
              />
            </div>

            <div className="mt-5">
              <label className={label} htmlFor="service">
                What do you need?
              </label>
              <select id="service" name="service" required defaultValue="" className={field}>
                <option value="" disabled>
                  Select a service…
                </option>
                {services.map((s) => (
                  <option key={s} value={s} className="bg-ink-2">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className={label} htmlFor="message">
                Tell us more
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${field} resize-none`}
                placeholder="What are you selling, and who buys it?"
              />
            </div>

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="company_website">Company website</label>
              <input
                id="company_website"
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 font-semibold text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send enquiry"}
              {status !== "sending" && (
                <span className="transition-transform group-hover:translate-x-1">→</span>
              )}
            </button>

            <p aria-live="polite" className="mt-4 min-h-[20px] text-center text-sm">
              {status === "sent" && (
                <span className="text-lime">
                  Thanks — we&rsquo;ll be back to you within 24 hours.
                </span>
              )}
              {status === "error" && <span className="text-red-400">{error}</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
