import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/AppLayout/AppLayout.tsx';
import MainPage from '@/components/MainPage/MainPage.tsx';
import NotFound from '@/components/NotFound/NotFound.tsx';
import TestFetch from '@/components/TestFetch/TestFetch.tsx';
import UncontrolledForm from '@/components/Forms/UncontrolledForm/UncontrolledForm';
import ControlledForm from '@/components/Forms/ControlledForm/ControlledForm';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/search" />} />
          <Route path="/search" element={<MainPage />} />
          <Route path="/fetch" element={<TestFetch />} />
        </Route>
        <Route path="/uncontrolled" element={<UncontrolledForm />} />
        <Route path="/controlled" element={<ControlledForm />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
