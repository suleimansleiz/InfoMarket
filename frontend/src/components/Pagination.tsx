import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 mt-4 mb-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border text-gray-600 rounded-md hover:bg-blue-200 disabled:opacity-50 border-blue-500 cursor-pointer disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {/* <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border text-gray-600 rounded-md hover:bg-blue-200 disabled:opacity-50 border-blue-700 cursor-pointer disabled:cursor-not-allowed"
      >
        ◀
      </button> */}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border border-blue-500 text-gray-600 rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border text-gray-600 rounded-md hover:bg-blue-200 disabled:opacity-50 border-blue-700 cursor-pointer disabled:cursor-not-allowed"
      >
        ▶
      </button> */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border text-gray-600 rounded-md hover:bg-blue-200 disabled:opacity-50 border-blue-500 cursor-pointer disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
