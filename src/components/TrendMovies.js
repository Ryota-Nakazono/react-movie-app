import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import Header from "./Header";
import MovieListContainer from "./MovieListContainer";

const BASE_URL = "https://api.themoviedb.org/3";

export function TrendMovies() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const fetchUrl = (currentPage) => {
    return `${BASE_URL}/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}&page=${currentPage}`;
  };

  const onMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="home__container">
      <Header />
      <h1>{language === "ja-JP" ? "人気映画" : "TREND"}</h1>
      <p>
        {language === "ja-JP"
          ? "映画をクリックすると詳細が表示されます。"
          : "Click on a movie to see more details"}
      </p>
      <MovieListContainer fetchUrl={fetchUrl} onMovieClick={onMovieClick} />
    </div>
  );
}
