/**
 * The Motionlee mark, inlined rather than loaded as an <img>.
 *
 * An <img src="*.svg"> is an opaque document — `currentColor` inside it
 * resolves against the SVG's own root, not the page, so a Tailwind text colour
 * on the element does nothing and the mark renders invisible on dark. Inlining
 * lets the ring and M inherit text colour while the arrows keep the accent.
 */
export function Mark({
  className = "",
  accent = "#7C5CFF",
  accent2 = "#A78BFA",
}: {
  className?: string;
  accent?: string;
  accent2?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="Motionlee"
    >
      <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2.1" />
      <path
        d="M32.9 66 V39.6 L46 55 L59.3 39.6 V66"
        stroke="currentColor"
        strokeWidth="4.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M57 32.9 L62.6 37.9 L57 42.9 Z" fill={accent} />
      <path d="M63.2 32.9 L68.8 37.9 L63.2 42.9 Z" fill={accent2} />
    </svg>
  );
}
