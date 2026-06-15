import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AUTH_KEY = 'mextrip_user';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 🌟 Reducido estrictamente a tus 4 vistas requeridas para el proyecto
  const menuItems = [
    { name: 'DashBorad', icon: 'bi-signpost-split-fill', path: '/destinations' },
    { name: 'Unidades', icon: 'bi-truck', path: '/cars' },
    { name: 'Productos', icon: 'bi-box-seam-fill', path: '/products' },
    { name: 'Destinos', icon: 'bi-building', path: '/destinations' },
    
  ];

  const handleLogoutClick = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event('mextrip-logout'));
    navigate('/login');
  };

  return (
    <aside 
      className="p-3 border-end border-white border-opacity-10 d-flex flex-column transition-all shadow-lg z-3"
      style={{ 
        width: sidebarOpen ? '260px' : '85px', 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: 'rgba(15, 23, 42, 0.6)', 
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Header Logo */}
      <div className={`d-flex align-items-center ${sidebarOpen ? 'justify-content-between' : 'justify-content-center'} mb-4 px-2`}>
        {sidebarOpen && (
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-airplane-fill text-white fs-4" style={{ transform: 'rotate(45deg)' }}></i>
            <h4 className="m-0 fw-extrabold tracking-tight text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>MexTrip</h4>
          </div>
        )}
        <button 
          className="btn btn-sm btn-outline-light border-0 opacity-75 hover-opacity-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className={`bi ${sidebarOpen ? 'bi-chevron-left' : 'bi-list fs-4'}`}></i>
        </button>
      </div>

      {/* Menú de Opciones */}
      <div className="d-flex flex-column gap-2 flex-grow-1 mt-3 overflow-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path; 

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`btn text-start text-white border-0 d-flex align-items-center gap-3 p-3 w-100 transition-all ${
                isActive ? 'bg-primary bg-opacity-25 fw-bold border-start border-primary border-4' : 'bg-transparent opacity-75'
              }`}
              style={{ 
                  borderRadius: isActive ? '0 16px 16px 0' : '16px', 
                  fontFamily: "'Poppins', sans-serif", 
                  fontSize: '14px', 
                  boxShadow: 'none' 
              }}
              onMouseOver={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
              onMouseOut={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <i className={`bi ${item.icon} fs-5 ${isActive ? 'text-primary' : ''}`}></i>
              {sidebarOpen && <span className="text-nowrap">{item.name}</span>}
            </button>
          )
        })}
      </div>

      {/* Perfil e Info de Usuario */}
      <div className="pt-3 border-top border-white border-opacity-10 d-flex flex-column gap-2 px-2 mt-2">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '42px', height: '42px' }}>
            <i className="bi bi-person-fill fs-5 text-white"></i>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <h6 className="m-0 fw-semibold text-truncate text-white" style={{ fontSize: '14px' }}>
                {(() => {
                  const stored = localStorage.getItem(AUTH_KEY);
                  if (!stored) return 'Invitado';
                  try {
                    const parsed = JSON.parse(stored);
                    return parsed.username || 'Invitado';
                  } catch {
                    return 'Invitado';
                  }
                })()}
              </h6>
              <span className="text-info small fw-medium">
                {(() => {
                  const stored = localStorage.getItem(AUTH_KEY);
                  if (!stored) return 'Usuario';
                  try {
                    const parsed = JSON.parse(stored);
                    return parsed.role || 'Admin';
                  } catch {
                    return 'Usuario';
                  }
                })()}
              </span>
            </div>
          )}
        </div>

        {/* 🌟 BOTÓN DE LOGOUT FUNCIONAL */}
        <button
          onClick={handleLogoutClick}
          className={`btn btn-sm btn-outline-danger border-0 d-flex align-items-center mt-2 w-100 ${
            sidebarOpen ? 'justify-content-start gap-3 p-2' : 'justify-content-center p-2'
          }`}
          style={{ borderRadius: '10px', fontSize: '13.5px', transition: 'all 0.2s' }}
          title="Cerrar sesión"
        >
          <i className="bi bi-box-arrow-left fs-5"></i>
          {sidebarOpen && <span className="fw-semibold">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}