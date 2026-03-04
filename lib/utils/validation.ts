// Contains input validation utilities such as IMDb ID format checking and request data validation.

// Validates whether a string is a valid IMDb movie ID (e.g., tt0133093)

export function isValidImdbId(id: string): boolean {
  const imdbRegex = /^tt\d{7,8}$/;
  return imdbRegex.test(id);
}