import React, { useState, useEffect, useCallback, useContext } from "react";
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import Modal from "./Modal";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageContext } from "../contexts/LanguageContext";
import "./MovieListContainer.css";

const BASE_URL = "https://api.themoviedb.org/3";

const MovieLists = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedCurrentPage, setSearchedCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const { language } = useContext(LanguageContext);

  // 映画データを取得する関数を定義
  const fetchMovies = useCallback(async (url, setMovies) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 人気映画データを取得する関数を定義
  const fetchPopularMovies = useCallback(
    async (page) => {
      const url = `${BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&language=${language}&page=${page}`;
      fetchMovies(url, setPopularMovies);
      setIsSearching(false);
    },
    [fetchMovies, language]
  );

  // 検索結果の映画データを取得する関数を定義
  const fetchSearchedMovies = useCallback(
    async (query, page) => {
      const url = `${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&language=${language}&query=${query}&page=${page}`;
      fetchMovies(url, setSearchedMovies);
      setIsSearching(true);
    },
    [fetchMovies, language]
  );

  // 映画の詳細情報を取得する関数を定義
  const fetchMovieDetail = useCallback(
    async (id) => {
      setDetailLoading(true);
      let url;
      if (language === "ja-JP") {
        url = `${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ja-JP`;
      } else {
        url = `${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedMovieDetail(data);
      } catch (error) {
        setError(error);
      } finally {
        setDetailLoading(false);
      }
    },
    [language]
  );

  // 人気映画を取得
  useEffect(() => {
    if (!isSearching) {
      fetchPopularMovies(currentPage);
    }
  }, [currentPage, fetchPopularMovies, language, isSearching]);

  // 検索された映画を取得
  useEffect(() => {
    if (searchTerm) {
      fetchSearchedMovies(searchTerm, searchedCurrentPage);
    }
  }, [searchTerm, searchedCurrentPage, fetchSearchedMovies, language]);

  // 映画の詳細を取得
  useEffect(() => {
    if (selectedMovie) {
      fetchMovieDetail(selectedMovie.id);
    }
  }, [selectedMovie, fetchMovieDetail]);

  // 映画検索のハンドラー関数を定義
  const handleMovieSearch = (event, inputValue) => {
    event.preventDefault();
    setSearchTerm(inputValue);
    setSearchedCurrentPage(1);
  };

  // ページネーションのハンドラー関数を定義
  const handlePagination = (newPage) => {
    setSearchedCurrentPage(newPage);
  };

  // モーダルの表示・非表示を切り替える関数を定義
  const toggleModal = (movie = null) => {
    setSelectedMovie(movie);
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <LanguageSwitcher />
      <SearchForm handleSearch={handleMovieSearch} />
      {!isSearching && <h2 className="movie-lists__header">人気映画一覧</h2>}
      <div className="movie-lists__container">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>エラー: {error}</div>
        ) : searchedMovies.length > 0 || popularMovies.length > 0 ? (
          <>
            <MovieList
              movies={isSearching ? searchedMovies : popularMovies}
              openModal={toggleModal}
            />
            <Pagination
              currentPage={currentPage}
              handlePagination={searchTerm ? handlePagination : setCurrentPage}
              isSearching={searchTerm}
              searchedCurrentPage={searchedCurrentPage}
            />
          </>
        ) : (
          <div>該当する映画が見つかりませんでした。</div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          movieDetail={selectedMovieDetail}
          isLoading={detailLoading}
          closeModal={toggleModal}
        />
      )}
    </>
  );
};

export default MovieLists;
