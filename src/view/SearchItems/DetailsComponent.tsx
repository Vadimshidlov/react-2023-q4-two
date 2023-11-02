import { useEffect, useRef, useState } from 'react';
import { PeopleRequestType } from 'view/Search/Search';
import SwapiService from 'services/SwapiService';
import MyLoader from 'view/MyLoader/MyLoader';

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

  const STAR_WARS_API = useRef(SwapiService);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      console.log('getData');
      const result = await STAR_WARS_API.current.getSelectPeople(heroNumber);
      console.log(result, 'result');
      setHeroData(result);
      setIsLoading(false);
    };

    getData();
  }, [heroNumber]);

  return isLoading || !heroData ? (
    <MyLoader />
  ) : (
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
