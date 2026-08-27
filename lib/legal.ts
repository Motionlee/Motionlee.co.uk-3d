/**
 * Legal pages, recovered from the site that served motionlee.co.uk before
 * this one. See archive/README.md — the copy lived inside a `legalContent`
 * object in that page's script rather than as pages of its own, so it was
 * only ever reachable through a JavaScript overlay and could not be linked
 * to, bookmarked or indexed.
 *
 * `body` holds the original HTML, which includes a table in the company
 * information section. It is rendered with dangerouslySetInnerHTML: it is our
 * own archived copy, never user input.
 *
 * Prices appearing in this text are NOT generated from lib/plans.ts, because
 * a legal document has to say what was true when it was published. Check them
 * against that file whenever the terms are next revised.
 */

export type LegalDoc = {
  slug: string;
  title: string;
  meta: string;
  intro: string;
  sections: { title: string; body: string }[];
  close: string;
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    meta: "Last Updated: July 2026 · Governed by English Law",
    intro: "These Terms and Conditions govern the relationship between Motionlee (\"we\", \"us\") and our clients (\"you\"). By engaging our services or using our website, you agree to be bound by these terms.",
    sections: [
      { title: "1. Company Information", body: "<table class=\"info-table\"><tr><td>Business</td><td>Motionlee Studio</td></tr><tr><td>Founders</td><td>Rondel Lee & Tarriana Lee</td></tr><tr><td>Based in</td><td>Stoke-on-Trent, United Kingdom</td></tr><tr><td>Email</td><td>grow@motionlee.ai</td></tr><tr><td>Website</td><td>motionlee.co.uk</td></tr><tr><td>Portal</td><td>motionlee.ai</td></tr></table>" },
      { title: "2. Services", body: "We offer Web Design (from £499), Product Visuals (from £149/pack), Motion Content (from £199/month), Managed Hosting (from £15/month), and Brand Identity (from £299). All prices confirmed in writing before work begins." },
      { title: "3. Project Process", body: "All projects begin with a free consultation. We provide a written proposal confirming scope, timeline, cost, and revisions. Work begins once a deposit and signed agreement are received. Final files are delivered once full payment clears." },
      { title: "4. Client Responsibilities", body: "You agree to provide accurate briefs and timely feedback; supply all required content and images; ensure materials are legally owned by you; make payments on schedule; and review deliverables within agreed timelines." },
      { title: "5. Payment Terms", body: "A 50% deposit is required before work begins. The remaining 50% is due on completion. Monthly retainers are invoiced in advance. Late payments (30+ days) may result in suspended work. All invoices are due within 14 days." },
      { title: "6. Revisions & Changes", body: "Each project includes a specified number of revision rounds. Major redesigns or work outside agreed scope will be quoted separately and confirmed in writing before proceeding." },
      { title: "7. Intellectual Property", body: "Upon full payment, you receive full ownership of completed deliverables. Motionlee retains the right to showcase completed work in our portfolio unless requested otherwise in writing." },
      { title: "8. Warranties & Liability", body: "We warrant all work is performed with professional care. We cannot guarantee specific search rankings or revenue growth. Our liability is limited to the total amount paid for the specific project in question." },
      { title: "9. Confidentiality", body: "Both parties agree to keep confidential any sensitive business information shared during the project. Motionlee will not share or sell client information without consent, except where required by law." },
      { title: "10. Governing Law", body: "These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the English courts." },
    ],
    close: "Questions? Email us at <strong>grow@motionlee.ai</strong>",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    meta: "Last Updated: July 2026 · UK GDPR Compliant",
    intro: "Motionlee is committed to protecting your personal data in line with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
    sections: [
      { title: "1. Who We Are", body: "Motionlee Studio is the data controller for all personal data collected through motionlee.co.uk and our services. Contact: grow@motionlee.ai" },
      { title: "2. What Data We Collect", body: "We collect contact information (name, email, business name); project-related information you share with us; enquiry details submitted through our website; and website usage data via analytics." },
      { title: "3. How We Use Your Data", body: "We use your data to deliver and manage your project; respond to enquiries; improve our services; and comply with legal obligations. We will never sell your data to third parties." },
      { title: "4. Legal Basis", body: "We process your data under contractual necessity (to deliver services); legitimate interests (to manage our business); and your consent (for marketing, which you can withdraw at any time)." },
      { title: "5. Data Retention", body: "We retain your data as long as necessary to provide our services and meet legal obligations. Client project data is retained for 7 years for accounting purposes. You may request deletion at any time." },
      { title: "6. Your Rights", body: "Under UK GDPR you have the right to access, correct, or request deletion of your personal data. To exercise any right, email grow@motionlee.ai." },
      { title: "7. Cookies", body: "Our website uses cookies for analytics and performance. You may disable cookies through your browser settings at any time." },
      { title: "8. Third Party Services", body: "We use Supabase (data storage), Netlify (hosting), and Resend (email delivery). Each provider maintains appropriate security measures." },
      { title: "9. Data Security", body: "We implement appropriate measures to protect your data against unauthorised access. Our systems use SSL encryption and secure authentication." },
      { title: "10. Complaints", body: "If not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk." },
    ],
    close: "Privacy questions? Email <strong>grow@motionlee.ai</strong> and we'll respond within 48 hours.",
  },
  {
    slug: "hosting",
    title: "Hosting Terms",
    meta: "Last Updated: July 2026 · Applies to all Motionlee Hosting Plans",
    intro: "These Hosting Terms apply to all Motionlee managed hosting plans and supplement our main Terms & Conditions.",
    sections: [
      { title: "1. Hosting Plans", body: "Basic Hosting (£15/month) — website hosting, SSL, uptime monitoring; Hosting + Support (£25/month) — plus monthly updates and priority support; Hosting + Content (£50/month) — plus monthly content creation." },
      { title: "2. Payment & Renewal", body: "Hosting plans are invoiced monthly in advance. Plans renew automatically unless cancelled with 30 days written notice. Failure to pay within 14 days may result in service suspension." },
      { title: "3. Uptime & Performance", body: "We target 99.9% uptime for all hosted sites. We are not liable for downtime caused by third-party infrastructure or factors outside our reasonable control." },
      { title: "4. Client Responsibilities", body: "Domain registration and renewal costs are the client's responsibility unless otherwise agreed. Clients must not use hosting services for illegal content or activities." },
      { title: "5. SSL Certificates", body: "Free SSL certificates are included with all plans via Let's Encrypt and renew automatically." },
      { title: "6. Client Portal", body: "All hosting clients receive access to the Motionlee Client Portal at motionlee.ai for self-service editing of content, hours, products, and social links." },
      { title: "7. Backups", body: "We perform regular backups of hosted sites. Clients are encouraged to maintain their own copies of important content." },
      { title: "8. Cancellation", body: "Hosting plans can be cancelled with 30 days written notice to grow@motionlee.ai. All site files will be provided for migration within 7 working days. No refunds for part-months." },
      { title: "9. Fair Use", body: "Hosting plans are for standard small business websites. Resource-intensive applications may require an upgraded arrangement. We will discuss this before making any changes." },
      { title: "10. Service Changes", body: "We reserve the right to adjust pricing with 30 days notice. We will always honour your current rate for a minimum of 12 months from your plan start date." },
    ],
    close: "Hosting questions? Email <strong>grow@motionlee.ai</strong> or use the chat assistant on our website.",
  },
];

export const getLegalDoc = (slug: string) => legalDocs.find(d => d.slug === slug);
