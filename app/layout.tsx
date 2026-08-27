import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Outfit for display, Inter for everything else.
 *
 * Framer's headings are GT Walsheim Medium — a licensed Grilli Type face, so
 * not available to us. Outfit is the closest free relative: geometric with
 * the same warm, slightly rounded terminals. What actually carries the look
 * is the metrics rather than the family — weight 500, -0.04em tracking and
 * a line-height of exactly 1.0, all measured off framer.com.
 */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Motionlee — Booking Software & Websites in Stoke-on-Trent",
    template: "%s — Motionlee",
  },
  description: site.description,
  keywords: [
    "booking system Stoke-on-Trent",
    "salon booking software UK",
    "barber booking system",
    "no booking fee appointments",
    "small business website design",
    "web design Stoke-on-Trent",
  ],
  authors: [{ name: "Motionlee" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Motionlee — Booking Software & Websites in Stoke-on-Trent",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Motionlee — Booking Software & Websites in Stoke-on-Trent",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: [
    { "@type": "City", name: "Stoke-on-Trent" },
    { "@type": "AdministrativeArea", name: "Staffordshire" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stoke-on-Trent",
    addressCountry: "GB",
  },
  priceRange: "££",
  makesOffer: [
    { "@type": "Offer", name: "Bookings", price: "29", priceCurrency: "GBP" },
    { "@type": "Offer", name: "Bookings + Website", price: "45", priceCurrency: "GBP" },
    { "@type": "Offer", name: "Web Design", price: "499", priceCurrency: "GBP" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#7C5CFF] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
