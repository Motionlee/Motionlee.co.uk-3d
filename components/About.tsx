import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const facts = [
  { value: "2", label: "People, no middlemen" },
  { value: "0%", label: "Cut of your takings" },
  { value: "£0", label: "Setup cost" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b border-white/8 py-24 sm:py-32">
      <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-indigo/18 blur-[140px]" />

      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-ink-2 sm:aspect-[4/3] lg:aspect-[4/5]">
            <div className="grid-bg absolute inset-0 opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo/25 via-transparent to-lime/8" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <p className="eyebrow text-white/40">Based in</p>
              <div>
                <p className="display text-[clamp(2rem,5vw,3rem)]">
                  Stoke-
                  <br />
                  on-Trent
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
                  Working with businesses across Staffordshire, Cheshire and the
                  rest of the UK.
                </p>
                <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-lime" />
                  <span className="eyebrow text-lime">53.0027° N, 2.1794° W</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-indigo-2">
              <span className="h-px w-8 bg-indigo-2" />
              About us
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.5rem)]">
              Built by two people who
              <span className="text-lime"> answer the phone.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-white/60">
              <p>
                Motionlee is {site.founders}, working out of Stoke-on-Trent.
                We kept watching good local businesses hand over a slice of
                every booking to software built by people who had never met
                them.
              </p>
              <p>
                So we built the alternative and we set it up for you. No
                per-booking cut, no contract, and your Stripe account and your
                website stay yours. When something needs changing, you message
                the two people who built it — not a support queue.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold tracking-tight text-lime">
                      {f.value}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-snug text-white/45">
                      {f.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
