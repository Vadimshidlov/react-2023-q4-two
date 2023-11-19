import { PeopleRequestType } from 'components/Search/types';

export type HeroPropsType = {
  heroData: PeopleRequestType;
  setHeroNumber: React.Dispatch<React.SetStateAction<number>>;
};
