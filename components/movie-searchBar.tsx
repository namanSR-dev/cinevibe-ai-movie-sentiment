/**
 * Movie search form component.
 *
 * Captures IMDb IDs and forwards sanitized input to the page-level search
 * handler without embedding API logic in the UI layer.
 */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Renders the IMDb ID input and submit action used to trigger analysis.
 */
export function MovieSearch({ onSearch }: { onSearch: (id: string) => void }) {
  const [imdbId, setImdbId] = useState("");

  /**
   * Normalizes user input before propagating it to the parent workflow.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imdbId.trim()) return;

    onSearch(imdbId.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-xl"
    >
      <Input
        placeholder="Enter IMDb ID (e.g. tt0133093)"
        value={imdbId}
        onChange={(e) => setImdbId(e.target.value)}
        className="flex-1"
      />

      <Button type="submit" className="w-full sm:w-auto">
        Analyze
      </Button>
    </form>
  );
}
