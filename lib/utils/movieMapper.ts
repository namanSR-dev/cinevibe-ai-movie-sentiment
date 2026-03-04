// Converts raw OMDb response into normalized Movie object

import { Movie } from "@/types/movie";

// Raw response returned by OMDb API
// since the structure of response is known, it's not good practice to use "any" as type.
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