import './App.css';
import ErrorBoundary from 'view/ErrorBoundary/ErrorBoundary';
import React from 'react';
import MainPage from './view/MainPage/MainPage';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
