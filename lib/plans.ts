/**
 * Single source of truth for what Motionlee sells.
 *
 * Read from the live database on 18 August 2026 and supplied in the website
 * brief. Do not edit a price here without checking it against the Portal —
 * every price on the site renders from this file.
 */

export const plans = [
  {
    id: "bookings",
    tag: "Bookings only",
    name: "Bookings",
    price: "£29",
    unit: "per month",
    pitch: "A diary, a booking page and unlimited email reminders. No website.",
    features: [
      "Your own booking page",
      "Diary for you and your team",
      "Your services and prices",
      "Unlimited email confirmations",
      "Unlimited email reminders",
      "Card payments through your own Stripe",
      "No-show charging, you decide",
      "Customer records and birthdays",
    ],
    featured: false,
  },
  {
    id: "bookings-website",
    tag: "Bookings + Website",
    name: "Bookings + Website",
    price: "£45",
    unit: "per month",
    pitch: "Everything in Bookings, plus your website built, hosted and kept up.",
    features: [
      "Everything in Bookings",
      "Your website designed and built",
      "Hosting and SSL included",
      "Change requests whenever you need",
      "Invoices you can download",
      "Kept up to date for you",
    ],
    featured: true,
  },
] as const;

/**
 * A rate card for our time, not a feature ladder — deliberately presented
 * smaller than the two plans above.
 */
export const hostingRates = [
  { price: "£15", label: "Basic hosting", detail: "Your site, hosted and kept up. No bookings." },
  { price: "£25", label: "Hosting + support", detail: "Hosting, plus changes when you ask." },
  { price: "£50", label: "Hosting + content", detail: "Hosting, support and content written for you." },
] as const;

/**
 * Only what is actually built. Nothing speculative belongs in this list —
 * no SMS, no marketing campaigns, no reports or analytics.
 */
export const capabilities = [
  { title: "Booking page", body: "Your own page where customers pick a service, a person and a time." },
  { title: "Diary", body: "One view of the day for you and every team member." },
  { title: "Card payments", body: "You connect your own Stripe account. The money goes straight to your bank." },
  { title: "No-show charging", body: "A card is held at booking. Whether you charge it is always your call." },
  { title: "Unlimited email", body: "Confirmations and reminders, sent every time, with no per-message cost." },
  { title: "Customer records", body: "Who they are, what they had, and their birthday — day and month, never the year." },
  { title: "Invoices", body: "Downloadable invoices for you and for your customers." },
  { title: "Change requests", body: "Ask for a change to your site and we make it. No ticket system to learn." },
] as const;

/** The positioning. This is the whole point. */
export const promises = [
  {
    title: "Your customers pay no booking fee",
    image: "/promises/no-fee.png",
    body: "Not a percentage, not a flat fee, not ever. What you charge is what they pay.",
  },
  {
    title: "The money never passes through us",
    image: "/promises/direct-to-you.png",
    body: "You connect your own Stripe account. Customers pay you, into your bank. We couldn't take a cut if we wanted to.",
  },
  {
    title: "No contract, no minimum term",
    image: "/promises/no-contract.png",
    body: "Billed monthly. Cancel any time, and nothing is held hostage on the way out.",
  },
  {
    title: "It's yours, and it leaves with you",
    image: "/promises/yours-to-keep.png",
    body: "Your website and your Stripe account belong to you. If you go, they go with you.",
  },
  {
    title: "Set up for you, not sold to you",
    image: "/promises/set-up-for-you.png",
    body: "We build it and configure it. You are not handed software and left to work it out.",
  },
] as const;
