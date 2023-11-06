import { PeopleRequestType } from 'components/Search/Search';

export default function getHeroNumber(heroData: PeopleRequestType): number {
  return +heroData.url.split('/')[heroData.url.split('/').indexOf('people') + 1];
}
