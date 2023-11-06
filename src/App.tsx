import './App.css';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
// import MainPage from './components/MainPage/MainPage';
import AppRoutes from 'components/AppRoutes';

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
