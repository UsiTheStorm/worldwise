import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

polyfillCountryFlagEmojis();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
