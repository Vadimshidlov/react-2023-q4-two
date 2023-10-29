import React from 'react';
import './Search.scss';
import SearchIcon from 'view/Search/SearchIcon';

export type PeopleRequestType = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: [];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type PeoplesRequestType = {
  count: number;
  next: string;
  previous: null;
  results: PeopleRequestType[];
};

export type SearchPropsType = {
  searchFormHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  searchValue: string;
  fetchError: string;
  setFetchError: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

class Search extends React.Component<SearchPropsType> {
  changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { setSearchValue, setFetchError } = this.props;
    setSearchValue(event.target.value);
    setFetchError('');
  };

  render() {
    const { searchFormHandler, searchValue, fetchError } = this.props;

    return (
      <div className="search__container">
        <form action="" className="search__form" onSubmit={searchFormHandler}>
          <div className="search-input__container">
            <SearchIcon />
            <input type="text" value={searchValue} onChange={this.changeHandler} />
          </div>
          <button type="submit">Search</button>
        </form>
        {fetchError ? <div className="data__result">{fetchError}</div> : null}
      </div>
    );
  }
}

export default Search;
