import { useRef, useState } from 'react';
import SwapiService from 'services/SwapiService';
import { PeopleRequestType } from 'components/Search/Search';

export default function useGetHeroData(heroNumber: number) {
  const [heroData, setHeroData] = useState<PeopleRequestType>(Object);
  const STAR_WARS_API = useRef(SwapiService);

  const getData = async () => {
    const result = await STAR_WARS_API.current.getSelectPeople(heroNumber);
    setHeroData(result);
  };

  getData();

  return { heroData };
}
