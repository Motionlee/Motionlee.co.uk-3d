export type Chip = {
  id: string;
  title: string;
  sub: string;
  icon: "booking" | "hosting" | "portal" | "payments" | "reminders";

  /** Screen placement as a percentage of the hero box. */
  left: string;
  top: string;
  /** Y-rotation in degrees — negative leans away to the right. */
  rotY: number;
  /** 0-1. Drives parallax strength; higher reads as nearer the camera. */
  depth: number;

  /** Scroll progress (0-1) at which it arrives. */
  inAt: number;
  /** Individual drift period so nothing moves in lockstep. */
  drift: number;
};

/**
 * Small capability pills orbiting the sculpture.
 *
 * Deliberately small and sparse. Full site previews were tried here and
 * crowded the M badly — seven large panels overlapping each other and the
 * headline. The sculpture is the hero; these annotate it rather than compete
 * with it, which is why they stay pill-sized and arrive one at a time.
 *
 * All of them reveal on scroll, so the first view is clean.
 */
export const CHIPS: Chip[] = [
  {
    id: "booking",
    title: "BOOKING",
    sub: "SYSTEM",
    icon: "booking",
    left: "44%",
    top: "42%",
    rotY: 14,
    depth: 0.7,
    inAt: 0.05,
    drift: 1.6,
  },
  {
    id: "hosting",
    title: "HOSTING",
    sub: "SECURE & FAST",
    icon: "hosting",
    left: "82%",
    top: "32%",
    rotY: -15,
    depth: 0.5,
    inAt: 0.12,
    drift: 1.05,
  },
  {
    id: "payments",
    title: "CARD PAYMENTS",
    sub: "YOUR OWN STRIPE",
    icon: "payments",
    left: "58%",
    top: "22%",
    rotY: -6,
    depth: 0.3,
    inAt: 0.19,
    drift: 1.3,
  },
  {
    id: "portal",
    title: "CLIENT PORTAL",
    sub: "MANAGE EVERYTHING",
    icon: "portal",
    left: "84%",
    top: "64%",
    rotY: -13,
    depth: 0.55,
    inAt: 0.26,
    drift: 1.45,
  },
  {
    id: "reminders",
    title: "REMINDERS",
    sub: "UNLIMITED EMAIL",
    icon: "reminders",
    left: "52%",
    top: "68%",
    rotY: 4,
    depth: 0.34,
    inAt: 0.33,
    drift: 1.15,
  },
];
