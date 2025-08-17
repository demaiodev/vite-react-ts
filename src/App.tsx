import { useState } from "react";

import LoadingSpinner from "./components/LoadingSpinner";
import SearchInput from "./components/SearchInput";
import MovieTile from "./components/MovieTile";
import Grid from "./components/Grid";

import debounce from "./utils/debounce";

import type { Movie } from "./types/Movie";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (limit = 5) => {
    if (!searchTerm) return;
    setLoading(true);
    const response = await fetch(
      `https://api.imdbapi.dev/search/titles?query=${searchTerm}&limit=${limit}`
    );
    const { titles } = await response.json();
    setMovies(titles);

    return Promise.all(
      titles.map((title: any) => {
        return new Promise((resolve, reject) => {
          if (!title.primaryImage?.url) return resolve(null);
          try {
            const img = new Image();
            img.src = title.primaryImage.url;
            img.onload = () => resolve(null);
          } catch (e) {
            reject(e);
          }
        });
      })
    ).finally(() => setLoading(false));
  };

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchMovies={debounce(fetchMovies)}
      />
      {loading && <LoadingSpinner />}
      {!loading && movies.length > 0 && (
        <Grid>
          {movies.map((movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
        </Grid>
      )}
    </>
  );
}

export default App;
