import React from 'react'

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button onClick={handlePrevious} disabled={currentPage === 1} class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
          <li class="page-item">
            <button onClick={handleNext} disabled={currentPage === totalPages} class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};


export default Pagination