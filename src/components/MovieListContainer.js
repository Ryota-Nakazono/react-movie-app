import React, { useState, useEffect, useContext } from "react";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import { LanguageContext } from "../contexts/LanguageContext";
import "./MovieListContainer.css";

const MovieListContainer = ({ fetchUrl, onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = fetchUrl(currentPage);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, fetchUrl]);

  return (
    <div className="movie-lists__container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          {language === "ja-JP" ? "エラー" : "Error"}：{error.message}
        </div>
      ) : movies.length > 0 ? (
        <>
          <MovieList movies={movies} onMovieClick={onMovieClick} />
          <Pagination currentPage={currentPage} handlePagination={setCurrentPage} />
        </>
      ) : (
        <div>
          {language === "ja-JP"
            ? "該当する映画が見つかりませんでした。"
            : "No movie found."}
        </div>
      )}
    </div>
  );
};

export default MovieListContainer;
