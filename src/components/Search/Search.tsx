import React, { useState } from 'react';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '@/components/Search/SearchIcon.tsx';
import {
  usePagesDispatch,
  useSearchDispatch,
  useSearchSelector,
  useViewModeDispatch,
} from '@/hooks/redux';
import { changeSearch } from '@/store/SearchSlice.ts';
import { changeViewMode } from '@/store/ViewModeSlice.ts';
import { setCurrentPage } from '@/store/PagesSlice.ts';

export default function Search() {
  const { search } = useSearchSelector((state) => state.searchReducer);
  const [inputValue, setInputValue] = useState<string>(search);

  const [urlParams, setUrlParams] = useSearchParams();
  const searchDispatch = useSearchDispatch();
  const viewModeDispatch = useViewModeDispatch();
  const pagesDispatch = usePagesDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    urlParams.delete('details');
    setUrlParams(urlParams);
    viewModeDispatch(changeViewMode(false));
    pagesDispatch(setCurrentPage(1));

    searchDispatch(changeSearch(inputValue));
    localStorage.setItem('searchValue', inputValue);
  };

  return (
    <div className="search__container">
      <form action="" className="search__form" onSubmit={submitFormHandler}>
        <div className="search-input__container">
          <SearchIcon />
          <input type="text" value={inputValue} onChange={changeHandler} />
        </div>
        <button type="submit" data-testid="submit_button">
          Search
        </button>
      </form>
    </div>
  );
}
