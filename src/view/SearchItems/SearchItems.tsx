import Hero from 'view/Hero/Hero';
import MyLoader from 'view/MyLoader/MyLoader';
import { PeopleRequestType } from 'view/Search/Search';
import React from 'react';

export type SearchItemsPropsType = {
  searchData: PeopleRequestType[] | undefined;
  isLoading: boolean;
};

// eslint-disable-next-line react/prefer-stateless-function
class SearchItems extends React.Component<SearchItemsPropsType> {
  render() {
    const { isLoading, searchData } = this.props;

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
}

export default SearchItems;
