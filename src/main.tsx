import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ContextDataStoreProvider } from 'context-store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextDataStoreProvider>
      <App />
    </ContextDataStoreProvider>
  </React.StrictMode>
);
