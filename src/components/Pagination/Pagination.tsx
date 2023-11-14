import { useSearchParams } from 'react-router-dom';
import { useContextData } from '@/context-store.tsx';
import { usePagesDispatch, usePagesSelector, useSearchSelector } from '@/hooks/redux.ts';
import getPagesArray from '@/shared/utils/getPagesArray';
import { setCurrentPage } from '@/store/PagesSlice.ts';

export default function Pagination() {
  const { setContextData } = useContextData();
  const [urlParams, setUrlParams] = useSearchParams();

  const { isLoading } = useSearchSelector((state) => state.searchReducer);
  const { totalPages, currentPage } = usePagesSelector((state) => state.pagesReducer);

  const pagesDispatch = usePagesDispatch();

  const pagesArray = getPagesArray(totalPages);
  console.log(pagesArray, 'pagesArray');

  return isLoading ? null : (
    <div className="page__container">
      {pagesArray.map((page) => (
        <button
          type="button"
          key={page}
          className={currentPage === page ? 'page__number__active' : 'page__number'}
          onClick={() => {
            urlParams.delete('details');
            setUrlParams(urlParams);
            // setShowDetails(false);
            setContextData((prevState) => ({ ...prevState, isShowDetails: false }));
            // setCurrentPage(page);
            pagesDispatch(setCurrentPage(page));
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
