import { Movie } from "@/data/movies";
import StarRating from "../StarRating";

const AutocompleteItem = ({ title, genre, rating }: Omit<Movie, "id">) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <StarRating rating={rating} />
      </div>
      <span className="text-sm font-semibold text-muted-foreground">
        {genre}
      </span>
    </div>
  );
};

export default AutocompleteItem;
