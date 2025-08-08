// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // We will create this next

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        {/* Protect the Dashboard route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
