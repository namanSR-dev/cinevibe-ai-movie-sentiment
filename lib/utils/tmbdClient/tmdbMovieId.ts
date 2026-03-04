/**
 * TMDB movie ID resolver.
 *
 * Translates IMDb IDs into TMDB movie IDs required by the TMDB reviews API.
 */
import { TMDB_QUERY_PARAMS } from "@/lib/constants/api";
import type { TmdbFindResponse } from "@/types/review";
import { buildTmdbUrl } from "./tmbdUrl";

/**
 * Resolves a TMDB movie ID from an IMDb ID using TMDB's `/find` endpoint.
 *
 * Input: IMDb ID and TMDB API key.
 * Output: numeric TMDB movie ID or a domain error when no mapping exists.
 */
export async function getTmdbMovieId(imdbId: string, apiKey: string): Promise<number> {
  const findUrl = buildTmdbUrl(`/find/${encodeURIComponent(imdbId)}`, {
    [TMDB_QUERY_PARAMS.apiKey]: apiKey,
    [TMDB_QUERY_PARAMS.externalSource]: TMDB_QUERY_PARAMS.imdbExternalSource,
  });

  const findResponse = await fetch(findUrl);

  if (!findResponse.ok) {
    throw new Error(
      `Failed to convert IMDb ID to TMDB movie ID (${findResponse.status})`,
    );
  }

  const findData: TmdbFindResponse = await findResponse.json();
  const movieId = findData.movie_results?.[0]?.id;

  // Distinguish "movie exists in OMDb but not in TMDB" from generic transport issues.
  if (!movieId) {
    throw new Error("TMDB_MOVIE_NOT_FOUND");
  }

  return movieId;
}
