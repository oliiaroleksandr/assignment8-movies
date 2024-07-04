import { useCallback, useState } from "react";
import { movies as initialMovies } from "./data";
import { Autocomplete } from "./components";

const App = () => {
  const [movies, setMovies] = useState(initialMovies);

  const handleSearchChange = useCallback((query: string) => {
    const formattedQuery = query.trim().toLowerCase();

    const searchedMovies = initialMovies.filter((movie) => {
      const formattedTile = movie.title.trim().toLowerCase();
      return formattedTile.startsWith(formattedQuery);
    });

    setMovies(searchedMovies);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Autocomplete movies={movies} onSearchChange={handleSearchChange} />
    </div>
  );
};

export default App;
