import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "What you get", href: "/#pricing" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Design services", href: "/#services" },
      { label: "Client Portal", href: "/#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Work", href: "/work" },
      { label: "About Us", href: "/#about" },
      { label: "How it works", href: "/#pricing" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink-2">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Design studio for businesses that mean business.
            </p>
            <p className="mt-4 text-sm text-white/35">{site.location}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-white/40">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/65 transition-colors hover:text-lime"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-white/40">Get in touch</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-white/65 transition-colors hover:text-lime"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.portal}
                  className="text-sm text-white/65 transition-colors hover:text-lime"
                >
                  Client Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 text-sm text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Motionlee Studio · {site.location}
          </p>
          <p className="text-white/25">
            Portfolio shown is self-initiated studio concept work.
          </p>
        </div>
      </div>
    </footer>
  );
}
