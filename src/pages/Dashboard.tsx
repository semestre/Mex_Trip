import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../components/Sidebar';
import { getLocations } from '../services/location.service';
import { getDestinations } from '../services/destination.service';
import { getCars } from '../services/car.service';
import { getProducts } from '../services/product.service';

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="bg-${color} text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" style="width: 32px; height: 32px; border: 2px solid rgba(255,255,255,0.8);">
             <i class="bi bi-geo-alt-fill fs-6"></i>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationCount, setLocationCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('mextrip_user') : null;
  const user = storedUser ? JSON.parse(storedUser) : { username: 'Usuario', role: 'Admin' };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [locRes, destRes, carRes, prodRes] = await Promise.all([
        getLocations(),
        getDestinations(),
        getCars(),
        getProducts()
      ]);

      setLocationCount(locRes.data?.length || 0);
      setDestinationCount(destRes.data?.length || 0);
      setCarCount(carRes.data?.length || 0);
      setProductCount(prodRes.data?.length || 0);
      setLocations(locRes.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setLoading(false);
    }
  };


  // Datos de estadísticas con counts reales de MongoDB
  const stats = [
    { title: 'Locations', value: locationCount.toString(), icon: 'bi-cursor-fill', color: '#ff4d94', trend: '+2 esta semana', trendColor: 'text-success' },
    { title: 'Destinos Registrados', value: destinationCount.toString(), icon: 'bi-geo-alt-fill', color: '#00e676', trend: '3 nuevos estados', trendColor: 'text-success' },
    { title: 'Unidades', value: carCount.toString(), icon: 'bi-people-fill', color: '#4dabf7', trend: '85 activos ahora', trendColor: 'text-info' },
    { title: 'Productos', value: productCount.toString(), icon: 'bi-shield-check-fill', color: '#ffca28', trend: 'Sistema seguro', trendColor: 'text-warning' },
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
              <p className="opacity-75 small mb-0 fw-medium">Bienvenido de nuevo, {user.username} ({user.role})</p>
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
                  <h5 className="m-0 fw-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Mapa De Ubicaciones</h5>
                  <button className="btn btn-outline-light btn-sm opacity-75 hover-opacity-100 px-3 border-opacity-25" style={{ borderRadius: '8px' }}>
                    <i className="bi bi-crosshair me-1"></i> Mi Ubicación
                  </button>
                </div>
                
                {loading ? (
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    <p className="text-white-50">Cargando mapa...</p>
                  </div>
                ) : (
                  <div className="card-body p-0 flex-grow-1 overflow-hidden" style={{ height: '100%' }}>
                    <MapContainer
                      center={[21.1219, -101.6826]}
                      zoom={6}
                      style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                      />
                      {locations.map((loc) => (
                        <Marker
                          key={loc._id}
                          position={[loc.latitude, loc.longitude]}
                          icon={createCustomIcon('primary')}
                        >
                          <Popup className="custom-popup">
                            <div className="text-dark">
                              <h6 className="fw-bold mb-1">{loc.name}</h6>
                              <p className="mb-1 small">{loc.description || 'Sin descripción'}</p>
                              <small>Lat: {loc.latitude}, Lng: {loc.longitude}</small>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}