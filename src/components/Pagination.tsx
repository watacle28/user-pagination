import React from 'react';
import '../styles/Pagination.css';

interface PaginationProps {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageNumber: number) => void;
  inputPage: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  hasMoreUsers: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  nextPage,
  prevPage,
  goToPage,
  inputPage,
  handleInputChange,
  handleInputBlur,
  hasMoreUsers
}) => {

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    let endPage = startPage + 4;

    for (let i = startPage; i <= endPage; i++) {
      if (hasMoreUsers || i <= currentPage) {
        pageNumbers.push(i);
      } else {
        break;
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button className="prev" onClick={prevPage} disabled={currentPage <= 1}>
        &#171;
      </button>
      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? 'active page-number' : 'page-number'}
          onClick={() => goToPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button className="next" onClick={nextPage} disabled={!hasMoreUsers}>
        &#187;
      </button>
      <div className="go-to-input">
        <span className="go-to-text">Go to page</span>
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="page-input"
        />
        <button onClick={() => goToPage(Number(inputPage))} className="go-to-button">
          &#187;
        </button>
      </div>
    </div>
  );
};

export default Pagination;