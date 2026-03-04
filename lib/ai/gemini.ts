/**
 * Gemini sentiment service facade.
 *
 * Provides a narrow public API for sentiment analysis so route handlers do not
 * depend on prompt-building and response-cleaning implementation details.
 */

import { MovieSentiment } from "@/types/sentiment";
import {
  getSentimentModel,
  buildSentimentPrompt,
  cleanAndParseSentiment,
} from "./geminiClient";

/**
 * Runs AI sentiment analysis on sanitized audience review text.
 *
 * Input: review content array prepared by the TMDB service layer.
 * Output: structured `MovieSentiment` used directly by the UI.
 */
export async function analyzeMovieSentiment(
  reviews: string[],
): Promise<MovieSentiment> {
  // Early validation avoids unnecessary model calls and keeps failure reasons explicit.
  if (!reviews.length) {
    throw new Error("No reviews provided for sentiment analysis");
  }

  const model = getSentimentModel();
  const prompt = buildSentimentPrompt(reviews);
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return cleanAndParseSentiment(text);
}
