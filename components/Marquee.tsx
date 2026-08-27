const items = [
  "Online Booking",
  "No Booking Fees",
  "Your Own Stripe",
  "Websites",
  "No Contract",
  "Stoke-on-Trent",
];

export function Marquee() {
  return (
    <div
      className="marquee relative overflow-hidden border-y border-white/8 bg-ink-2 py-5"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center">
                <span className="eyebrow whitespace-nowrap px-8 text-white/35">
                  {item}
                </span>
                <span className="text-lime/60">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
