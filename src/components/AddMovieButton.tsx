import type { Movie } from "../types/Movie";
import { insertMovie } from "../supabaseServices";

export default function AddMovieButton({ movie }: { movie: Movie }) {
  return (
    <button
      className="rounded-lg bg-gray-600 hover:bg-gray-500 p-1 w-full shadow-md hover:shadow-lg font-extrabold"
      onClick={() => {
        insertMovie(movie);
      }}
    >
      +
    </button>
  );
}
