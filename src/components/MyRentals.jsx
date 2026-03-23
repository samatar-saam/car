// src/pages/MyRentals.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Car, MapPin, DollarSign } from "lucide-react";
import api from "../services/api";

// Format currency in KES
const formatKES = (amount) => {
  // Ensure amount is a number
  const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(numericAmount)) return "KES 0";
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

function MyRentals() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const allBookings = await api.getBookings();
      const userBookings = allBookings.filter(
        (b) => b.userId === user?.id || b.userEmail === user?.email
      );
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Rentals</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Car className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900">
              No bookings yet
            </h3>
            <p className="text-slate-500 mt-1">
              Start your luxury journey with Rentex
            </p>
            <Link
              to="/cars"
              className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
            >
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={booking.carImage}
                    alt={booking.carName}
                    className="w-32 h-32 rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128x128?text=Car";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {booking.carName}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(booking.pickupDate).toLocaleDateString()}
                        </span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(booking.returnDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500">
                        {booking.location || "Dubai Marina"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">
                      {formatKES(booking.totalPrice)}
                    </p>
                    <p className="text-sm text-slate-500">Total</p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status === "confirmed"
                        ? "Confirmed"
                        : booking.status === "cancelled"
                        ? "Cancelled"
                        : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRentals;