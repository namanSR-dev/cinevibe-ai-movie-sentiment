/**
 * Sentiment loading placeholder.
 *
 * Keeps the sentiment section visually active while AI analysis is in flight.
 */
import { Card, CardContent } from "@/components/ui/card";

/**
 * Lightweight loading state displayed between movie render and sentiment render.
 */
export function SentimentLoading() {
  return (
    <Card className="w-full max-w-4xl border-border/40 shadow-md">
      <CardContent className="p-6 flex flex-col gap-3">
        <p className="text-lg tracking-widest text-muted-foreground italic">
          AI is analyzing audience reviews...
        </p>

        <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
      </CardContent>
    </Card>
  );
}
