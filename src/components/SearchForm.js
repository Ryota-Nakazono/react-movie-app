import React, { useContext, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import "./SearchForm.css";

export default function SearchForm({ handleSearch }) {
  const [inputValue, setInputValue] = useState("");
  const { language } = useContext(LanguageContext);

  return (
    <div className="movie-search-form__container">
      <form className="movie-search-form" onSubmit={(e) => handleSearch(e, inputValue)}>
        <input
          type="text"
          className="movie-search-form__input"
          placeholder={language === "ja-JP" ? "映画を検索する" : "Search for a movie"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="movie-search-form__button">
          {language === "ja-JP" ? "検索" : "Search"}
        </button>
      </form>
    </div>
  );
}
