import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './components/others/ScrollTop';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/audiophile" >
        <ScrollToTop/>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
