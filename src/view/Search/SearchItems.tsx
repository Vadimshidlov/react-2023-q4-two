import Hero from 'view/Search/Hero';
import { PeopleRequestType } from 'view/Search/Search';
import ClipLoader from 'react-spinners/ClipLoader';

export type SearchItemsPropsType = {
  searchData: PeopleRequestType[] | undefined;
  isLoading: boolean;
};

function SearchItems({ searchData, isLoading }: SearchItemsPropsType) {
  console.log(`searchData with ${searchData}`);

  return (
    <div className={isLoading ? 'searchItems__container__center' : 'searchItems__container'}>
      <div>
        <div>
          {isLoading ? (
            <ClipLoader color="D0021B" loading={isLoading} size={150} />
          ) : (
            searchData?.map((searchItem) => <Hero key={searchItem.name} heroData={searchItem} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchItems;
