import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        className="btn btn-secondary btn-page" 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>
      
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      
      <button 
        className="btn btn-secondary btn-page" 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
