import { useState, useEffect } from "react";
import Container from "../components/Container";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import MovieTile from "../components/MovieTile";
import Grid from "../components/Grid";
import debounce from "../utils/debounce";
import { getSavedMovieIds } from "../supabaseServices";
import type { Movie } from "../types/Movie";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [savedMovies, setSavedMovies] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSavedMovieIds().then((res) => {
      if (!res) return;
      setSavedMovies(res.map((x) => x.imdb_id));
    });
  }, []);

  const fetchMovies = async (limit = 20) => {
    if (!searchTerm) return;
    setLoading(true);
    const response = await fetch(
      `https://api.imdbapi.dev/search/titles?query=${searchTerm}&limit=${limit}`
    );
    const { titles } = await response.json();
    setMovies(titles);
    setLoading(false);
  };

  return (
    <>
      <Container classNames="m-4">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          fetchMovies={debounce(fetchMovies)}
          loading={loading}
        />
        {loading && <LoadingSpinner />}
        {!loading && movies.length > 0 && (
          <Grid>
            {movies.map((movie) => (
              <MovieTile
                key={movie.id}
                movie={movie}
                saved={savedMovies.some((x) => x === movie.id)}
                setSavedMovies={setSavedMovies}
              />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
