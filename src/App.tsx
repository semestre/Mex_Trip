import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import Products from './pages/Products';

export default function App() {
  // Estado simulado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    // 🌟 Eliminamos la etiqueta <Router> que causaba el conflicto
    <Routes>
      {/* ================= RUTAS PÚBLICAS ================= */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/dashboard" />} 
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
      <Route 
        path="/map" 
        element={isAuthenticated ? <MapView /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/products" 
        element={isAuthenticated ? <Products /> : <Navigate to="/login" />} 
      />
      
      {/* 🌟 Vistas pendientes por crear que apuntan al dashboard temporalmente */}
      <Route 
        path="/cars" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
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