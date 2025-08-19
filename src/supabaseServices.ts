import { supabase } from "./supabaseClient";
import type { Movie } from "./types/Movie";

const MOVIE_TABLE = "movies";

export async function getCurrentUserId() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    if (!user)
      throw new Error(
        "Error getting user ID for DB transactions - try again later."
      );
    return user.id;
  } catch (e) {
    console.error(e);
  }
}

export async function getMovieList() {
  try {
    const { data, error } = await supabase.from(MOVIE_TABLE).select();
    if (error) {
      throw new Error(`Postgres Error: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function insertMovie(movie: Movie) {
  try {
    const { data, error } = await supabase.from(MOVIE_TABLE).insert({
      user_id: await getCurrentUserId(),
      imdb_id: movie.id,
      movie_title: movie.primaryTitle,
      image_url: movie.primaryImage?.url,
    });
    if (error) {
      throw new Error(`Postgres Error: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}
