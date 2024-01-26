import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/AppLayout/AppLayout.tsx';
import MainPage from '@/components/MainPage/MainPage.tsx';
import NotFound from '@/components/NotFound/NotFound.tsx';
import TestFetch from '@/components/TestFetch/TestFetch.tsx';
import ControlledForm from '@/components/Forms/ControlledForm/ControlledForm';
import MainFormPage from '@/components/Forms/MainFormPage/MainFormPage';
import UncontrolledForm from '@/components/Forms/UncontrolledForm/UncontrolledForm';
import TestState from '@/components/TestState/TestState.tsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/search" />} />
          <Route path="/search" element={<MainPage />} />
          <Route path="/fetch" element={<TestFetch />} />
        </Route>
        <Route path="/main" element={<MainFormPage />} />
        <Route path="/uform" element={<UncontrolledForm />} />
        <Route path="/cform" element={<ControlledForm />} />
        <Route path="/test" element={<TestState />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
