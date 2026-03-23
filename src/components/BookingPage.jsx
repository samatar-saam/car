// src/pages/BookingPage.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Car,
  Calendar,
  User,
  Mail,
  Phone,
  ShieldCheck,
  ArrowLeft,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    driverLicense: "",
    specialRequests: "",
  });

  // Format currency in KES
  const formatKES = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get booking details from navigation state
  useEffect(() => {
    if (!location.state) {
      toast.error("No booking information found");
      navigate("/cars");
      return;
    }
    setBookingData(location.state);
  }, [location, navigate]);

  // Auto-fill user data if logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        phone: user.phone || "",
        driverLicense: "",
        specialRequests: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmBooking = async () => {
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const newBooking = {
        id: Date.now().toString(),
        carId: bookingData.car.id,
        userId: user?.id || "guest",
        carName: bookingData.car.name,
        carImage: bookingData.car.image,
        userName: formData.fullName,
        userEmail: formData.email,
        userPhone: formData.phone,
        pickupDate: bookingData.pickupDate,
        returnDate: bookingData.returnDate,
        days: bookingData.days,
        subtotal: bookingData.subtotal,
        tax: bookingData.tax,
        totalPrice: bookingData.grandTotal,
        status: "confirmed",
        bookingDate: new Date().toISOString(),
      };

      // Save to database
      await api.createBooking(newBooking);

      toast.success("Booking confirmed successfully!");

      // Clear any pending booking
      localStorage.removeItem("pendingBooking");

      // Redirect to My Rentals
      setTimeout(() => {
        navigate("/my-rentals");
      }, 1500);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Car className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  const { car, pickupDate, returnDate, days, subtotal, tax, grandTotal } =
    bookingData;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Car Details
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h1 className="text-2xl font-bold text-slate-900">
                Complete Your Booking
              </h1>
              <p className="text-slate-500 mt-1">
                Please fill in your details to confirm the reservation
              </p>

              {/* Car Summary */}
              <div className="mt-6 p-4 bg-slate-50 rounded-xl flex items-center gap-4">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80x80?text=Car";
                  }}
                />
                <div>
                  <h3 className="font-semibold text-slate-900">{car.name}</h3>
                  <p className="text-sm text-slate-500">
                    {car.brand} • {car.category}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>
                      {new Date(pickupDate).toLocaleDateString()} -{" "}
                      {new Date(returnDate).toLocaleDateString()}
                    </span>
                    <span className="text-slate-400">({days} days)</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 712 345 678"
                      className="w-full bg-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Driver's License Number
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <ShieldCheck className="h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      name="driverLicense"
                      value={formData.driverLicense}
                      onChange={handleChange}
                      placeholder="Enter your license number"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any special requests or requirements..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <h2 className="text-lg font-bold text-slate-900">Price Summary</h2>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">
                    {formatKES(car.pricePerDay)} × {days} days
                  </span>
                  <span className="font-semibold">{formatKES(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Insurance</span>
                  <span className="font-semibold">Included</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax (5%)</span>
                  <span className="font-semibold">{formatKES(tax)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">{formatKES(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  "Confirm Booking"
                )}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                By confirming, you agree to our{" "}
                <a href="/terms" className="text-purple-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-purple-600">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;