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
    <>
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
      <div className="flex flex-wrap gap-4 mt-6">
        {/* The Matrix - Emerald/Neo-Green accent */}
        <button
          onClick={() => onSearch("tt0133093")}
          className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border bg-background/50 backdrop-blur-md rounded-md hover:scale-105 active:scale-95
               text-emerald-500 border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          The Matrix
        </button>

        {/* Inception - Indigo/Deep-Blue accent */}
        <button
          onClick={() => onSearch("tt1375666")}
          className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border bg-background/50 backdrop-blur-md rounded-md hover:scale-105 active:scale-95
               text-indigo-400 border-indigo-400/20 hover:border-indigo-400/50 hover:bg-indigo-400/5 hover:shadow-[0_0_15px_rgba(129,140,248,0.1)]"
        >
          Inception
        </button>

        {/* Interstellar - Amber/Gold accent */}
        <button
          onClick={() => onSearch("tt0816692")}
          className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border bg-background/50 backdrop-blur-md rounded-md hover:scale-105 active:scale-95
               text-amber-500 border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-500/5 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
        >
          Interstellar
        </button>
      </div>
    </>
  );
}
