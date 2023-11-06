import { PeopleRequestType } from 'components/Search/Search';

export type HeroPropsType = {
  heroData: PeopleRequestType;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setHeroNumber: React.Dispatch<React.SetStateAction<number>>;
};
