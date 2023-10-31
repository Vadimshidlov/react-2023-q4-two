import './MyLoader.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default function MyLoader() {
  return (
    <div className="loader__container">
      <p className="loader__title">Loading . . .</p>
      <div className="loader__items">
        <div className="loader-item-1" />
        <div className="loader-item-2" />
        <div className="loader-item-3" />
      </div>
    </div>
  );
}
