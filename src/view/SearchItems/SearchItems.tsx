import Hero from 'view/Hero/Hero';
import MyLoader from 'view/MyLoader/MyLoader';
import { PeopleRequestType } from 'view/Search/Search';
import NoDataComponent from 'view/SearchItems/NoDataComponent';
import { ReactNode } from 'react';

export type SearchItemsPropsType = {
  searchData: PeopleRequestType[] | undefined;
  isLoading: boolean;
};

// eslint-disable-next-line react/prefer-stateless-function
export default function SearchItems({ isLoading, searchData }: SearchItemsPropsType) {
  let content: ReactNode;

  if (isLoading) {
    content = <MyLoader />;
  } else if (searchData?.length === 0) {
    content = <NoDataComponent />;
  } else {
    content = searchData?.map((searchItem) => <Hero key={searchItem.name} heroData={searchItem} />);
  }

  return (
    <div className={isLoading ? 'searchItems__container__center' : 'searchItems__container'}>
      <div>
        <div>
          {/* {isLoading ? (
            <MyLoader />
          ) : searchData.length === 0 ? (
            <NoDataComponent />
          ) : (
            searchData?.map((searchItem) => <Hero key={searchItem.name} heroData={searchItem} />)
          )} */}
          {content}
        </div>
      </div>
    </div>
  );
}
