import { useState, useEffect } from "react";
import Container from "@/components/Container";
import MovieReviewTile from "@/components/MovieReviewTile";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getMovieReviews } from "@/supabaseServices";
import type { MovieReview } from "@/types/MovieReview";
import { NavLink } from "react-router";

export default function MyList() {
  const [movieReviews, setMovieReviews] = useState<Array<MovieReview> | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieReviews().then((res) => {
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
            runtime: data.runtime ?? 0,
            finished: data.finished,
          };
        })
      );
      setLoading(false);
    });
  }, []);

  return (
    <Container classNames="m-4">
      {loading && (
        <div
          className="mt-20 flex flex-col justify-center items-center"
          style={{
            width: "75vw",
            height: "75vh",
          }}
        >
          <LoadingSpinner />
        </div>
      )}
      {!loading && movieReviews.length === 0 && (
        <div
          className="flex flex-col justify-center border rounded-2xl border-gray-800 mt-20"
          style={{
            width: "75vw",
            height: "75vh",
          }}
        >
          <h1 className="text-xl text-gray-400">There's nothing here :(</h1>
          <p className="text-gray-500 mt-2">
            Try adding some movies from the{" "}
            <NavLink
              to={"/"}
              className="hover:text-gray-100 hover:underline text-gray-400"
            >
              homepage ➜
            </NavLink>
          </p>
        </div>
      )}
      {!loading &&
        movieReviews.length > 0 &&
        movieReviews.map((movie) => (
          <MovieReviewTile
            key={movie.id}
            movieReview={movie}
            setMovieReviews={setMovieReviews}
          />
        ))}
    </Container>
  );
}
