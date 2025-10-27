import React from "react";
import Pagination from 'react-bootstrap/Pagination';

interface Props {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const PaginationControls: React.FC<Props> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}) => {
  return (
    <Pagination className="pagination-controls" size="sm">
    <Pagination.First />
    <Pagination.Prev onClick={onPrev} disabled={currentPage === 1}/>
    <Pagination.Item className="page-number" active>{currentPage}</Pagination.Item>
    <Pagination.Item>{2}</Pagination.Item>
    <Pagination.Item>{3}</Pagination.Item>
    <Pagination.Item>{4}</Pagination.Item>
    <Pagination.Item>{5}</Pagination.Item>
    <Pagination.Ellipsis />

    <Pagination.Item>{9}</Pagination.Item>
    <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Next onClick={onNext} disabled={currentPage === totalPages}/>
    <Pagination.Last />
  </Pagination>
  );
};

export default PaginationControls;
