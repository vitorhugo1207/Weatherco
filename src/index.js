import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';

import App from './App';

// https://medium.com/folkdevelopers/the-ultimate-guide-to-electron-with-react-8df8d73f4c97#6647

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
        <App />
    </HashRouter>
  </React.StrictMode>
);
