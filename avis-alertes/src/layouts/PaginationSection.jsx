import React from "react";
import Pagination from "../components/Pagination";

function PaginationSection({ currentPage, totalPages, onPageChange, totalItems }) {
  return (
    <div className="pagination-section">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default PaginationSection;