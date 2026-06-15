import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../components/Sidebar';
import { getDestinations } from '../services/destination.service';

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="bg-${color} text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" style="width: 32px; height: 32px; border: 2px solid rgba(255,255,255,0.8);">
             <i class="bi bi-truck fs-6"></i>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export default function MapView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const response = await getDestinations();
        setDestinations(response.data || []);
      } catch (err) {
        console.error('Error loading destinations:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDestinations();
  }, []);

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid min-vh-100 p-0 text-white d-flex overflow-hidden" style={{ 
      backgroundImage: 'url("https://i.pinimg.com/736x/e2/59/80/e25980535739417b5a3854943f9bf78e.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div className="d-flex w-100 min-vh-100" style={{ backgroundColor: 'rgba(5, 10, 20, 0.85)', backdropFilter: 'blur(12px)' }}>
        <Sidebar />

        <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden p-3 p-md-4 pb-5">
          <header className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-white border-opacity-10">
            <div>
              <h2 className="fw-extrabold m-0 text-white">Explorador Geográfico</h2>
              <p className="opacity-75 small mb-0">Monitoreo de rutas y destinos</p>
            </div>
            <button className="btn btn-outline-light btn-sm px-3 py-2" style={{ borderRadius: '12px' }}>
              <i className="bi bi-crosshair"></i> Mi Ubicación
            </button>
          </header>

          <div className="row g-3 flex-grow-1 pb-4">
            {/* Lista de destinos */}
            <div className="col-12 col-lg-4 col-xl-3 d-flex flex-column">
              <div className="card h-100 border border-white border-opacity-10 shadow" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px' }}>
                <div className="p-3 border-bottom border-white border-opacity-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar destino..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
                  />
                </div>
                <div className="flex-grow-1 overflow-auto p-3">
                  <p className="opacity-75 small mb-3">DESTINOS</p>
                  <div className="d-flex flex-column gap-2">
                    {filteredDestinations.length > 0 ? (
                      filteredDestinations.map((dest) => (
                        <button key={dest._id} className="btn text-start p-3 border border-white border-opacity-10 text-white w-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px' }}>
                          <h6 className="m-0 fw-bold">{dest.name}</h6>
                          <small className="opacity-75">{dest.description || 'Sin descripción'}</small>
                        </button>
                      ))
                    ) : (
                      <p className="text-white-50 small">No hay destinos</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="col-12 col-lg-8 col-xl-9 h-100">
              <div className="w-100 h-100 border border-white border-opacity-10 shadow-lg overflow-hidden" style={{ borderRadius: '20px', backgroundColor: '#0f172a' }}>
                {loading ? (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <p className="text-white-50">Cargando mapa...</p>
                  </div>
                ) : (
                  <MapContainer center={[21.1219, -101.6826]} zoom={6} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      attribution='&copy; CartoDB'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    {destinations.map((dest) => (
                      <Marker key={dest._id} position={[dest.pointA.latitude, dest.pointA.longitude]} icon={createCustomIcon('success')}>
                        <Popup>
                          <div className="text-dark">
                            <h6 className="fw-bold">{dest.name}</h6>
                            <small>{dest.description}</small>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
