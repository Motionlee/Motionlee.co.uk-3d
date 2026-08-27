"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Link that actually scrolls to on-page anchors.
 *
 * Next's App Router refuses to auto-scroll to a hash when the page contains a
 * `position: fixed` element — our header — so every `/#pricing` style link in
 * the nav silently did nothing but change the URL. A plain <a> lets the
 * browser do it natively, and `scroll-margin-top` on the sections keeps the
 * target clear of the fixed header.
 *
 * Non-hash destinations keep using next/link for client-side navigation.
 */
export function AnchorLink({
  href,
  children,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const hashIndex = href.indexOf("#");

  if (hashIndex === -1) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const target = href.slice(hashIndex);

  const { onClick: callerOnClick, ...anchorProps } = rest as typeof rest & {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    callerOnClick?.(e);

    // Only handle it ourselves when the section is on this page.
    const el = document.querySelector(target);
    if (!el) return;
    e.preventDefault();

    // Deliberately window.scrollTo rather than scrollIntoView: the latter
    // silently does nothing on this page, and this also lets us offset the
    // 72px fixed header so the section heading isn't hidden underneath it.
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    history.pushState(null, "", target);
  };

  return (
    <a href={href} onClick={onClick} {...anchorProps}>
      {children}
    </a>
  );
}
