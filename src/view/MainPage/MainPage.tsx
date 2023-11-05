import Search, { PeopleRequestType } from 'view/Search/Search';
import SearchItems from 'view/SearchItems/SearchItems';
import './MainPage.scss';
import ErrorButton from 'view/ErrorButton/ErrorButton';
import useFetching from 'hooks/useFetching';
import Pagination from 'view/Pagination/Pagination';

export type MainPageState = {
  searchValue: string;
  fetchError: string;
  searchData: PeopleRequestType[];
  isLoading: boolean;
};

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
