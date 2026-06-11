import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    console.log('Registro exitoso', { name, email, password });
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
        <div className="text-center mb-4">
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
            Crea tu cuenta de explorador
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
          
          {/* Campo de Nombre Completo */}
          <div className="mb-3 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white opacity-50 fs-5">
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              className="form-control text-white placeholder-white py-3 ps-5 pe-3"
              placeholder="Nombre completo"
              style={{ 
                borderRadius: '15px', 
                fontSize: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.61)'
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campo de Correo Electrónico */}
          <div className="mb-3 position-relative">
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
          <div className="mb-3 position-relative">
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

          {/* Campo de Confirmar Contraseña */}
          <div className="mb-4 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white opacity-50 fs-5">
              <i className="bi bi-shield-check"></i>
            </span>
            <input
              type="password"
              className="form-control text-white placeholder-white py-3 ps-5 pe-3"
              placeholder="Confirmar contraseña"
              style={{ 
                borderRadius: '15px', 
                fontSize: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.61)'
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Botón de Registro Estilo Moderno */}
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
            Registrarse en la App <i className="bi bi-arrow-right-short fs-4 ms-2"></i>
          </button>

        </form>

        {/* Footer para volver al Login */}
        <div className="text-center mt-4">
          <p className="text-white-50 small mb-0">
            ¿Ya tienes una cuenta? <span className="text-white fw-bold text-decoration-underline" style={{ cursor: 'pointer' }}>Inicia sesión aquí</span>
          </p>
        </div>

      </div>
    </div>
  );
}