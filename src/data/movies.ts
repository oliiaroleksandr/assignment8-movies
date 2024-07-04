export type Movie = {
  id: number;
  title: string;
  rating: number;
  genre: string;
};

export const movies: Movie[] = [
  { id: 1, title: "Matrix", rating: 7.5, genre: "Action" },
  {
    id: 2,
    title: "Focus",
    rating: 6.9,
    genre: "Comedy",
  },
  { id: 3, title: "The Lazarus Effect", rating: 6.4, genre: "Thriller" },
  { id: 4, title: "Everly", rating: 5.0, genre: "Action" },
  { id: 5, title: "Maps to the stars", rating: 7.5, genre: "Drama" },
];
