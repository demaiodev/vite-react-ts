import type { Movie } from "../types/Movie";

import { supabase } from "../supabaseClient";
import { getCurrentUserId } from "../supabaseServices";

export default function AddMovieButton({ movie }: { movie: Movie }) {
  async function handleClick() {
    supabase
      .from("movies")
      .insert({
        user_id: await getCurrentUserId(),
        imdb_id: movie.id,
        movie_title: movie.primaryTitle,
      })
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <button
      className="rounded-lg bg-gray-600 hover:bg-gray-500 p-1 w-full shadow-md hover:shadow-lg"
      onClick={() => {
        handleClick();
      }}
    >
      +
    </button>
  );
}
