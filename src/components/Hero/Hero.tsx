import './Hero.scss';
import { HeroPropsType } from '@/components/Hero/types.ts';
import getHeroNumber from '@/shared/utils/getHeroNumber.ts';
import { useContextData } from '@/context-store.tsx';

export default function Hero({ heroData, setHeroNumber }: HeroPropsType) {
  const heroNum = getHeroNumber(heroData);
  const { contextData, setContextData } = useContextData();

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className="hero__container"
      onClick={() => {
        if (contextData.isShowDetails) {
          setContextData((prevState) => ({ ...prevState, isShowDetails: false }));
          setHeroNumber(0);

          return;
        }

        setContextData((prevState) => ({ ...prevState, isShowDetails: true }));

        setHeroNumber(heroNum);
      }}
      onKeyDown={() => console.log('Show details')}
      data-testid={`hero_id_${heroNum}`}
    >
      <h3 className="hero__title">{heroData.name}</h3>
      <p className="hero__item-text">{`Birthday date: ${heroData.birth_year}`}</p>
      <p className="hero__item-text">{`Gender: ${heroData.gender}`}</p>
    </li>
  );
}
