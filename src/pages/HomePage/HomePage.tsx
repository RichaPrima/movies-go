import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteScroll } from "../../customHooks/useInfiniteScroll";
import { getMovies } from "../../services/api/api.service";
import { MovieType } from "../../types/types";
import { Header } from "../../components/Header/Header";
import { Loader } from "../../components/Loader/Loader";
import { MovieCard } from "../../components/MovieCard/MovieCard";

import styles from "./HomePage.module.css";
import { debounce } from "../../utils/common";

export const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [apiInProgress, setApiInProgress] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const rootRef = useRef<HTMLDivElement>(null);

  // Using custom hook for implementing Infinite Scroll
  const [node, entry] = useInfiniteScroll({
    root: rootRef.current,
    rootMargin: "24px",
    threshold: 0.75,
  });

  // Updates page for infinite scroll
  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [entry?.isIntersecting]);

  // Get data on every page update
  useEffect(() => {
    fetchMovieData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMovieData = useCallback(async () => {
    setApiInProgress(true);
    const res = await getMovies(page);
    if (res?.data) {
      if (page === 1) {
        setMovies(res.data.results);
      } else {
        // Appends data for infinite scroll
        setMovies((prev) => [...prev, ...res.data.results]);
      }
    }
    setApiInProgress(false);
  }, [page]);

  const handleSearchChange = debounce((searchValue: string) => {
    setSearchValue(searchValue);
  }, 300);

  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        return movie?.title?.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((movie) => (
        <MovieCard
          key={movie.id}
          name={movie.title}
          imgUrl={movie.backdrop_path}
          rating={movie.vote_average}
          ratingCount={movie.vote_count}
          releaseDate={movie.release_date}
        />
      ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const allMovies = useMemo(
    () =>
      movies.map((movie, index, arr) => (
        <div
          ref={
            index === arr.length - 1 && searchValue.length === 0 ? node : null
          }
          key={movie.id}
        >
          <MovieCard
            name={movie.title}
            imgUrl={movie.backdrop_path}
            rating={movie.vote_average}
            ratingCount={movie.vote_count}
            releaseDate={movie.release_date}
          />
        </div>
      )),
    [movies, node, searchValue.length]
  );

  const moviesNotFound =
    searchValue?.length > 0 && filteredMovies.length === 0 ? (
      <div className={styles.message}>No results found.</div>
    ) : null;

  return (
    <div className={styles.main}>
      <Header onSearchTextChanged={handleSearchChange} />

      {searchValue.length > 0 ? (
        <h1>Search Results</h1>
      ) : (
        <h1>Latest Movies</h1>
      )}

      <div className={styles.movieContainer} ref={rootRef}>
        {searchValue?.length === 0 ? allMovies : filteredMovies}
      </div>

      {moviesNotFound}

      {apiInProgress && <Loader />}
    </div>
  );
};
