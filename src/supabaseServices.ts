import { supabase } from "./supabaseClient";

const MOVIE_TABLE = "movies";

export async function getCurrentUserId() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return user?.id;
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

export async function insertMovie(id: string, title: string) {
  try {
    const { data, error } = await supabase.from(MOVIE_TABLE).insert({
      user_id: await getCurrentUserId(),
      imdb_id: id,
      movie_title: title,
    });
    if (error) {
      throw new Error(`Postgres Error: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}
