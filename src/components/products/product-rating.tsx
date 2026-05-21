import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: number;
  showValue?: boolean;
  size?: "sm" | "md";
}

export function ProductRating({
  rating,
  showValue = true,
  size = "sm",
}: ProductRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const iconSize = size === "sm" ? "size-3" : "size-3.5";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <Star
            key={star}
            className={cn(
              iconSize,
              star <= Math.round(rating)
                ? "fill-zinc-900 text-zinc-900"
                : "fill-zinc-200 text-zinc-200"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-zinc-500">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
