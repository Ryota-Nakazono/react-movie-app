import React from "react";
import "./SearchForm.css";

export default function SearchForm({ inputValue, handleSearch, setInputValue }) {
  return (
    <div className="movie-search-form__container">
      <form className="movie-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="movie-search-form__input"
          placeholder="映画を検索する"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="movie-search-form__button">
          検索
        </button>
      </form>
    </div>
  );
}
