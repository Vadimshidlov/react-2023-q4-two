import { PeopleRequestType } from 'view/Search/Search';
import './Hero.scss';

export type HeroPropsType = {
  heroData: PeopleRequestType;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setHeroNumber: React.Dispatch<React.SetStateAction<number>>;
  heroIndex: number;
};

// eslint-disable-next-line react/prefer-stateless-function
export default function Hero({
  heroData,
  setShowDetails,
  showDetails,
  setHeroNumber,
  heroIndex,
}: HeroPropsType) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="hero__container"
      onClick={() => {
        if (showDetails) {
          setShowDetails(false);
          setHeroNumber(0);

          return;
        }

        setShowDetails(true);
        setHeroNumber(heroIndex);
      }}
      onKeyDown={() => console.log('Show details')}
    >
      <h3 className="hero__title">{heroData.name}</h3>
      <p className="hero__item-text">{`Birthday date: ${heroData.birth_year}`}</p>
      <p className="hero__item-text">{`Gender: ${heroData.gender}`}</p>
      <p className="hero__item-text">{`Skin color: ${heroData.skin_color}`}</p>
      <p className="hero__item-text">{`Eye color: ${heroData.eye_color}`}</p>
    </div>
  );
}
