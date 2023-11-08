// eslint-disable-next-line object-curly-newline
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/AppLayout/AppLayout.tsx';
import MainPage from '@/components/MainPage/MainPage.tsx';

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
