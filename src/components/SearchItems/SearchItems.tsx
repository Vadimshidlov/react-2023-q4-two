import { ReactNode, useState } from 'react';
import { useContextData } from '@/context-store.tsx';
import MyLoader from '@/components/MyLoader/MyLoader.tsx';
import NoDataComponent from '@/components/SearchItems/NoDataComponent.tsx';
import Hero from '@/components/Hero/Hero.tsx';
import DetailsComponent from '@/components/Details/DetailsComponent.tsx';

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
      <Hero
        data-test
        key={searchItem.name}
        heroData={searchItem}
        setHeroNumber={setSelectHeroNumber}
      />
    ));
  }

  return (
    <div
      className={
        contextData.isShowDetails ? 'searchItems__container__double' : 'searchItems__container'
      }
    >
      <ul className="searchItems__heroes">{content}</ul>

      {contextData.isShowDetails && <DetailsComponent heroNumber={selectHeroNumber} />}
    </div>
  );
}
