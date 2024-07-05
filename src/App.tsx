import { useCallback, useEffect, useState } from "react";
import { Autocomplete, GenresSelect, RatingsSelect } from "./components";
import { movies as initialMovies } from "./data";

const App = () => {
  const [movies, setMovies] = useState(initialMovies);

  const [filters, setFilters] = useState({
    genres: [] as string[],
    search: "",
    rating: 0,
  });

  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  }, []);

  const handleGenreChange = useCallback((genres: string[]) => {
    setFilters((prev) => ({ ...prev, genres }));
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setFilters((prev) => ({ ...prev, rating }));
  }, []);

  useEffect(() => {
    const filteredMovies = initialMovies.filter((movie) => {
      const formattedTile = movie.title.trim().toLowerCase();
      const formattedSearch = filters.search.trim().toLowerCase();

      if (!formattedTile.includes(formattedSearch)) {
        return false;
      }

      if (filters.genres.length > 0) {
        if (!filters.genres.find((genre) => genre === movie.genre)) {
          return false;
        }
      }

      if (filters.rating > 0 && movie.rating < filters.rating) {
        return false;
      }

      return true;
    });

    setMovies(filteredMovies);
  }, [filters]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex w-full flex-col-reverse items-start gap-4 md:flex-row">
        <div className="w-full md:basis-[65%] lg:basis-[75%]">
          <Autocomplete movies={movies} onSearchChange={handleSearchChange} />
        </div>
        <div className="flex w-full items-center gap-4 md:basis-[40%] lg:basis-[35%]">
          <div className="grow">
            <RatingsSelect
              value={filters.rating}
              onChange={handleRatingChange}
            />
          </div>
          <div className="grow">
            <GenresSelect value={filters.genres} onChange={handleGenreChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
