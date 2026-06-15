import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Products() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🌟 Estado para controlar abrir/cerrar el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems = [
    { name: 'Panel Principal', icon: 'bi-grid-1x2-fill', active: false, path: '/dashboard' },
    { name: 'Explorador de Mapas', icon: 'bi-map-fill', active: false, path: '/map' },
    { name: 'Unidades (Cars)', icon: 'bi-truck', active: false, path: '/cars' },
    { name: 'Estaciones', icon: 'bi-building', active: false, path: '/locations' },
    { name: 'Rutas (Destinations)', icon: 'bi-signpost-split-fill', active: false, path: '/destinations' },
    { name: 'Productos', icon: 'bi-box-seam-fill', active: true, path: '/products' },
  ];

  const productsData = [
    { id: 'PRD-001', name: 'Aceite Sintético 5W-30', category: 'Refacciones', stock: 45, price: '$850.00', status: 'Activo' },
    { id: 'PRD-002', name: 'Filtro de Aire Alto Flujo', category: 'Mantenimiento', stock: 12, price: '$320.00', status: 'Poco Stock' },
    { id: 'PRD-003', name: 'Neumático 225/45 R17', category: 'Llantas', stock: 0, price: '$2,100.00', status: 'Agotado' },
    { id: 'PRD-004', name: 'Batería 12V 750A', category: 'Eléctrico', stock: 8, price: '$1,500.00', status: 'Activo' },
  ];

  // Función para simular el guardado
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardando producto en la base de datos...");
    setIsModalOpen(false); // Cierra el modal después de guardar
  };

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

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-grow-1 d-flex flex-column h-100 overflow-auto p-3 p-md-4 pb-5">
          
          <header className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div>
              <h2 className="fw-extrabold m-0 tracking-tight text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Gestión de Productos</h2>
              <p className="opacity-75 small mb-0 fw-medium">Administra el inventario y catálogo del sistema.</p>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: '#adb5bd', zIndex: 5 }}>
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control form-control-sm text-white ps-5 border-white border-opacity-20 shadow-none" 
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: '12px', width: '250px', backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                />
              </div>
              
              {/* 🌟 Botón que dispara el Modal */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-sm fw-bold px-4 py-2 shadow-sm d-flex align-items-center gap-2"
              >
                <i className="bi bi-plus-lg"></i> Nuevo Producto
              </button>
            </div>
          </header>

          <div className="card border border-white border-opacity-10 shadow-lg overflow-hidden flex-grow-1"
               style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: '20px', backdropFilter: 'blur(15px)' }}>
            
            <div className="card-body p-0 table-responsive">
              <table className="table table-borderless text-white align-middle mb-0">
                <thead style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', fontSize: '12.5px' }} className="text-white-50 text-uppercase fw-bold sticky-top">
                  <tr>
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3">Nombre</th>
                    <th className="py-3">Categoría</th>
                    <th className="py-3 text-center">Stock</th>
                    <th className="py-3">Precio</th>
                    <th className="py-3">Estado</th>
                    <th className="py-3 px-4 text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '14.5px' }}>
                  {productsData.map((item, index) => (
                    <tr key={index} className="border-bottom border-white border-opacity-10 transition-all">
                      <td className="py-3 px-4 fw-bold text-primary">{item.id}</td>
                      <td className="py-3 fw-medium">{item.name}</td>
                      <td className="py-3 opacity-75">{item.category}</td>
                      <td className="py-3 text-center fw-bold">{item.stock}</td>
                      <td className="py-3 fw-semibold">{item.price}</td>
                      <td className="py-3">
                        <span className={`badge px-3 py-2 ${
                          item.status === 'Activo' ? 'bg-success' : 
                          item.status === 'Agotado' ? 'bg-danger' : 'bg-warning text-dark'
                        }`} style={{ borderRadius: '6px' }}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-light border-opacity-25" style={{ borderRadius: '8px' }}>
                            <i className="bi bi-pencil-square text-info"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-light border-opacity-25" style={{ borderRadius: '8px' }}>
                            <i className="bi bi-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================
          🌟 MODAL FLOTANTE (DARK GLASSMORPHISM)
         ========================================================= */}
      {isModalOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(8px)',
            zIndex: 9999 
          }}
        >
          <div 
            className="card text-white border border-white border-opacity-20 shadow-lg animate__animated animate__zoomIn animate__faster"
            style={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.95)', 
              borderRadius: '24px', 
              width: '100%', 
              maxWidth: '500px',
              margin: '0 15px'
            }}
          >
            <div className="card-header border-bottom border-white border-opacity-10 p-4 d-flex justify-content-between align-items-center bg-transparent">
              <h5 className="m-0 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <i className="bi bi-box-seam text-primary me-2"></i> Registrar Producto
              </h5>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-outline-light border-0 opacity-75 hover-opacity-100 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px' }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSaveProduct}>
                
                <div className="mb-3">
                  <label className="form-label small opacity-75 fw-medium">Nombre del Producto</label>
                  <input 
                    type="text" 
                    className="form-control text-white border-white border-opacity-20 shadow-none" 
                    placeholder="Ej. Filtro de Aceite"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                    required 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small opacity-75 fw-medium">Categoría</label>
                    <select 
                      className="form-select text-white border-white border-opacity-20 shadow-none" 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                      required
                    >
                      <option value="" className="text-dark">Seleccionar...</option>
                      <option value="Mantenimiento" className="text-dark">Mantenimiento</option>
                      <option value="Refacciones" className="text-dark">Refacciones</option>
                      <option value="Llantas" className="text-dark">Llantas</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small opacity-75 fw-medium">Precio ($)</label>
                    <input 
                      type="number" 
                      className="form-control text-white border-white border-opacity-20 shadow-none" 
                      placeholder="0.00"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                      required 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small opacity-75 fw-medium">Stock Inicial</label>
                  <input 
                    type="number" 
                    className="form-control text-white border-white border-opacity-20 shadow-none" 
                    placeholder="Cantidad en inventario"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                    required 
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-outline-light border-opacity-25 px-4 fw-medium" 
                    style={{ borderRadius: '10px' }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4 fw-bold" 
                    style={{ borderRadius: '10px' }}
                  >
                    Guardar Producto
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}