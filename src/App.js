import "./App.css";
import MovieLists from "./components/MovieListContainer";
import { LanguageProvider } from "./contexts/LanguageContext";
import React from "react";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <h1>React Movie App</h1>
        <MovieLists />
      </LanguageProvider>
    </div>
  );
}

export default App;
