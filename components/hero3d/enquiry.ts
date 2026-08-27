"use client";

/**
 * Carries the plan a visitor clicked from the pricing cards down to the
 * enquiry form.
 *
 * A plain custom event rather than shared state or a query string: both
 * components are already mounted on the same page, the form only needs to
 * know at the moment of the click, and a query string would trigger a
 * navigation just to pre-fill a select.
 */
export const PLAN_PICKED = "ml:plan-picked";

export function announcePlan(tag: string) {
  window.dispatchEvent(new CustomEvent(PLAN_PICKED, { detail: tag }));
}
