import "./App.css";
import { Router } from "./Router";
import { LanguageProvider } from "./contexts/LanguageContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <Router />
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
