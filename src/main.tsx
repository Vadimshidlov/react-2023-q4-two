import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { setupStore } from 'src/store/store.ts';
import App from './App';
import { ContextDataStoreProvider } from '@/context-store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextDataStoreProvider>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </ContextDataStoreProvider>
  </React.StrictMode>
);
