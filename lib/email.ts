/**
 * Sending mail. Mirrors the portal's helper so the sender address and the
 * failure behaviour are the same across both apps.
 *
 * Failures are returned, never thrown — a lead that saved but failed to email
 * is still a lead we hold, and the caller decides how loudly to complain.
 */
export type SendResult = { ok: boolean; error?: string };

export async function sendEmail(opts: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  fromName: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY is not set." };

  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${opts.fromName} <${from}>`,
        to: [opts.to],
        ...(opts.replyTo ? { reply_to: [opts.replyTo] } : {}),
        subject: opts.subject,
        text: opts.text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
