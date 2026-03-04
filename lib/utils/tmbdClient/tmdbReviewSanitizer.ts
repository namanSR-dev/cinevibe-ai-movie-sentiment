/**
 * TMDB review sanitizer.
 *
 * Normalizes raw review records into clean text snippets suitable for AI input.
 */
import { MAX_REVIEWS } from "@/lib/constants/api";

type TmdbReview = { content?: string };

/**
 * Trims, filters, and caps review text to keep AI prompts bounded and relevant.
 */
export function sanitizeTmdbReviews(reviews: TmdbReview[]): string[] {
  return reviews
    .map((review) => review.content?.trim() || "")
    .filter((content) => content.length > 0)
    // Capping review count controls token usage and response latency.
    .slice(0, MAX_REVIEWS);
}
