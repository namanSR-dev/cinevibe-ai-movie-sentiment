// Fetches raw movie metadata from OMDb API

import { env } from "@/lib/utils/env";

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