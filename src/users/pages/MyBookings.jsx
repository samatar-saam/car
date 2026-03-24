// src/pages/dashboard/MyBookings.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Car,
  Calendar,
  MapPin,
  DollarSign,
  Trash2,
  XCircle,
  Loader2,
  Edit,
  X,
  ArrowRight,
} from "lucide-react";
import api from "../../services/api";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    pickupDate: "",
    returnDate: "",
  });
  const [editDays, setEditDays] = useState(0);
  const [editTotalPrice, setEditTotalPrice] = useState(0);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Helper to format KES currency
  const formatKES = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/login");
        return;
      }

      const allBookings = await api.getBookings();
      const userBookings = allBookings.filter(
        (booking) => booking.userId === user.id || booking.userEmail === user.email
      );
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (booking) => {
    if (booking.status !== "confirmed") {
      toast.info("This booking cannot be cancelled");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to cancel your booking for ${booking.carName}?`
    );
    if (!confirmed) return;

    setCancellingId(booking.id);
    try {
      const updatedBooking = {
        ...booking,
        status: "cancelled",
      };
      await api.updateBooking(booking.id, updatedBooking);
      toast.success("Booking cancelled successfully");
      fetchUserBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  const handleDelete = async (booking) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the booking for ${booking.carName}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(booking.id);
    try {
      await api.deleteBooking(booking.id);
      toast.success("Booking deleted successfully");
      fetchUserBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setEditForm({
      pickupDate: booking.pickupDate,
      returnDate: booking.returnDate,
    });
    setEditDays(booking.days);
    setEditTotalPrice(booking.totalPrice);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingBooking(null);
    setEditForm({ pickupDate: "", returnDate: "" });
    setEditDays(0);
    setEditTotalPrice(0);
  };

  const handleEditDateChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (editForm.pickupDate && editForm.returnDate && editingBooking) {
      const pickup = new Date(editForm.pickupDate);
      const returnD = new Date(editForm.returnDate);
      if (returnD > pickup) {
        const diffDays = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
        setEditDays(diffDays);
        const subtotal = diffDays * editingBooking.subtotalPerDay;
        const tax = subtotal * 0.05;
        setEditTotalPrice(subtotal + tax);
      } else {
        setEditDays(0);
        setEditTotalPrice(0);
      }
    } else {
      setEditDays(0);
      setEditTotalPrice(0);
    }
  }, [editForm.pickupDate, editForm.returnDate, editingBooking]);

  const handleSaveEdit = async () => {
    if (!editForm.pickupDate || !editForm.returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }
    if (new Date(editForm.returnDate) <= new Date(editForm.pickupDate)) {
      toast.error("Return date must be after pickup date");
      return;
    }

    setEditSubmitting(true);
    try {
      const updatedBooking = {
        ...editingBooking,
        pickupDate: editForm.pickupDate,
        returnDate: editForm.returnDate,
        days: editDays,
        totalPrice: editTotalPrice,
      };
      await api.updateBooking(editingBooking.id, updatedBooking);
      toast.success("Booking updated successfully");
      closeEditModal();
      fetchUserBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    } finally {
      setEditSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
        <Car className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900">No bookings yet</h3>
        <p className="text-slate-500 mt-1">Start your luxury journey with Rentex</p>
        <button
          onClick={() => navigate("/cars")}
          className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        >
          Browse Cars
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                <img
                  src={booking.carImage}
                  alt={booking.carName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                  }}
                />
              </div>
              <div className="flex-1 p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{booking.carName}</h3>
                    <p className="text-sm text-slate-500 mt-1">Booking ID: {booking.id}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(booking.pickupDate)} – {formatDate(booking.returnDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location || "Nairobi, Kenya"}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status === "confirmed" && "✓ Confirmed"}
                        {booking.status === "cancelled" && "✗ Cancelled"}
                        {booking.status !== "confirmed" && booking.status !== "cancelled" && booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">{formatKES(booking.totalPrice)}</p>
                    <p className="text-sm text-slate-500">Total</p>
                    <div className="mt-2 flex gap-2 justify-end">
                      {booking.status === "confirmed" && (
                        <>
                          <button
                            onClick={() => openEditModal(booking)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleCancel(booking)}
                            disabled={cancellingId === booking.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition disabled:opacity-50"
                          >
                            {cancellingId === booking.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(booking)}
                        disabled={deletingId === booking.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition disabled:opacity-50"
                      >
                        {deletingId === booking.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Edit Booking</h2>
              <button onClick={closeEditModal} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={editingBooking.carImage}
                    alt={editingBooking.carName}
                    className="w-full rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                    }}
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-900">{editingBooking.carName}</h3>
                    <p className="text-sm text-slate-500">{editingBooking.carBrand || editingBooking.carName}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Change Dates</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="date"
                          name="pickupDate"
                          value={editForm.pickupDate}
                          onChange={handleEditDateChange}
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="date"
                          name="returnDate"
                          value={editForm.returnDate}
                          onChange={handleEditDateChange}
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                          min={editForm.pickupDate || new Date().toISOString().split("T")[0]}
                          disabled={!editForm.pickupDate}
                        />
                      </div>
                    </div>
                  </div>

                  {editDays > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          {formatKES(editingBooking.subtotalPerDay)} × {editDays} days
                        </span>
                        <span className="font-semibold">{formatKES(editingBooking.subtotalPerDay * editDays)}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-slate-600">Tax (5%)</span>
                        <span className="font-semibold">{formatKES(Math.round((editingBooking.subtotalPerDay * editDays) * 0.05))}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold mt-3 pt-2 border-t border-slate-200">
                        <span>Total</span>
                        <span className="text-purple-600">{formatKES(editTotalPrice)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSaveEdit}
                    disabled={editSubmitting || !editForm.pickupDate || !editForm.returnDate}
                    className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {editSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;