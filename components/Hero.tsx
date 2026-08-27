"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnchorLink } from "@/components/AnchorLink";

const stats = [
  { value: "£29", label: "Bookings, per month" },
  { value: "0%", label: "Booking fee, ever" },
  { value: "£0", label: "Setup cost" },
  { value: "None", label: "Contract or tie-in" },
];

const line = {
  hidden: { opacity: 0, y: "0.4em" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="noise relative isolate overflow-hidden pt-[72px]">
      {/* atmospheric wash */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -left-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-indigo/25 blur-[130px]" />
      <div className="absolute -right-32 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-lime/8 blur-[130px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto flex min-h-[calc(100svh-72px)] max-w-[1240px] flex-col justify-center px-5 py-16 sm:px-8 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-7 flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-lime"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          Bookings &amp; websites · Stoke-on-Trent
        </motion.p>

        <h1 className="display text-[clamp(2.5rem,9vw,6.75rem)]">
          {["Take bookings.", "Keep every penny"].map((text, i) => (
            <motion.span
              key={text}
              custom={i}
              variants={line}
              initial="hidden"
              animate="show"
              className="block"
            >
              {text}
            </motion.span>
          ))}
          <motion.span
            custom={2}
            variants={line}
            initial="hidden"
            animate="show"
            className="outline-text block"
          >
            of them.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-lg"
        >
          A booking page, a diary and a website for barbers, salons and small
          shops in Stoke-on-Trent. Your customers pay no booking fee, the money
          goes straight to your own Stripe, and there is no contract. From
          £29 a month, set up for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <AnchorLink
            href="/#pricing"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            See plans &amp; pricing
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </AnchorLink>
          <AnchorLink
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            Talk to us
          </AnchorLink>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold tracking-tight text-lime">
                  {s.value}
                </span>
                <span className="mt-1 block text-[13px] text-white/45">{s.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
