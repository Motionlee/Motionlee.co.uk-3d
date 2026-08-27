import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav3D } from "@/components/hero3d/Nav3D";
import { Footer3D } from "@/components/hero3d/Footer3D";
import { legalDocs, getLegalDoc } from "@/lib/legal";
import { site } from "@/lib/site";
import "@/components/hero3d/legal.css";

export function generateStaticParams() {
  return legalDocs.map(d => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const doc = getLegalDoc((await params).slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.intro.slice(0, 155),
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const doc = getLegalDoc((await params).slug);
  if (!doc) notFound();

  return (
    <>
      <Nav3D />

      <main id="main" className="ml-legal">
        <article className="ml-legal-inner">
          <p className="ml-sec-eyebrow">
            <span />
            Legal
          </p>
          <h1 className="ml-legal-title">{doc.title}</h1>
          <p className="ml-legal-meta">{doc.meta}</p>
          <p className="ml-prose ml-legal-intro">{doc.intro}</p>

          {doc.sections.map(s => (
            <section className="ml-legal-section" key={s.title}>
              <h2>{s.title}</h2>
              {/* Our own archived copy, never user input — see lib/legal.ts. */}
              <div className="ml-prose" dangerouslySetInnerHTML={{ __html: s.body }} />
            </section>
          ))}

          <p className="ml-legal-close" dangerouslySetInnerHTML={{ __html: doc.close }} />

          <nav className="ml-legal-more" aria-label="Other legal documents">
            {legalDocs
              .filter(d => d.slug !== doc.slug)
              .map(d => (
                <a key={d.slug} href={`/legal/${d.slug}`}>
                  {d.title} ↗
                </a>
              ))}
            <a href={`mailto:${site.email}`}>{site.email} ↗</a>
          </nav>
        </article>
      </main>

      <Footer3D />
    </>
  );
}
