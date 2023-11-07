/* eslint-disable operator-linebreak */
import Search from 'components/Search/Search';
import SearchItems from 'components/SearchItems/SearchItems';
import './MainPage.scss';
import ErrorButton from 'components/ErrorButton/ErrorButton';
import useFetching from 'hooks/useFetching';
import Pagination from 'components/Pagination/Pagination';

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
