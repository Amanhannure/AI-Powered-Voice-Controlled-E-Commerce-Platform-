import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import './index.css';
import './assets/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        {/* Add further routes here, like <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
