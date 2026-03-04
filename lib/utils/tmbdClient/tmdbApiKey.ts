import { env } from "@/lib/utils/env";

export function getTmdbApiKey(): string {
  if (!env.TMDB_API_KEY) {
    throw new Error("Missing TMDB_API_KEY in environment variables");
  }

  return env.TMDB_API_KEY;
}
