"use client";

import { useEffect, useRef } from "react";

/**
 * Glass bubbles — drifting, and poppable.
 *
 * Drawn on a 2D canvas rather than as WebGL spheres: a pre-rendered sprite
 * blitted a handful of times costs a fraction of real transmissive geometry,
 * and at this size nobody can tell the difference.
 *
 * Each bubble carries its own drift, bob, parallax depth and phase so they
 * never move as a group. Running the cursor over one bursts it — a shockwave
 * ring plus shards — and it respawns from the edge a moment later.
 */

type B = {
  x: number;          // 0..1 of canvas width
  y: number;          // 0..1 of canvas height
  r: number;          // base radius in px
  depth: number;      // parallax strength, also scales size
  vx: number;
  bob: number;
  phase: number;
  /** 0 = whole. Above 0 it is bursting, and 1 ends the burst. */
  pop: number;
  /** Where it was drawn last frame, so hit-testing matches what you see. */
  dx: number;
  dy: number;
  dr: number;
};

/** Pre-render one bubble so the loop is just drawImage. */
function makeSprite(size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const r = size / 2;

  // Darker at the rim, near-transparent through the middle — how a thin glass
  // shell actually reads against a dark background.
  const body = g.createRadialGradient(r, r, r * 0.1, r, r, r);
  body.addColorStop(0, "rgba(180,165,255,0.02)");
  body.addColorStop(0.72, "rgba(160,140,255,0.06)");
  body.addColorStop(0.9, "rgba(190,175,255,0.28)");
  body.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = body;
  g.beginPath();
  g.arc(r, r, r, 0, Math.PI * 2);
  g.fill();

  g.strokeStyle = "rgba(205,195,255,0.42)";
  g.lineWidth = size * 0.018;
  g.beginPath();
  g.arc(r, r, r * 0.94, 0, Math.PI * 2);
  g.stroke();

  // Specular highlight, upper left
  const hi = g.createRadialGradient(r * 0.66, r * 0.6, 0, r * 0.66, r * 0.6, r * 0.4);
  hi.addColorStop(0, "rgba(255,255,255,0.9)");
  hi.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = hi;
  g.beginPath();
  g.arc(r * 0.66, r * 0.6, r * 0.4, 0, Math.PI * 2);
  g.fill();

  // Violet bounce, lower right
  const bounce = g.createRadialGradient(r * 1.32, r * 1.34, 0, r * 1.32, r * 1.34, r * 0.36);
  bounce.addColorStop(0, "rgba(150,110,255,0.55)");
  bounce.addColorStop(1, "rgba(150,110,255,0)");
  g.fillStyle = bounce;
  g.beginPath();
  g.arc(r * 1.32, r * 1.34, r * 0.36, 0, Math.PI * 2);
  g.fill();

  return c;
}

const spawn = (b: B) => {
  b.x = Math.random();
  b.y = 0.15 + Math.random() * 0.75;
  b.r = 7 + Math.random() * 15;
  b.depth = 0.3 + Math.random() * 0.7;
  b.vx = (Math.random() - 0.5) * 0.012;
  b.bob = 0.25 + Math.random() * 0.5;
  b.phase = Math.random() * Math.PI * 2;
  b.pop = 0;
};

export function Bubbles({ count = 7, className = "" }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprite = makeSprite(256);
    const pointer = { x: 0, y: 0, cx: -9999, cy: -9999 };

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const bubbles: B[] = Array.from({ length: count }, () => {
      const b = { pop: 0, dx: 0, dy: 0, dr: 0 } as B;
      spawn(b);
      return b;
    });

    // Sized from getBoundingClientRect on a rAF tick rather than
    // ResizeObserver, which does not fire in every embedded browser.
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (rect.width !== w || rect.height !== h) {
        w = rect.width;
        h = rect.height;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      // Cursor in canvas space. The rect accounts for the layer's own parallax
      // transform, so hit-testing lines up with what is actually on screen.
      pointer.cx = pointer.x - rect.left;
      pointer.cy = pointer.y - rect.top;
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const start = performance.now();

    const frame = (now: number) => {
      resize();
      const t = (now - start) / 1000;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const b of bubbles) {
        // ---- bursting ------------------------------------------------
        if (b.pop > 0) {
          b.pop += 0.045;
          if (b.pop >= 1) {
            spawn(b);
            continue;
          }

          const e = b.pop;
          // Ease out, so the burst is fast at the moment of contact and then
          // settles — a linear ramp reads as a balloon inflating.
          const ease = 1 - Math.pow(1 - e, 3);
          const alpha = 1 - e;

          // Shockwave ring
          ctx.beginPath();
          ctx.arc(b.dx, b.dy, b.dr * (1 + ease * 2.6), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(198,182,255,${alpha * 0.7})`;
          ctx.lineWidth = 1.4 * (1 - ease * 0.7);
          ctx.stroke();

          // Shards flung outward
          const shards = 7;
          for (let i = 0; i < shards; i++) {
            const a = (i / shards) * Math.PI * 2 + b.phase;
            const d = b.dr * (0.6 + ease * 3.1);
            const sx = b.dx + Math.cos(a) * d;
            const sy = b.dy + Math.sin(a) * d;
            ctx.beginPath();
            ctx.arc(sx, sy, Math.max(0.4, b.dr * 0.16 * (1 - ease)), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(226,218,255,${alpha * 0.85})`;
            ctx.fill();
          }

          // The shell itself, blowing out and thinning
          ctx.globalAlpha = alpha * 0.5;
          const rr = b.dr * (1 + ease * 0.8);
          ctx.drawImage(sprite, b.dx - rr, b.dy - rr, rr * 2, rr * 2);
          ctx.globalAlpha = 1;
          continue;
        }

        // ---- drifting -------------------------------------------------
        if (!reduced) b.x += b.vx * 0.01;
        if (b.x > 1.1) b.x = -0.1;
        if (b.x < -0.1) b.x = 1.1;

        const drift = reduced ? 0 : Math.sin(t * b.bob + b.phase) * 0.035;
        const x = b.x * w;
        const y = (b.y + drift) * h;
        const r = b.r * b.depth * 1.6;

        b.dx = x;
        b.dy = y;
        b.dr = r;

        // A little forgiveness on the hit radius — chasing a 12px target with
        // a cursor is a game, not a delight.
        const dist = Math.hypot(pointer.cx - x, pointer.cy - y);
        if (dist < r + 6) {
          b.pop = 0.0001;
          // Dev counter so the interaction can be verified without eyes on it;
          // pixel sampling cannot reliably distinguish a burst from drift.
          if (process.env.NODE_ENV !== "production") {
            const wnd = window as Window & { __mlPops?: number };
            wnd.__mlPops = (wnd.__mlPops ?? 0) + 1;
          }
          continue;
        }

        ctx.globalAlpha = 0.5 + b.depth * 0.5;
        ctx.drawImage(sprite, x - r, y - r, r * 2, r * 2);
        ctx.globalAlpha = 1;
      }

      if (process.env.NODE_ENV !== "production") {
        (window as Window & { __mlBubbles?: unknown }).__mlBubbles = {
          pointer: { cx: Math.round(pointer.cx), cy: Math.round(pointer.cy) },
          items: bubbles.map((b) => ({
            x: Math.round(b.dx),
            y: Math.round(b.dy),
            r: Math.round(b.dr),
            pop: +b.pop.toFixed(2),
          })),
        };
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
