import './Hero.scss';
import { HeroPropsType } from '@/components/Hero/types.ts';
import getHeroNumber from '@/shared/utils/getHeroNumber.ts';
import { changeViewMode } from '@/store/ViewModeSlice.ts';
import { useViewModeDispatch, useViewModeSelector } from '@/Hooks/redux.ts';

export default function Hero({ heroData, setHeroNumber }: HeroPropsType) {
  const heroNum = getHeroNumber(heroData);
  const { isViewMode } = useViewModeSelector((state) => state.viewModeReducer);
  const viewModeDispatch = useViewModeDispatch();

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className="hero__container"
      onClick={() => {
        if (isViewMode) {
          viewModeDispatch(changeViewMode(false));
          setHeroNumber(0);

          return;
        }

        viewModeDispatch(changeViewMode(true));

        setHeroNumber(heroNum);
      }}
      onKeyDown={() => console.log('Show details')}
      data-testid="hero-item"
    >
      <h3 className="hero__title">{heroData.name}</h3>
      <p className="hero__item-text">{`Birthday date: ${heroData.birth_year}`}</p>
      <p className="hero__item-text">{`Gender: ${heroData.gender}`}</p>
    </li>
  );
}
