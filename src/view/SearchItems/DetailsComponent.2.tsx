import { useEffect, useRef } from 'react';
import SwapiService from 'services/SwapiService';
import useGetHeroData from 'hooks/useGetHeroData';
import { DetailsComponentPropsType } from './DetailsComponent';

export default function DetailsComponent({
  // heroData,
  setShowDetails,
  heroNumber,
}: DetailsComponentPropsType) {
  const STAR_WARS_API = useRef(SwapiService);
  const { heroData } = useGetHeroData();

  useEffect(() => {
    const getData = async () => {
      const result = await STAR_WARS_API.current.getSelectPeople(heroNumber);
      setheroData(result);
    };

    getData();
  }, [heroNumber]);

  return (
    <div className="hero-details__container">
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
    </div>
  );
}
