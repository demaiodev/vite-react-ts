import type { MovieReview } from "../types/MovieReview";
import Container from "./Container";

export default function MovieReviewTile({
  movieReview,
}: {
  movieReview: MovieReview;
}) {
  return (
    <Container classNames="bg-gray-800 rounded-lg shadow-md shadow-gray-950 p-4">
      <h2 className="text-xl font-bold text-white hover:underline hover:cursor-pointer truncate">
        <a
          href={`https://www.imdb.com/title/${movieReview.imdbId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-[220px] truncate"
        >
          {movieReview.title}
        </a>
      </h2>

      <div className="movie-image-container">
        {movieReview.imageUrl ? (
          <img
            loading="lazy"
            src={movieReview.imageUrl}
            alt={movieReview.title}
            className="movie-image"
          />
        ) : (
          <div className="movie-image movie-image-placeholder">
            No image found :(
          </div>
        )}
      </div>
    </Container>
  );
}
