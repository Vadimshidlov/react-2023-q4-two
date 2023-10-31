// eslint-disable-next-line object-curly-newline
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import MainPage from 'view/MainPage/MainPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search/:pageNumber" element={<MainPage />} />
        <Route path="/" element={<Navigate to="/search" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
