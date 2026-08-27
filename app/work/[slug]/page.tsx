import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav3D } from "@/components/hero3d/Nav3D";
import { Footer3D } from "@/components/hero3d/Footer3D";
import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";
import "@/components/hero3d/case.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — ${project.sector}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { images: [{ url: project.image }] },
  };
}

export default async function CaseStudy({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const facts = [
    { label: "Industry", values: [project.sector] },
    { label: "Services", values: project.disciplines },
    { label: "Timeline", values: [project.timeline] },
    { label: "Platform", values: project.platform },
  ];

  return (
    <>
      <Nav3D />

      <main id="main" className="ml-case">
        {/* Full-bleed key visual, as on the previous site — it is the brand's
            own campaign image and carries the identity better than any crop
            inside a container would. */}
        <div className="ml-case-hero">
          <Image
            src={project.image}
            alt={`${project.name} brand key visual`}
            fill
            sizes="100vw"
            priority
          />
          <div className="ml-case-hero-fade" />
          <Link href="/work" className="ml-case-back">← Back to work</Link>
        </div>

        <div className="ml-case-inner">
          <p className="ml-sec-eyebrow">
            <span />
            {project.sector}
          </p>
          <h1 className="ml-case-title">{project.name}</h1>
          <p className="ml-prose ml-case-intro">{project.summary}</p>

          {project.kind === "concept" && (
            <p className="ml-case-flag">
              Studio concept — a brand we invented, designed and produced ourselves.
            </p>
          )}

          <dl className="ml-case-facts">
            {facts.map(f => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>
                  {f.values.map(v => (
                    <span key={v}>{v}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div className="ml-case-split">
            <section>
              <h2>The challenge</h2>
              <p className="ml-prose">{project.challenge}</p>
            </section>
            <section>
              <h2>The solution</h2>
              <p className="ml-prose">{project.solution}</p>
            </section>
          </div>
        </div>

        {/* The device mockup, recovered from the previous site's case pages. */}
        <div className="ml-case-exhibit">
          <Image
            src={project.exhibit}
            alt={`${project.name} shown across desktop, mobile and brand collateral`}
            width={1800}
            height={1125}
            sizes="(max-width: 900px) 92vw, 1180px"
          />
        </div>

        <div className="ml-case-inner">
          <div className="ml-case-split">
            <section>
              <h2>The brief</h2>
              <p className="ml-prose">{project.brief}</p>
            </section>
            <section>
              <h2>The outcome</h2>
              <p className="ml-prose">{project.outcome}</p>
            </section>
          </div>

          <ol className="ml-case-approach">
            {project.approach.map((a, i) => (
              <li key={a}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p className="ml-prose">{a}</p>
              </li>
            ))}
          </ol>

          <aside className="ml-case-cta">
            <h2>
              Like what you see?
              <span>Let&rsquo;s build yours next.</span>
            </h2>
            <a href="/#contact" className="ml-pill">
              Get a quote
              <span aria-hidden="true">↗</span>
            </a>
            <p className="ml-case-cta-mail">
              or email <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </aside>

          <nav className="ml-case-more" aria-label="Other projects">
            {projects
              .filter(p => p.slug !== project.slug)
              .slice(0, 3)
              .map(p => (
                <Link key={p.slug} href={`/work/${p.slug}`}>
                  <span className="ml-case-more-sector">{p.sector}</span>
                  <span className="ml-case-more-name">{p.name}</span>
                </Link>
              ))}
          </nav>
        </div>
      </main>

      <Footer3D />
    </>
  );
}
