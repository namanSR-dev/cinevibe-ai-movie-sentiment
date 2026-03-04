import { NextResponse } from "next/server";
import { fetchRawMovieFromOmdb } from "@/lib/api/omdb";
import { mapOmdbToMovie } from "@/lib/utils/movieMapper";
import { isValidImdbId } from "@/lib/utils/validation";
import { fetchMovieReviews } from "@/lib/api/tmdb";
import { analyzeMovieSentiment } from "@/lib/ai/gemini";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get("imdbId");

  if (!imdbId || !isValidImdbId(imdbId)) {
    return NextResponse.json(
      { error: "Invalid IMDb ID" },
      { status: 400 }
    );
  }

  try {
    const rawMovie = await fetchRawMovieFromOmdb(imdbId);

    const reviews = await fetchMovieReviews(imdbId);

    const sentiment = await analyzeMovieSentiment(reviews)
    const movie = mapOmdbToMovie(rawMovie);

    return NextResponse.json({movie , reviews, sentiment});
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}