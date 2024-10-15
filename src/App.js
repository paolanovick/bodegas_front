// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import VinosCRUD from './components/VinosCrud';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectRoute';
import BodegasPage from './pages/BodegasPage';
import VinosUsers from './pages/VinosUsers';

function App() {
  return (
    <Router>
      <Header />  {/* Agrega el Header aquí */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/bodegas" element={<ProtectedRoute>
              <BodegasPage />
            </ProtectedRoute>} />
        <Route path="/VinosUsers" element={<VinosUsers />} />
        <Route 
          path="/vinos" 
          element={
            <ProtectedRoute>
              <VinosCRUD />
            </ProtectedRoute>
          } 
        />
        {/* Otras rutas como /bodegas si las tienes */}
      </Routes>
    </Router>
  );
}

export default App;
