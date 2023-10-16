import React, { useEffect, useRef, useState } from 'react';
import './Search.scss';
import AxiosApiService from 'services/AxiosApiService';
import axios from 'axios';
import TypeSelect from './TypeSelect';

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

function Search() {
  const STARWARS_API = useRef(AxiosApiService);
  const [searchValue, setSearchValue] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [searchType, setSearchType] = useState<string>('');

  const notFoundDataHandler = () => {
    setFetchError('Data is not found');
  };

  const getData = async (value: string, type: string) => {
    try {
      const response = await STARWARS_API.current.get({}, `${type || 'people'}/${value}`);

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        console.error(error.response?.status);
        notFoundDataHandler();
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getData(searchValue, searchType);
    console.log(searchType);
  }, [searchType, searchValue]);

  const changeSearchTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="search__container">
      <TypeSelect setSearchType={changeSearchTypeHandler} value={searchType} />
      <input
        type="text"
        value={searchValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
          setFetchError('');
        }}
      />
      <button type="button">Search</button>
      {fetchError ? <div className="data__result">{fetchError}</div> : null}
    </div>
  );
}

export default Search;
