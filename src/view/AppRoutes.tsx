// eslint-disable-next-line object-curly-newline
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from 'view/AppLayout/AppLayout';
import MainPage from 'view/MainPage/MainPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/search" />} />
          <Route path="/search" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
