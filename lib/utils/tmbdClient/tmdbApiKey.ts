/**
 * TMDB API key accessor.
 *
 * Isolates provider-key retrieval so TMDB callers have a single place for
 * validation and future key-management changes.
 */
import { env } from "@/lib/utils/env";

/**
 * Returns the configured TMDB API key, throwing when unavailable.
 */
export function getTmdbApiKey(): string {
  if (!env.TMDB_API_KEY) {
    throw new Error("Missing TMDB_API_KEY in environment variables");
  }

  return env.TMDB_API_KEY;
}
