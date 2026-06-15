import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getProducts, createProduct } from '../services/product.service';

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

export default function Products() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProductsData(response.data || []);
      // setErrorMessage(null);
    } catch (error) {
      console.error('Error loading products:', error);
      // setErrorMessage('No se pudo cargar los productos desde la base de datos.');
    }
  };

  const filteredProducts = productsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const handleSaveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const productPayload = {
      name: (formData.get('name') as string)?.trim() ?? '',
      description: (formData.get('description') as string)?.trim() ?? '',
      price: Number(formData.get('price') ?? 0),
      image: (formData.get('image') as string)?.trim() ?? '',
    };

    if (!productPayload.name || !productPayload.price || !productPayload.image) {
      // setErrorMessage('Nombre, precio e imagen son obligatorios.');
      return;
    }

    try {
      setSaving(true);
      // setErrorMessage(null);
      await createProduct(productPayload);
      setIsModalOpen(false);
      event.currentTarget.reset();
      await loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSaving(false);
    }
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
                    <th className="py-3">Descripción</th>
                    <th className="py-3 text-center">Imagen</th>
                    <th className="py-3">Precio</th>
                    <th className="py-3">Estado</th>
                    <th className="py-3 px-4 text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '14.5px' }}>
                  {filteredProducts.map((item) => (
                    <tr key={item._id} className="border-bottom border-white border-opacity-10">
                      <td className="py-3 px-4 fw-bold text-primary">{item._id.substring(0, 6)}</td>
                      <td className="py-3 fw-medium">{item.name}</td>
                      <td className="py-3 opacity-75">{item.description || 'Sin descripción'}</td>
                      <td className="py-3 text-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            width="60"
                            height="60"
                            style={{ objectFit: 'cover', borderRadius: '10px' }}
                          />
                        ) : (
                          <span className="text-white-50">No image</span>
                        )}
                      </td>
                      <td className="py-3 fw-semibold">${item.price.toFixed(2)}</td>
                      <td className="py-3">
                        <span
                          className={`badge px-3 py-2 ${item.price > 0 ? 'bg-success' : 'bg-secondary'}`}
                          style={{ borderRadius: '8px' }}
                        >
                          {item.price > 0 ? 'Disponible' : 'Agotado'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-outline-light"
                            style={{ borderRadius: '8px' }}
                          >
                            <i className="bi bi-pencil-square text-info"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-outline-light"
                            style={{ borderRadius: '8px' }}
                          >
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
                    name="name"
                    className="form-control text-white border-white border-opacity-20 shadow-none"
                    placeholder="Ej. Filtro de Aceite"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small opacity-75 fw-medium">Descripción</label>
                  <textarea
                    name="description"
                    className="form-control text-white border-white border-opacity-20 shadow-none"
                    placeholder="Breve descripción del producto"
                    rows={3}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small opacity-75 fw-medium">Precio ($)</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control text-white border-white border-opacity-20 shadow-none"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small opacity-75 fw-medium">Imagen (URL)</label>
                    <input
                      type="url"
                      name="image"
                      className="form-control text-white border-white border-opacity-20 shadow-none"
                      placeholder="https://..."
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
                      required
                    />
                  </div>
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
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : 'Guardar Producto'}
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