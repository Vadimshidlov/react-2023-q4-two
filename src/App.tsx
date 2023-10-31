import './App.css';
import ErrorBoundary from 'view/ErrorBoundary/ErrorBoundary';
import MainPage from './view/MainPage/MainPage';

// eslint-disable-next-line react/prefer-stateless-function

export default function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}
