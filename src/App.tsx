import './App.css';
import ErrorBoundary from 'view/ErrorBoundary/ErrorBoundary';
// import MainPage from './view/MainPage/MainPage';
import AppRoutes from 'view/AppRoutes';

// eslint-disable-next-line react/prefer-stateless-function

export default function App() {
  return (
    <ErrorBoundary>
      {/* <MainPage /> */}
      <AppRoutes />
    </ErrorBoundary>
  );
}
