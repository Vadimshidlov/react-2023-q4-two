import { useSearchParams } from 'react-router-dom';
import {
  usePagesDispatch,
  usePagesSelector,
  useSearchSelector,
  useViewModeDispatch,
} from '@/hooks/redux';
import { setCurrentPage } from '@/store/PagesSlice.ts';
import { changeViewMode } from '@/store/ViewModeSlice.ts';

export default function Pagination({ pagesArray }: { pagesArray: number[] }) {
  const [urlParams, setUrlParams] = useSearchParams();

  const { isLoading } = useSearchSelector((state) => state.searchReducer);
  const { currentPage } = usePagesSelector((state) => state.pagesReducer);

  const pagesDispatch = usePagesDispatch();
  const viewModeDispatch = useViewModeDispatch();

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
