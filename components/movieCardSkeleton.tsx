import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <Card className="w-full max-w-4xl overflow-hidden border-border/40 shadow-lg">
      <CardContent className="flex flex-col md:flex-row gap-6 md:gap-8 p-6">

        {/* Poster Skeleton */}
        <div className="relative mx-auto md:mx-0 shrink-0">
          <Skeleton className="w-48 sm:w-56 md:w-60 h-[320px] rounded-xl" />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between gap-5 flex-1">

          {/* Title */}
          <Skeleton className="h-8 w-2/3" />

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-48 sm:col-span-2" />
          </div>

          {/* Plot */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>

          {/* Cast */}
          <Skeleton className="h-4 w-2/3" />

        </div>
      </CardContent>
    </Card>
  );
}