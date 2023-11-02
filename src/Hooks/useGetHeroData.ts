import { useRef, useState } from 'react';
import SwapiService from 'services/SwapiService';
import { PeopleRequestType } from 'view/Search/Search';

export default function useGetHeroData(heroNumber: number) {
  const [heroData, setHeroData] = useState<PeopleRequestType>(Object);
  const STAR_WARS_API = useRef(SwapiService);

  const getData = async () => {
    console.log('getData');
    const result = await STAR_WARS_API.current.getSelectPeople(heroNumber);
    setHeroData(result);
  };

  getData();

  return { heroData };
}
