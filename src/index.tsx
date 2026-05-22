import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;

// react-snap pre-renders static HTML into #root at build time. Crawlers and
// social scrapers read that static markup directly (full SEO benefit, fast
// first paint). In the browser we do a clean client render over it instead
// of hydrating: react-snap (unmaintained) strips the comment markers that
// React 19's hydrateRoot needs, which would throw a #418 hydration mismatch.
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
