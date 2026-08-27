import { Nav3D } from "@/components/hero3d/Nav3D";
import { Hero3D } from "@/components/hero3d/Hero3D";
import { Proposition } from "@/components/hero3d/Proposition";
import { Marquee3D } from "@/components/hero3d/Marquee3D";
import { Process3D } from "@/components/hero3d/Process3D";
import { CtaBand } from "@/components/hero3d/CtaBand";
import { WorkShowcase3D } from "@/components/hero3d/WorkShowcase3D";
import { About3D } from "@/components/hero3d/About3D";
import { Services3D } from "@/components/hero3d/Services3D";
import { Contact3D } from "@/components/hero3d/Contact3D";
import { Footer3D } from "@/components/hero3d/Footer3D";
import { ChatWidget } from "@/components/hero3d/ChatWidget";
import { ScrollMeter } from "@/components/hero3d/ScrollMeter";

/**
 * No metadata export here on purpose. The title, description, canonical and
 * Open Graph tags for "/" already live in app/layout.tsx; the preview route
 * this replaced carried `robots: noindex` and a title of "Hero preview",
 * neither of which may follow it onto the real home page.
 */
export default function Home() {
  return (
    <>
      <Nav3D />

      <main id="main">
        {/* The hero pins inside this range, and the Proposition is pulled up
            underneath it — the wipe across the hero is the transition, so
            nothing may be inserted between these two. */}
        <div className="ml-hero-range">
          <Hero3D />
        </div>

        <Proposition />

        {/* The marquee sits after the pitch rather than under the hero: the
            Proposition covers the hero's last screen, so anything placed
            between them would simply never be seen. */}
        <Marquee3D />

        <Process3D />

        {/* The pricing buttons and the contact form were 9.6 screens apart.
            This is the ask in between. */}
        <CtaBand />

        <WorkShowcase3D />
        <About3D />

        {/* Studio work is a different product for a different buyer, so it
            sits after the story rather than at the decision point. */}
        <Services3D />

        <Contact3D />
      </main>

      <Footer3D />

      {/* Ported from the previous site. */}
      <ChatWidget />
      <ScrollMeter />
    </>
  );
}
