import { useSearchParams } from 'react-router-dom';
import { PaginationPropsType } from 'components/Pagination/types';
import { useContextData } from 'context-store';

export default function Pagination({
  pagesArray,
  currentPage,
  setCurrentPage,
}: PaginationPropsType) {
  const { contextData, setContextData } = useContextData();
  const [urlParams, setUrlParams] = useSearchParams();

  return contextData.isLoading ? null : (
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
