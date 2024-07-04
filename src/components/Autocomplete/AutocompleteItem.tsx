import { Movie } from "@/data/movies";

const AutocompleteItem = ({ title, genre, rating }: Omit<Movie, "id">) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{rating}</p>
      </div>
      <p className="font-semibold text-muted-foreground">{genre}</p>
    </div>
  );
};

export default AutocompleteItem;
