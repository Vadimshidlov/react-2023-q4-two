import Hero from 'components/Hero/Hero';
import MyLoader from 'components/MyLoader/MyLoader';
import NoDataComponent from 'components/SearchItems/NoDataComponent';
import { ReactNode, useState } from 'react';
import DetailsComponent from 'components/Details/DetailsComponent';
import { PeopleRequestType } from 'components/Search/types';

export type SearchItemsPropsType = {
  searchData: PeopleRequestType[] | undefined;
  isLoading: boolean;
  currentPage: number;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchItems({
  isLoading,
  searchData,
  showDetails,
  setShowDetails,
}: SearchItemsPropsType) {
  let content: ReactNode;

  const [selectHeroNumber, setSelectHeroNumber] = useState<number>(0);

  if (isLoading) {
    content = <MyLoader stylesClassName="loader__container" />;
  } else if (searchData?.length === 0) {
    content = <NoDataComponent />;
  } else {
    content = searchData?.map((searchItem) => (
      <Hero
        key={searchItem.name}
        heroData={searchItem}
        setShowDetails={setShowDetails}
        showDetails={showDetails}
        setHeroNumber={setSelectHeroNumber}
      />
    ));
  }

  return (
    <div className={showDetails ? 'searchItems__container__double' : 'searchItems__container'}>
      <div className="searchItems__heroes">{content}</div>

      {showDetails && (
        <DetailsComponent setShowDetails={setShowDetails} heroNumber={selectHeroNumber} />
      )}
    </div>
  );
}
