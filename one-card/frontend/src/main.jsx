import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import App from './App.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import './index.css';
import './assets/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap the app with the provider */}
          <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
