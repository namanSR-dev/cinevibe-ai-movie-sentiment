/**
 * Main search page for CineVibe.
 *
 * Coordinates the progressive UX pipeline:
 * 1) fetch and render movie metadata quickly,
 * 2) run sentiment analysis asynchronously,
 * 3) surface errors through standardized toasts.
 */
"use client";

import { useState } from "react";
import { MovieSearch } from "@/components/movie-searchBar";
import { MovieCard } from "@/components/movieCard";
import { MovieCardSkeleton } from "@/components/movieCardSkeleton";
import { Movie } from "@/types/movie";
import { AnimatePresence, motion } from "framer-motion";
import { MovieSentiment } from "@/types/sentiment";
import { SentimentCard } from "@/components/sentimentCard";
import { SentimentLoading } from "@/components/sentimentSkeleton";
import { toast } from "sonner";
import { isValidImdbId } from "@/lib/utils/validation";
import { SentimentErrorCode } from "@/types/sentimentErrorCode";
import { showSentimentErrorToast } from "@/lib/utils/errorMapper";

/**
 * Root client component that orchestrates search, loading transitions, and
 * progressive rendering of movie and sentiment results.
 */
export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [sentiment, setSentiment] = useState<MovieSentiment | null>(null);

  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [isSentimentLoading, setIsSentimentLoading] = useState(false);

  /**
   * Handles the end-to-end search interaction for a submitted IMDb ID.
   *
   * It intentionally starts sentiment work only after movie metadata resolves
   * so the first meaningful UI paint happens as early as possible.
   */
  const handleSearch = async (imdbId: string) => {
    const normalizedImdbId = imdbId.trim();

    if (!isValidImdbId(normalizedImdbId)) {
      toast.warning("Please enter a valid IMDb ID.");
      return;
    }

    setIsMovieLoading(true);
    setIsSentimentLoading(false);

    setMovie(null);
    setSentiment(null);

    try {
      // ---------- Fetch Movie Metadata ----------
      const movieRes = await fetch(`/api/movie?imdbId=${normalizedImdbId}`);
      const movieData = (await movieRes.json()) as {
        movie?: Movie;
        error?: string;
      };

      if (!movieRes.ok || !movieData.movie) {
        toast.error("Failed to fetch movie details");
        setIsMovieLoading(false);
        return;
      }

      setMovie(movieData.movie);
      setIsMovieLoading(false);

      // Sentiment runs in a detached async task so movie rendering is not blocked.
      setIsSentimentLoading(true);

      (async () => {
        try {
          const sentimentRes = await fetch(
            `/api/sentiment?imdbId=${normalizedImdbId}`
          );
          const sentimentData = (await sentimentRes.json()) as {
            sentiment?: MovieSentiment;
            error?: SentimentErrorCode;
          };

          if (!sentimentRes.ok || !sentimentData.sentiment) {
            showSentimentErrorToast(sentimentData.error);
            setIsSentimentLoading(false);
            return;
          }

          // small delay for smoother UI transition
          setTimeout(() => {
            if (sentimentData.sentiment) {
              setSentiment(sentimentData.sentiment);
            }
            setIsSentimentLoading(false);
          }, 300);
        } catch {
          showSentimentErrorToast("NETWORK_ERROR");
          setIsSentimentLoading(false);
        }
      })();
    } catch {
      toast.error("Failed to fetch movie details");
      setIsMovieLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:px-10">
      {/* ---------- Header ---------- */}
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-widest text-primary font-bold">
          CineVibe
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground italic mt-2">
          Discover your next favorite movie
        </p>
      </div>

      {/* ---------- Search ---------- */}
      <MovieSearch onSearch={handleSearch} />
      <div className="w-full max-w-4xl h-[1.8px] bg-border/50" />

      {/* ---------- Movie Section ---------- */}
      <AnimatePresence mode="wait">
        {isMovieLoading && (
          <motion.div
            key="movie-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center"
          >
            <MovieCardSkeleton />
          </motion.div>
        )}

        {!isMovieLoading && movie && (
          <motion.div
            key="movie-card"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <MovieCard movie={movie} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Sentiment Section ---------- */}
      <AnimatePresence mode="wait">
        {movie && isSentimentLoading && (
          <motion.div
            key="sentiment-loading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full flex justify-center"
          >
            <SentimentLoading />
          </motion.div>
        )}

        {movie && !isSentimentLoading && sentiment && (
          <motion.div
            key="sentiment-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <SentimentCard sentiment={sentiment} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
