import React, { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import "./Modal.css";

export default function Modal() {
  const { selectedMovieDetail, detailLoading, toggleModal } = useContext(ModalContext);
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">映画の詳細</h2>
          <button className="modal__close" onClick={() => toggleModal()}>
            ×
          </button>
        </div>
        <div className="modal__body">
          {detailLoading ? (
            <div>Loading...</div>
          ) : selectedMovieDetail ? (
            <>
              <div className="modal__image">
                {selectedMovieDetail.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${selectedMovieDetail.poster_path}`}
                    alt={`${selectedMovieDetail.title} poster`}
                  />
                )}
              </div>
              <div className="modal__info">
                {selectedMovieDetail.runtime && (
                  <div className="modal__runtime">
                    <strong>上映時間：</strong>
                    {selectedMovieDetail.runtime}分
                  </div>
                )}
                {selectedMovieDetail.overview && (
                  <div className="modal__overview">
                    <strong>概要：</strong>
                    {selectedMovieDetail.overview}
                  </div>
                )}
                {selectedMovieDetail.homepage && (
                  <div className="modal__homepage">
                    <strong>ホームページ：</strong>
                    <a href={selectedMovieDetail.homepage}>
                      {selectedMovieDetail.homepage}
                    </a>
                  </div>
                )}
                {selectedMovieDetail.genres && (
                  <div className="modal__genres">
                    <strong>ジャンル：</strong>
                    {selectedMovieDetail.genres.map((genre) => genre.name).join(", ")}
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
