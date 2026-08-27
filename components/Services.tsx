import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { AnchorLink } from "@/components/AnchorLink";

/**
 * Secondary offer. The booking product leads the page; this is the studio
 * work we also take on, presented as a compact strip rather than a second
 * pricing ladder competing with the plans above.
 */
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

export function Services() {
  return (
    <section id="services" className="border-b border-white/8 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Also from the studio"
          title="Need design work"
          accent="without the bookings?"
          body="We take on standalone studio work too. If you only want a website, or imagery and video for what you already have, these are one-off projects rather than a monthly plan."
        />

        <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-2 p-7 transition-colors duration-500 hover:border-lime/35">
                <span className="font-display text-4xl font-bold tracking-tight text-white/12 transition-colors duration-500 group-hover:text-lime/30">
                  {s.n}
                </span>
                <h3 className="display mt-5 text-2xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/55">
                  {s.body}
                </p>
                <p className="mt-6 border-t border-white/10 pt-5 text-sm font-medium text-lime">
                  {s.price}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-white/40">
            Taking bookings as well?{" "}
            <AnchorLink
              href="/#pricing"
              className="font-medium text-white/70 underline underline-offset-4 hover:text-lime"
            >
              Bookings + Website is £45 a month
            </AnchorLink>{" "}
            and includes the build.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
