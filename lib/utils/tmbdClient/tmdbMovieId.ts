import { TMDB_QUERY_PARAMS } from "@/lib/constants/api";
import type { TmdbFindResponse } from "@/types/review";
import { buildTmdbUrl } from "./tmbdUrl";



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

  if (!movieId) {
    const errorMessage =
      findData.status_message || "No TMDB movie found for the provided IMDb ID";
    throw new Error(errorMessage);
  }

  return movieId;
}


