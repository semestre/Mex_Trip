import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getDestinations, createDestination, deleteDestination } from '../services/destination.service';
import { getCars } from '../services/car.service';

export default function Destinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    schedule: '',
    pointA: { latitude: 0, longitude: 0 },
    pointB: { latitude: 0, longitude: 0 },
    car: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [destRes, carsRes] = await Promise.all([
        getDestinations(),
        getCars()
      ]);
      setDestinations(destRes.data || []);
      setCars(carsRes.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Error loading destinations');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('pointA') || name.startsWith('pointB')) {
      const [point, coord] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [point]: {
          [coord]: parseFloat(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.car || formData.pointA.latitude === 0 || formData.pointB.latitude === 0) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await createDestination({
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        schedule: formData.schedule,
        pointA: formData.pointA,
        pointB: formData.pointB,
        car: formData.car
      });
      setSuccess('Destination created successfully!');
      setFormData({
        name: '',
        description: '',
        duration: '',
        schedule: '',
        pointA: { latitude: 0, longitude: 0 },
        pointB: { latitude: 0, longitude: 0 },
        car: ''
      });
      setShowForm(false);
      loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error creating destination');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await deleteDestination(id);
        setSuccess('Destination deleted successfully!');
        loadData();
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Error deleting destination');
      }
    }
  };

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Sidebar />

        <div className="flex-grow-1 d-flex flex-column h-100 overflow-auto p-4 pb-5">
          <header className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-white border-opacity-10">
            <div>
              <h2 className="fw-extrabold m-0 tracking-tight text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Destinos</h2>
              <p className="opacity-75 small mb-0 fw-medium">Gestiona todas las rutas y destinos registrados</p>
            </div>
            <button
              className="btn btn-primary btn-sm fw-bold px-4 py-2 shadow-sm d-flex align-items-center gap-2"
              style={{ borderRadius: '12px' }}
              onClick={() => setShowForm(!showForm)}
            >
              <i className="bi bi-plus-lg"></i> <span className="d-none d-sm-inline">Nuevo Destino</span>
            </button>
          </header>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {success}
              <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
            </div>
          )}

          {showForm && (
            <div className="card border border-white border-opacity-10 p-4 mb-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px' }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Nombre del Destino</label>
                    <input
                      type="text"
                      className="form-control text-white"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Unidad (Car)</label>
                    <select
                      className="form-control text-white"
                      name="car"
                      value={formData.car}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                      required
                    >
                      <option value="">Selecciona una unidad</option>
                      {cars.map(car => (
                        <option key={car._id} value={car._id}>
                          {car.brand} {car.model} - {car.year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-bold">Descripción</label>
                    <textarea
                      className="form-control text-white"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                      rows={2}
                    ></textarea>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Punto A - Latitud</label>
                    <input
                      type="number"
                      step="0.0001"
                      className="form-control text-white"
                      name="pointA.latitude"
                      value={formData.pointA.latitude}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Punto A - Longitud</label>
                    <input
                      type="number"
                      step="0.0001"
                      className="form-control text-white"
                      name="pointA.longitude"
                      value={formData.pointA.longitude}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Punto B - Latitud</label>
                    <input
                      type="number"
                      step="0.0001"
                      className="form-control text-white"
                      name="pointB.latitude"
                      value={formData.pointB.latitude}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Punto B - Longitud</label>
                    <input
                      type="number"
                      step="0.0001"
                      className="form-control text-white"
                      name="pointB.longitude"
                      value={formData.pointB.longitude}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Duración</label>
                    <input
                      type="text"
                      className="form-control text-white"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 2 horas"
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Horario</label>
                    <input
                      type="text"
                      className="form-control text-white"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleInputChange}
                      placeholder="e.g., Lunes - Viernes 9:00 AM"
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button type="submit" className="btn btn-success fw-bold px-4">Guardar</button>
                  <button type="button" className="btn btn-outline-light fw-bold px-4" onClick={() => setShowForm(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

          <div className="card border border-white border-opacity-10 shadow-lg" style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: '20px' }}>
            <div className="card-header bg-transparent border-bottom border-white border-opacity-10 py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="m-0 fw-bold text-white">Listado de Destinos ({filteredDestinations.length})</h5>
              <div className="position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 opacity-50"></i>
                <input
                  type="text"
                  className="form-control form-control-sm ps-4 text-white"
                  placeholder="Buscar destino..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', borderColor: 'rgba(255,255,255,0.2)', width: '220px' }}
                />
              </div>
            </div>

            {loading ? (
              <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                <p className="text-white-50">Cargando destinos...</p>
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                <p className="text-white-50">No hay destinos registrados</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-borderless text-white align-middle mb-0">
                  <thead style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', fontSize: '12px' }} className="opacity-75 text-uppercase fw-bold sticky-top">
                    <tr>
                      <th className="py-3 px-4">Nombre</th>
                      <th className="py-3">Unidad</th>
                      <th className="py-3">Descripción</th>
                      <th className="py-3">Punto A</th>
                      <th className="py-3">Punto B</th>
                      <th className="py-3 text-end px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '14.5px' }}>
                    {filteredDestinations.map((dest) => (
                      <tr key={dest._id} className="border-bottom border-white border-opacity-10">
                        <td className="py-3 px-4 fw-bold text-primary">{dest.name}</td>
                        <td className="py-3 fw-medium">{dest.car?.brand} {dest.car?.model}</td>
                        <td className="py-3 opacity-75">{dest.description || '-'}</td>
                        <td className="py-3 small opacity-75">{dest.pointA?.latitude?.toFixed(4)}, {dest.pointA?.longitude?.toFixed(4)}</td>
                        <td className="py-3 small opacity-75">{dest.pointB?.latitude?.toFixed(4)}, {dest.pointB?.longitude?.toFixed(4)}</td>
                        <td className="py-3 px-4 text-end">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(dest._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}