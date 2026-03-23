// src/services/adminDashboardService.js
import api from "./api";

export async function getAdminDashboardData() {
  try {
    // Fetch all data using the correct API methods
    const [cars, users, bookings] = await Promise.all([
      api.getCars(),
      api.getUsers(),
      api.getBookings(),
    ]);

    return {
      cars: cars || [],
      users: users || [],
      bookings: bookings || [],
      payments: [], // If you have a payments endpoint, add it here
    };
  } catch (error) {
    console.error("Failed to load admin dashboard data:", error);
    return {
      cars: [],
      users: [],
      bookings: [],
      payments: [],
    };
  }
}