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

root.render(
  <React.StrictMode>
    {/* Use BrowserRouter without basename for custom domain - GitHub Pages with CNAME handles routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);