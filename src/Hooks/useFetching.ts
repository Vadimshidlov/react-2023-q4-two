import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContextData } from '@/context-store.tsx';
import { useSearchDispatch, useSearchSelector } from '@/hooks/redux.ts';
import { startHeroLoading, stopHeroLoading } from '@/store/SearchSlice.ts';

export default function useFetching() {
  const { setContextData } = useContextData();
  const [fetchError, setFetchError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();
  const { search } = useSearchSelector((state) => state.searchReducer);
  const searchDispatch = useSearchDispatch();

  const searchFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchDispatch(startHeroLoading());

    urlParams.delete('details');
    setUrlParams(urlParams);
    setContextData((prevState) => ({ ...prevState, isShowDetails: false }));

    localStorage.setItem('searchValue', search);

    setCurrentPage(1);

    searchDispatch(stopHeroLoading());
  };

  useEffect(() => {
    urlParams.set('page', currentPage.toString());
    navigate(`/search?${urlParams.toString()}`);
  }, [currentPage]);

  return {
    searchFormHandler,
    fetchError,
    setFetchError,
    currentPage,
    setCurrentPage,
  };
}
