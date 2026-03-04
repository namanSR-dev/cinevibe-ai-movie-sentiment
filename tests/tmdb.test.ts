/**
 * Unit tests for TMDB review sanitization.
 *
 * These tests verify the preprocessing that keeps AI prompts clean, bounded,
 * and cost-efficient before reviews are sent to sentiment analysis.
 */

import { describe, expect, it } from "vitest";
import { MAX_REVIEWS } from "@/lib/constants/api";
import { sanitizeTmdbReviews } from "@/lib/utils/tmbdClient/tmdbReviewSanitizer";

describe("sanitizeTmdbReviews", () => {
  it("removes empty reviews", () => {
    // Empty records contribute no signal for sentiment.
    // Removing them avoids wasted tokens and noisy prompts.
    const reviews = [
      { content: "" },
      { content: "Great movie." },
      { content: "   " },
      {},
    ];

    expect(sanitizeTmdbReviews(reviews)).toEqual(["Great movie."]);
  });

  it("trims surrounding whitespace from review content", () => {
    // Trimming keeps prompt text normalized.
    // This avoids model confusion from inconsistent formatting artifacts.
    const reviews = [{ content: "  Strong acting and cinematography.  " }];

    expect(sanitizeTmdbReviews(reviews)).toEqual([
      "Strong acting and cinematography.",
    ]);
  });

  it("enforces the maximum review limit", () => {
    // Reviews are limited before sending to the AI model
    // to reduce token usage and latency.
    const reviews = Array.from({ length: MAX_REVIEWS + 3 }, (_, index) => ({
      content: `Review ${index}`,
    }));

    const sanitized = sanitizeTmdbReviews(reviews);

    expect(sanitized).toHaveLength(MAX_REVIEWS);
    expect(sanitized).toEqual(
      Array.from({ length: MAX_REVIEWS }, (_, index) => `Review ${index}`),
    );
  });
});
