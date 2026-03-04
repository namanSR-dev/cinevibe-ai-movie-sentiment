import { TMDB_BASE_URL } from "../../constants/api";

export function buildTmdbUrl(path: string, queryParams: Record<string, string>): string {
  const params = new URLSearchParams(queryParams);
  return `${TMDB_BASE_URL}${path}?${params.toString()}`;
}