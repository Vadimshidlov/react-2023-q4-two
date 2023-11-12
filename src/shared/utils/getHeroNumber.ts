import { PeopleRequestType } from '@/components/Search/types.ts';

export default function getHeroNumber(heroData: PeopleRequestType): number {
  return +heroData.url.split('/')[heroData.url.split('/').indexOf('people') + 1];
}
