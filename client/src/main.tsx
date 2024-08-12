import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './i18n.ts';
import { DarkModeProvider } from './context/DarkMode';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);
