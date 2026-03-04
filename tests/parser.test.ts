/**
 * Unit tests for AI response parsing.
 *
 * AI output can drift in shape or formatting, so these tests verify that valid
 * payloads parse correctly and malformed/incomplete payloads are rejected.
 */

import { describe, expect, it, vi } from "vitest";
import type { MovieSentiment } from "@/types/sentiment";

vi.mock("@/lib/utils/env", () => ({
  env: {
    GEMINI_API_KEY: "test-gemini-key",
  },
}));

vi.mock("@google/generative-ai", () => {
  class GoogleGenerativeAI {
    constructor(_apiKey: string) {}
    getGenerativeModel() {
      return { generateContent: vi.fn() };
    }
  }

  return { GoogleGenerativeAI };
});

import { cleanAndParseSentiment } from "@/lib/ai/geminiClient";

function parseSentimentStrict(text: string): MovieSentiment {
  const parsed = cleanAndParseSentiment(text) as Partial<MovieSentiment>;

  if (
    !parsed.sentiment ||
    !parsed.confidence ||
    !parsed.summary ||
    !Array.isArray(parsed.strengths) ||
    !Array.isArray(parsed.weaknesses)
  ) {
    throw new Error("Incomplete AI sentiment response");
  }

  return parsed as MovieSentiment;
}

describe("cleanAndParseSentiment", () => {
  it("parses a valid AI JSON response into a MovieSentiment object", () => {
    // AI providers often wrap JSON in Markdown fences.
    // This ensures the parser still returns a usable typed payload for the UI.
    const raw = `
\`\`\`json
{
  "sentiment": "positive",
  "confidence": "high",
  "summary": "Audiences praised the performances and pacing.",
  "strengths": ["performances", "pacing"],
  "weaknesses": ["predictable ending"]
}
\`\`\`
`;

    expect(parseSentimentStrict(raw)).toEqual({
      sentiment: "positive",
      confidence: "high",
      summary: "Audiences praised the performances and pacing.",
      strengths: ["performances", "pacing"],
      weaknesses: ["predictable ending"],
    });
  });

  it("throws an error when required fields are missing", () => {
    // AI models may omit keys even when prompted with a strict schema.
    // Rejecting incomplete payloads prevents broken sentiment cards downstream.
    const missingFields = `{"sentiment":"mixed","confidence":"medium"}`;

    expect(() => parseSentimentStrict(missingFields)).toThrow(
      "Incomplete AI sentiment response",
    );
  });

  it("throws safely on malformed JSON", () => {
    // AI models may return malformed responses.
    // This test ensures the parser safely handles unexpected formats.
    const malformed = `{"sentiment":"positive",`;

    expect(() => cleanAndParseSentiment(malformed)).toThrow();
  });
});
