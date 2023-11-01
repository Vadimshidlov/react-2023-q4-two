import './DetailsComponent.scss';
import useGetHeroData from 'hooks/useGetHeroData';

export type DetailsComponentPropsType = {
  setShowDetails: React.Dispatch<boolean>;
  heroNumber: number;
};

export default function DetailsComponent({
  setShowDetails,
  heroNumber,
}: DetailsComponentPropsType) {
  const { heroData } = useGetHeroData(heroNumber);

  return (
    <div className="hero-details__container">
      <button
        type="button"
        onClick={() => {
          setShowDetails(false);
        }}
      >
        Close
      </button>
      <h2>{`Number: ${heroNumber}`}</h2>
      <h2>{heroData.height}</h2>
    </div>
  );
}
