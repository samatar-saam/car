// src/pages/CarDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Car,
  Star,
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Heart,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import api from "../services/api";
import Navbar from "../components/Navbar"; // Import Navbar

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Format currency in KES
  const formatKES = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const data = await api.getCar(id);
      setCar(data);
    } catch (error) {
      console.error("Error fetching car details:", error);
      toast.error("Car not found");
      navigate("/cars");
    } finally {
      setLoading(false);
    }
  };

  // Calculate days and price when dates change
  useEffect(() => {
    if (pickupDate && returnDate && car) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
      setTotalPrice(diffDays * car.pricePerDay);
    }
  }, [pickupDate, returnDate, car]);

  const handleBookNow = () => {
    // Step 1: Check if user is logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isAuthenticated || !user) {
      // Save pending booking to localStorage for after login
      localStorage.setItem(
        "pendingBooking",
        JSON.stringify({
          carId: car.id,
          pickupDate,
          returnDate,
        })
      );
      toast.info("Please login to book this car");
      navigate("/login", { state: { from: `/cars/${id}` } });
      return;
    }

    // Step 2: Check if dates are selected
    if (!pickupDate || !returnDate) {
      toast.warning("Please select pickup and return dates");
      return;
    }

    // Step 3: Validate dates
    if (new Date(returnDate) <= new Date(pickupDate)) {
      toast.error("Return date must be after pickup date");
      return;
    }

    // Step 4: Calculate totals
    const subtotal = totalPrice;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + tax;

    // Step 5: Navigate to booking page with all details
    navigate("/bookingPage", {
      state: {
        car,
        pickupDate,
        returnDate,
        days,
        subtotal,
        tax,
        grandTotal,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Car className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-semibold">Car not found</h2>
          <button onClick={() => navigate("/cars")} className="mt-4 text-purple-600">
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-6 py-6">
          <button
            onClick={() => navigate("/cars")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Cars
          </button>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Details */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={car.image || "https://via.placeholder.com/800x400?text=Car+Image"}
                  alt={car.name}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x400?text=Car+Image";
                  }}
                />
              </div>

              {/* Car Info */}
              <div className="mt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">{car.name}</h1>
                    <p className="text-slate-500 mt-1">{car.brand} • {car.category}</p>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-full">
                    <Heart className="h-6 w-6 text-slate-400" />
                  </button>
                </div>

                {/* Rating & Location */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{car.rating || 4.9}</span>
                    <span className="text-slate-500">({car.reviews || 156} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <span>{car.location}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      car.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {car.available ? "Available Now" : "Currently Booked"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 mb-3">Description</h2>
                <p className="text-slate-600 leading-relaxed">
                  {car.description ||
                    "Experience luxury and performance with this premium vehicle. Perfect for business travel, special occasions, or simply treating yourself to an extraordinary driving experience across Kenya."}
                </p>
              </div>

              {/* Specifications */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Gauge className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Engine</p>
                    <p className="font-semibold text-sm">
                      {car.specs?.engine || car.engine || "V8"}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <TrendingUp className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Power</p>
                    <p className="font-semibold text-sm">
                      {car.specs?.power || car.power || "640 hp"}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Clock className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">0-60 mph</p>
                    <p className="font-semibold text-sm">
                      {car.specs?.acceleration || car.acceleration || "3.2s"}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Fuel className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Fuel</p>
                    <p className="font-semibold text-sm">{car.fuel || "Petrol"}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {(car.features || [
                    "Leather Seats",
                    "GPS Navigation",
                    "Bluetooth",
                    "Backup Camera",
                    "Heated Seats",
                    "Premium Sound",
                  ]).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <div className="text-center pb-4 border-b border-slate-100">
                  <p className="text-sm text-slate-500">Starting from</p>
                  <p className="text-3xl font-bold text-purple-600">{formatKES(car.pricePerDay)}</p>
                  <p className="text-sm text-slate-500">per day</p>
                </div>

                {/* Date Selection */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                      min={pickupDate || new Date().toISOString().split("T")[0]}
                      disabled={!pickupDate}
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                {days > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">
                        {formatKES(car.pricePerDay)} × {days} days
                      </span>
                      <span className="font-semibold">{formatKES(car.pricePerDay * days)}</span>
                    </div>
                    {/* <div className="flex justify-between text-sm mt-2">
                      <span className="text-slate-600">Tax (5%)</span>
                      <span className="font-semibold">{formatKES(Math.round(totalPrice * 0.05))}</span>
                    </div> */}
                    <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-slate-100">
                      <span>Total</span>
                      <span className="text-purple-600">
                        {formatKES(totalPrice + Math.round(totalPrice * 0.05))}
                      </span>
                    </div>
                  </div>
                )}

                {/* Book Now Button */}
                <button
                  onClick={handleBookNow}
                  disabled={!car.available}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {car.available ? "Book Now" : "Not Available"}
                </button>

                {/* Rental Terms */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Free cancellation up to 24 hours before pickup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarDetails;