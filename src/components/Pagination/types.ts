import React from 'react';

export type PaginationPropsType = {
  // pagesArray: number[];
  currentPage: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
};
