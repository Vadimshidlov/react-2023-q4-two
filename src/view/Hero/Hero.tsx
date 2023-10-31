import { PeopleRequestType } from 'view/Search/Search';
import './Hero.scss';

export type HeroPropsType = {
  heroData: PeopleRequestType;
};

// eslint-disable-next-line react/prefer-stateless-function
export default function Hero({ heroData }: HeroPropsType) {
  return (
    <div className="hero__container">
      <h3 className="hero__title">{heroData.name}</h3>
      <p className="hero__item-text">{`Birthday date: ${heroData.birth_year}`}</p>
      <p className="hero__item-text">{`Gender: ${heroData.gender}`}</p>
      <p className="hero__item-text">{`Skin color: ${heroData.skin_color}`}</p>
      <p className="hero__item-text">{`Eye color: ${heroData.eye_color}`}</p>
    </div>
  );
}
