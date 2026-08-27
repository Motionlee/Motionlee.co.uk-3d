import Link from "next/link";
import { projects } from "@/lib/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { WorkCard } from "./WorkCard";

export function WorkShowcase() {
  const featured = projects.slice(0, 4);

  return (
    <section id="work" className="border-b border-white/8 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Designed to inspire."
          accent="Built to convert."
          body="Six brands built end to end — identity, website, imagery and motion. Each one is a studio concept: a brand we invented, designed and produced ourselves to prove what the work can do."
        />

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <WorkCard project={project} priority={i < 2} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/18 px-7 py-4 font-semibold transition-colors hover:border-white/40 hover:bg-white/5"
            >
              View all six projects
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
