/**
 * Sentiment result card.
 *
 * Presents Gemini-generated audience sentiment once the asynchronous analysis
 * pipeline completes.
 */
import { Card, CardContent } from "@/components/ui/card";
import { MovieSentiment } from "@/types/sentiment";
import { motion } from "framer-motion";
import { FileText, ThumbsUp, ThumbsDown } from "lucide-react";

/**
 * Converts confidence labels into visual status colors for quick scanning.
 */
function getConfidenceColor(confidence: string) {
  switch (confidence.toLowerCase()) {
    case "high":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-red-500";
    default:
      return "bg-muted";
  }
}

/**
 * Renders a structured summary of strengths, weaknesses, and confidence.
 */
export function SentimentCard({ sentiment }: { sentiment: MovieSentiment }) {
  const confidenceColor = getConfidenceColor(sentiment.confidence);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-4xl"
    >
      <Card className="border-border/40 shadow-lg">
        <CardContent className="p-6 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">

            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-semibold tracking-wide">
                Audience Sentiment
              </h3>

              <span className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/30">
                AI Generated
              </span>
            </div>

            {/* Confidence Indicator */}
            <div className="flex items-center gap-2 text-sm font-medium">

              <span className="capitalize">
                {sentiment.sentiment}
              </span>

              <span className="text-muted-foreground">•</span>

              <span className="flex items-center gap-2">

                <span
                  className={`h-2.5 w-2.5 rounded-full ${confidenceColor}`}
                />

                <span className="capitalize text-muted-foreground">
                  {sentiment.confidence} confidence
                </span>

              </span>

            </div>

          </div>

          {/* Summary */}
          <div>
            <h4 className="flex items-center gap-2 text-md text-primary font-semibold mb-1">
              <FileText size={18} />
              Summary
            </h4>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {sentiment.summary}
            </p>
          </div>

          {/* Strengths */}
          <div>
            <h4 className="flex items-center gap-2 text-md text-green-400 font-semibold mb-2">
              <ThumbsUp size={18} />
              Strengths
            </h4>

            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {sentiment.strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div>
            <h4 className="flex items-center gap-2 text-md text-rose-400 font-semibold mb-2">
              <ThumbsDown size={18} />
              Weaknesses
            </h4>

            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {sentiment.weaknesses.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
