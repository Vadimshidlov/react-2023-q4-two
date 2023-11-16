/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-newline */
import { useState } from 'react';
import MyLoader from '@/components/MyLoader/MyLoader.tsx';
import NoDataComponent from '@/components/SearchItems/NoDataComponent.tsx';
import Hero from '@/components/Hero/Hero.tsx';
import DetailsComponent from '@/components/Details/DetailsComponent.tsx';
import { usePagesSelector, useSearchSelector, useViewModeSelector } from '@/hooks/redux';
import { heroesAPI } from '@/services/HeroesService.ts';

export default function SearchItems() {
  const { search } = useSearchSelector((state) => state.searchReducer);
  const { currentPage } = usePagesSelector((state) => state.pagesReducer);
  const { isViewMode } = useViewModeSelector((state) => state.viewModeReducer);

  const { data: heroes } = heroesAPI.useFetchAllHeroesQuery({
    searchValue: search,
    page: currentPage,
  });

  // console.log(heroes, 'for tests');

  const [selectHeroNumber, setSelectHeroNumber] = useState<number>(0);
  const { isLoading } = useSearchSelector((state) => state.searchReducer);

  return (
    <div className={isViewMode ? 'searchItems__container__double' : 'searchItems__container'}>
      {/* <ul className="searchItems__heroes">{content}</ul> */}
      <ul className="searchItems__heroes" data-testid="heros-container">
        {isLoading ? (
          <MyLoader stylesClassName="loader__container" />
        ) : heroes?.results.length === 0 ? (
          <NoDataComponent />
        ) : (
          heroes?.results.map((searchItem) => (
            <Hero
              data-test
              key={searchItem.name}
              heroData={searchItem}
              setHeroNumber={setSelectHeroNumber}
            />
          ))
        )}
      </ul>

      {isViewMode && <DetailsComponent heroNumber={selectHeroNumber} />}
    </div>
  );
}
