import Hero from 'view/Hero/Hero';
import MyLoader from 'view/MyLoader/MyLoader';
import { PeopleRequestType } from 'view/Search/Search';

export type SearchItemsPropsType = {
  searchData: PeopleRequestType[] | undefined;
  isLoading: boolean;
};

function SearchItems({ searchData, isLoading }: SearchItemsPropsType) {
  return (
    <div className={isLoading ? 'searchItems__container__center' : 'searchItems__container'}>
      <div>
        <div>
          {isLoading ? (
            <MyLoader />
          ) : (
            searchData?.map((searchItem) => <Hero key={searchItem.name} heroData={searchItem} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchItems;
