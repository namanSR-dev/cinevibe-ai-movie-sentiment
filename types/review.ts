export type TmdbFindResponse = {
  movie_results?: Array<{ id?: number }>;
  status_message?: string;
};

export type TmdbReviewsResponse = {
  results?: Array<{ content?: string }>;
  status_message?: string;
};
