import type { Movie } from "../types/Movie";
import AddMovieButton from "./AddMovieButton";
import Container from "./Container";

export default function MovieTile({ movie }: { movie: Movie }) {
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
      <AddMovieButton movie={movie} />
    </Container>
  );
}
