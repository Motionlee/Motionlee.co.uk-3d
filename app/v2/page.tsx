import { redirect } from "next/navigation";

/**
 * /v2 was the preview route while this design was being built. It is the
 * live home page now, so this redirects rather than serving a second copy —
 * two identical pages on different URLs split their own search ranking.
 */
export default function V2Redirect() {
  redirect("/");
}
