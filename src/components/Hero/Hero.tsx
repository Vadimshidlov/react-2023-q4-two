import './Hero.scss';
import getHeroNumber from 'shared/utils/getHeroNumber';
import { HeroPropsType } from 'components/Hero/types';
import { useContextData } from 'context-store';

export default function Hero({ heroData, setHeroNumber }: HeroPropsType) {
  const heroNum = getHeroNumber(heroData);
  const { contextData, setContextData } = useContextData();

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="hero__container"
      onClick={() => {
        if (contextData.isShowDetails) {
          // setShowDetails(false);
          setContextData((prevState) => ({ ...prevState, isShowDetails: false }));
          setHeroNumber(0);

          return;
        }

        // setShowDetails(true);
        setContextData((prevState) => ({ ...prevState, isShowDetails: true }));

        setHeroNumber(heroNum);
      }}
      onKeyDown={() => console.log('Show details')}
    >
      <h3 className="hero__title">{heroData.name}</h3>
      <p className="hero__item-text">{`Birthday date: ${heroData.birth_year}`}</p>
      <p className="hero__item-text">{`Gender: ${heroData.gender}`}</p>
    </div>
  );
}
