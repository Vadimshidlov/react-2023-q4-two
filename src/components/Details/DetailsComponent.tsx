import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './DetailsComponent.scss';
import { DetailsComponentPropsType } from '@/components/Details/types.ts';
import { PeopleRequestType } from '@/components/Search/types.ts';
import { useContextData } from '@/context-store.tsx';
import SwapiService from '@/services/SwapiService.ts';
import MyLoader from '@/components/MyLoader/MyLoader.tsx';

export default function DetailsComponent({ heroNumber }: DetailsComponentPropsType) {
  const [heroData, setHeroData] = useState<PeopleRequestType>(Object);
  const { contextData, setContextData } = useContextData();
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();

  const STAR_WARS_API = useRef(SwapiService);

  useEffect(() => {
    const getData = async () => {
      setContextData((prevState) => ({ ...prevState, isLoadingDetails: true }));

      urlParams.set('details', heroNumber.toString());
      navigate(`?${urlParams.toString()}`);

      const result = await STAR_WARS_API.current.getSelectPeople(heroNumber);

      setHeroData(result);

      setContextData((prevState) => ({ ...prevState, isLoadingDetails: false }));
    };

    getData();

    return () => {
      urlParams.delete('details');
      setUrlParams(urlParams);
    };
  }, [heroNumber]);

  return (
    <div className="hero-details__container">
      {contextData.isLoadingDetails || !heroData ? (
        // eslint-disable-next-line react/jsx-no-undef
        <MyLoader stylesClassName="loader__container loader__details" />
      ) : (
        <>
          <button
            className="hero-details__button"
            type="button"
            onClick={() => {
              // setShowDetails(false);
              setContextData((prevState) => ({ ...prevState, isShowDetails: false }));
            }}
          >
            Close
          </button>

          <div className="hero-details-info">
            <p>{`${heroData.name}`}</p>
            <p>{`Hero ID: ${heroNumber}`}</p>
            <p>{`Height: ${heroData.height} sm`}</p>
            <p>{`Skin color: ${heroData.skin_color}`}</p>
            <p>{`Eye color: ${heroData.eye_color}`}</p>
            <p>{`Hair color: ${heroData.hair_color}`}</p>
            <p>{`Mass: ${heroData.mass} kg`}</p>
          </div>
        </>
      )}
    </div>
  );
}
