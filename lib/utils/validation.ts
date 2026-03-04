/**
 * Validation utilities.
 *
 * Shared by both API routes and client components to keep IMDb ID validation
 * behavior consistent across the entire request flow.
 */

/**
 * Validates IMDb title IDs in the canonical `tt1234567`/`tt12345678` format.
 *
 * Input: user-provided ID string.
 * Output: `true` when the ID matches supported IMDb patterns.
 */
export function isValidImdbId(id: string): boolean {
  const imdbRegex = /^tt\d{7,8}$/;
  return imdbRegex.test(id);
}
