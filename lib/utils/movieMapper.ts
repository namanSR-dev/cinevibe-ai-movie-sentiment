/**
 * Movie mapping utilities.
 *
 * Translates provider-specific OMDb payloads into the normalized `Movie` type
 * used by UI components and API responses.
 */

import { Movie } from "@/types/movie";

/**
 * Raw response shape returned by OMDb for a movie record.
 *
 * Keeping this explicit protects the mapping boundary from accidental `any` usage.
 */
export interface OmdbMovieResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  BoxOffice: string;
  Production: string;
  Response: string;
}

/**
 * Maps OMDb fields to the app's stable movie contract.
 *
 * Input: raw OMDb movie payload.
 * Output: normalized `Movie` object consumed by frontend components.
 */
export function mapOmdbToMovie(data: OmdbMovieResponse): Movie {
  return {
    id: data.imdbID,
    title: data.Title,
    releaseDate: data.Released,
    poster: data.Poster,
    plot: data.Plot,
    cast: data.Actors.split(",").map(actor => actor.trim()),
    rating: data.imdbRating,

    genre: data.Genre,
    runtime: data.Runtime,
    director: data.Director,
    awards: data.Awards
  };
}
