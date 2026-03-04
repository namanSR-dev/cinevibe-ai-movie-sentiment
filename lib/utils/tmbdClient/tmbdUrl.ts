/**
 * TMDB URL builder.
 *
 * Keeps endpoint construction consistent across TMDB client helpers.
 */
import { TMDB_BASE_URL } from "../../constants/api";

/**
 * Builds a TMDB request URL from a path and query parameter map.
 */
export function buildTmdbUrl(path: string, queryParams: Record<string, string>): string {
  const params = new URLSearchParams(queryParams);
  return `${TMDB_BASE_URL}${path}?${params.toString()}`;
}
