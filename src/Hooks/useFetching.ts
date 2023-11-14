import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContextData } from '@/context-store.tsx';
import SwapiService from '@/services/SwapiService.ts';
import getTotalPages from '@/shared/utils/getTotalPages.ts';
import getPagesArray from '@/shared/utils/getPagesArray.ts';
import { useSearchDispatch, useSearchSelector } from '@/hooks/redux.ts';
import { startHeroLoading, stopHeroLoading } from '@/store/SearchSlice.ts';

export default function useFetching() {
  const { setContextData } = useContextData();
  const [totalPages, setTotalPages] = useState(0);
  const STAR_WARS = useRef(SwapiService);
  const [fetchError, setFetchError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();
  const { search } = useSearchSelector((state) => state.searchReducer);
  const searchDispatch = useSearchDispatch();

  // const getData = async () => {
  //   const searchValueFromStorage = localStorage.getItem('searchValue');
  //
  //   // setContextData((prevState) => ({ ...prevState, isLoading: true }));
  //   searchDispatch(startHeroLoading());
  //
  //   if (!localStorage.getItem('searchValue')) {
  //     const peopleData = await STAR_WARS.current.getAllPeoples(currentPage);
  //
  //     setTotalPages(getTotalPages(peopleData.count));
  //
  //     setContextData((prevState) => ({ ...prevState, searchData: peopleData.results }));
  //   } else if (searchValueFromStorage) {
  //     const searchPeopleData = await STAR_WARS.current.searchPeoples(
  //       searchValueFromStorage,
  //       currentPage
  //     );
  //     setTotalPages(getTotalPages(searchPeopleData.count));
  //
  //     setContextData((prevState) => ({ ...prevState, searchData: searchPeopleData.results }));
  //   }
  //
  //   // setContextData((prevState) => ({ ...prevState, isLoading: false }));
  //   searchDispatch(stopHeroLoading());
  // };

  const searchFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchDispatch(startHeroLoading());

    urlParams.delete('details');
    setUrlParams(urlParams);
    // setShowDetails(false);
    setContextData((prevState) => ({ ...prevState, isShowDetails: false }));

    localStorage.setItem('searchValue', search);
    const searchPeopleData = await STAR_WARS.current.searchPeoples(search);
    setContextData((prevState) => ({ ...prevState, searchData: searchPeopleData.results }));

    setCurrentPage(1);
    setTotalPages(getTotalPages(searchPeopleData.count));

    searchDispatch(stopHeroLoading());
  };

  useEffect(() => {
    urlParams.set('page', currentPage.toString());
    navigate(`/search?${urlParams.toString()}`);

    // getData();
  }, [currentPage]);

  const pagesArray = getPagesArray(totalPages);

  return {
    // getData,
    totalPages,
    pagesArray,
    searchFormHandler,
    fetchError,
    setFetchError,
    currentPage,
    setCurrentPage,
  };
}
