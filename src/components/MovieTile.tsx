import { type SetStateAction, type Dispatch, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Movie } from "../types/Movie";
import { insertMovie } from "../supabaseServices";
import Container from "./Container";

export default function MovieTile({
  movie,
  saved,
  setSavedMovies,
}: {
  movie: Movie;
  saved: boolean;
  setSavedMovies: Dispatch<SetStateAction<Array<string>>>;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Container classNames="bg-gray-800 rounded-lg shadow-md shadow-gray-950 p-4">
      <h2 className="text-xl font-bold text-white hover:underline hover:cursor-pointer truncate">
        <a
          href={`https://www.imdb.com/title/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-[220px] truncate"
        >
          {movie.primaryTitle}
        </a>
      </h2>

      <p className="text-gray-400">
        {movie.startYear ? movie.startYear + " - " : ""}
        {movie.rating?.aggregateRating
          ? `${movie.rating.aggregateRating}/10`
          : "No ratings"}
      </p>
      <div className="movie-image-container">
        {movie.primaryImage?.url ? (
          <img
            loading="lazy"
            src={movie.primaryImage.url}
            alt={movie.primaryTitle}
            className="movie-image"
          />
        ) : (
          <div className="movie-image movie-image-placeholder">
            No image found :(
          </div>
        )}
      </div>
      <>
        {saved ? (
          <span className="rounded-lg bg-gray-900 w-full p-1 font-bold">
            Added ➜
          </span>
        ) : (
          <button
            className="rounded-lg bg-gray-600 hover:bg-gray-500 p-1 w-full shadow-md hover:shadow-lg font-extrabold flex items-center justify-center"
            onClick={() => {
              setLoading(true);
              insertMovie(movie).then(() => {
                setSavedMovies((s) => [...s, movie.id]);
                setLoading(false);
              });
            }}
          >
            <span>{loading ? <LoadingSpinner size="24px" /> : "+"}</span>
          </button>
        )}
      </>
    </Container>
  );
}
