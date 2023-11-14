/* eslint-disable object-curly-newline */
import { ReactNode, useEffect, useRef, useState } from 'react';
import MyLoader from '@/components/MyLoader/MyLoader.tsx';
import NoDataComponent from '@/components/SearchItems/NoDataComponent.tsx';
import Hero from '@/components/Hero/Hero.tsx';
import DetailsComponent from '@/components/Details/DetailsComponent.tsx';
import { usePagesSelector, useSearchSelector } from '@/hooks/redux.ts';
import { heroesAPI } from '@/services/HeroesService.ts';
import { useContextData } from '@/context-store.tsx';

export default function SearchItems() {
  let content: ReactNode;

  const { search } = useSearchSelector((state) => state.searchReducer);
  const { currentPage } = usePagesSelector((state) => state.pagesReducer);
  const searchRef = useRef(search);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const { data: heroes } = heroesAPI.useFetchAllHeroesQuery({
    searchValue: search,
    page: currentPage,
  });

  // const [getAllHeroes, { data: heroes }] = heroesAPI.useLazyFetchAllHeroesQuery();

  const { contextData } = useContextData();
  const [selectHeroNumber, setSelectHeroNumber] = useState<number>(0);
  const { isLoading } = useSearchSelector((state) => state.searchReducer);

  // useEffect(() => {
  //   getAllHeroes(
  //     {
  //       searchValue: searchRef.current,
  //       page: currentPage,
  //     },
  //     true
  //   );
  // }, [currentPage, getAllHeroes]);

  if (isLoading) {
    content = <MyLoader stylesClassName="loader__container" />;
    // } else if (contextData.searchData?.length === 0) {
  } else if (heroes?.results.length === 0) {
    content = <NoDataComponent />;
  } else {
    content = heroes?.results.map((searchItem) => (
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
