export const site = {
  name: "Motionlee",
  url: "https://motionlee.co.uk",
  tagline: "Bookings and websites for small businesses in Stoke-on-Trent",
  description:
    "Online booking and websites for barbers, salons and small shops in Stoke-on-Trent. No booking fees for your customers, card payments through your own Stripe, no contract. From £29 a month.",
  email: "grow@motionlee.ai",
  location: "Stoke-on-Trent, UK",
  portal: "https://motionlee-portal.netlify.app",
  founders: "Rondel Lee and Tarriana Lee",
} as const;

export const nav = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
] as const;
