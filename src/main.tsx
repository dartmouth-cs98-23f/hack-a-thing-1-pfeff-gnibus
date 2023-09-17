import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Instructions from './Instructions';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <header className='header'>
        <h1>Calendarize</h1>
        <p className='header-subtext'>Course calendar generator for Dartmouth students</p>
      </header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
