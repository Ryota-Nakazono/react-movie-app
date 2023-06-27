import React from "react";
import "./Modal.css";

export default function Modal({ movieDetail, isLoading, closeModal }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">映画の詳細</h2>
          <button className="modal__close" onClick={() => closeModal()}>
            ×
          </button>
        </div>
        <div className="modal__body">
          {isLoading ? (
            <div>Loading...</div>
          ) : movieDetail ? (
            <>
              <div className="modal__image">
                {movieDetail.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                    alt={`${movieDetail.title} poster`}
                  />
                )}
              </div>
              <div className="modal__info">
                {movieDetail.runtime && (
                  <div className="modal__runtime">
                    <strong>上映時間：</strong>
                    {movieDetail.runtime}分
                  </div>
                )}
                {movieDetail.overview && (
                  <div className="modal__overview">
                    <strong>概要：</strong>
                    {movieDetail.overview}
                  </div>
                )}
                {movieDetail.homepage && (
                  <div className="modal__homepage">
                    <strong>ホームページ：</strong>
                    <a href={movieDetail.homepage}>{movieDetail.homepage}</a>
                  </div>
                )}
                {movieDetail.genres && (
                  <div className="modal__genres">
                    <strong>ジャンル：</strong>
                    {movieDetail.genres.map((genre) => genre.name).join(", ")}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>詳細が見つかりませんでした。</div>
          )}
        </div>
      </div>
    </div>
  );
}
