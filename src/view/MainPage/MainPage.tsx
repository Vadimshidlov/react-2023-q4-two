import Search, { PeopleRequestType } from 'view/Search/Search';
import SearchItems from 'view/SearchItems/SearchItems';
import './MainPage.scss';
import ErrorButton from 'view/ErrorButton/ErrorButton';
import useFetching from 'Hooks/useFetching';

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
  } = useFetching();

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

      {isLoading ? null : (
        <div className="page__container">
          {pagesArray.map((page) => (
            <button
              type="button"
              key={page}
              className={currentPage === page ? 'page__number__active' : 'page__number'}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
