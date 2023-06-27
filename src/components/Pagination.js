import React from "react";
import "./Pagination.css";

export default function Pagination({
  currentPage,
  handlePagination,
  isSearching,
  searchedCurrentPage,
}) {
  return (
    <div className="pagination">
      {!isSearching ? (
        <>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}>
            前へ
          </button>
          <button onClick={() => handlePagination(currentPage + 1)}>次へ</button>
        </>
      ) : (
        <>
          <button
            onClick={() => handlePagination(searchedCurrentPage - 1)}
            disabled={searchedCurrentPage === 1}>
            前へ
          </button>
          <button onClick={() => handlePagination(searchedCurrentPage + 1)}>次へ</button>
        </>
      )}
    </div>
  );
}
