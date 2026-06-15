import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
export default function Dashboard() {
  const navigate = useNavigate();  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 🌟 Agregamos la ruta exacta a cada botón
  const menuItems = [
    { name: 'Panel Principal', icon: 'bi-grid-1x2-fill', active: true, path: '/dashboard' },
    { name: 'Explorador de Mapas', icon: 'bi-map-fill', active: false, path: '/map' },
    { name: 'Unidades (Cars)', icon: 'bi-truck', active: false, path: '/cars' },
    { name: 'Estaciones', icon: 'bi-building', active: false, path: '/locations' },
    { name: 'Rutas (Destinations)', icon: 'bi-signpost-split-fill', active: false, path: '/destinations' },
    { name: 'Productos', icon: 'bi-box-seam-fill', active: false, path: '/products' },
  ];


  // Datos simulados (Colores ajustados para brillar en fondo oscuro)
  const stats = [
    { title: 'Viajes Activos', value: '12', icon: 'bi-cursor-fill', color: '#ff4d94', trend: '+2 esta semana', trendColor: 'text-success' },
    { title: 'Destinos Registrados', value: '45', icon: 'bi-geo-alt-fill', color: '#00e676', trend: '3 nuevos estados', trendColor: 'text-success' },
    { title: 'Usuarios en Ruta', value: '120', icon: 'bi-people-fill', color: '#4dabf7', trend: '85 activos ahora', trendColor: 'text-info' },
    { title: 'Alertas del Sistema', value: '0', icon: 'bi-shield-check-fill', color: '#ffca28', trend: 'Sistema seguro', trendColor: 'text-warning' },
  ];

  return (
    <div 
      className="container-fluid min-vh-100 p-0 text-white d-flex overflow-hidden" 
      style={{ 
        backgroundImage: 'url("https://i.pinimg.com/736x/e2/59/80/e25980535739417b5a3854943f9bf78e.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 🌟 MEJORA UX 1: Capa global más oscura y con mayor desenfoque para aislar el contenido */}
      <div className="d-flex w-100 min-vh-100" style={{ backgroundColor: 'rgba(5, 10, 20, 0.85)', backdropFilter: 'blur(12px)' }}>
        
        <Sidebar />

        {/* CONTENEDOR DE CONTENIDO PRINCIPAL */}
        <div className="flex-grow-1 d-flex flex-column h-100 overflow-auto p-4 pb-5">
          
          {/* NAVBAR SUPERIOR */}
          <header className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-white border-opacity-10">
            <div>
              <h2 className="fw-extrabold m-0 tracking-tight text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Panel Principal</h2>
              {/* 🌟 MEJORA UX 2: Opacidad 75 en lugar de text-white-50 para que no se pierda */}
              <p className="opacity-75 small mb-0 fw-medium">Bienvenido de nuevo, rastreo de rutas activo.</p>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative d-none d-md-block">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 opacity-75"><i className="bi bi-search"></i></span>
                <input 
                  type="text" 
                  className="form-control form-control-sm text-white placeholder-white ps-5 border-white border-opacity-20" 
                  placeholder="Buscar coordenadas..."
                  style={{ borderRadius: '12px', width: '220px', backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                />
              </div>
              <button className="btn btn-primary btn-sm fw-bold px-4 py-2 shadow-sm d-flex align-items-center gap-2" style={{ borderRadius: '12px' }}>
                <i className="bi bi-plus-lg"></i> <span className="d-none d-sm-inline">Nueva Ruta</span>
              </button>
            </div>
          </header>

          {/* Grid Dinámico de Tarjetas */}
          <div className="row g-3 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-12 col-sm-6 col-xl-3">
                {/* 🌟 MEJORA UX 3: Tarjetas con base oscura (Slate) para contraste máximo */}
                <div 
                  className="card border border-white border-opacity-10 h-100 p-3 text-white shadow"
                  style={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.8)', 
                    borderRadius: '20px',
                    backdropFilter: 'blur(15px)',
                    transition: 'transform 0.2s, background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <p className="opacity-75 small text-uppercase fw-bold tracking-wider mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                        {stat.title}
                      </p>
                      <h2 className="fw-extrabold m-0 text-white" style={{ letterSpacing: '-0.5px' }}>{stat.value}</h2>
                    </div>
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center fs-4 shadow-sm"
                      style={{ 
                        width: '46px', height: '46px', 
                        backgroundColor: `${stat.color}20`, // 20% opacity of the hex color
                        color: stat.color, 
                      }}
                    >
                      <i className={`bi ${stat.icon}`}></i>
                    </div>
                  </div>
                  <div className={`small fw-semibold ${stat.trendColor}`} style={{ fontSize: '12.5px' }}>
                    <i className="bi bi-graph-up-arrow me-1"></i> {stat.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla de Datos */}
          <div className="row flex-grow-1 pb-5"> {/* pb-5 extra para que el Dock no tape la tabla */}
            <div className="col-12 h-100">
              <div 
                className="card border border-white border-opacity-10 shadow-lg overflow-hidden h-100 d-flex flex-column"
                style={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.85)', // Fondo casi sólido para máxima legibilidad de datos
                  borderRadius: '20px',
                  backdropFilter: 'blur(15px)'
                }}
              >
                <div className="card-header bg-transparent border-bottom border-white border-opacity-10 py-3 px-4 d-flex justify-content-between align-items-center">
                  <h5 className="m-0 fw-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Monitoreo de Unidades</h5>
                  <button className="btn btn-outline-light btn-sm opacity-75 hover-opacity-100 px-3 border-opacity-25" style={{ borderRadius: '8px' }}>
                    <i className="bi bi-sliders me-1"></i> Filtros
                  </button>
                </div>
                
                <div className="card-body p-0 table-responsive flex-grow-1">
                  <table className="table table-borderless text-white align-middle mb-0">
                    <thead style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', fontSize: '12px' }} className="opacity-75 text-uppercase fw-bold sticky-top">
                      <tr>
                        <th className="py-3 px-4">Código</th>
                        <th className="py-3">Punto de Origen</th>
                        <th className="py-3">Destino Actual</th>
                        <th className="py-3">Estado Operativo</th>
                        <th className="py-3 px-4 text-end">Progreso Global</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: '14.5px' }}>
                      <tr className="border-bottom border-white border-opacity-10">
                        <td className="py-3 px-4 fw-bold text-primary">#MX-9021</td>
                        <td className="py-3 fw-medium">CDMX</td>
                        <td className="py-3 fw-medium">León, Gto.</td>
                        {/* 🌟 MEJORA UX 4: Badges sólidos para destacar inmediatamente el estado */}
                        <td className="py-3"><span className="badge bg-success text-white px-3 py-2 shadow-sm" style={{ borderRadius: '6px' }}>En Ruta</span></td>
                        <td className="py-3 px-4">
                          <div className="d-flex align-items-center justify-content-end gap-3">
                            <div className="progress w-50 bg-dark" style={{ height: '8px', borderRadius: '10px' }}>
                              <div className="progress-bar bg-success" role="progressbar" style={{ width: '75%', borderRadius: '10px' }}></div>
                            </div>
                            <span className="fw-bold">75%</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-bottom border-white border-opacity-10">
                        <td className="py-3 px-4 fw-bold text-primary">#MX-8832</td>
                        <td className="py-3 fw-medium">Guadalajara</td>
                        <td className="py-3 fw-medium">Monterrey</td>
                        <td className="py-3"><span className="badge bg-warning text-dark px-3 py-2 shadow-sm" style={{ borderRadius: '6px' }}>Demorado</span></td>
                        <td className="py-3 px-4">
                          <div className="d-flex align-items-center justify-content-end gap-3">
                            <div className="progress w-50 bg-dark" style={{ height: '8px', borderRadius: '10px' }}>
                              <div className="progress-bar bg-warning" role="progressbar" style={{ width: '15%', borderRadius: '10px' }}></div>
                            </div>
                            <span className="fw-bold">15%</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 fw-bold text-primary">#MX-7741</td>
                        <td className="py-3 fw-medium">Cancún</td>
                        <td className="py-3 fw-medium">Mérida</td>
                        <td className="py-3"><span className="badge bg-secondary text-white px-3 py-2 shadow-sm" style={{ borderRadius: '6px' }}>Arribado</span></td>
                        <td className="py-3 px-4">
                          <div className="d-flex align-items-center justify-content-end gap-3">
                            <div className="progress w-50 bg-dark" style={{ height: '8px', borderRadius: '10px' }}>
                              <div className="progress-bar bg-info" role="progressbar" style={{ width: '100%', borderRadius: '10px' }}></div>
                            </div>
                            <span className="fw-bold">100%</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}