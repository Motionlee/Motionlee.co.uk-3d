import Link from "next/link";
import { Reveal } from "./Reveal";
import { plans, hostingRates } from "@/lib/plans";
import { AnchorLink } from "@/components/AnchorLink";

export function Pricing() {
  return (
    <section id="pricing" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-indigo">
              <span className="h-px w-8 bg-indigo" />
              Pricing
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.5rem)]">
              Two plans.
              <span className="block text-indigo">No booking fees.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-[17px] leading-relaxed text-grey">
              Billed monthly, cancel any time. Card payments run through your
              own Stripe account, so what you charge is what your customer
              pays — and it lands in your bank, not ours.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-start gap-5 sm:mt-16 lg:grid-cols-2">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <div
                className={`relative h-full rounded-2xl p-8 sm:p-9 ${
                  plan.featured
                    ? "bg-indigo text-white shadow-[0_24px_70px_-20px_rgba(67,56,202,0.55)]"
                    : "border border-black/10 bg-paper-2"
                }`}
              >
                {plan.featured && (
                  <span className="eyebrow absolute -top-3 left-8 rounded-full bg-lime px-3.5 py-1.5 text-ink">
                    ✦ Most popular
                  </span>
                )}

                <p className={`eyebrow ${plan.featured ? "text-white/70" : "text-grey"}`}>
                  {plan.tag}
                </p>

                <p className="mt-5 flex items-baseline gap-2">
                  <span className="display text-6xl sm:text-7xl">{plan.price}</span>
                  <span
                    className={`text-sm ${plan.featured ? "text-white/65" : "text-grey"}`}
                  >
                    {plan.unit}
                  </span>
                </p>

                <p
                  className={`mt-4 text-[15px] leading-relaxed ${
                    plan.featured ? "text-white/80" : "text-ink/70"
                  }`}
                >
                  {plan.pitch}
                </p>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px]">
                      <span
                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                          plan.featured ? "bg-lime text-ink" : "bg-indigo text-white"
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className={plan.featured ? "text-white/90" : "text-ink/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <AnchorLink
                  href="/#contact"
                  className={`mt-9 block rounded-full px-6 py-3.5 text-center font-semibold transition-transform hover:scale-[1.02] ${
                    plan.featured
                      ? "bg-lime text-ink"
                      : "border border-ink/20 text-ink hover:bg-ink hover:text-white"
                  }`}
                >
                  Get started
                </AnchorLink>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rate card for our time — deliberately quieter than the plans above. */}
        <Reveal delay={0.12}>
          <div className="mt-16 rounded-2xl border border-black/10 bg-paper-2 p-7 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-xl font-bold tracking-tight">
                Just need a website looking after?
              </h3>
              <p className="text-sm text-grey">
                Hosting only — no bookings included.
              </p>
            </div>

            <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-black/10 pt-6 sm:grid-cols-3">
              {hostingRates.map((rate) => (
                <div key={rate.label} className="flex gap-3">
                  <dt className="font-display text-2xl font-bold text-indigo">
                    {rate.price}
                  </dt>
                  <dd>
                    <span className="block text-sm font-semibold text-ink">
                      {rate.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-grey">
                      {rate.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-sm text-grey">
            Not sure which fits?{" "}
            <AnchorLink
              href="/#contact"
              className="font-semibold text-indigo underline underline-offset-4"
            >
              Tell us about your business
            </AnchorLink>{" "}
            and we&rsquo;ll recommend one — no pressure either way.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
