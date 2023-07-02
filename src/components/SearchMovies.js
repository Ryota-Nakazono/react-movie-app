import { useCallback, useContext, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import Header from "./Header";
import MovieListContainer from "./MovieListContainer";
import SearchForm from "./SearchForm";
import Modal from "./Modal";
import "./SearchMovies.css";

const BASE_URL = "https://api.themoviedb.org/3";

export function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMovie, setModalMovie] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { language } = useContext(LanguageContext);

  // 検索結果の映画データを取得する関数を定義
  const fetchSearchedMovies = useCallback(
    (currentPage) => {
      return `${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}&query=${searchTerm}&page=${currentPage}`;
    },
    [language, searchTerm]
  );

  // 映画の詳細データを取得する関数を定義
  const fetchMovieDetail = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}`;
    const response = await fetch(url);
    const data = await response.json();
    setModalMovie(data);
    setLoadingDetail(false);
  };

  // モーダルを開く関数を定義
  const openModal = (movie) => {
    setModalMovie(null);
    setModalIsOpen(true);
    setLoadingDetail(true);
    fetchMovieDetail(movie.id);
  };

  // モーダルを閉じる関数を定義
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 検索ボタンが押されたときに実行される関数
  const handleMovieSearch = (e, inputValue) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <div className="search__container">
      <Header />
      <h1>{language === "ja-JP" ? "映画検索" : "SEARCH"}</h1>
      <SearchForm handleSearch={handleMovieSearch} />
      {searchTerm && (
        <MovieListContainer fetchUrl={fetchSearchedMovies} onMovieClick={openModal} />
      )}
      {modalIsOpen && (
        <Modal
          movieDetail={modalMovie}
          isLoading={loadingDetail}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
