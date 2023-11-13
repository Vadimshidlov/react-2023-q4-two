import React from 'react';
import './Search.scss';
import { SearchPropsType } from '@/components/Search/types.ts';
import SearchIcon from '@/components/Search/SearchIcon.tsx';
import { useSearchDispatch, useSearchSelector } from '@/hooks/redux.ts';
import { changeSearch } from '@/store/SearchSlice.ts';

export default function Search({ setFetchError, searchFormHandler, fetchError }: SearchPropsType) {
  const { search } = useSearchSelector((state) => state.searchReducer);
  const searchDispatch = useSearchDispatch();

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   setContextData((prevState) => ({ ...prevState, searchValue: event.target.value }));
  //   setFetchError('');
  // };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    searchDispatch(changeSearch(event.target.value));
    setFetchError('');
  };

  return (
    <div className="search__container">
      <form action="" className="search__form" onSubmit={searchFormHandler}>
        <div className="search-input__container">
          <SearchIcon />
          {/* <input type="text" value={contextData.searchValue} onChange={changeHandler} /> */}
          <input type="text" value={search} onChange={changeHandler} />
        </div>
        <button type="submit">Search</button>
      </form>
      {fetchError ? <div className="data__result">{fetchError}</div> : null}
    </div>
  );
}
