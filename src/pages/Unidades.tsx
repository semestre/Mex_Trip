import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getCars } from '../services/car.service';

interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  capacity: number;
}

export default function Unidades() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const response = await getCars();
      setCars(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading cars:', err);
      setError('No se pudo cargar la lista de unidades desde la base de datos.');
    }
  };

  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(search.toLowerCase()) ||
    car.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="container-fluid min-vh-100 p-0 text-white d-flex overflow-hidden position-relative"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/736x/e2/59/80/e25980535739417b5a3854943f9bf78e.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="d-flex w-100 min-vh-100" style={{ backgroundColor: 'rgba(5, 10, 20, 0.85)', backdropFilter: 'blur(12px)' }}>
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column h-100 overflow-auto p-3 p-md-4 pb-5">
          <header className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div>
              <h2 className="fw-extrabold m-0 tracking-tight text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Unidades en Ruta
              </h2>
              <p className="opacity-75 small mb-0 fw-medium">Lista de vehículos cargada desde MongoDB Atlas.</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: '#adb5bd', zIndex: 5 }}>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm text-white ps-5 border-white border-opacity-20 shadow-none"
                  placeholder="Buscar marca o modelo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ borderRadius: '12px', width: '260px', backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                />
              </div>
            </div>
          </header>

          {error && (
            <div className="alert alert-danger py-2 px-3 mb-4" role="alert">
              {error}
            </div>
          )}

          <div className="card border border-white border-opacity-10 shadow-lg overflow-hidden flex-grow-1"
            style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: '20px', backdropFilter: 'blur(15px)' }}>
            <div className="card-body p-0 table-responsive">
              <table className="table table-borderless text-white align-middle mb-0">
                <thead style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', fontSize: '12.5px' }} className="text-white-50 text-uppercase fw-bold sticky-top">
                  <tr>
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3">Marca</th>
                    <th className="py-3">Modelo</th>
                    <th className="py-3 text-center">Año</th>
                    <th className="py-3 text-center">Capacidad</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '14.5px' }}>
                  {filteredCars.map((car) => (
                    <tr key={car._id} className="border-bottom border-white border-opacity-10">
                      <td className="py-3 px-4 fw-bold text-primary">{car._id.substring(0, 6)}</td>
                      <td className="py-3 fw-medium">{car.brand}</td>
                      <td className="py-3 opacity-75">{car.model}</td>
                      <td className="py-3 text-center">{car.year}</td>
                      <td className="py-3 text-center">{car.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
