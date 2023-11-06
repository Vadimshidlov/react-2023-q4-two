import React from 'react';

export type PaginationPropsType = {
  isLoading: boolean;
  pagesArray: number[];
  currentPage: number;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
};
