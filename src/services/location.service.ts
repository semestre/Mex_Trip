import api from "../api/axios";

// 📍 Get all locations
export const getLocations = () => {
  return api.get("/locations");
};

// 📍 Get one location by ID
export const getLocationById = (id: string) => {
  return api.get(`/locations/${id}`);
};

// 📍 Create a new location
export const createLocation = (data: {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
}) => {
  return api.post("/locations", data);
};

// 📍 Update location
export const updateLocation = (
  id: string,
  data: {
    name?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
  }
) => {
  return api.patch(`/locations/${id}`, data);
};

// 📍 Delete location
export const deleteLocation = (id: string) => {
  return api.delete(`/locations/${id}`);
};