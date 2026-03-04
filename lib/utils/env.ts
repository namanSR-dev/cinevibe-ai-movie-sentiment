// Validates and exposes required environment variables such as API keys used by server-side services.

// Validates required environment variables for the server runtime

export const env = {
  OMDB_API_KEY: process.env.OMDB_API_KEY,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

if (!env.OMDB_API_KEY) {
  throw new Error("Missing OMDB_API_KEY in environment variables");
}