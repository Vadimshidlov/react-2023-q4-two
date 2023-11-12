/* eslint-disable operator-linebreak */
import './MainPage.scss';
import useFetching from '@/hooks/useFetching.ts';
import ErrorButton from '@/components/ErrorButton/ErrorButton.tsx';
import Search from '@/components/Search/Search.tsx';
import SearchItems from '@/components/SearchItems/SearchItems.tsx';
import Pagination from '@/components/Pagination/Pagination.tsx';

export default function MainPage() {
  // eslint-disable-next-line object-curly-newline
  const { pagesArray, searchFormHandler, fetchError, setFetchError, currentPage, setCurrentPage } =
    useFetching();

  return (
    <div className="main-page__container">
      <ErrorButton />
      <Search
        searchFormHandler={searchFormHandler}
        fetchError={fetchError}
        setFetchError={setFetchError}
      />
      <SearchItems />
      <Pagination
        currentPage={currentPage}
        pagesArray={pagesArray}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
