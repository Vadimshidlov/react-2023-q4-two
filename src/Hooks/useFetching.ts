import { useEffect, useRef, useState } from 'react';
import SwapiService from 'services/SwapiService';
import getTotalPages from 'shared/utils/getTotalPages';
import getPagesArray from 'shared/utils/getPagesArray';
import { PeopleRequestType } from 'view/Search/Search';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function useFetching() {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchData, setSearchData] = useState<PeopleRequestType[]>([]);
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const STAR_WARS = useRef(SwapiService);
  const [fetchError, setFetchError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();

  const getData = async () => {
    const searchValueFromStorage = localStorage.getItem('searchValue');

    setIsLoading(true);
    if (!localStorage.getItem('searchValue')) {
      const peopleData = await STAR_WARS.current.getAllPeoples(currentPage);
      console.log(peopleData);

      setTotalPages(getTotalPages(peopleData.count));

      setSearchData(peopleData.results);
    } else if (searchValueFromStorage) {
      const searchPeopleData = await STAR_WARS.current.searchPeoples(
        searchValueFromStorage,
        currentPage
      );
      console.log(searchPeopleData);
      setTotalPages(getTotalPages(searchPeopleData.count));

      setSearchData(searchPeopleData.results);
    }

    setIsLoading(false);
  };

  const searchFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    urlParams.delete('details');
    setUrlParams(urlParams);
    setShowDetails(false);

    localStorage.setItem('searchValue', searchValue);
    const searchPeopleData = await STAR_WARS.current.searchPeoples(searchValue);
    setSearchData(searchPeopleData.results);
    setCurrentPage(1);
    setTotalPages(getTotalPages(searchPeopleData.count));

    setIsLoading(false);
  };

  useEffect(() => {
    console.log('Render');

    urlParams.set('page', currentPage.toString());
    navigate(`/search?${urlParams.toString()}`);

    getData();
  }, [currentPage]);

  const pagesArray = getPagesArray(totalPages);

  return {
    getData,
    isLoading,
    totalPages,
    searchData,
    pagesArray,
    searchValue,
    setSearchValue,
    searchFormHandler,
    fetchError,
    setFetchError,
    currentPage,
    setCurrentPage,
    showDetails,
    setShowDetails,
  };
}
