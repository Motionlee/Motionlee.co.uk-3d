"use client";


/**
 * The 2D layer: header, headline block, CTA, scroll cue.
 *
 * Left-set, not centred. The corner-set variant we tried — nav in the corners,
 * no display headline — is closer to the Active Theory reference, but that
 * system works because visitors already know the studio and came to see the
 * work. This site has to introduce itself, so the name and the proposition
 * lead, and the sculpture holds the right of the frame.
 */
export function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* The header moved to Nav3D — it has to persist past the hero now
          that the page continues below, and two logos crossfading past each
          other looked like a bug. */}

      {/* ---- Headline block ---- */}
      <div className="ml-copy absolute inset-y-0 left-0 z-[6] flex w-full max-w-[600px] flex-col justify-center px-6 sm:px-10 lg:px-14">
        <h1 className="text-[clamp(2.2rem,5.9vw,4.7rem)] font-light leading-[0.95] tracking-[0.1em] text-white">
          MOTIONLEE
        </h1>

        <p className="mt-7 text-[clamp(1.3rem,2.7vw,2.1rem)] font-normal leading-tight tracking-[-0.02em] text-white">
          We make businesses <span className="text-[#8B72FF]">move.</span>
        </p>

        <p className="mt-7 max-w-md text-[17px] font-light leading-[1.6] text-[var(--mist)]">
          Websites, branding, booking systems and digital platforms — all in
          one place.
        </p>

        <a
          href="#work"
          className="ml-pill pointer-events-auto mt-11 w-fit !bg-[#7C5CFF] px-9 py-[17px]"
        >
          Explore our work
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* ---- Scroll cue ---- */}
      <div className="ml-scroll-cue absolute bottom-8 left-6 flex items-center gap-4 sm:bottom-10 sm:left-10 lg:left-14">
        <span className="h-2 w-2 rounded-full bg-[#7C5CFF]" aria-hidden="true" />
        <span className="ml-label">Scroll to discover</span>
      </div>
    </div>
  );
}
