import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import Search from './pages/Search.js';
import Forecast from './pages/Forecast.js';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path='forecast' element={<Forecast/>}/>
      </Routes>
    </div>
  );
}