import api from "../api/axios";

// 📦 Get all products
export const getProducts = () => {
  return api.get("/products");
};

// 📦 Get one product by ID
export const getProductById = (id: string) => {
  return api.get(`/products/${id}`);
};

// 📦 Create product
export const createProduct = (data: {
  name: string;
  description?: string;
  price: number;
  image?: string;
}) => {
  return api.post("/products", data);
};

// 📦 Update product
export const updateProduct = (
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
  }
) => {
  return api.patch(`/products/${id}`, data);
};

// 📦 Delete product
export const deleteProduct = (id: string) => {
  return api.delete(`/products/${id}`);
};