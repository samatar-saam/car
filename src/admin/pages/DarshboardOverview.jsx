// src/admin/pages/DarshboardOverview.jsx
import { useState, useEffect, useMemo } from "react";
import {
  Car,
  Users,
  BookOpen,
  Mail,
  TrendingUp,
  PieChart,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "../../services/api";

function DashboardOverview() {
  const [data, setData] = useState({
    users: [],
    cars: [],
    bookings: [],
    contacts: [], // notifications (contacts)
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, cars, bookings, contacts] = await Promise.all([
          api.getUsers(),
          api.getCars(),
          api.getBookings(),
          api.getContacts ? api.getContacts() : fetch("http://localhost:3001/contacts").then(res => res.json()),
        ]);
        setData({ users, cars, bookings, contacts });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Stats calculations (removed revenue)
  const stats = useMemo(() => {
    const totalUsers = data.users.length;
    const totalCars = data.cars.length;
    const totalBookings = data.bookings.length;
    const totalNotifications = data.contacts.length; // using contacts as notifications

    return {
      totalUsers,
      totalCars,
      totalBookings,
      totalNotifications,
    };
  }, [data]);

  // Monthly bookings chart data
  const monthlyBookings = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = new Array(12).fill(0);
    data.bookings.forEach((booking) => {
      const date = new Date(booking.bookingDate || booking.createdAt);
      const month = date.getMonth();
      counts[month]++;
    });
    return months.map((month, i) => ({ month, bookings: counts[i] }));
  }, [data.bookings]);

  // Booking status distribution
  const bookingStatus = useMemo(() => {
    const statusCount = {
      pending: 0,
      confirmed: 0,
      cancelled: 0,
    };
    data.bookings.forEach((booking) => {
      const status = booking.status?.toLowerCase();
      if (status === "pending") statusCount.pending++;
      else if (status === "confirmed") statusCount.confirmed++;
      else if (status === "cancelled") statusCount.cancelled++;
      else statusCount.pending++; // treat others as pending
    });
    return [
      { name: "Pending", value: statusCount.pending },
      { name: "Confirmed", value: statusCount.confirmed },
      { name: "Cancelled", value: statusCount.cancelled },
    ];
  }, [data.bookings]);

  // Popular cars (top 5 by booking count)
  const popularCars = useMemo(() => {
    const carCount = {};
    data.bookings.forEach((booking) => {
      const carId = booking.carId;
      carCount[carId] = (carCount[carId] || 0) + 1;
    });
    const carsWithCount = data.cars.map((car) => ({
      ...car,
      bookingCount: carCount[car.id] || 0,
    }));
    return carsWithCount.sort((a, b) => b.bookingCount - a.bookingCount).slice(0, 5);
  }, [data.bookings, data.cars]);

  // Colors
  const primaryColor = "#8b5cf6";
  const pieColors = ["#8b5cf6", "#a78bfa", "#c084fc", "#e9d5ff"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards - 4 cards (Users, Cars, Bookings, Notifications) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Total Cars"
          value={stats.totalCars}
          icon={<Car className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<BookOpen className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Notifications"
          value={stats.totalNotifications}
          icon={<Mail className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Charts Row: Monthly Bookings Bar Chart & Booking Status Pie Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Bookings Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900">Monthly Bookings</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill={primaryColor} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Pie Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900">Booking Status</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={bookingStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {bookingStatus.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Cars Section (full width) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-slate-900">Popular Cars</h3>
        </div>
        <div className="space-y-4">
          {popularCars.length > 0 ? (
            popularCars.map((car, idx) => (
              <div key={car.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">#{idx + 1}</span>
                  <span className="font-medium text-slate-900">{car.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-purple-600 font-semibold">{car.bookingCount} bookings</span>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${(car.bookingCount / (popularCars[0]?.bookingCount || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-500 py-8">No booking data available</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for stat cards
function StatCard({ title, value, icon, bgColor }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition`}>
      <div className={`mb-3 inline-flex rounded-2xl ${bgColor} p-3`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}

export default DashboardOverview;