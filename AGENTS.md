# Working on motionlee.co.uk

The live marketing site for Motionlee, a two-person studio in Stoke-on-Trent
selling booking software and websites to small businesses. Next.js 15 App
Router, React 19, Tailwind v4, deployed to Netlify.

Read this before changing anything. Most of it is not inferable from the code,
and two sections describe ways to cause real damage.

---

## 1. Hard boundaries

These come from the owner's written brief. They are not style preferences.

**The Portal is a separate live product.** `Motionlee-Portal/` and
`motionlee.ai` serve paying clients from the same Supabase project this site
writes to, on a **free plan with no backups**. A bad migration is
unrecoverable.

- Never deploy, publish or push to `motionlee.ai` / `www.motionlee.ai`, change
  its DNS, or touch the Netlify site serving the Portal. This site ships to
  **motionlee.co.uk**.
- **Anon key only.** `service_role` must never appear in this repo or its
  environment.
- **Never run SQL** that creates, alters, drops or replaces anything named
  `portal_*`, `clients`, `products`, `site_content`, `opening_hours`,
  `change_requests`, or any existing function.
- Any new table must be prefixed `web_`.
- `enquiries` is shared with the Portal. Do not rename it or change its
  columns: `name, business, email, service, message, created_at`.
- If a migration seems necessary, **write it out and ask**. Do not run it.

**`enquiries.service` values are near-sacred too.** They are validated against
a whitelist in `app/api/enquiry/route.ts` and read by the Portal. Adding a
value is safe. Renaming one orphans existing rows.

## 2. What the business does not have

Never let copy — or the assistant's replies — imply otherwise:

- **No SMS.** Reminders and confirmations are **email** only.
- **No marketing campaigns or mailing lists.**
- **No reports or analytics.**

`lib/plans.ts` is the single source of truth for prices. It says so at the top:
do not edit a price without checking it against the Portal. `app/api/chat`
builds the assistant's system prompt **from that file** — the previous site
hard-coded prices into the prompt and it drifted to quoting three plans that
did not exist. Do not reintroduce a hard-coded copy.

Legal text in `lib/legal.ts` is the exception: a legal document states what was
true when published, so its prices are deliberately static.

## 3. Verify by measuring

Visual work invites confident wrong answers. Every one of these produced a
false conclusion during the build:

- `getBoundingClientRect()` returns the **transformed** box. A card carrying a
  `rotateY` measured 521px and "cropped"; it was 605px and fine. Use
  `offsetWidth`/`offsetHeight` when transforms are involved.
- Reading at the wrong scroll position. Elements that have exited by design
  look like bugs; a sticky element's rect read from the top of the page shows a
  phantom 2000px gap.
- Testing one viewport height. A pinned section that fits at 900px clipped by
  90px at 700px.
- `next/image` serves a **cached copy from memory** after files change on disk.
  Only a server restart clears it. Decode what the endpoint returns.

**The preview pane cannot verify scroll work.** It suspends
`requestAnimationFrame` and refuses to scroll when hidden — `scrollTo()`
silently does nothing and `innerWidth` can read 0. Drive real Chrome over CDP
instead; Node 24 has a global `WebSocket`, so no dependency is needed:

```
/Applications/Google Chrome.app/Contents/MacOS/Google Chrome \
  --headless=new --remote-debugging-port=PORT --user-data-dir=TMP \
  --window-size=1440,900 --hide-scrollbars
```

Then `fetch http://127.0.0.1:PORT/json/list`, open the page target's
`webSocketDebuggerUrl`, and use `Runtime.evaluate`,
`Emulation.setDeviceMetricsOverride`, `Emulation.setTouchEmulationEnabled`
(required for `(hover: none)` to match) and `Page.captureScreenshot`. Always
give the script a hard timeout — a hung one eats the whole budget.

**Never print a secret.** Print prefixes, lengths and status codes. To test a
credential, call a read-only endpoint and report only the status. A grep
written to show an email address once printed an API key that had been pasted
into the wrong variable.

## 4. Architecture that will bite you

**Media queries must come last in their file.** They carry no extra
specificity, so a mobile block placed mid-file loses to every base rule below
it. This silently swallowed the same fix twice.

**`distDir` is local-only.** `next.config.ts` redirects the build to
`.next-build` so a local `next build` cannot corrupt the running dev server's
cache — but it is gated on `CI`/`NETLIFY`, because Netlify's runtime looks in
`.next`. Keying it on `NODE_ENV` alone deploys an empty site. Locally,
`next start` also reads that logic: run it with `CI=true` or it serves a stale
build.

**Tailwind preflight sets `img { max-width: 100% }`**, which silently clamps
any width set on an image and produces no error.

**`object-fit: cover` crops to the *element's* aspect ratio.** On a portrait
phone an ultrawide render is sliced to a strip of itself wherever
`object-position` points. The mobile hero gives the layer the render's own
ratio instead.

**Mobile and desktop are different compositions.** The hero's phone layout
re-sequences the sculpture, chips and copy rather than shrinking them. Every
mobile rule lives inside `@media (max-width: 760px)` (plus a short-viewport
tier at `max-height: 720px`). **Re-check desktop after every mobile change** —
assert the values that should not have moved: `object-position`, `--dolly`,
`--rig`, hero range height, `.ml-prop` margin.

**Touch has no hover.** A phone fires `:hover` on tap and leaves it stuck. Put
hover behind `@media (hover: hover) and (pointer: fine)` and give touch a
scroll-driven equivalent.

## 5. Finishing checklist

None of this is visible without looking for it:

- Every anchor resolves. Deleting a section orphans nav and footer links, and
  bare `#id` links only work on the page that has that section — use `/#id`.
- The last element on the page can reveal. An observer with a negative bottom
  `rootMargin` strands anything resting below the trigger line.
- Form fields are ≥16px, or iOS zooms on focus.
- Tap targets are 44px. Inline links default to 20–36.
- The `body` background matches the sections. One shade of difference shows as
  a grey band wherever a section does not reach.

## 6. Layout of the repo

```
app/
  page.tsx              home — the composed one-page site
  work/, work/[slug]/   portfolio index and case studies
  legal/[slug]/         terms, privacy, hosting terms
  api/enquiry/          the contact form: rate limit, honeypot, Supabase, email
  api/chat/             the site assistant; prompt built from lib/plans.ts
components/hero3d/      every component and stylesheet for the current design
components/             the PREVIOUS design. No route renders it any more, but
                        verify with a grep before deleting rather than trusting
                        this line — it was wrong once already, because
                        app/not-found.tsx was still importing the old Nav.
lib/plans.ts            source of truth for prices and capabilities
lib/legal.ts            legal copy recovered from the previous site
archive/                the previous live site, kept as the record of what was
                        replaced. See archive/README.md.
```

Environment variables, all set in the Netlify UI:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`,
`RESEND_FROM` (an address, not a key — this has been got wrong),
`ANTHROPIC_API_KEY`.

## 7. Known open items

- **The assistant returns its fallback in production.** Narrowed: the route is
  live, the key is visible to it, and Anthropic rejects the call. Netlify's
  function log prints `[chat] Anthropic rejected the call — status NNN`.
  401 = bad or expired key.
- `components/` (previous design) is dead weight once verified unused.
