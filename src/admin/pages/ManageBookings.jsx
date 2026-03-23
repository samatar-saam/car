// src/pages/admin/ManageBookings.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  Eye,
  X,
} from "lucide-react";
import api from "../../services/api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionBookingId, setActionBookingId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bookingsData = await api.getBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (booking) => {
    if (booking.status === "confirmed") {
      toast.info("Booking is already confirmed");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to approve the booking for ${booking.carName}?`
    );
    if (!confirmed) return;

    setActionBookingId(booking.id);
    setActionType("approve");
    try {
      const updatedBooking = { ...booking, status: "confirmed" };
      await api.updateBooking(booking.id, updatedBooking);
      toast.success("Booking approved successfully");
      fetchData();
    } catch (error) {
      console.error("Error approving booking:", error);
      toast.error("Failed to approve booking");
    } finally {
      setActionBookingId(null);
      setActionType(null);
    }
  };

  const handleCancel = async (booking) => {
    if (booking.status === "cancelled") {
      toast.info("Booking is already cancelled");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to cancel the booking for ${booking.carName}?`
    );
    if (!confirmed) return;

    setActionBookingId(booking.id);
    setActionType("cancel");
    try {
      const updatedBooking = { ...booking, status: "cancelled" };
      await api.updateBooking(booking.id, updatedBooking);
      toast.success("Booking cancelled successfully");
      fetchData();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    } finally {
      setActionBookingId(null);
      setActionType(null);
    }
  };

  const handleDelete = async (booking) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the booking for ${booking.carName}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setActionBookingId(booking.id);
    setActionType("delete");
    try {
      await api.deleteBooking(booking.id);
      toast.success("Booking deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    } finally {
      setActionBookingId(null);
      setActionType(null);
    }
  };

  const openViewModal = (booking) => {
    setViewBooking(booking);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewBooking(null);
  };

  // Helper to get display status
  const getDisplayStatus = (status) => {
    if (status === "confirmed") return "Confirmed";
    if (status === "cancelled") return "Cancelled";
    return "Pending"; // all other statuses (active, pending, etc.)
  };

  // Determine if booking is pending (not confirmed, not cancelled)
  const isPending = (status) => status !== "confirmed" && status !== "cancelled";

  // Determine if booking is cancellable (not already cancelled)
  const isCancellable = (status) => status !== "cancelled";

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.carName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && isPending(booking.status)) ||
      (statusFilter === "confirmed" && booking.status === "confirmed") ||
      (statusFilter === "cancelled" && booking.status === "cancelled");

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Bookings</h1>
          <p className="text-slate-500 mt-1">View, approve, cancel, or delete bookings</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, car, user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-purple-500 outline-none"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Booking ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Car</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">User</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Dates</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Total</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const displayStatus = getDisplayStatus(booking.status);
                  const statusColor =
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700";
                  return (
                    <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono text-sm">#{booking.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={booking.carImage}
                            alt={booking.carName}
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/32?text=Car";
                            }}
                          />
                          <span className="font-medium">{booking.carName || "Unknown Car"}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{booking.userName || "Unknown User"}</p>
                          <p className="text-xs text-slate-500">{booking.userEmail || "No email"}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>{formatDate(booking.pickupDate)}</div>
                          <div>→ {formatDate(booking.returnDate)}</div>
                          <div className="text-xs text-slate-500">{booking.days || 0} days</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold">${booking.totalPrice || 0}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                          {displayStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openViewModal(booking)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {isPending(booking.status) && (
                            <button
                              onClick={() => handleApprove(booking)}
                              disabled={actionBookingId === booking.id && actionType === "approve"}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
                              title="Approve"
                            >
                              {actionBookingId === booking.id && actionType === "approve" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          {isCancellable(booking.status) && (
                            <button
                              onClick={() => handleCancel(booking)}
                              disabled={actionBookingId === booking.id && actionType === "cancel"}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition disabled:opacity-50"
                              title="Cancel"
                            >
                              {actionBookingId === booking.id && actionType === "cancel" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(booking)}
                            disabled={actionBookingId === booking.id && actionType === "delete"}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                            title="Delete"
                          >
                            {actionBookingId === booking.id && actionType === "delete" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewModalOpen && viewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
              <button onClick={closeViewModal} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={viewBooking.carImage}
                    alt={viewBooking.carName}
                    className="w-full rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{viewBooking.carName}</h3>
                  <p className="text-sm text-slate-500 mt-1">Booking ID: {viewBooking.id}</p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Customer</p>
                      <p className="text-slate-900">{viewBooking.userName}</p>
                      <p className="text-sm text-slate-500">{viewBooking.userEmail}</p>
                      <p className="text-sm text-slate-500">{viewBooking.userPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Rental Period</p>
                      <p className="text-slate-900">
                        {formatDate(viewBooking.pickupDate)} – {formatDate(viewBooking.returnDate)}
                      </p>
                      <p className="text-sm text-slate-500">{viewBooking.days} days</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Price Breakdown</p>
                      <div className="mt-1 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Daily rate × {viewBooking.days}</span>
                          <span>${viewBooking.subtotal || viewBooking.totalPrice / (1 + 0.05)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (5%)</span>
                          <span>${viewBooking.tax || viewBooking.totalPrice * 0.05}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-1 border-t">
                          <span>Total</span>
                          <span>${viewBooking.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          viewBooking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : viewBooking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {getDisplayStatus(viewBooking.status)}
                      </span>
                    </div>
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

export default ManageBookings;