"use client";

import { useState } from "react";
import { MovieSearch } from "@/components/movie-searchBar";
import { MovieCard } from "@/components/movieCard";
import { MovieCardSkeleton } from "@/components/movieCardSkeleton";
import { Movie } from "@/types/movie";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (imdbId: string) => {
    setLoading(true);
    setMovie(null);

    const res = await fetch(`/api/movie?imdbId=${imdbId}`);
    const data = await res.json();

    setMovie(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center gap-8 px-4 py-10 sm:px-6 lg:px-10">
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-widest text-primary font-bold">
          CineVibe
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground italic mt-2">
          Discover your next favorite movie
        </p>
      </div>

      <MovieSearch onSearch={handleSearch} />

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            <MovieCardSkeleton />
          </motion.div>
        )}

        {!loading && movie && (
          <motion.div
            key="movie"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            <MovieCard movie={movie} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
