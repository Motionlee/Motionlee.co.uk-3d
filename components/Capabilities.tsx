import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { capabilities } from "@/lib/plans";

export function Capabilities() {
  return (
    <section id="features" className="border-b border-white/8 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="What you get"
          title="Everything a small shop"
          accent="actually needs."
          body="No modules to buy, no tiers hiding the useful parts. This is the whole product, and every bit of it is built and working today."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.06}>
              <article className="group h-full bg-ink p-7 transition-colors duration-500 hover:bg-ink-2">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-white/40">
            Reminders and confirmations are sent by email, with no per-message
            charge and no limit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
