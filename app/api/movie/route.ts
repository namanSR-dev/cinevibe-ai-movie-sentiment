/**
 * Movie metadata API route.
 *
 * Provides the fast path in the CineVibe pipeline by returning normalized
 * movie metadata from OMDb without waiting on sentiment analysis.
 */
import { NextResponse } from "next/server";
import { fetchRawMovieFromOmdb } from "@/lib/api/omdb";
import { mapOmdbToMovie } from "@/lib/utils/movieMapper";
import { isValidImdbId } from "@/lib/utils/validation";

/**
 * Resolves a movie by IMDb ID and returns normalized metadata for the UI.
 *
 * Input: `imdbId` query param.
 * Output: `{ movie }` on success, error payload otherwise.
 */
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
    const movie = mapOmdbToMovie(rawMovie);

    return NextResponse.json({ movie });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}
