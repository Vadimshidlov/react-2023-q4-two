import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { setupStore } from 'src/store/store.ts';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);

/* ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <App />
        </Provider>
    </React.StrictMode>
); */
