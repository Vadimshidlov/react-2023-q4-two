import { useEffect, useRef, useState } from 'react';
import { PeopleRequestType } from 'view/Search/Search';
import SwapiService from 'services/SwapiService';
import MyLoader from 'view/MyLoader/MyLoader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './DetailsComponent.scss';

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

      const result = await STAR_WARS_API.current.getSelectPeople(heroNumber);

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
        <MyLoader stylesClassName="loader__container loader__details" />
      ) : (
        <>
          <button
            className="hero-details__button"
            type="button"
            onClick={() => {
              setShowDetails(false);
            }}
          >
            Close
          </button>

          <div className="hero-details-info">
            <p>{`Number: ${heroNumber}`}</p>
            <p>{`Height: ${heroData.height}`}</p>
            <p>{`Skin color: ${heroData.skin_color}`}</p>
            <p>{`Eye color: ${heroData.eye_color}`}</p>
          </div>
        </>
      )}
    </div>
  );
}
