"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import "./chat.css";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * The site assistant, ported from the previous site's Netlify Function.
 *
 * The reply may end with a LEAD_CAPTURED:{…} line once the assistant has both
 * a name and an email. That line is stripped before display and posted to
 * /api/enquiry — the old version wrote to Supabase straight from the browser,
 * which skipped the rate limit, the validation and the notification email that
 * route already provides.
 */

const LEAD = /LEAD_CAPTURED:(\{.*\})\s*$/;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I'm Motionlee's assistant. Ask me about pricing, what's included or how long it takes, or tell me what you're after.",
    },
  ]);
  const leadSent = useRef(false);
  const feed = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    feed.current?.scrollTo({ top: feed.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Escape closes it — a panel over the page with no keyboard exit is a trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send() {
    const text = draft.trim();
    if (!text || busy) return;

    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setDraft("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json().catch(() => ({}));
      let reply: string =
        data.reply ?? `Sorry — something went wrong. Email ${site.email} and we'll help.`;

      const found = reply.match(LEAD);
      if (found && !leadSent.current) {
        leadSent.current = true;
        try {
          const lead = JSON.parse(found[1]) as { name?: string; email?: string; need?: string };
          if (lead.name && lead.email) {
            // Through the enquiry route, not straight to the database: it
            // carries the rate limit, the validation and the notification.
            void fetch("/api/enquiry", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: lead.name,
                email: lead.email,
                service: "Chatbot enquiry",
                message: lead.need || "Captured in chat",
                company_website: "",
              }),
            }).catch(() => {});
          }
        } catch {
          /* a malformed marker must not break the reply */
        }
        reply = reply.replace(LEAD, "").trim();
      }

      setMsgs([...next, { role: "assistant", content: reply }]);
    } catch {
      setMsgs([
        ...next,
        {
          role: "assistant",
          content: `I can't reach the server. Email ${site.email} and we'll pick it up.`,
        },
      ]);
    }
    setBusy(false);
  }

  return (
    <>
      <button
        type="button"
        className={`ml-chat-fab${open ? " is-open" : ""}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close chat" : "Chat with Motionlee"}
        aria-expanded={open}
        aria-controls="ml-chat-panel"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 11.5a8.5 8.5 0 01-8.5 8.5 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1121 11.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="ml-chat-panel" id="ml-chat-panel" hidden={!open}>
        <header className="ml-chat-head">
          <span className="ml-chat-badge" aria-hidden="true">M</span>
          <span>
            <span className="ml-chat-title">Motionlee assistant</span>
            <span className="ml-chat-sub">Usually replies instantly</span>
          </span>
        </header>

        <div className="ml-chat-feed" ref={feed} role="log" aria-live="polite">
          {msgs.map((m, i) => (
            <p key={i} className={`ml-chat-msg is-${m.role}`}>
              {m.content}
            </p>
          ))}
          {busy && (
            <p className="ml-chat-typing" aria-label="Typing">
              <span /><span /><span />
            </p>
          )}
        </div>

        <form
          className="ml-chat-input"
          onSubmit={e => {
            e.preventDefault();
            void send();
          }}
        >
          <input
            ref={input}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Ask about pricing, features, timing…"
            aria-label="Your message"
            disabled={busy}
          />
          <button type="submit" disabled={busy || !draft.trim()} aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
