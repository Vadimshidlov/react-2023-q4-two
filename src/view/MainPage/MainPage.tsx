import Search, { PeopleRequestType } from 'view/Search/Search';
import { useEffect, useRef, useState } from 'react';
import SearchItems from 'view/SearchItems/SearchItems';
import SwapiService from 'services/SwapiService';
import './MainPage.scss';
import ErrorButton from 'view/ErrorButton/ErrorButton';

export type MainPageState = {
  searchValue: string;
  fetchError: string;
  searchData: PeopleRequestType[];
  isLoading: boolean;
};

export default function MainPage() {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const [fetchError, setFetchError] = useState('');
  const [searchData, setSearchData] = useState<PeopleRequestType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const STAR_WARS = useRef(SwapiService);

  useEffect(() => {
    const getData = async () => {
      const searchValueFromStorage = localStorage.getItem('searchValue');

      setIsLoading(true);
      if (!localStorage.getItem('searchValue')) {
        const peopleData = await STAR_WARS.current.getAllPeoples();
        setSearchData(peopleData);
      } else if (searchValueFromStorage) {
        const searchPeopleData = await STAR_WARS.current.searchPeoples(searchValueFromStorage);
        setSearchData(searchPeopleData);
      }

      setIsLoading(false);
    };

    getData();
  }, []);

  const searchFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    localStorage.setItem('searchValue', searchValue);
    const searchPeopleData = await STAR_WARS.current.searchPeoples(searchValue);
    setSearchData(searchPeopleData);

    setIsLoading(false);
  };

  return (
    <div className="main-page__container">
      <h2 className="page__title">Star Wars Heroes!!!</h2>
      <ErrorButton />
      <Search
        searchFormHandler={searchFormHandler}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fetchError={fetchError}
        setFetchError={setFetchError}
      />
      <SearchItems searchData={searchData} isLoading={isLoading} />
    </div>
  );
}
