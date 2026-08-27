import { NextResponse } from "next/server";
import { plans, hostingRates, capabilities, promises } from "@/lib/plans";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The site assistant.
 *
 * Ported from a Netlify Function on the previous site. Two things changed in
 * the move, both deliberate:
 *
 * 1. The prompt is BUILT FROM lib/plans.ts rather than typed into a string.
 *    The old one had drifted badly — it quoted an "Essential" plan at £499
 *    one-off, "Growth" at £79/month and "Studio" at £149/month, none of which
 *    exist; the site sells £29 and £45 a month. An assistant inventing prices
 *    is worse than no assistant, and a hard-coded copy guarantees it happens
 *    again the next time a price moves. Now it cannot drift.
 *
 * 2. It no longer claims to be the only way to reach Motionlee. The old
 *    prompt said so; this site has an enquiry form two scrolls down.
 */

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TURNS = 24;

function systemPrompt(): string {
  const planLines = plans
    .map(p => `- ${p.tag}: ${p.price} ${p.unit}. ${p.pitch} Includes: ${p.features.join("; ")}.`)
    .join("\n");
  const hostingLine = hostingRates
    .map(h => `${h.label} ${h.price}/month (${h.detail})`)
    .join("; ");

  return `You are the assistant on ${site.name}'s website. ${site.name} is a two-person design studio in ${site.location} — ${site.founders} — selling booking software and websites to small businesses.

PLANS — these are the only prices that exist. Never quote any other figure.
${planLines}

Hosting add-ons: ${hostingLine}

WHAT IS INCLUDED: ${capabilities.map(c => c.title).join(", ")}.

WHAT MAKES IT DIFFERENT:
${promises.map(p => `- ${p.title}: ${p.body}`).join("\n")}

NOT BUILT — never imply any of these exist:
- Text messages or SMS of any kind. Reminders and confirmations are EMAIL only.
- Marketing campaigns or mailing lists.
- Reports or analytics.

CONTACT: ${site.email}. There is also an enquiry form further down this page.

HOW TO REPLY:
1. Answer only from the information above. If you do not know, say so plainly and offer to pass it to the team.
2. Two to four sentences. No lists unless asked.
3. If someone seems ready to start, ask once for their name and email. Do not push.
4. The moment you have BOTH a name and an email, end that one reply with a final line, exactly this and nothing else on the line:
LEAD_CAPTURED:{"name":"their name","email":"their email","need":"5-8 word summary"}
Once per conversation only.
5. Never invent a price, a feature or a policy.`;
}

export async function POST(request: Request) {
  const fallback = (reply: string) => NextResponse.json({ reply });

  // Validate the request before anything else. Checking the key first meant a
  // malformed body came back as a friendly chat message with a 200, hiding a
  // caller bug behind an apology.
  let raw: unknown;
  try {
    const body = (await request.json()) as { messages?: unknown };
    raw = body?.messages;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(raw) || raw.length === 0) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Cap the history. An unbounded transcript posted from the browser is both a
  // cost and a prompt-injection surface.
  const messages = raw
    .slice(-MAX_TURNS)
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        typeof m === "object" &&
        ((m as { role?: unknown }).role === "user" ||
          (m as { role?: unknown }).role === "assistant") &&
        typeof (m as { content?: unknown }).content === "string",
    )
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (messages.length === 0) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    console.error("[chat] ANTHROPIC_API_KEY is not set");
    return fallback(
      `I can't reach my brain right now — email ${site.email} and one of us will pick it up.`,
    );
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: systemPrompt(),
        messages,
      }),
    });

    if (!res.ok) {
      console.error("[chat] Anthropic error", res.status, (await res.text()).slice(0, 300));
      return fallback(`Sorry — I'm having trouble right now. Email ${site.email} and we'll help straight away.`);
    }

    const data = (await res.json()) as { content?: { text?: string }[] };
    const reply = data?.content?.[0]?.text;
    return fallback(
      typeof reply === "string" && reply.trim()
        ? reply
        : `Sorry, I couldn't process that. Try again, or email ${site.email}.`,
    );
  } catch (err) {
    console.error("[chat] request failed", err);
    return fallback(`Sorry, something went wrong. Email ${site.email} and we'll pick it up.`);
  }
}
