import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import "./MovieList.css";

export default function MovieList({ movies }) {
  const { toggleModal } = React.useContext(ModalContext);
  return (
    <ul className="movie-lists">
      {movies.map((movie) => (
        <li
          className="movie-lists__item"
          key={movie.id}
          onClick={() => toggleModal(movie)}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
          <div className="movie-info">
            <h3 className="movie-info__title">{movie.title}</h3>
            <div className="movie-overview">
              <p>{movie.overview}</p>
            </div>
            <div>公開日：{movie.release_date}</div>
            <div className="movie-info__rating">評価：{movie.vote_average}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
