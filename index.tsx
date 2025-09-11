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
    {/* Use Vite's base for the router so routes resolve under the project path on GitHub Pages */}
    <BrowserRouter basename={(import.meta as any).env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);