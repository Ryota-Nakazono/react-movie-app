import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="language-switcher">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="language-switcher__sellecter">
        <option value="ja-JP">日本語</option>
        <option value="en-US">English</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
