import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.service';

type LoginProps = {
  onLogin?: (user: { username: string; role: string }) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const res = await loginUser({ email, password });
      const user = res.data?.user;

      if (!user) {
        setError('Credenciales incorrectas');
        return;
      }

      const userData = {
        username: user.username || email.split('@')[0],
        role: 'Admin'
      };

      if (onLogin) onLogin(userData);
      navigate('/dashboard');
    } catch (err: any) {
      console.log('❌ LOGIN FALLÓ', err);
      setError(err?.response?.data?.message || 'Credenciales incorrectas');
    }
  };

  return (
    <div 
      className="container-fluid d-flex align-items-center justify-content-center min-vh-100" 
      style={{ 
        backgroundImage: 'url("https://i.pinimg.com/736x/e2/59/80/e25980535739417b5a3854943f9bf78e.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000 
      }}
    >
      {/* Overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 }} 
      />

      {/* Card */}
      <div 
        className="card p-4 p-sm-5 text-white border border-white border-opacity-25 shadow-lg position-relative" 
        style={{ 
          maxWidth: '500px', 
          width: '95%', 
          borderRadius: '30px',
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bolder mb-1" style={{
            background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.8rem',
            letterSpacing: '-1px',
            fontFamily: "'Poppins', sans-serif"
          }}>
            MexTrip
          </h1>
          <p className="text-white-50 small text-uppercase fw-semibold">
            Sistema de Monitoreo Geográfico
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger text-center py-2 bg-danger bg-opacity-25 text-white small mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="mb-4 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white opacity-50">
              <i className="bi bi-envelope"></i>
            </span>

            <input
              type="email"
              className="form-control text-white py-3 ps-5"
              placeholder="Correo electrónico"
              style={{
                borderRadius: '15px',
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.61)'
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white opacity-50">
              <i className="bi bi-lock"></i>
            </span>

            <input
              type="password"
              className="form-control text-white py-3 ps-5"
              placeholder="Contraseña"
              style={{
                borderRadius: '15px',
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.61)'
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input bg-transparent border-white"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label text-white-50 ms-2">
                Recordarme
              </label>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-light w-100 fw-bold py-3"
            style={{
              borderRadius: '15px'
            }}
          >
            Ingresar
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-white-50 small mb-0">
            ¿No tienes cuenta? <span className="text-white fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Regístrate</span>
          </p>
        </div>
      </div>
    </div>
  );
}