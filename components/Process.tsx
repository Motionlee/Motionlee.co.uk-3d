import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Tell us about the business",
    body: "A short call or a filled-in form. We want to know who buys from you and what stops them.",
    meta: "Day 0",
  },
  {
    n: "02",
    title: "We design the first pass",
    body: "You see a real page in your browser, not a flat mockup. Two rounds of revisions are included.",
    meta: "Day 1–3",
  },
  {
    n: "03",
    title: "Build, test, launch",
    body: "Mobile, speed and SEO checked before anything goes live. Domain and hosting handled for you.",
    meta: "Day 4–5",
  },
  {
    n: "04",
    title: "Looked after",
    body: "Managed hosting, monitoring and content updates through your own client portal.",
    meta: "Ongoing",
  },
];

export function Process() {
  return (
    <section className="border-b border-white/8 bg-ink-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Live in five days."
          accent="No agency theatre."
          body="No lengthy discovery phase, no 40-page proposal, no account manager relaying messages. You talk to the people doing the work."
        />

        <ol className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <li className="relative h-full rounded-2xl border border-white/10 bg-ink p-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-2xl font-bold text-lime">{s.n}</span>
                  <span className="eyebrow text-white/35">{s.meta}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
