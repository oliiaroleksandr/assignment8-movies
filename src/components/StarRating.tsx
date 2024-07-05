import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type Props = {
  rating: number;
};

const StarRating = ({ rating }: Props) => {
  const filledStars = Math.floor(rating);
  const partialStarWidth = (rating - filledStars) * 100;

  return (
    <div className="relative flex items-center">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="relative h-5 w-5">
            <Star
              className={cn(
                "h-4 w-4 sm:h-5 sm:w-5",
                i < filledStars ? "fill-current" : "fill-none",
              )}
            />
            {i === filledStars && (
              <div
                className="absolute left-0 top-0 h-full overflow-hidden"
                style={{ width: `${partialStarWidth}%` }}
              >
                <Star className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default StarRating;
