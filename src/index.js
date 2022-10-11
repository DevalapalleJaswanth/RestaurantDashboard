import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { MapProvider } from './Store';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MapProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </MapProvider>
  </StrictMode>
);
