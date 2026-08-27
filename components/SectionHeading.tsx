import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="eyebrow flex items-center gap-3 text-indigo-2">
          <span className="h-px w-8 bg-indigo-2" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={`display mt-5 text-[clamp(2rem,5.5vw,3.5rem)] ${
            light ? "text-ink" : "text-white"
          }`}
        >
          {title}
          {accent && <span className="block text-lime">{accent}</span>}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 text-[17px] leading-relaxed ${
              light ? "text-grey" : "text-white/55"
            }`}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
