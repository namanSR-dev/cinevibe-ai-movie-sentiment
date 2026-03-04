/**
 * OMDb service.
 *
 * Centralizes remote movie metadata retrieval so API routes can stay focused on
 * request validation and response shaping.
 */

import { env } from "@/lib/utils/env";

/**
 * Fetches the raw OMDb payload for an IMDb ID.
 *
 * This intentionally returns the provider response shape so mapping concerns
 * stay separated in the `movieMapper` utility.
 */
export async function fetchRawMovieFromOmdb(imdbId: string) {
  const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${env.OMDB_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movie from OMDb");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
}
