import { useSearchParams } from 'react-router-dom';
import { PaginationPropsType } from 'components/Pagination/types';

export default function Pagination({
  isLoading,
  pagesArray,
  currentPage,
  setCurrentPage,
  setShowDetails,
}: PaginationPropsType) {
  const [urlParams, setUrlParams] = useSearchParams();

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
            setShowDetails(false);
            setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
