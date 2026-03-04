/**
 * Sentiment error-to-toast mapper.
 *
 * Converts structured backend error codes into user-facing notifications so
 * UI logic can stay concise and consistent.
 */
import { SentimentErrorCode } from "@/types/sentimentErrorCode";
import { toast } from "sonner";

/**
 * Displays an appropriate toast message for sentiment pipeline failures.
 *
 * Input: optional backend error code from `/api/sentiment`.
 */
export function showSentimentErrorToast(errorCode?: SentimentErrorCode) {
  switch (errorCode) {
    case "INVALID_IMDB_ID":
      toast.warning("Please enter a valid IMDb ID.");
      return;
    case "TMDB_MOVIE_NOT_FOUND":
      toast.error("No audience reviews available for this movie.");
      return;
    case "NO_REVIEWS_AVAILABLE":
      toast.error("No audience reviews available for sentiment analysis.");
      return;
    case "AI_ANALYSIS_FAILED":
      toast.error("AI analysis failed. Please try again.");
      return;
    case "NETWORK_ERROR":
    default:
      toast.error("Network error. Please try again.");
  }
}
