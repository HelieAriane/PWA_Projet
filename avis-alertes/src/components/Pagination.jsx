import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...");
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "...");
      }
    }

    return pages;
  };

  const handleClick = (page) => {
    if (page !== "...") {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>

      {pageNumbers().map((page, index) => (
        <button
          className="pagination-button"
          onClick={() => handleClick(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  )
}

export default Pagination;