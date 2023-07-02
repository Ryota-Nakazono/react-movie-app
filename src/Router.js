import { Route, Routes } from "react-router-dom";
import { TrendMovies, SearchMovies, MovieDetail } from "./components";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<TrendMovies />} />
      <Route path="/search" element={<SearchMovies />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}
