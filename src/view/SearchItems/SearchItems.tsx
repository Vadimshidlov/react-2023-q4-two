import Hero from 'view/Hero/Hero';
import MyLoader from 'view/MyLoader/MyLoader';
import { PeopleRequestType } from 'view/Search/Search';
import NoDataComponent from 'view/SearchItems/NoDataComponent';
import { ReactNode, useState } from 'react';
import getHeroNumber from 'shared/utils/getHeroNumber';
import DetailsComponent from 'view/SearchItems/DetailsComponent';

export type SearchItemsPropsType = {
  searchData: PeopleRequestType[] | undefined;
  isLoading: boolean;
  currentPage: number;
};

// eslint-disable-next-line react/prefer-stateless-function
export default function SearchItems({ isLoading, searchData, currentPage }: SearchItemsPropsType) {
  let content: ReactNode;

  // const [showDetails, setShowDetails] = useState<PeopleRequestType | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectHeroNumber, setSelectHeroNumber] = useState<number>(0);

  if (isLoading) {
    content = <MyLoader />;
  } else if (searchData?.length === 0) {
    content = <NoDataComponent />;
  } else {
    content = searchData?.map((searchItem, index) => (
      <Hero
        key={searchItem.name}
        heroData={searchItem}
        setShowDetails={setShowDetails}
        showDetails={showDetails}
        setHeroNumber={setSelectHeroNumber}
        heroIndex={index}
      />
    ));
  }

  return (
    <div className={showDetails ? 'searchItems__container__double' : 'searchItems__container'}>
      <div className="searchItems__heroes">{content}</div>
      {/* <div hidden={showDetails}> */}

      {showDetails && (
        <DetailsComponent
          // heroData={showDetails}
          setShowDetails={setShowDetails}
          // heroNumber={heroNumber + 1 + (currentPage - 1) * 10}
          heroNumber={getHeroNumber(selectHeroNumber, currentPage)}
        />
      )}
    </div>
  );
}
