import { TmdbReviewsResponse } from "@/types/review";
import { TMDB_QUERY_PARAMS } from "../../constants/api";
import { buildTmdbUrl } from "./tmbdUrl";

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