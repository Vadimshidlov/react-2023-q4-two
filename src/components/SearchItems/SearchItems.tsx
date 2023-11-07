import Hero from 'components/Hero/Hero';
import MyLoader from 'components/MyLoader/MyLoader';
import NoDataComponent from 'components/SearchItems/NoDataComponent';
import { ReactNode, useState } from 'react';
import DetailsComponent from 'components/Details/DetailsComponent';
import { useContextData } from 'context-store';

// export type SearchItemsPropsType = {
//   currentPage: number;
// };

export default function SearchItems() {
  let content: ReactNode;

  const { contextData } = useContextData();
  const [selectHeroNumber, setSelectHeroNumber] = useState<number>(0);

  if (contextData.isLoading) {
    content = <MyLoader stylesClassName="loader__container" />;
  } else if (contextData.searchData?.length === 0) {
    content = <NoDataComponent />;
  } else {
    content = contextData.searchData?.map((searchItem) => (
      <Hero key={searchItem.name} heroData={searchItem} setHeroNumber={setSelectHeroNumber} />
    ));
  }

  return (
    <div
      className={
        contextData.isShowDetails ? 'searchItems__container__double' : 'searchItems__container'
      }
    >
      <div className="searchItems__heroes">{content}</div>

      {contextData.isShowDetails && <DetailsComponent heroNumber={selectHeroNumber} />}
    </div>
  );
}
