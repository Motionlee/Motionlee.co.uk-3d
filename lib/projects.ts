export type Project = {
  slug: string;
  name: string;
  sector: string;
  strapline: string;
  image: string;
  /**
   * Concept work is self-initiated: a brand we invented and built end to end.
   * This is surfaced in the UI — we never present it as commissioned work.
   */
  kind: "concept" | "client";
  summary: string;
  disciplines: string[];
  year: string;
  brief: string;
  approach: string[];
  outcome: string;
  /**
   * Recovered from the case-study pages on the site that served
   * motionlee.co.uk before this one — see archive/README.md. Those pages had
   * real depth this data did not carry: how long each build took, what it was
   * built on, and the challenge/solution framing, plus a device mockup.
   */
  timeline: string;
  platform: string[];
  challenge: string;
  solution: string;
  exhibit: string;
};

export const projects: Project[] = [
  {
    slug: "elan",
    name: "Élan",
    sector: "Luxury Beauty Salon",
    strapline: "Beauty. Confidence. Experience.",
    image: "/work/elan.jpg",
    kind: "concept",
    summary:
      "A salon brand built to carry the authority of a fashion house — serif restraint, warm gold, and campaign imagery shot like editorial.",
    disciplines: ["Brand Identity", "Web Design", "Product Visuals"],
    year: "2026",
    brief:
      "Most salon websites are a phone number attached to a photo gallery. We set out to prove a local salon can hold the same visual authority as a national beauty label — and that the identity survives contact with a real product range.",
    approach: [
      "Built the identity on a high-contrast serif wordmark and a gold-on-black palette chosen to make skin tones look expensive rather than filtered.",
      "Designed booking-first: the appointment CTA is one tap away from any scroll position, on any device.",
      "Produced a physical product range under the Élan name and shot it as the brand's own campaign imagery instead of buying stock.",
    ],
    outcome:
      "A complete brand that exists as products, not just pixels — and the template we now work from for every salon and beauty client we take on.",
    timeline: "3 Weeks",
    platform: ["WordPress", "Elementor", "WooCommerce"],
    challenge:
      "The client had an exceptional in-person experience but a digital presence that didn't reflect their premium positioning. Their existing website was generic, slow, and failing to convert visitors into bookings.",
    solution:
      "We built a brand-new identity system — typography, colour palette, and visual language — then translated it into a fast, mobile-first website with seamless online booking integration. Delivered in under 3 weeks.",
    exhibit: "/work/exhibits/elan.jpg",
  },
  {
    slug: "north-and-co",
    name: "North & Co.",
    sector: "Premium Barbershop",
    strapline: "Craft. Tradition. Precision.",
    image: "/work/north.jpg",
    kind: "concept",
    summary:
      "A barbershop identity built on serif restraint instead of the category's default neon, skulls and chrome.",
    disciplines: ["Brand Identity", "Web Design", "Booking Flow"],
    year: "2026",
    brief:
      "Barbershop branding has converged on one look: black, gold, aggressive. We wanted to find out what the category looks like treated as a heritage craft instead of a lifestyle statement.",
    approach: [
      "Anchored the identity in a wide-tracked serif wordmark — closer to a tailor than a tattoo parlour.",
      "Designed a booking flow that answers the only three questions a customer actually has: who cuts, when, and how much.",
      "Built the page around a single full-bleed hero so the craft does the selling, not the copy.",
    ],
    outcome:
      "The clearest proof in our portfolio that restraint outperforms decoration in a crowded local category.",
    timeline: "2 Weeks",
    platform: ["Netlify", "Custom HTML/CSS", "Calendly Integration"],
    challenge:
      "Every barbershop website looks the same — black background, scissors icon, basic booking form. North & Co. wanted something that felt premium without feeling pretentious.",
    solution:
      "We stripped it back to the essentials: a powerful hero, clear service menu, instant booking, and a visual language that felt like the shop itself. Fast, sharp, and built to convert walk-ins from Google.",
    exhibit: "/work/exhibits/north.jpg",
  },
  {
    slug: "apex-detail",
    name: "Apex Detail",
    sector: "Automotive Detailing",
    strapline: "Precision. Protection. Performance.",
    image: "/work/apex.jpg",
    kind: "concept",
    summary:
      "A detailing brand engineered around a real product line — the mark had to work on a bottle before it worked on a billboard.",
    disciplines: ["Brand Identity", "Packaging", "Product Visuals"],
    year: "2026",
    brief:
      "Detailing is sold on results but bought on trust. The brand had to look like something you would leave on a showroom shelf, and it had to survive at label scale first.",
    approach: [
      "Designed the A-mark to hold at 20mm on a bottle, then scaled it up — the opposite of the usual order of work.",
      "Locked an electric blue against near-black so the brand reads instantly in the low-light garage imagery the category lives in.",
      "Produced the real product range and photographed it as the hero of the site rather than a footnote.",
    ],
    outcome:
      "A brand with physical products behind it — our reference case for anyone selling a tangible product rather than an appointment.",
    timeline: "2 Weeks",
    platform: ["Netlify", "Custom HTML/CSS", "Google Analytics"],
    challenge:
      "The detailing market is crowded with cheap-looking websites that undercut the premium positioning most skilled detailers deserve. Apex needed a site that matched the quality of their work.",
    solution:
      "Dark, cinematic design with high-impact imagery, a clear service breakdown with pricing, and a quote request form that pre-qualifies customers before they even make contact.",
    exhibit: "/work/exhibits/apex.jpg",
  },
  {
    slug: "iron-oak",
    name: "Iron Oak",
    sector: "Craft Brewery",
    strapline: "Crafted with time. Poured with character.",
    image: "/work/ironoak.jpg",
    kind: "concept",
    summary:
      "A small-batch brewery identity built on a single oak-leaf mark that works on a pump clip, a bottle cap and a glass.",
    disciplines: ["Brand Identity", "Packaging", "Art Direction"],
    year: "2026",
    brief:
      "Craft beer branding usually shouts — loud illustration, louder names. We wanted to see what the category looks like when it borrows from whisky instead: patient, warm, and quietly confident.",
    approach: [
      "Built the system around one oak-leaf mark that survives at every scale a brewery needs, from bottle cap to bar frontage.",
      "Set the identity in a classical serif with a gold-on-black palette that reads well in the dim light of an actual pub.",
      "Art-directed the imagery around the pour — the single moment that sells the product better than any copy line.",
    ],
    outcome:
      "Our reference for any food, drink or maker brand where the product photographs better than it describes.",
    timeline: "4 Weeks",
    platform: ["Shopify", "Custom Theme", "Stripe Payments"],
    challenge:
      "Iron Oak were launching into a competitive craft beer market with no brand identity, no packaging, and no online presence. They needed everything from scratch — fast.",
    solution:
      "We built a complete brand world: logo, colour system, typography, and can label designs for their first four ales — then launched a Shopify store for direct-to-consumer sales.",
    exhibit: "/work/exhibits/ironoak.jpg",
  },
  {
    slug: "haven-and-hart",
    name: "Haven & Hart",
    sector: "Luxury Estates",
    strapline: "Extraordinary homes. Exceptional living.",
    image: "/work/haven.jpg",
    kind: "concept",
    summary:
      "An estate agency brand that behaves like a private gallery — space, restraint, and photography given room to breathe.",
    disciplines: ["Brand Identity", "Web Design", "Art Direction"],
    year: "2026",
    brief:
      "Property branding at the top of the market usually still looks like the bottom of it: crowded grids, badge overload, and photography fighting the interface. We wanted the browsing experience to feel like the properties.",
    approach: [
      "Built a monogram-led identity with a rule-and-serif system that stays quiet next to the imagery.",
      "Increased whitespace and slowed transitions well past what feels comfortable in a first draft, so each property gets a beat of its own.",
      "Kept the palette to warm stone and gold, taking cues from the light in the photography rather than imposing a brand colour on it.",
    ],
    outcome:
      "Proof that pacing and restraint are brand attributes you can design, not just describe in a strategy deck.",
    timeline: "5 Weeks",
    platform: ["WordPress", "Custom Theme", "MLS Integration"],
    challenge:
      "The agency was competing with national brands for high-net-worth clients but their website looked like it was built in 2015. Every touchpoint needed to scream quality and trustworthiness.",
    solution:
      "We designed a minimal, editorial-style property platform with full-bleed photography, immersive property pages, and a brand identity that positioned Haven & Hart as the premium choice in their market.",
    exhibit: "/work/exhibits/haven.jpg",
  },
  {
    slug: "ember-and-ash",
    name: "Ember & Ash",
    sector: "Restaurant & Dining",
    strapline: "Fire. Flavour. Artistry.",
    image: "/work/ember.jpg",
    kind: "concept",
    summary:
      "A fire-cuisine restaurant brand designed around the two things that actually convert: the menu and the booking button.",
    disciplines: ["Brand Identity", "Web Design", "Motion Content"],
    year: "2026",
    brief:
      "Restaurant sites bury the two things every visitor came for. The brief was to design around that behaviour instead of fighting it, while still earning the price point visually.",
    approach: [
      "Put the menu and the reservation CTA within one interaction of every scroll position.",
      "Built a warm ember palette that holds up on a phone in a dim room — the actual condition the site gets viewed in.",
      "Cut short-form motion of the plating to carry the brand onto social without commissioning a separate shoot.",
    ],
    outcome:
      "Our hospitality reference — and the clearest example of designing for a real context rather than a desktop mockup.",
    timeline: "3 Weeks",
    platform: ["Netlify", "OpenTable Integration", "Custom CSS"],
    challenge:
      "Restaurant websites are either too minimal or too cluttered. Ember & Ash needed something atmospheric, warm, and instantly bookable.",
    solution:
      "We created a full sensory brand experience — warm photography direction, editorial typography, an animated hero that evokes fire and atmosphere, and a frictionless reservation flow that doubled their online booking rate.",
    exhibit: "/work/exhibits/ember.jpg",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
