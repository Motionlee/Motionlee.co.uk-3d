"use client";

import { useEffect, useRef, useState } from "react";
import { heroProgress } from "./progress";

/** Fraction of the clip the sculpture turns through before handing over. */
const TURN = 0.55;
/**
 * Rotation now spans the hero's entire travel rather than finishing early.
 * The reference's signature move is that its object never stops moving while
 * you travel into it — stopping the turn part-way and then scaling a static
 * frame reads as a zoom on a photograph, which is exactly what it is.
 */
const HANDOVER = 1;

/**
 * Full-bleed hero stage: the render fills the viewport edge to edge, and the
 * scroll-scrubbed rotation crossfades over it in the same frame.
 *
 * This replaces a contained, masked, blend-mode composite. A video element is
 * always an opaque rectangle — MP4 carries no alpha — so any arrangement that
 * floats it *inside* the hero shows its edges, and no amount of masking,
 * blurred bleed or black-crushing truly fixes that. Filling the frame means
 * there is no edge on screen to see. It is how every video hero does it, and
 * how the Figma references are composed too.
 *
 * Both layers stay over-scaled (--stage-zoom) so parallax can shift them
 * without ever exposing a border.
 */

function shouldLoadVideo(): boolean {
  if (typeof window === "undefined") return false;

  // QA override: ?video=1 forces on, ?video=0 forces off. The gate below is
  // otherwise invisible — it declines silently, which looks identical to the
  // video being broken.
  const forced = new URLSearchParams(window.location.search).get("video");
  if (forced === "1") return true;
  if (forced === "0") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 900) return false;

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return false;

  return true;
}

export function ScrubSculpture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => setEnabled(shouldLoadVideo()), []);

  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let current = 0;
    let duration = 0;

    const onMeta = () => {
      duration = video.duration || 0;
      if (duration > 0) setReady(true);
    };
    const onError = () => setFailed(true);

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("error", onError);
    if (video.readyState >= 1) onMeta();

    // iOS will not decode a video that has never been told to play.
    const prime = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("touchstart", prime, { once: true });

    const frame = () => {
      raf = requestAnimationFrame(frame);

      if (!duration) {
        // Metadata can land without the event firing on a cached file.
        if (video.duration > 0) {
          duration = video.duration;
          setReady(true);
        }
        return;
      }

      const progress = heroProgress.value;

      // Only turn through part of the clip. A full revolution brings the
      // sculpture back to where it started, which reads as "nothing
      // happened"; stopping short leaves it on a new face just as the hero
      // hands over to the next section.
      const target = Math.min(progress / HANDOVER, 1) * (duration - 0.05) * TURN;

      // Damped, so a flick of the wheel reads as a glide rather than a jump.
      current += (target - current) * 0.12;

      // The browser's own `seeking` flag, not a hand-rolled one. Tracking it
      // manually relied on `seeked` always firing; when a seek was issued
      // before the file was ready that event never came, the flag stuck true,
      // and scrubbing died permanently with nothing to show for it.
      if (!video.seeking && Math.abs(video.currentTime - current) > 0.02) {
        video.currentTime = current;
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("touchstart", prime);
    };
  }, [enabled]);

  return (
    <div className="ml-stage">
      {/* WebP with a JPEG fallback. This frame is almost entirely dark smooth
          gradient — the worst case for 8-bit JPEG — so the banding around the
          podium was compression, not the render. */}
      <picture>
        {/* Phones first — the first matching <source> wins. The master is
            5088px wide, which a 390px screen has no use for: it was pulling
            342KB to draw an 780px-wide layer. */}
        <source media="(max-width: 760px)" srcSet="/hero/stage-sm.jpg" />
        <source srcSet="/hero/stage.webp" type="image/webp" />
        <img
          className="ml-stage-still"
          src="/hero/stage.jpg"
          alt=""
          decoding="async"
          fetchPriority="high"
          style={{ opacity: ready ? 0 : 1 }}
        />
      </picture>

      {enabled && !failed && (
        <video
          ref={videoRef}
          className="ml-stage-video"
          style={{ opacity: ready ? 1 : 0 }}
          src="/hero/stage-rotate.mp4"
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          aria-hidden="true"
        />
      )}
    </div>
  );
}
