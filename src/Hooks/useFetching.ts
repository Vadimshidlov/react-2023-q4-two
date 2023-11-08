import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContextData } from '@/context-store.tsx';
import SwapiService from '@/services/SwapiService.ts';
import getTotalPages from '@/shared/utils/getTotalPages.ts';
import getPagesArray from '@/shared/utils/getPagesArray.ts';

export default function useFetching() {
  const { contextData, setContextData } = useContextData();
  const [totalPages, setTotalPages] = useState(0);
  const STAR_WARS = useRef(SwapiService);
  const [fetchError, setFetchError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();

  const getData = async () => {
    const searchValueFromStorage = localStorage.getItem('searchValue');

    setContextData((prevState) => ({ ...prevState, isLoading: true }));

    if (!localStorage.getItem('searchValue')) {
      const peopleData = await STAR_WARS.current.getAllPeoples(currentPage);

      setTotalPages(getTotalPages(peopleData.count));

      setContextData((prevState) => ({ ...prevState, searchData: peopleData.results }));
    } else if (searchValueFromStorage) {
      const searchPeopleData = await STAR_WARS.current.searchPeoples(
        searchValueFromStorage,
        currentPage
      );
      setTotalPages(getTotalPages(searchPeopleData.count));

      setContextData((prevState) => ({ ...prevState, searchData: searchPeopleData.results }));
    }

    setContextData((prevState) => ({ ...prevState, isLoading: false }));
  };

  const searchFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContextData((prevState) => ({ ...prevState, isLoading: true }));

    urlParams.delete('details');
    setUrlParams(urlParams);
    // setShowDetails(false);
    setContextData((prevState) => ({ ...prevState, isShowDetails: false }));

    localStorage.setItem('searchValue', contextData.searchValue);
    const searchPeopleData = await STAR_WARS.current.searchPeoples(contextData.searchValue);
    setContextData((prevState) => ({ ...prevState, searchData: searchPeopleData.results }));

    setCurrentPage(1);
    setTotalPages(getTotalPages(searchPeopleData.count));

    setContextData((prevState) => ({ ...prevState, isLoading: false }));
  };

  useEffect(() => {
    urlParams.set('page', currentPage.toString());
    navigate(`/search?${urlParams.toString()}`);

    getData();
  }, [currentPage]);

  const pagesArray = getPagesArray(totalPages);

  return {
    getData,
    totalPages,
    pagesArray,
    searchFormHandler,
    fetchError,
    setFetchError,
    currentPage,
    setCurrentPage,
  };
}
