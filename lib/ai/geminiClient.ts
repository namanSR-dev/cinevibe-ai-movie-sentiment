/**
 * Gemini client utilities.
 *
 * Encapsulates model initialization plus prompt/response helpers used by the
 * higher-level sentiment service.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/lib/utils/env";
import { MovieSentiment } from "@/types/sentiment";

// Fail fast during module load so misconfiguration is detected before requests hit runtime.
if (!env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

export const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

/**
 * Returns the configured Gemini model used for review sentiment analysis.
 *
 * Kept as a function so model selection is explicit and easy to update.
 */
export function getSentimentModel() {
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
}

/**
 * Build the natural language prompt that will be sent to Gemini.
 * Keeping this logic out of the main entrypoint makes it easier
 * to test and adjust later.
 */
export function buildSentimentPrompt(reviews: string[]): string {
  return `
You are an expert movie critic analyzing audience reviews.

Analyze the sentiment of the following reviews.

Return ONLY valid JSON with this structure:

{
  "sentiment": "positive | mixed | negative",
  "confidence": "low | medium | high",
  "summary": "2-3 sentence summary",
  "strengths": ["key strengths"],
  "weaknesses": ["key weaknesses"]
}

Reviews:
${reviews.join("\n\n")}
`;
}

/**
 * Cleans text coming back from Gemini (Markdown fencing, etc.)
 * and parses it into the strongly-typed structure used by the app.
 */
export function cleanAndParseSentiment(text: string): MovieSentiment {
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as MovieSentiment;
}
