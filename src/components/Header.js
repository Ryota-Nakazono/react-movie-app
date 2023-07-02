// Header.js
import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="nav-links">
          <Link to="/">TREND</Link>
          <Link to="/search">SEARCH</Link>
        </div>
        <div className="language-switcher__container">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
