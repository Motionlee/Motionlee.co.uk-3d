import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function WorkCard({
  project,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-2"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} — ${project.sector} brand and website design by Motionlee`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

        {project.kind === "concept" && (
          <span className="eyebrow absolute left-4 top-4 rounded-full border border-white/25 bg-ink/70 px-3 py-1.5 text-white/80 backdrop-blur-sm">
            Studio Concept
          </span>
        )}
      </div>

      <div className="relative -mt-16 p-6 sm:p-7">
        <p className="eyebrow text-lime">{project.sector}</p>
        <h3 className="display mt-2.5 text-3xl sm:text-4xl">{project.name}</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
          {project.summary}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.disciplines.map((d) => (
            <span
              key={d}
              className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/55"
            >
              {d}
            </span>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
          View project
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
