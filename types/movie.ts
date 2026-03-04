// Defines TypeScript types and interfaces representing movie metadata used across the application.

// Represents normalized movie metadata used across the application

export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  plot: string;
  cast: string[];
  rating: string;

  genre: string;
  runtime: string;
  director: string;
  awards: string;
}