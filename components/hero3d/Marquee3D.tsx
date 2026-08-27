"use client";

import "./sections.css";

const items = [
  "Online Booking",
  "No Booking Fees",
  "Your Own Stripe",
  "Websites",
  "No Contract",
  "Stoke-on-Trent",
];

/**
 * A slow ticker between bands.
 *
 * The list is rendered twice and the track translates exactly -50%, so the
 * second copy lands where the first began and the loop has no seam. Marked
 * aria-hidden: it repeats claims made properly elsewhere, and a screen
 * reader announcing them twice on a loop is hostile.
 */
export function Marquee3D() {
  return (
    <div className="ml-marquee" aria-hidden="true">
      <div className="ml-marquee-track">
        {[0, 1].map((copy) => (
          <div className="ml-marquee-run" key={copy}>
            {items.map((item) => (
              <span key={item}>
                {item}
                <i aria-hidden="true">◆</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
