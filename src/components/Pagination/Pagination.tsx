import { useSearchParams } from 'react-router-dom';
// import { useContextData } from '@/context-store.tsx';
import {
  usePagesDispatch,
  usePagesSelector,
  useSearchSelector,
  useViewModeDispatch,
} from '@/hooks/redux';
import getPagesArray from '@/shared/utils/getPagesArray';
import { setCurrentPage } from '@/store/PagesSlice.ts';
import { changeViewMode } from '@/store/ViewModeSlice.ts';

export default function Pagination() {
  const [urlParams, setUrlParams] = useSearchParams();

  const { isLoading } = useSearchSelector((state) => state.searchReducer);
  const { totalPages, currentPage } = usePagesSelector((state) => state.pagesReducer);

  const pagesDispatch = usePagesDispatch();
  const viewModeDispatch = useViewModeDispatch();

  const pagesArray = getPagesArray(totalPages);

  return isLoading ? null : (
    <div className="page__container" data-testid="pagination_container">
      {pagesArray.map((page) => (
        <button
          type="button"
          key={page}
          className={currentPage === page ? 'page__number__active' : 'page__number'}
          onClick={() => {
            urlParams.delete('details');
            setUrlParams(urlParams);
            // setContextData((prevState) => ({ ...prevState, isShowDetails: false }));
            viewModeDispatch(changeViewMode(false));
            pagesDispatch(setCurrentPage(page));
          }}
          data-testid="pagination_btn"
        >
          {page}
        </button>
      ))}
    </div>
  );
}
