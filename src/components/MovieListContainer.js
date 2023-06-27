// 必要なモジュールとコンポーネントをインポートします
import React, { useState, useEffect, useCallback } from "react";
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import Modal from "./Modal";
import "./MovieListContainer.css";

// 映画情報を取得するためのベースURLを設定
const BASE_URL = "https://api.themoviedb.org/3";

const MovieLists = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [showPopularMoviesTitle, setShowPopularMoviesTitle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedCurrentPage, setSearchedCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // 映画データを取得する関数を定義します
  const fetchMovies = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 人気映画データを取得する関数を定義します
  const fetchPopularMovies = useCallback(
    async (page) => {
      setShowPopularMoviesTitle(true);
      setSearchTerm("");
      // 人気映画のAPIエンドポイントを作成し、fetchMovies関数を呼び出します
      const url = `${BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&language=ja-JP&page=${page}`;
      fetchMovies(url);
    },
    [fetchMovies]
  );

  // 検索結果の映画データを取得する関数を定義します
  const fetchSearchedMovies = useCallback(
    async (query, page) => {
      // 検索のAPIエンドポイントを作成し、fetchMovies関数を呼び出します
      const url = `${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&language=ja-JP&query=${query}&page=${page}`;
      fetchMovies(url);
    },
    [fetchMovies]
  );

  // 映画の詳細情報を取得する関数を定義します
  const fetchMovieDetail = useCallback(async (id) => {
    setDetailLoading(true);
    try {
      // 映画の詳細情報のAPIエンドポイントからデータを取得します
      const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ja-JP`
      );
      const data = await response.json();
      setSelectedMovieDetail(data);
    } catch (error) {
      setError(error);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // コンポーネントがマウントされたとき、またはcurrentPageが変更されたときに人気の映画を取得します
  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage, fetchPopularMovies]);

  // searchTermまたはsearchedCurrentPageが変更されたときに検索された映画を取得します
  useEffect(() => {
    if (searchTerm) {
      fetchSearchedMovies(searchTerm, searchedCurrentPage);
    }
  }, [searchTerm, searchedCurrentPage, fetchSearchedMovies]);

  // selectedMovieが変更されたときに映画の詳細を取得します
  useEffect(() => {
    if (selectedMovie) {
      fetchMovieDetail(selectedMovie.id);
    }
  }, [selectedMovie, fetchMovieDetail]);

  // 映画検索のハンドラー関数を定義します
  const handleMovieSearch = (event, inputValue) => {
    event.preventDefault();
    setSearchTerm(inputValue);
    // 検索結果のページを1にリセットします
    setSearchedCurrentPage(1);
  };

  // ページネーションのハンドラー関数を定義します
  const handlePagination = (newPage) => {
    setSearchedCurrentPage(newPage);
  };

  // モーダルの開閉を切り替える関数を定義します
  const toggleModal = (movie = null) => {
    setSelectedMovie(movie);
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <SearchForm handleSearch={handleMovieSearch} />
      {showPopularMoviesTitle && movies.length > 0 && (
        <h2 className="movie-lists__header">人気映画一覧</h2>
      )}
      <div className="movie-lists__container">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>エラー: {error}</div>
        ) : movies.length > 0 ? (
          <>
            <MovieList movies={movies} openModal={toggleModal} />
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
