import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './DetailsComponent.scss';
import { DetailsComponentPropsType } from '@/components/Details/types.ts';
import MyLoader from '@/components/MyLoader/MyLoader.tsx';
import { useViewModeDispatch, useViewModeSelector } from '@/hooks/redux';
import { changeViewMode } from '@/store/ViewModeSlice.ts';
import { heroesAPI } from '@/services/HeroesService';

export default function DetailsComponent({ heroNumber }: DetailsComponentPropsType) {
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();

  const { isViewModeLoading } = useViewModeSelector((state) => state.viewModeReducer);

  const { data: heroeDetails } = heroesAPI.useFetchSelectHeroQuery(heroNumber);

  const viewModeDispatch = useViewModeDispatch();

  useEffect(() => {
    urlParams.set('details', heroNumber.toString());
    navigate(`?${urlParams.toString()}`);

    return () => {
      urlParams.delete('details');
      setUrlParams(urlParams);
    };
  }, [heroNumber]);

  return (
    <div className="hero-details__container" data-testid="details-container">
      {isViewModeLoading || !heroeDetails ? (
        <MyLoader stylesClassName="loader__container loader__details" />
      ) : (
        <>
          <button
            className="hero-details__button"
            type="button"
            onClick={() => {
              viewModeDispatch(changeViewMode(false));
            }}
          >
            Close
          </button>

          <div className="hero-details-info">
            <p>{`${heroeDetails.name}`}</p>
            <p>{`Hero ID: ${heroNumber}`}</p>
            <p>{`Height: ${heroeDetails.height} sm`}</p>
            <p>{`Skin color: ${heroeDetails.skin_color}`}</p>
            <p>{`Eye color: ${heroeDetails.eye_color}`}</p>
            <p>{`Hair color: ${heroeDetails.hair_color}`}</p>
            <p>{`Mass: ${heroeDetails.mass} kg`}</p>
          </div>
        </>
      )}
    </div>
  );
}
