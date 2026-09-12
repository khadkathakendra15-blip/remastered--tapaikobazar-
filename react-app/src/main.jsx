import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './tailwind.css';
import './styles.css';

/* The app owns the scroll position. Left on auto, a refresh restores a
   position against a document that has not rendered yet and the page jumps as
   it fills in. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
