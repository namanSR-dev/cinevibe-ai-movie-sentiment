/**
 * TMDB review fetcher.
 *
 * Retrieves raw review records for a TMDB movie ID and enforces response shape
 * guarantees before data reaches sanitization and AI stages.
 */
import { TmdbReviewsResponse } from "@/types/review";
import { TMDB_QUERY_PARAMS } from "../../constants/api";
import { buildTmdbUrl } from "./tmbdUrl";

/**
 * Fetches raw review objects from TMDB for a specific movie.
 *
 * Input: TMDB movie ID and API key.
 * Output: TMDB `results` array when response format is valid.
 */
export async function fetchTmdbReviews(
  movieId: number,
  apiKey: string,
): Promise<NonNullable<TmdbReviewsResponse["results"]>> {
  const reviewsUrl = buildTmdbUrl(`/movie/${movieId}/reviews`, {
    [TMDB_QUERY_PARAMS.apiKey]: apiKey,
  });

  const reviewsResponse = await fetch(reviewsUrl);

  if (!reviewsResponse.ok) {
    throw new Error(`Failed to fetch TMDB reviews (${reviewsResponse.status})`);
  }

  const reviewsData: TmdbReviewsResponse = await reviewsResponse.json();

  if (!Array.isArray(reviewsData.results)) {
    throw new Error(
      reviewsData.status_message || "Unexpected TMDB reviews response format",
    );
  }

  return reviewsData.results;
}
