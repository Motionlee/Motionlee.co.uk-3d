import Link from "next/link";
import { Nav3D } from "@/components/hero3d/Nav3D";
import { Footer3D } from "@/components/hero3d/Footer3D";
import "@/components/hero3d/case.css";

export default function NotFound() {
  return (
    <>
      <Nav3D />

      <main id="main" className="ml-case ml-404">
        <div className="ml-case-inner">
          <p className="ml-sec-eyebrow">
            <span />
            404
          </p>

          <h1 className="ml-index-title">
            That page
            <span>doesn&rsquo;t exist.</span>
          </h1>

          <p className="ml-prose ml-index-lede">
            It may have moved, or the link might be wrong. Two places worth going
            instead.
          </p>

          <div className="ml-404-actions">
            <Link href="/" className="ml-pill">
              Back home
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/work" className="ml-ghost">
              See our work
            </Link>
          </div>
        </div>
      </main>

      <Footer3D />
    </>
  );
}
