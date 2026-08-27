import { NextResponse } from "next/server";
import { supabaseAnon } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVICES = [
  // The two monthly plans come first — they are the main product, and the
  // pricing cards' CTAs land here. Added rather than substituted: every
  // string below already exists in the `enquiries` table, and this column is
  // read by the Portal.
  "Bookings only",
  "Bookings + Website",
  // Written by the site assistant when it captures a lead mid-conversation.
  "Chatbot enquiry",
  "Website design",
  "Product visuals",
  "Motion content",
  "Managed hosting",
  "Full growth package",
  "Something else",
];

/**
 * In-memory rate limit: 5 submissions per IP per 10 minutes.
 *
 * This resets on redeploy and is per-instance, which is fine — it exists to
 * blunt casual form spam, not to be an authoritative quota. Anything more
 * determined is a job for the platform's WAF, not this file.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries from this address. Please email us instead." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field only a bot fills in. Answer 200 so the bot
  // believes it succeeded and does not retry with a different shape.
  if (clean(body.company_website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const service = clean(body.service, 80);
  const business = clean(body.business, 160);
  const message = clean(body.message, 4000);

  if (!name || !email || !service) {
    return NextResponse.json(
      { error: "Name, email and service are required." },
      { status: 400 },
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  if (!SERVICES.includes(service)) {
    return NextResponse.json({ error: "Unknown service." }, { status: 400 });
  }

  const supabase = supabaseAnon();
  if (!supabase) {
    console.error("[enquiry] Supabase env vars missing — enquiry not stored", {
      name,
      email,
      service,
    });
    return NextResponse.json(
      { error: `Our form is misconfigured. Please email ${site.email} directly.` },
      { status: 500 },
    );
  }

  // Exactly the table's existing columns — the schema is Portal-adjacent and
  // must not drift. No user_agent, no source, no status.
  const { error } = await supabase.from("enquiries").insert({
    name,
    business: business || null,
    email,
    service,
    message: message || null,
  });

  if (error) {
    console.error("[enquiry] insert failed", error.message);
    return NextResponse.json(
      { error: `We couldn't save that. Please email ${site.email} directly.` },
      { status: 500 },
    );
  }

  // Best effort from here. The lead is safely stored; a failed notification
  // must not tell the visitor their enquiry did not go through.
  const notified = await sendEmail({
    to: site.email,
    replyTo: email,
    fromName: "Motionlee Site",
    subject: `New enquiry — ${name}${business ? ` (${business})` : ""}`,
    text: [
      `Name:     ${name}`,
      `Business: ${business || "—"}`,
      `Email:    ${email}`,
      `Service:  ${service}`,
      "",
      "Message:",
      message || "—",
      "",
      `Received: ${new Date().toISOString()}`,
    ].join("\n"),
  });

  if (!notified.ok) {
    console.warn("[enquiry] stored but not emailed:", notified.error);
  }

  return NextResponse.json({ ok: true });
}
