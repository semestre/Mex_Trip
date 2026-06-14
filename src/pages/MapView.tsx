import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useNavigate } from 'react-router-dom';

// 🌟 Truco para usar los iconos de Bootstrap en Leaflet y evitar errores de imágenes en Vite
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="bg-${color} text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" style="width: 32px; height: 32px; border: 2px solid rgba(255,255,255,0.8);">
             <i class="bi bi-truck fs-6"></i>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16], // Centra el icono exacto en la coordenada
    popupAnchor: [0, -16]
  });
};

export default function MapView() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 🌟 Ruta activa configurada correctamente
  const menuItems = [
    { name: 'Panel Principal', icon: 'bi-grid-1x2-fill', active: false, path: '/dashboard' },
    { name: 'Explorador de Mapas', icon: 'bi-map-fill', active: true, path: '/map' },
    { name: 'Unidades (Cars)', icon: 'bi-truck', active: false, path: '/cars' },
    { name: 'Estaciones', icon: 'bi-building', active: false, path: '/locations' },
    { name: 'Rutas (Destinations)', icon: 'bi-signpost-split-fill', active: false, path: '/destinations' },
    { name: 'Productos', icon: 'bi-box-seam-fill', active: false, path: '/products' },
  ];

  // Datos de ubicaciones separados correctamente en lat y lng para Leaflet
  const locations = [
    { id: 1, name: 'Unidad #MX-9021', coords: '21.1219, -101.6826', lat: 21.1219, lng: -101.6826, status: 'En Ruta', color: 'success' },
    { id: 2, name: 'Base Central CDMX', coords: '19.4326, -99.1332', lat: 19.4326, lng: -99.1332, status: 'Operativa', color: 'primary' },
    { id: 3, name: 'Unidad #MX-8832', coords: '20.6596, -103.3496', lat: 20.6596, lng: -103.3496, status: 'Demorado', color: 'warning' },
    { id: 4, name: 'Almacén Monterrey', coords: '25.6866, -100.3161', lat: 25.6866, lng: -100.3161, status: 'Inactivo', color: 'secondary' },
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
      <div className="d-flex w-100 min-vh-100" style={{ backgroundColor: 'rgba(5, 10, 20, 0.85)', backdropFilter: 'blur(12px)' }}>

        {/* SIDEBAR */}
        <aside
          className="p-3 border-end border-white border-opacity-10 d-flex flex-column transition-all shadow-lg z-3"
          style={{
            width: sidebarOpen ? '260px' : '85px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)'
          }}
        >
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

          <div className="d-flex flex-column gap-2 flex-grow-1 mt-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)} // 🌟 Navegación funcional agregada
                className={`btn text-start text-white border-0 d-flex align-items-center gap-3 p-3 w-100 transition-all ${item.active ? 'bg-primary bg-opacity-25 fw-bold border-start border-primary border-4' : 'bg-transparent opacity-75'}`}
                style={{
                  borderRadius: item.active ? '0 16px 16px 0' : '16px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px',
                  boxShadow: 'none'
                }}
                onMouseOver={(e) => { if (!item.active) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
                onMouseOut={(e) => { if (!item.active) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                <i className={`bi ${item.icon} fs-5 ${item.active ? 'text-primary' : ''}`}></i>
                {sidebarOpen && <span className="animate__animated animate__fadeIn text-nowrap">{item.name}</span>}
              </button>
            ))}
          </div>

          <div className="pt-3 border-top border-white border-opacity-10 d-flex align-items-center gap-3 px-2">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '42px', height: '42px' }}>
              <i className="bi bi-person-fill fs-5 text-white"></i>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h6 className="m-0 fw-semibold text-truncate text-white" style={{ fontSize: '14px' }}>Hassiel Avila</h6>
                <span className="text-info small fw-medium">Developer</span>
              </div>
            )}
          </div>
        </aside>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden p-3 p-md-4 pb-5">
          <header className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-white border-opacity-10">
            <div>
              <h2 className="fw-extrabold m-0 tracking-tight text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Explorador Geográfico</h2>
              <p className="opacity-75 small mb-0 fw-medium">Monitoreo satelital y ubicación de unidades.</p>
            </div>
            <button className="btn btn-outline-light btn-sm fw-bold px-3 py-2 border-opacity-25 shadow-sm d-flex align-items-center gap-2" style={{ borderRadius: '12px' }}>
              <i className="bi bi-crosshair"></i> <span className="d-none d-sm-inline">Mi Ubicación</span>
            </button>
          </header>

          <div className="row g-3 flex-grow-1 pb-4">
            
            {/* Panel Izquierdo: Lista de Unidades */}
            <div className="col-12 col-lg-4 col-xl-3 d-flex flex-column h-100">
              <div className="card border border-white border-opacity-10 h-100 d-flex flex-column shadow" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', backdropFilter: 'blur(15px)' }}>
                
                <div className="p-3 border-bottom border-white border-opacity-10">
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: '#adb5bd', zIndex: 5 }}>
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control ps-5 border-white border-opacity-20 shadow-none"
                      placeholder="Buscar unidad..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#ffffff' }}
                    />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-auto p-3 custom-scrollbar">
                  <p className="opacity-75 small text-uppercase fw-bold tracking-wider mb-3" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    Puntos de Interés
                  </p>
                  <div className="d-flex flex-column gap-2">
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        className="btn text-start p-3 border border-white border-opacity-10 transition-all text-white w-100"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px' }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h6 className="m-0 fw-bold">{loc.name}</h6>
                          <span className={`badge bg-${loc.color} bg-opacity-25 text-${loc.color} border border-${loc.color} border-opacity-50 px-2 py-1`} style={{ borderRadius: '6px', fontSize: '10px' }}>
                            {loc.status}
                          </span>
                        </div>
                        <div className="opacity-75 small" style={{ fontSize: '12px' }}>
                          <i className="bi bi-geo-alt-fill me-1"></i> {loc.coords}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Derecho: Mapa Leaflet Dark */}
            <div className="col-12 col-lg-8 col-xl-9 h-100 position-relative">
              <div className="w-100 h-100 rounded border border-white border-opacity-10 shadow-lg overflow-hidden" style={{ borderRadius: "20px", minHeight: "600px", zIndex: 1 }}>
                
                <MapContainer
                  center={[21.1219, -101.6826]} // 🌟 Centrado en León, Gto.
                  zoom={6}
                  style={{ height: "100%", width: "100%", backgroundColor: '#0f172a' }}
                >
                  {/* 🌟 TileLayer Oscuro de CartoDB (Dark Matter) */}
                  <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />

                  {/* Renderizando Marcadores Dinámicamente */}
                  {locations.map((loc) => (
                    <Marker 
                      key={loc.id} 
                      position={[loc.lat, loc.lng]} 
                      icon={createCustomIcon(loc.color)}
                    >
                      <Popup className="custom-popup">
                        <div className="text-dark">
                          <h6 className="fw-bold mb-1">{loc.name}</h6>
                          <span className={`badge bg-${loc.color} text-white px-2 py-1`}>{loc.status}</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}