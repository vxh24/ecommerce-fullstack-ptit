import React, { useEffect, useState } from 'react'

const Pagination = ({ totalItems, limit, currentPage, onPageChange }) => {
  const [maxVisiblePages] = useState(5); // Số lượng trang hiển thị tối đa
  const totalPages = Math.ceil(totalItems / limit); // Tổng số trang
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };
  return (
    <>
      <div className="pagination">
        {/* Nút Previous */}
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          &lt;
        </button>

        {/* Các trang hiển thị */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        {/* Nút Ellipsis (nếu cần) */}
        {getPageNumbers().length < totalPages && currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
          <span className="pagination-ellipsis">...</span>
        )}

        {/* Nút Next */}
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </>
  );
};


export default Pagination