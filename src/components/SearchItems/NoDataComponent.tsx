import './NoDataComponent.scss';

export default function NoDataComponent() {
  return (
    <div className="not-found__container" data-testid="not-found-message">
      <h2 className="not-found__title">Sad news... Heroes are not found</h2>
    </div>
  );
}
