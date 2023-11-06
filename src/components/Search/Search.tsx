import React from 'react';
import './Search.scss';
import SearchIcon from 'components/Search/SearchIcon';
import { SearchPropsType } from 'components/Search/types';

export default function Search({
  setSearchValue,
  setFetchError,
  searchFormHandler,
  searchValue,
  fetchError,
}: SearchPropsType) {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    setFetchError('');
  };

  return (
    <div className="search__container">
      <form action="" className="search__form" onSubmit={searchFormHandler}>
        <div className="search-input__container">
          <SearchIcon />
          <input type="text" value={searchValue} onChange={changeHandler} />
        </div>
        <button type="submit">Search</button>
      </form>
      {fetchError ? <div className="data__result">{fetchError}</div> : null}
    </div>
  );
}
