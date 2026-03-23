// src/services/api.js
const API_BASE_URL = "http://localhost:3001";

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
}

const api = {
  // ==================== CARS ====================
  getCars: () => apiRequest("/cars"),
  getCar: (id) => apiRequest(`/cars/${id}`),
  createCar: (carData) => apiRequest("/cars", {
    method: "POST",
    body: JSON.stringify(carData),
  }),
  updateCar: (id, carData) => apiRequest(`/cars/${id}`, {
    method: "PUT",
    body: JSON.stringify(carData),
  }),
  deleteCar: (id) => apiRequest(`/cars/${id}`, {
    method: "DELETE",
  }),
  
  // ==================== USERS ====================
  getUsers: () => apiRequest("/users"),
  getUser: (id) => apiRequest(`/users/${id}`),
  createUser: (userData) => apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  }),
  updateUser: (id, userData) => apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  }),
  deleteUser: (id) => apiRequest(`/users/${id}`, {
    method: "DELETE",
  }),
  
  // ==================== BOOKINGS ====================
  getBookings: () => apiRequest("/bookings"),
  getBooking: (id) => apiRequest(`/bookings/${id}`),
  createBooking: (bookingData) => apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  }),
  updateBooking: (id, bookingData) => apiRequest(`/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(bookingData),
  }),
  deleteBooking: (id) => apiRequest(`/bookings/${id}`, {
    method: "DELETE",
  }),
};

export default api;