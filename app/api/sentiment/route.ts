/**
 * Sentiment API route.
 *
 * Handles the slower second phase of the pipeline:
 * 1) fetch reviews from TMDB, 2) analyze with Gemini, 3) return structured
 * sentiment payloads or standardized error codes for the frontend.
 */
import { NextResponse } from "next/server";
import { fetchMovieReviews } from "@/lib/api/tmdb";
import { analyzeMovieSentiment } from "@/lib/ai/gemini";
import { isValidImdbId } from "@/lib/utils/validation";

const SENTIMENT_ERROR_CODES = [
  "INVALID_IMDB_ID",
  "TMDB_MOVIE_NOT_FOUND",
  "NO_REVIEWS_AVAILABLE",
  "AI_ANALYSIS_FAILED",
  "NETWORK_ERROR",
] as const;

type SentimentErrorCode = (typeof SENTIMENT_ERROR_CODES)[number];

/**
 * Narrows arbitrary strings into the supported API error code union so route
 * responses remain predictable for frontend error mapping.
 */
function isSentimentErrorCode(value: string): value is SentimentErrorCode {
  return (SENTIMENT_ERROR_CODES as readonly string[]).includes(value);
}

/**
 * Maps domain-level sentiment error codes to HTTP statuses.
 *
 * This preserves machine-readable error codes while still signaling failures
 * correctly at the transport layer.
 */
function getStatusCode(errorCode: SentimentErrorCode): number {
  switch (errorCode) {
    case "INVALID_IMDB_ID":
      return 400;
    case "TMDB_MOVIE_NOT_FOUND":
    case "NO_REVIEWS_AVAILABLE":
      return 404;
    case "AI_ANALYSIS_FAILED":
      return 502;
    case "NETWORK_ERROR":
    default:
      return 503;
  }
}

/**
 * Runs sentiment analysis for a movie identified by IMDb ID.
 *
 * Input: `imdbId` query param.
 * Output: `{ sentiment }` on success, `{ error: SentimentErrorCode }` on failure.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get("imdbId");

  if (!imdbId || !isValidImdbId(imdbId)) {
    return NextResponse.json({ error: "INVALID_IMDB_ID" }, { status: 400 });
  }

  try {
    const reviews = await fetchMovieReviews(imdbId);

    try {
      const sentiment = await analyzeMovieSentiment(reviews);
      return NextResponse.json({ sentiment });
    } catch {
      return NextResponse.json(
        { error: "AI_ANALYSIS_FAILED" },
        { status: getStatusCode("AI_ANALYSIS_FAILED") },
      );
    }
  } catch (error: unknown) {
    const errorCode =
      error instanceof Error && isSentimentErrorCode(error.message)
        ? error.message
        : "NETWORK_ERROR";

    return NextResponse.json(
      { error: errorCode },
      { status: getStatusCode(errorCode) },
    );
  }
}
