// src/pages/dashboard/FavouriteCars.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Car,
  Star,
  MapPin,
  Calendar,
  X,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

function FavouriteCars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const data = await api.getCars();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pickupDate && returnDate && selectedCar) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      if (returnD > pickup) {
        const diffTime = Math.abs(returnD - pickup);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays);
        setTotalPrice(diffDays * selectedCar.pricePerDay);
      } else {
        setDays(0);
        setTotalPrice(0);
      }
    } else {
      setDays(0);
      setTotalPrice(0);
    }
  }, [pickupDate, returnDate, selectedCar]);

  const openModal = (car) => {
    setSelectedCar(car);
    setPickupDate("");
    setReturnDate("");
    setDays(0);
    setTotalPrice(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const handleBook = async () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isAuthenticated || !user) {
      toast.info("Please login to book this car");
      navigate("/login");
      return;
    }

    if (!pickupDate || !returnDate) {
      toast.warning("Please select pickup and return dates");
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      toast.error("Return date must be after pickup date");
      return;
    }

    const subtotal = totalPrice;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + tax;

    const bookingData = {
      id: Date.now().toString(),
      carId: selectedCar.id,
      userId: user.id,
      carName: selectedCar.name,
      carImage: selectedCar.image,
      userName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      userEmail: user.email,
      userPhone: user.phone || "",
      pickupDate,
      returnDate,
      days,
      subtotal,
      tax,
      totalPrice: grandTotal,
      status: "confirmed",
      bookingDate: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await api.createBooking(bookingData);
      toast.success("Booking confirmed!");
      closeModal();
      navigate("/my-rentals");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
        <Car className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900">No cars available</h3>
        <p className="text-slate-500 mt-1">Check back later for new vehicles.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Fleet</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                }}
              />
              {car.featured && (
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">
                    Featured
                  </span>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
              <p className="text-sm text-slate-500">{car.brand} • {car.category}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>{car.location}</span>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{car.rating || 4.5}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-bold text-purple-600">KES {car.pricePerDay.toLocaleString()}</span>
                  <span className="text-slate-500">/day</span>
                </div>
                <button
                  onClick={() => openModal(car)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm hover:bg-purple-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {modalOpen && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Book {selectedCar.name}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="w-full rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                    }}
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedCar.rating || 4.5}</span>
                      <span className="text-slate-400">•</span>
                      <MapPin className="h-4 w-4" />
                      <span>{selectedCar.location}</span>
                    </div>
                    <p className="text-sm text-slate-600">{selectedCar.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-slate-50 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3">Select Dates</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Pickup Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Return Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                            min={pickupDate || new Date().toISOString().split("T")[0]}
                            disabled={!pickupDate}
                          />
                        </div>
                      </div>
                    </div>

                    {days > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            KES {selectedCar.pricePerDay.toLocaleString()} × {days} days
                          </span>
                          <span className="font-semibold">KES {(selectedCar.pricePerDay * days).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-slate-600">Tax (5%)</span>
                          <span className="font-semibold">KES {Math.round(totalPrice * 0.05).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-3 pt-2 border-t border-slate-200">
                          <span>Total</span>
                          <span className="text-purple-600">
                            KES {(totalPrice + Math.round(totalPrice * 0.05)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleBook}
                      disabled={submitting || !pickupDate || !returnDate}
                      className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavouriteCars;