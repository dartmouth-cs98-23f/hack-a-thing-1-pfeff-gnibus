import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import App from './App';
import Instructions from './Instructions';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <header className='header'>
        <h1>Calendarize</h1>
        <p className='header-subtext'>Course calendar generator for Dartmouth students</p>
      </header>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
