import { useSearchParams } from 'react-router-dom';
import { useContextData } from '@/context-store.tsx';
import { PaginationPropsType } from '@/components/Pagination/types.ts';
import { useSearchSelector } from '@/hooks/redux.ts';

export default function Pagination({
  pagesArray,
  currentPage,
  setCurrentPage,
}: PaginationPropsType) {
  const { setContextData } = useContextData();
  const [urlParams, setUrlParams] = useSearchParams();
  const { isLoading } = useSearchSelector((state) => state.searchReducer);

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
            setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
