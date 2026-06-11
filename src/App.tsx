import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MapView from './pages/MapView'

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard' | 'map'>('dashboard')

  return (
    <div className="position-relative">
      
      {/* Contenido Principal */}
      <main>
        {currentView === 'login' && <Login />}
        {currentView === 'register' && <Register />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'map' && <MapView />}
      </main>

      {/* Dock de Navegación Flotante (Glassmorphism) */}
      <div 
        className="position-fixed bottom-0 start-50 translate-middle-x mb-4 p-2 d-flex gap-2 shadow-lg border border-white border-opacity-25"
        style={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.65)', 
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderRadius: '50px',
          zIndex: 9999 // Asegura que siempre flote por encima del fondo y los mapas
        }}
      >
        <button 
          onClick={() => setCurrentView('login')} 
          className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all border-0 d-flex align-items-center gap-2 ${
            currentView === 'login' ? 'bg-white text-dark shadow-sm' : 'text-white text-opacity-75 hover-opacity-100'
          }`}
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px' }}
        >
          <i className="bi bi-box-arrow-in-right fs-6"></i> <span className="d-none d-sm-inline">Login</span>
        </button>

        <button 
          onClick={() => setCurrentView('register')} 
          className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all border-0 d-flex align-items-center gap-2 ${
            currentView === 'register' ? 'bg-white text-dark shadow-sm' : 'text-white text-opacity-75'
          }`}
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px' }}
        >
          <i className="bi bi-person-plus fs-6"></i> <span className="d-none d-sm-inline">Register</span>
        </button>

        <button 
          onClick={() => setCurrentView('dashboard')} 
          className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all border-0 d-flex align-items-center gap-2 ${
            currentView === 'dashboard' ? 'bg-white text-dark shadow-sm' : 'text-white text-opacity-75'
          }`}
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px' }}
        >
          <i className="bi bi-grid-1x2-fill fs-6"></i> <span className="d-none d-sm-inline">Dashboard</span>
        </button>

        <button 
          onClick={() => setCurrentView('map')} 
          className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all border-0 d-flex align-items-center gap-2 ${
            currentView === 'map' ? 'bg-white text-dark shadow-sm' : 'text-white text-opacity-75'
          }`}
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px' }}
        >
          <i className="bi bi-map-fill fs-6"></i> <span className="d-none d-sm-inline">MapView</span>
        </button>
      </div>

    </div>
  )
}

export default App