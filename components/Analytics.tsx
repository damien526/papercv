'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

/**
 * Strips the query string and fragment from a measured URL.
 *
 * `/builder?name=Jane%20Doe` becomes `/builder`.
 */
function stripQuery(url: string): string {
  const cut = url.search(/[?#]/);
  return cut === -1 ? url : url.slice(0, cut);
}

/**
 * Vercel Web Analytics, with the query string cut off.
 *
 * Vercel records the URL along with its query parameters. Here the address can
 * carry the visitor's own name: `HeroCta` sends them to `/builder?name=...`,
 * and `Builder` only scrubs that parameter once the page has mounted. Letting
 * it through would ship a real person's name to a third party and contradict
 * the privacy page, which promises the name "is not logged by us and not sent
 * anywhere".
 *
 * `beforeSend` cuts it before the request leaves the browser: only the page
 * path survives, which is the single thing being measured. The promise rests
 * on the code, not on trust. Do not remove this guard without also revisiting
 * the "Cookies and tracking" section of `app/privacy/page.tsx`.
 *
 * This is a client component because `beforeSend` is a function, and functions
 * cannot cross the server/client boundary from `app/layout.tsx`.
 */
export function Analytics() {
  return (
    <VercelAnalytics
      beforeSend={(event) => ({ ...event, url: stripQuery(event.url) })}
    />
  );
}
