import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import "./MovieList.css";

function MovieList({ movies, onMovieClick }) {
  const { language } = useContext(LanguageContext);

  const location = useLocation();
  const displayFullInfo = location.pathname === "/search";

  return (
    <ul className="movie-lists">
      {movies.map((movie) => (
        <li
          className="movie-lists__item"
          key={movie.id}
          onClick={() => onMovieClick(movie)}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
          <div className="movie-info">
            <h3 className="movie-info__title">{movie.title}</h3>
            {displayFullInfo && (
              <>
                <div className="movie-overview">
                  <p>{movie.overview}</p>
                </div>
                <div>
                  {language === "ja-JP" ? "公開日" : "Release Date"}：{movie.release_date}
                </div>
                <div className="movie-info__rating">
                  {language === "ja-JP" ? "評価" : "Rating"}：{movie.vote_average}
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
