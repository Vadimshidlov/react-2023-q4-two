import { Outlet } from 'react-router-dom';
import './AppLayout.scss';

export default function AppLayout() {
  return (
    <>
      <h2 className="page__title">StarWars Heroes</h2>
      <Outlet />
    </>
  );
}
