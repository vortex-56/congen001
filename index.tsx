import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Get base path for routing - handle both GitHub Pages and custom domain
const getBasePath = () => {
  const hostname = window.location.hostname;
  // If on GitHub Pages subdomain, use repo name as base
  if (hostname.includes('github.io')) {
    return '/congen001';
  }
  // If on custom domain, use root
  return '';
};

root.render(
  <React.StrictMode>
    {/* Use BrowserRouter with dynamic basename for both GitHub Pages and custom domain */}
    <BrowserRouter basename={getBasePath()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);