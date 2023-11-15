import './MainPage.scss';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorButton from '@/components/ErrorButton/ErrorButton.tsx';
import Search from '@/components/Search/Search.tsx';
import SearchItems from '@/components/SearchItems/SearchItems.tsx';
import Pagination from '@/components/Pagination/Pagination.tsx';
import { usePagesSelector } from '@/hooks/redux';

export default function MainPage() {
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();

  const { currentPage } = usePagesSelector((state) => state.pagesReducer);

  useEffect(() => {
    urlParams.set('page', currentPage.toString());
    navigate(`/search?${urlParams.toString()}`);
  }, [currentPage, navigate, urlParams]);

  return (
    <div className="main-page__container">
      <ErrorButton />
      <Search />
      <SearchItems />
      <Pagination />
    </div>
  );
}
