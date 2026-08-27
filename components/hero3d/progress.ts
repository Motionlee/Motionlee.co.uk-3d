/**
 * Hero scroll progress, shared between the components that need it.
 *
 * Hero3D measures it from the hero's own scroll range and writes it here;
 * ScrubSculpture reads it. They used to each divide scrollY by a hardcoded
 * 900, which meant the rotation and the fade could disagree the moment that
 * range changed — and it silently did, every time the layout moved.
 *
 * A mutable object rather than state: this is read every frame by animation
 * loops, and a re-render per frame would be pure waste.
 */
export const heroProgress = {
  /** 0 at the top of the hero, 1 when it has finished its pinned travel. */
  value: 0,
};
