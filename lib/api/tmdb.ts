/**
 * TMDB review service.
 *
 * Orchestrates TMDB-specific steps needed by sentiment analysis:
 * 1) resolve IMDb ID to TMDB movie ID,
 * 2) fetch audience reviews,
 * 3) sanitize content for AI input,
 * 4) emit standardized domain error codes.
 */

import { getTmdbMovieId } from "@/lib/utils/tmbdClient/tmdbMovieId";
import { fetchTmdbReviews } from "../utils/tmbdClient/tmbdReviews";
import { getTmdbApiKey } from "@/lib/utils/tmbdClient/tmdbApiKey";
import { sanitizeTmdbReviews } from "@/lib/utils/tmbdClient/tmdbReviewSanitizer";

/**
 * Fetches and sanitizes audience reviews for a movie by IMDb ID.
 *
 * Input: IMDb ID string.
 * Output: cleaned review text array or a standardized domain error.
 */
export async function fetchMovieReviews(imdbId: string): Promise<string[]> {
  if (!imdbId) {
    throw new Error("INVALID_IMDB_ID");
  }

  try {
    const apiKey = getTmdbApiKey();
    const movieId = await getTmdbMovieId(imdbId, apiKey);
    const reviews = await fetchTmdbReviews(movieId, apiKey);
    const sanitizedReviews = sanitizeTmdbReviews(reviews);

    // Downstream AI analysis has no value without review text; surface this as a
    // first-class domain error instead of letting a generic failure bubble up.
    if (!sanitizedReviews.length) {
      throw new Error("NO_REVIEWS_AVAILABLE");
    }

    return sanitizedReviews;
  } catch (error: unknown) {
    // Preserve known domain errors and normalize everything else to a transport
    // failure that the API layer can map consistently.
    if (
      error instanceof Error &&
      ["INVALID_IMDB_ID", "TMDB_MOVIE_NOT_FOUND", "NO_REVIEWS_AVAILABLE"].includes(
        error.message,
      )
    ) {
      throw error;
    }

    throw new Error("NETWORK_ERROR");
  }
}
