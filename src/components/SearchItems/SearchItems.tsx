import { useState } from 'react';
import MyLoader from '@/components/MyLoader/MyLoader.tsx';
import NoDataComponent from '@/components/SearchItems/NoDataComponent.tsx';
import Hero from '@/components/Hero/Hero.tsx';
import DetailsComponent from '@/components/Details/DetailsComponent.tsx';
import { heroesAPI } from '@/services/HeroesService.ts';
import Pagination from '@/components/Pagination/Pagination.tsx';
import getPagesArray from '@/shared/utils/getPagesArray.ts';
import getTotalPages from '@/shared/utils/getTotalPages.ts';
import { usePagesSelector, useSearchSelector, useViewModeSelector } from '@/Hooks/redux.ts';

export default function SearchItems() {
  const { search } = useSearchSelector((state) => state.searchReducer);
  const { currentPage } = usePagesSelector((state) => state.pagesReducer);
  const { isViewMode } = useViewModeSelector((state) => state.viewModeReducer);

  const { data: heroes } = heroesAPI.useFetchAllHeroesQuery({
    searchValue: search,
    page: currentPage,
  });

  const [selectHeroNumber, setSelectHeroNumber] = useState<number>(0);
  const { isLoading } = useSearchSelector((state) => state.searchReducer);

  return (
    <div className={isViewMode ? 'searchItems__container__double' : 'searchItems__container'}>
      <ul className="searchItems__heroes" data-testid="heros-container">
        {isLoading ? (
          <MyLoader stylesClassName="loader__container" />
        ) : heroes?.results.length === 0 ? (
          <NoDataComponent />
        ) : (
          <>
            {heroes?.results.map((searchItem) => (
              <Hero
                data-test
                key={searchItem.name}
                heroData={searchItem}
                setHeroNumber={setSelectHeroNumber}
              />
            ))}
            <Pagination pagesArray={heroes ? getPagesArray(getTotalPages(heroes.count)) : []} />
          </>
        )}
      </ul>

      {isViewMode && <DetailsComponent heroNumber={selectHeroNumber} />}
    </div>
  );
}
