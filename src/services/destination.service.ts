import api from "../api/axios";

// 📍 Get all destinations
export const getDestinations = () => {
  return api.get("/destinations");
};

// 📍 Get destination by ID
export const getDestinationById = (id: string) => {
  return api.get(`/destinations/${id}`);
};

// 📍 Create destination
export const createDestination = (data: {
  name: string;
  description?: string;
  duration?: string;
  schedule?: string;

  pointA: {
    latitude: number;
    longitude: number;
  };

  pointB: {
    latitude: number;
    longitude: number;
  };

  car: string; // 🚗 Car ID (ObjectId from MongoDB)
}) => {
  return api.post("/destinations", data);
};

// 📍 Update destination
export const updateDestination = (
  id: string,
  data: {
    name?: string;
    description?: string;
    duration?: string;
    schedule?: string;

    pointA?: {
      latitude: number;
      longitude: number;
    };

    pointB?: {
      latitude: number;
      longitude: number;
    };

    car?: string;
  }
) => {
  return api.patch(`/destinations/${id}`, data);
};

// 📍 Delete destination
export const deleteDestination = (id: string) => {
  return api.delete(`/destinations/${id}`);
};