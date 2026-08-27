import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Six brands designed and built end to end by Motionlee — identity, website, product visuals and motion content. Self-initiated studio concept work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden border-b border-white/8 pt-[132px] pb-20 sm:pt-[168px] sm:pb-24">
          <div className="grid-bg absolute inset-0 -z-10 opacity-50" />
          <div className="absolute -left-32 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-indigo/22 blur-[130px]" />

          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-indigo-2">
                <span className="h-px w-8 bg-indigo-2" />
                Selected work
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display mt-6 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)]">
                Six brands, built
                <span className="block text-lime">from nothing.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-white/60 sm:text-lg">
                Every project below is self-initiated studio work — a brand we
                invented, designed and produced ourselves, from the wordmark to
                the website to the photography. Two of them, Élan and Apex, now
                have real product ranges behind them.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-2xl rounded-xl border border-white/10 bg-white/[0.03] p-5 text-[15px] leading-relaxed text-white/50">
                <strong className="font-semibold text-white/75">
                  Why concept work?
                </strong>{" "}
                We would rather show you what we do when nobody is limiting the
                brief than show you a watered-down version of someone
                else&rsquo;s. Client projects are covered by NDA or in progress
                — ask and we&rsquo;ll walk you through them privately.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, i) => (
                <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                  <WorkCard project={project} priority={i < 2} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
