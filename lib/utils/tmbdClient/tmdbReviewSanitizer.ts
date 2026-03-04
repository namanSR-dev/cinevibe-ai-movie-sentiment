import { MAX_REVIEWS } from "@/lib/constants/api";

type TmdbReview = { content?: string };

export function sanitizeTmdbReviews(reviews: TmdbReview[]): string[] {
  return reviews
    .map((review) => review.content?.trim() || "")
    .filter((content) => content.length > 0)
    .slice(0, MAX_REVIEWS);
}
