import { MouseEvent, useEffect, useState } from "react";
import { Input, Popover, PopoverContent, PopoverTrigger } from "../ui";
import { useDebouncedValue } from "@/lib/hooks";
import { Movie } from "@/data/movies";
import AutocompleteItem from "./AutocompleteItem";

type Props = {
  movies: Movie[];
  onSearchChange: (search: string) => void;
};

const Autocomplete = ({ movies, onSearchChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
    if (open) {
      e.stopPropagation();
    }
  };

  const handleIntereactOutside = (e: Event) => {
    const target = e.target as Element;
    if (target?.closest(".genres-select")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="autocomplete w-full ">
        <label htmlFor="search" className="sr-only">
          Search movies
        </label>
        <Input
          id="search"
          placeholder="Enter movie name"
          type="text"
          value={search}
          autoComplete="off"
          onClick={handleInputClick}
          onChange={(e) => setSearch(e.target.value)}
        />
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={handleIntereactOutside}
        className="autocomplete"
        align="start"
      >
        <div className="flex flex-col gap-6">
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
      </PopoverContent>
    </Popover>
  );
};

export default Autocomplete;
