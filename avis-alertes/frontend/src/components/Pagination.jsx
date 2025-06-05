import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = () => {
    const pages = new Set();

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.add(i);
      }
    } else {
      pages.add(1);

      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) pages.add(i);
        pages.add("...");
      } else if (currentPage >= totalPages - 3) {
        pages.add("...");
        for (let i = totalPages - 4; i < totalPages; i++) pages.add(i);
      } else {
        pages.add("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.add(i);
        pages.add("...");
      }

      pages.add(totalPages);
    }

    return Array.from(pages);
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
          key={index}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
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