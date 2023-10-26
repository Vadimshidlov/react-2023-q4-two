import { PeopleRequestType } from 'view/Search/Search';
import './Hero.scss';

export type HeroPropsType = {
  heroData: PeopleRequestType;
};

export default function Hero({ heroData }: HeroPropsType) {
  return (
    <div className="hero__container">
      <h3>{heroData.name}</h3>
      <p>
        Birthday date:
        {heroData.birth_year}
      </p>
      <p>
        Gender:
        {heroData.gender}
      </p>
      <p>
        Skin color:
        {heroData.skin_color}
      </p>
      <p>
        Eye color:
        {heroData.eye_color}
      </p>
    </div>
  );
}
