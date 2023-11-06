import Search from 'components/Search/Search';
import SearchItems from 'components/SearchItems/SearchItems';
import './MainPage.scss';
import ErrorButton from 'components/ErrorButton/ErrorButton';
import useFetching from 'hooks/useFetching';
import Pagination from 'components/Pagination/Pagination';

export default function MainPage() {
  const {
    pagesArray,
    isLoading,
    searchData,
    searchFormHandler,
    searchValue,
    setSearchValue,
    fetchError,
    setFetchError,
    currentPage,
    setCurrentPage,
    showDetails,
    setShowDetails,
  } = useFetching();

  return (
    <div className="main-page__container">
      <ErrorButton />
      <Search
        searchFormHandler={searchFormHandler}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fetchError={fetchError}
        setFetchError={setFetchError}
      />
      <SearchItems
        searchData={searchData}
        isLoading={isLoading}
        currentPage={currentPage}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      <Pagination
        currentPage={currentPage}
        isLoading={isLoading}
        pagesArray={pagesArray}
        setCurrentPage={setCurrentPage}
        setShowDetails={setShowDetails}
      />
    </div>
  );
}
