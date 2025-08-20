import { supabase } from "./supabaseClient";
import type { Movie } from "./types/Movie";
import type { MovieReview } from "./types/MovieReview";

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

export async function getSavedMovieIds() {
  try {
    const { data, error } = await supabase.from(MOVIE_TABLE).select("imdb_id");
    if (error) {
      throw new Error(`Error getting saved IDs: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function getMovieReviews() {
  try {
    const { data, error } = await supabase
      .from(MOVIE_TABLE)
      .select()
      .order("id", { ascending: false });
    if (error) {
      throw new Error(`Error getting reviews: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateMovieReview(review: MovieReview) {
  try {
    const { data, error } = await supabase
      .from(MOVIE_TABLE)
      .update({
        id: review.id,
        imdb_id: review.imdbId,
        recc_by: review.reccBy,
        personal_rating: review.personalRating,
        personal_review: review.personalReview,
      })
      .eq("id", review.id)
      .select();
    if (error) {
      throw new Error(`Error updating review: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function insertMovie(movie: Movie) {
  try {
    const payload = {
      user_id: (await getCurrentUserId()) ?? "",
      imdb_id: movie.id,
      movie_title: movie.primaryTitle,
      image_url: movie.primaryImage?.url,
    };
    if (!payload.user_id) return;
    const { data, error } = await supabase.from(MOVIE_TABLE).insert(payload);
    if (error) {
      throw new Error(`Error inserting movie: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteMovieReview(id: number) {
  try {
    const { data, error } = await supabase
      .from(MOVIE_TABLE)
      .delete()
      .eq("id", id);
    if (error) {
      throw new Error(`Error deleting review: ${error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}
