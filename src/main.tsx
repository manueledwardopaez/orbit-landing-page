import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// Inter and DM Sans are unused — Geist Variable overrides font-sans in index.css.
// Only Space Grotesk weights used by font-display headings (font-semibold + font-bold).
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
