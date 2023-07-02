import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import { LanguageContext } from "../contexts/LanguageContext";
import { useContext, useEffect, useState } from "react";
import "./MovieDetail.css";

const BASE_URL = "https://api.themoviedb.org/3";

export function MovieDetail() {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const fetchUrl = `${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}`;

      setLoading(true);
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, language]);

  return (
    <>
      <Header />
      <h1>{language === "ja-JP" ? "映画詳細" : "Movie Details"}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          {language === "ja-JP" ? "エラー" : "Error"}：{error.message}
        </div>
      ) : (
        <div className="movie-detail__container">
          <div className="movie-detail__inner-container">
            {movie ? (
              <>
                <div className="movie-detail__image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="movie-detail__info">
                  <h2 className="movie-detail__title">{movie.title}</h2>
                  {movie.runtime && (
                    <div className="movie-detail__runtime">
                      <strong>{language === "ja-JP" ? "上映時間" : "RunTime"}：</strong>
                      {movie.runtime}分
                    </div>
                  )}
                  {movie.overview && (
                    <div className="movie-detail__overview">
                      <strong>{language === "ja-JP" ? "概要" : "Overview"}：</strong>
                      {movie.overview}
                    </div>
                  )}
                  {movie.homepage && (
                    <div className="movie-detail__homepage">
                      <strong>
                        {language === "ja-JP" ? "ホームページ" : "HomePage"}：
                      </strong>
                      <a href={movie.homepage}>{movie.homepage}</a>
                    </div>
                  )}
                  {movie.genres && (
                    <div className="movie-detail__genres">
                      <strong>{language === "ja-JP" ? "ジャンル" : "Genres"}：</strong>
                      {movie.genres.map((genre) => genre.name).join(", ")}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p>
                {language === "ja-JP"
                  ? "映画の詳細を取得できませんでした。"
                  : "Could not retrieve film details."}
              </p>
            )}
          </div>
        </div>
      )}
      <Link to="/" className="link-to__home">
        {language === "ja-JP" ? "戻る" : "Back"}
      </Link>
    </>
  );
}
