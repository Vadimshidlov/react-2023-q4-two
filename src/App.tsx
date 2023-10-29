import './App.css';
import ErrorBoundary from 'view/ErrorBoundary/ErrorBoundary';
import MainPage from './view/MainPage/MainPage';

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
