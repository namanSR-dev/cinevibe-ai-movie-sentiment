// Wrapper around the Gemini helpers that keeps the public API
// surface minimal and mirrors the style used for other services
// like `tmdb.ts`.

import { MovieSentiment } from "@/types/sentiment";
import {
  getSentimentModel,
  buildSentimentPrompt,
  cleanAndParseSentiment,
} from "./geminiClient";

export async function analyzeMovieSentiment(
  reviews: string[],
): Promise<MovieSentiment> {
  if (!reviews.length) {
    throw new Error("No reviews provided for sentiment analysis");
  }

  const model = getSentimentModel();
  const prompt = buildSentimentPrompt(reviews);
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return cleanAndParseSentiment(text);
}
