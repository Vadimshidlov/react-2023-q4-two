import './MyLoader.scss';
import { MyLoaderPropsType } from '@/components/MyLoader/types.ts';

export default function MyLoader({ stylesClassName }: MyLoaderPropsType) {
  return (
    <div className={stylesClassName} data-testid="app-loader">
      <p className="loader__title">Loading . . .</p>
      <div className="loader__items">
        <div className="loader-item-1" />
        <div className="loader-item-2" />
        <div className="loader-item-3" />
      </div>
    </div>
  );
}
