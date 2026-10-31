/**
 * Fixed-window rate limiter backed by an in-process Map.
 *
 * Good enough for a single-instance personal site. On a multi-region
 * deployment each instance keeps its own window, so swap this for a
 * shared store (Upstash Redis, Vercel KV) if abuse becomes a problem.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.expiresAt <= now) {
    hits.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  const retryAfterSeconds = Math.ceil((entry.expiresAt - now) / 1000);
  return { allowed: entry.count <= MAX_REQUESTS, retryAfterSeconds };
}

/** Drop expired windows so the map can't grow without bound. */
export function pruneRateLimit(now = Date.now()) {
  for (const [key, entry] of hits) {
    if (entry.expiresAt <= now) hits.delete(key);
  }
}
