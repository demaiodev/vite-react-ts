import { useState, type Dispatch, type SetStateAction } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { MovieReview } from "@/types/MovieReview";
import Container from "@/components/Container";
import { updateMovieReview, deleteMovieReview } from "@/supabaseServices";

const recommenders = ["Bill", "Brandon", "Langties", "TPetz"];

function ReviewStar({ filled = false, hovered = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={filled ? "star-icon star-icon-filled" : "star-icon"}
      style={{
        fill: !filled && hovered ? "oklch(55.1% 0.027 264.364)" : "",
      }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="#030712"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

export default function MovieReviewTile({
  movieReview,
  setMovieReviews,
}: {
  movieReview: MovieReview;
  setMovieReviews: Dispatch<SetStateAction<Array<MovieReview>>>;
}) {
  const [finished, setFinished] = useState(movieReview.finished || false);
  const [reccBy, setReccBy] = useState<string>(movieReview.reccBy || "");
  const [starsFilled, setStarsFilled] = useState<number>(
    movieReview.personalRating || 0
  );
  const [hovered, setHovered] = useState<number | null>(null);
  const [personalReview, setPersonalReview] = useState<string>(
    movieReview.personalReview || ""
  );
  const [busy, setBusy] = useState({
    saving: false,
    deleting: false,
  });

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h${minutes}m`;
  };

  return (
    <Container classNames="bg-gray-800 rounded-lg shadow-md shadow-gray-950 p-4 m-2">
      <div className="movie-review flex items-center">
        <div>
          <h2 className="text-xl font-bold text-white hover:underline hover:cursor-pointer truncate">
            <a
              href={`https://www.imdb.com/title/${movieReview.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-[175px] truncate"
            >
              {movieReview.title}
            </a>
          </h2>
          {movieReview.runtime !== 0 && (
            <div className="text-sm text-gray-400">
              {formatTime(movieReview.runtime)}
            </div>
          )}
          <div
            className="movie-image-container"
            style={{
              width: "175px",
              height: "275px",
            }}
          >
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
        </div>

        <div className="flex flex-col ml-4 justify-between">
          <div className="flex flex-col items-start m-2">
            <label htmlFor="reccBy" className="text-sm">
              Recommended By:
            </label>
            <select
              id="reccBy"
              name="reccBy"
              className="bg-gray-950 rounded p-2"
              style={{
                width: "150px",
              }}
              value={reccBy}
              onChange={(e) => setReccBy(e.target.value)}
            >
              <option value="">Select one</option>
              {recommenders.map((person) => {
                return (
                  <option key={person} value={person}>
                    {person}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col items-start m-2">
            <label className="text-sm">Rating:</label>
            <div className="flex-row">
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setStarsFilled(i + 1)}
                    onMouseEnter={() => setHovered(i + 1)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <ReviewStar
                      filled={hovered == null ? i < starsFilled : i < hovered}
                      hovered={hovered !== null}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="rounded-lg bg-gray-700 hover:bg-green-900 p-1 w-full shadow-md hover:shadow-xl font-bold mt-2 flex justify-center items-center"
            onClick={() => {
              setBusy({ ...busy, saving: true });
              updateMovieReview({
                reccBy,
                finished,
                personalReview,
                id: movieReview.id,
                imdbId: movieReview.imdbId,
                personalRating: starsFilled,
                runtime: movieReview.runtime,
              }).then(() => {
                setBusy({ ...busy, saving: false });
              });
            }}
          >
            {busy.saving ? <LoadingSpinner size="24px" /> : "Save"}
          </button>
          <button
            className="rounded-lg bg-gray-950 hover:bg-red-900 p-1 w-full shadow-md hover:shadow-xl font-bold mt-2 flex justify-center items-center"
            onClick={() => {
              if (
                confirm(`Are you sure you want to delete ${movieReview.title}?`)
              ) {
                setBusy({ ...busy, deleting: true });
                deleteMovieReview(movieReview.id)
                  .then(() => {
                    setMovieReviews((p) =>
                      p.filter((x) => x.id !== movieReview.id)
                    );
                  })
                  .finally(() => setBusy({ ...busy, deleting: false }));
              }
            }}
          >
            {busy.deleting ? <LoadingSpinner size="24px" /> : "Delete"}
          </button>
        </div>

        <div className="flex flex-col items-start m-2">
          <label htmlFor="personalReview" className="text-sm">
            Review:
          </label>
          <textarea
            id="personalReview"
            name="personalReview"
            className="bg-gray-950 rounded p-2"
            placeholder="Write your review here..."
            rows={10}
            cols={45}
            style={{
              resize: "none",
            }}
            maxLength={256}
            value={personalReview}
            onChange={(e) => setPersonalReview(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start m-2">
          <label htmlFor="finished" className="text-sm">
            Watched:
          </label>
          <input
            style={{
              height: "1em",
              width: "1em",
              accentColor: "#0d542b",
            }}
            type="checkbox"
            name="finished"
            id="finished"
            checked={finished}
            onChange={() => setFinished(!finished)}
          />
        </div>
      </div>
    </Container>
  );
}
