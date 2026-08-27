/**
 * Palette read off the reference render. Purple is the accent, used sparingly:
 * arrows, rim light, pedestal LEDs, card edges. Everything else is near-black
 * charcoal — deliberately not pure #000, which smears on OLED.
 */
export const T = {
  ink: "#08070C",
  charcoal: "#111018",
  violet: "#7C5CFF",
  violetBright: "#A78BFA",
  violetDeep: "#4C1D95",
  white: "#F5F4F8",
} as const;
