import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    console.log('Login exitoso', { email, password, rememberMe });
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
      {/* Capa de superposición oscura sutil */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 }}></div>

      {/* Tarjeta Glassmorphism Ensanchada */}
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
        {/* Encabezado */}
        <div className="text-center mb-5">
          <h1 className="fw-bolder tracking-tight mb-1" style={{
            background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.8rem',
            letterSpacing: '-1px',
            fontFamily: "'Poppins', sans-serif"
          }}>
            MexTrip
          </h1>
          <p className="text-white-50 small text-uppercase fw-semibold tracking-wider mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Sistema de Monitoreo Geográfico
          </p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="alert alert-danger text-center py-2 border-0 bg-danger bg-opacity-25 text-white small mb-4 d-flex align-items-center justify-content-center" style={{ borderRadius: '15px' }}>
            <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          
          {/* Campo de Correo Electrónico */}
          <div className="mb-4 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white opacity-50 fs-5">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control text-white placeholder-white py-3 ps-5 pe-3"
              placeholder="Correo electrónico"
              style={{ 
                borderRadius: '15px', 
                fontSize: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.61)'
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white opacity-50 fs-5">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              className="form-control text-white placeholder-white py-3 ps-5 pe-3"
              placeholder="Contraseña"
              style={{ 
                borderRadius: '15px', 
                fontSize: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.61)'
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Opciones extras: Recordarme y Recuperar */}
          <div className="d-flex justify-content-between align-items-center mb-4" style={{ fontSize: '14px' }}>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input bg-transparent border-white border-opacity-50 mt-0"
                type="checkbox"
                id="rememberCheck"
                style={{ width: '17px', height: '17px', cursor: 'pointer' }}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label text-white-50 ms-2" htmlFor="rememberCheck" style={{ cursor: 'pointer' }}>
                Recordarme
              </label>
            </div>
            <span className="text-white-50 text-decoration-none fw-medium" style={{ cursor: 'pointer' }}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          {/* Botón de Login Estilo Moderno */}
          <button 
            type="submit" 
            className="btn btn-light w-100 fw-bold py-3 shadow-lg d-flex align-items-center justify-content-center"
            style={{ 
              borderRadius: '15px',
              fontSize: '16px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              background: '#ffffff',
              color: '#1e293b'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Ingresar a la Plataforma <i className="bi bi-arrow-right-short fs-4 ms-2"></i>
          </button>

        </form>

        {/* Footer del Registro */}
        <div className="text-center mt-5">
          <p className="text-white-50 small mb-0">
            ¿No tienes una cuenta activa? <span className="text-white fw-bold text-decoration-underline" style={{ cursor: 'pointer' }}>Regístrate aquí</span>
          </p>
        </div>

      </div> {/* 🌟 Aquí se cierra correctamente la tarjeta card */}
    </div>
  );
}