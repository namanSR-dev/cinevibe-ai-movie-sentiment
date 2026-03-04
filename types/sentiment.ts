// Defines TypeScript types for AI-generated sentiment summaries and classification results.

export type Sentiment = "positive" | "mixed" | "negative";

export type Confidence = "low" | "medium" | "high";

export interface MovieSentiment {
  sentiment: Sentiment;
  confidence: Confidence;
  summary: string;
  strengths: string[];
  weaknesses: string[];
}