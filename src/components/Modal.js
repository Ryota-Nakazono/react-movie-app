import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import "./Modal.css";

export default function Modal({ movieDetail, isLoading, closeModal }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">
            {language === "ja-JP" ? "映画の詳細" : "Movie Details"}
          </h2>
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
                    <strong>{language === "ja-JP" ? "上映時間" : "RunTime"}：</strong>
                    {movieDetail.runtime}分
                  </div>
                )}
                {movieDetail.overview && (
                  <div className="modal__overview">
                    <strong>{language === "ja-JP" ? "概要" : "Overview"}：</strong>
                    {movieDetail.overview}
                  </div>
                )}
                {movieDetail.homepage && (
                  <div className="modal__homepage">
                    <strong>
                      {language === "ja-JP" ? "ホームページ" : "HomePage"}：
                    </strong>
                    <a href={movieDetail.homepage}>{movieDetail.homepage}</a>
                  </div>
                )}
                {movieDetail.genres && (
                  <div className="modal__genres">
                    <strong>{language === "ja-JP" ? "ジャンル" : "Genres"}：</strong>
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
