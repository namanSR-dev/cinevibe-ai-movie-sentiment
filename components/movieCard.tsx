import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { Star, Clock, Film, User, Calendar } from "lucide-react";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="w-full max-w-4xl">
      <Card className="overflow-hidden border-border/40 shadow-lg">
        <CardContent className="flex flex-col md:flex-row gap-6 md:gap-8 p-6">
          {/* Poster */}
          <div className="relative mx-auto md:mx-0 shrink-0">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={240}
              height={360}
              className="rounded-xl object-cover shadow-md shadow-primary/20 border border-primary/30 w-48 sm:w-56 md:w-60"
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between gap-5 flex-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {movie.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Star size={18} />
                <span>{movie.rating} IMDb</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16} />
                <span>{movie.runtime}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Film size={16} />
                <span>{movie.genre}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={16} />
                <span>{movie.director}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                <Calendar size={16} />
                <span>{movie.releaseDate}</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed italic text-muted-foreground text-justify border border-primary/30 rounded-md p-3 bg-primary/5">
              {movie.plot}
            </p>

            <p className="text-sm text-muted-foreground">
              <span className="font-semibold tracking-wide text-foreground">
                Cast:
              </span>{" "}
              {movie.cast.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
