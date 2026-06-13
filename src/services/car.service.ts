import api from "../api/axios";

// 🚗 Get all cars
export const getCars = () => {
  return api.get("/cars");
};

// 🚗 Get car by ID
export const getCarById = (id: string) => {
  return api.get(`/cars/${id}`);
};

// 🚗 Create car
export const createCar = (data: {
  brand: string;
  model: string;
  year?: number;
  capacity?: number;
}) => {
  return api.post("/cars", data);
};

// 🚗 Update car
export const updateCar = (
  id: string,
  data: {
    brand?: string;
    model?: string;
    year?: number;
    capacity?: number;
  }
) => {
  return api.patch(`/cars/${id}`, data);
};

// 🚗 Delete car
export const deleteCar = (id: string) => {
  return api.delete(`/cars/${id}`);
};