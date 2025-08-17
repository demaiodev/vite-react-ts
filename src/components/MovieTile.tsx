import type { Movie } from "../types/Movie";
import Container from "./Container";

export default function MovieTile({ movie }: { movie: Movie }) {
  return (
    <Container classNames="p-4 bg-gray-800 rounded-lg shadow-md shadow-gray-950">
      <h2 className="text-xl font-bold text-white hover:underline hover:cursor-pointer truncate">
        <a
          href={`https://www.imdb.com/title/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {movie.originalTitle}
        </a>
      </h2>

      <p className="text-gray-400">
        {movie.startYear}
        {" - "}
        {movie.rating?.aggregateRating
          ? `${movie.rating.aggregateRating}/10`
          : "No ratings"}
      </p>
      {movie.primaryImage?.url ? (
        <img
          loading="lazy"
          src={movie.primaryImage.url}
          alt={movie.originalTitle}
          className="my-2 rounded-lg"
          style={{ height: "500px" }}
        />
      ) : (
        <div
          className="mt-2 rounded-lg bg-gray-700 flex items-center justify-center text-gray-400"
          style={{ height: "500px" }}
        >
          No image found :(
        </div>
      )}
      <button className="rounded-lg bg-gray-600 hover:bg-gray-500 p-1 w-full shadow-md hover:shadow-lg">
        +
      </button>
    </Container>
  );
}
