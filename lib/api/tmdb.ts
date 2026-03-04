// Responsible for fetching audience reviews from the TMDB API.

import { getTmdbMovieId } from "@/lib/utils/tmbdClient/tmdbMovieId";
import { fetchTmdbReviews } from "../utils/tmbdClient/tmbdReviews";
import { getTmdbApiKey } from "@/lib/utils/tmbdClient/tmdbApiKey";
import { sanitizeTmdbReviews } from "@/lib/utils/tmbdClient/tmdbReviewSanitizer";

export async function fetchMovieReviews(imdbId: string): Promise<string[]> {
  if (!imdbId) {
    throw new Error("IMDb ID is required");
  }

  const apiKey = getTmdbApiKey();
  const movieId = await getTmdbMovieId(imdbId, apiKey);
  const reviews = await fetchTmdbReviews(movieId, apiKey);

  return sanitizeTmdbReviews(reviews);
}