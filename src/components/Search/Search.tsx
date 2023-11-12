import React from 'react';
import './Search.scss';
import { useContextData } from '@/context-store.tsx';
import { SearchPropsType } from '@/components/Search/types.ts';
import SearchIcon from '@/components/Search/SearchIcon.tsx';

export default function Search({ setFetchError, searchFormHandler, fetchError }: SearchPropsType) {
  const { contextData, setContextData } = useContextData();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setContextData((prevState) => ({ ...prevState, searchValue: event.target.value }));
    setFetchError('');
  };

  return (
    <div className="search__container">
      <form action="" className="search__form" onSubmit={searchFormHandler}>
        <div className="search-input__container">
          <SearchIcon />
          <input type="text" value={contextData.searchValue} onChange={changeHandler} />
        </div>
        <button type="submit">Search</button>
      </form>
      {fetchError ? <div className="data__result">{fetchError}</div> : null}
    </div>
  );
}
