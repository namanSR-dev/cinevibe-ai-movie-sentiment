/**
 * Environment configuration module.
 *
 * Centralizes access to runtime secrets and validates required values early so
 * API routes and services can assume configuration is present.
 */

/**
 * Environment values used across data and AI providers.
 */
export const env = {
  OMDB_API_KEY: process.env.OMDB_API_KEY,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

// OMDb is required for the movie metadata fast path used by the primary search flow.
if (!env.OMDB_API_KEY) {
  throw new Error("Missing OMDB_API_KEY in environment variables");
}
