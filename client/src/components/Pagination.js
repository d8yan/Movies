import React from 'react'
const Pagination = ({ currentPage, totalPages, onPageChange}) => {
    let pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers = [1,2,3,4,'...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      }
       else {
        pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    const handlePageChange = (page) => {
    if (typeof page === 'number' && !isNaN(page)) {
      onPageChange(page);
    } 
  };
    return (
      <>
    {totalPages > 0 ?
      (<ul className="pagination d-flex justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo; Previous</a>
        </li>
        {pageNumbers.map((page, index) => (
          <li key={index} className={`page-item ${page === '...' ? 'disable' : ''}${currentPage === page && typeof page === 'number' ? 'active' : ''}`}>
            <a className="page-link" onClick={() => handlePageChange(page)}>{page}</a>
           
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next &raquo;</a>
        </li>
      </ul>)
      : ''
        }
        </>
    );
  };

export default Pagination


