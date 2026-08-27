import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="grid min-h-[70vh] place-items-center px-5 pt-[72px]">
        <div className="text-center">
          <p className="display text-[clamp(4rem,18vw,10rem)] text-lime">404</p>
          <h1 className="display mt-4 text-3xl sm:text-4xl">
            That page doesn&rsquo;t exist.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-white/55">
            It may have moved, or the link might be wrong. Here are two places
            worth going instead.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-lime px-7 py-3.5 font-semibold text-ink"
            >
              Back home
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-white/18 px-7 py-3.5 font-semibold hover:bg-white/5"
            >
              See our work
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
