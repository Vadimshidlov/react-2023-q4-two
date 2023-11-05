import { useEffect, useRef, useState } from 'react';
import { PeopleRequestType } from 'view/Search/Search';
import SwapiService from 'services/SwapiService';
import MyLoader from 'view/MyLoader/MyLoader';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type DetailsComponentPropsType = {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  heroNumber: number;
};

export default function DetailsComponent({
  setShowDetails,
  heroNumber,
}: DetailsComponentPropsType) {
  const [heroData, setHeroData] = useState<PeopleRequestType>(Object);
  const [isLoading, setIsLoading] = useState(false);
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();

  const STAR_WARS_API = useRef(SwapiService);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      urlParams.set('details', heroNumber.toString());
      navigate(`?${urlParams.toString()}`);

      console.log('getData');
      const result = await STAR_WARS_API.current.getSelectPeople(heroNumber);
      console.log(result, 'result');
      setHeroData(result);
      setIsLoading(false);
    };

    getData();

    return () => {
      urlParams.delete('details');
      setUrlParams(urlParams);
    };
  }, [heroNumber]);

  return (
    <div className="hero-details__container">
      {isLoading || !heroData ? (
        <MyLoader />
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setShowDetails(false);
            }}
          >
            Close
          </button>
          <h2>{`Number: ${heroNumber}`}</h2>
          <h2>{heroData.height}</h2>
        </>
      )}
    </div>
  );
}
