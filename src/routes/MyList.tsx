import { useState, useEffect } from "react";
import Container from "../components/Container";
import Grid from "../components/Grid";
import MovieReviewTile from "../components/MovieReviewTile";
import LoadingSpinner from "../components/LoadingSpinner";
import { getMovieList } from "../supabaseServices";
import type { MovieReview } from "../types/MovieReview";

export default function MyList() {
  const [movieReviews, setMovieReviews] = useState<Array<MovieReview> | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieList().then((res) => {
      if (!res) return;
      setMovieReviews(
        res.map((data) => {
          return {
            id: data.id,
            createdDate: data.created_at,
            title: data.movie_title,
            imdbId: data.imdb_id,
            personalRating: data.personal_rating ?? undefined,
            personalReview: data.personal_review ?? undefined,
            reccBy: data.recc_by ?? undefined,
            imageUrl: data.image_url ?? undefined,
          };
        })
      );
      setLoading(false);
    });
  }, []);

  return (
    <Container classNames="m-4">
      {loading && <LoadingSpinner />}
      {!loading && movieReviews.length > 0 && (
        <Grid>
          {movieReviews.map((movie) => (
            <MovieReviewTile key={movie.id} movieReview={movie} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
