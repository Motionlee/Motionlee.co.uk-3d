import { Reveal } from "./Reveal";
import { promises } from "@/lib/plans";

export function Promises() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-ink-2 py-24 sm:py-32">
      <div className="absolute -right-40 top-10 -z-10 h-[440px] w-[440px] rounded-full bg-lime/8 blur-[150px]" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-indigo-2">
              <span className="h-px w-8 bg-indigo-2" />
              How we work
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.5rem)]">
              The bit other booking apps
              <span className="block text-lime">would rather you skipped.</span>
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {promises.map((promise, i) => (
            <Reveal key={promise.title} delay={(i % 3) * 0.07}>
              <li className="border-t border-white/12 pt-6">
                <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-lime">
                  {promise.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                  {promise.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
