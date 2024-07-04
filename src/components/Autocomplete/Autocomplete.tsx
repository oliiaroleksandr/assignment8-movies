import { useEffect, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { Input } from "../ui";
import { cn } from "@/lib/utils";
import { Movie } from "@/data/movies";
import { useDebouncedValue } from "@/lib/hooks";
import AutocompleteItem from "./AutocompleteItem";

type Props = {
  movies: Movie[];
  onSearchChange: (search: string) => void;
};

const Autocomplete = ({ movies, onSearchChange }: Props) => {
  const [search, setSearch] = useState("");
  const [isExtended, setIsExtended] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 300);
  const [ref, hasClickedOutside] = useClickOutside();

  const handleCloseClick = () => {
    setIsExtended(false);
    setSearch("");
  };

  useEffect(() => {
    setIsExtended(false);
  }, [hasClickedOutside]);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div ref={ref}>
      <div className="flex mb-2 items-center gap-2 border-[1.5px] border-input focus-within:border-black px-4 transition-all rounded-sm">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          className="border-none px-0"
          id="search"
          placeholder="Enter movie name"
          type="text"
          value={search}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsExtended(true)}
        />
        {search.length > 0 && (
          <button
            onClick={handleCloseClick}
            className="text-xl -mt-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            x
          </button>
        )}
      </div>
      <div
        className={cn(
          "overflow-y-scroll rounded-sm transition-all border-[1.5px] border-input p-4 flex flex-col gap-4",
          isExtended ? "h-72 opacity-100" : "h-0 opacity-0",
        )}
      >
        {movies.length > 0 ? (
          movies.map(({ id, ...movie }) => (
            <AutocompleteItem key={id} {...movie} />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
