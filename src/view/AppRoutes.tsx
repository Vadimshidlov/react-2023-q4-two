// eslint-disable-next-line object-curly-newline
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import MainPage from 'view/MainPage/MainPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/search" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
