/**
 * Unit tests for IMDb ID validation.
 *
 * These tests protect the movie-search entrypoint from malformed identifiers
 * that would otherwise trigger avoidable API failures downstream.
 */

import { describe, expect, it } from "vitest";
import { isValidImdbId } from "@/lib/utils/validation";

describe("isValidImdbId", () => {
  it("returns true for valid IMDb IDs", () => {
    // Ensure valid IMDb IDs are accepted.
    // This prevents rejecting legitimate movie queries.
    expect(isValidImdbId("tt0111161")).toBe(true);
    expect(isValidImdbId("tt12345678")).toBe(true);
  });

  it("returns false for invalid IMDb IDs", () => {
    // IDs with the right prefix but wrong digit count should fail validation.
    // This blocks requests that would never resolve from OMDb/TMDB.
    expect(isValidImdbId("tt123456")).toBe(false);
    expect(isValidImdbId("tt123456789")).toBe(false);
  });

  it("returns false for malformed input", () => {
    // Non-canonical formats must be rejected early.
    // This keeps API calls deterministic and avoids unnecessary provider traffic.
    expect(isValidImdbId("TT0111161")).toBe(false);
    expect(isValidImdbId("imdb:tt0111161")).toBe(false);
    expect(isValidImdbId("ttABC1234")).toBe(false);
  });

  it("returns false for an empty string", () => {
    // Empty user input is a common edge case in search forms.
    // Rejecting it avoids unnecessary error handling deeper in the stack.
    expect(isValidImdbId("")).toBe(false);
  });
});
