import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import Products from './pages/Products';
import Unidades from './pages/Unidades';

const AUTH_KEY = 'mextrip_user';

type UserData = {
  username: string;
  role: string;
};

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }

    const handleLogout = () => setUser(null);
    window.addEventListener('mextrip-logout', handleLogout);
    return () => window.removeEventListener('mextrip-logout', handleLogout);
  }, []);

  const handleLogin = (userData: UserData) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const isAuthenticated = Boolean(user);

  return (
    // 🌟 Eliminamos la etiqueta <Router> que causaba el conflicto
    <Routes>
      {/* ================= RUTAS PÚBLICAS ================= */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/register" 
        element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} 
      />

      {/* ================= RUTAS PRIVADAS (Protegidas) ================= */}
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      {/* Temporarily disabled MapView to debug
      <Route 
        path="/map" 
        element={isAuthenticated ? <MapView /> : <Navigate to="/login" />} 
      />
      */}
      <Route 
        path="/map" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/products" 
        element={isAuthenticated ? <Products /> : <Navigate to="/login" />} 
      />
      
      {/* 🌟 Vistas pendientes por crear que apuntan al dashboard temporalmente */}
      <Route 
        path="/cars" 
        element={isAuthenticated ? <Unidades /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/locations" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/destinations" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}