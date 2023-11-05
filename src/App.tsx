import './App.css';
import ErrorBoundary from 'view/ErrorBoundary/ErrorBoundary';
// import MainPage from './view/MainPage/MainPage';
import AppRoutes from 'view/AppRoutes';

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
