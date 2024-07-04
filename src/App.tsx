import { useCallback, useEffect, useState } from "react";
import { Autocomplete, GenresSelect } from "./components";
import { movies as initialMovies } from "./data";

const App = () => {
  const [movies, setMovies] = useState(initialMovies);

  const [filters, setFilters] = useState({
    genres: [] as string[],
    search: "",
  });

  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  }, []);

  const handleGenreChange = useCallback((genres: string[]) => {
    setFilters((prev) => ({ ...prev, genres }));
  }, []);

  useEffect(() => {
    const filteredMovies = initialMovies.filter((movie) => {
      const formattedTile = movie.title.trim().toLowerCase();
      const formattedSearch = filters.search.trim().toLowerCase();

      if (!formattedTile.includes(formattedSearch)) {
        return false;
      }

      if (filters.genres.length > 0) {
        return !!filters.genres.find((genre) => genre === movie.genre);
      }

      return true;
    });

    setMovies(filteredMovies);
  }, [filters]);

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div className="flex w-full items-start gap-4">
        <div className="grow">
          <Autocomplete movies={movies} onSearchChange={handleSearchChange} />
        </div>
        <div className="basis-[12rem]">
          <GenresSelect value={filters.genres} onChange={handleGenreChange} />
        </div>
      </div>
    </div>
  );
};

export default App;
