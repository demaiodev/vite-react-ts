import type { Movie } from "../types/Movie";

import { supabase } from "../supabaseClient";

export default function AddMovieButton({ movie }: { movie: Movie }) {
  function handleClick() {
    supabase
      .from("movies")
      .select()
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
