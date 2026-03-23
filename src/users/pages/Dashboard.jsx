// src/users/pages/Dashboard.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  CalendarCheck,
  Flag,
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
  LineChart,
  Line,
} from "recharts";
import api from "../../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reports, setReports] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const currentUser = JSON.parse(storedUser);
    setUser(currentUser);
    fetchUserData(currentUser);
  }, [navigate]);

  const fetchUserData = async (currentUser) => {
    try {
      // Fetch all bookings
      const allBookings = await api.getBookings();
      const userBookings = allBookings.filter(
        (b) => b.userId === currentUser.id || b.userEmail === currentUser.email
      );
      setBookings(userBookings);

      // Fetch reports (if endpoint exists)
      let userReports = [];
      try {
        const allReports = await fetch("http://localhost:3001/Report").then(res => res.json());
        userReports = allReports.filter(r => r.email === currentUser.email);
      } catch (err) {
        console.warn("Reports endpoint not available or empty");
      }
      setReports(userReports);

      // Fetch total cars (for "Favorite Cars" stat)
      const cars = await api.getCars();
      setTotalCars(cars.length);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const totalReports = reports.length;
    const favoriteCars = totalCars; // interpret as total available cars
    return { totalBookings, totalReports, favoriteCars };
  }, [bookings, reports, totalCars]);

  // Monthly bookings (for line/bar chart)
  const monthlyBookings = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = new Array(12).fill(0);
    bookings.forEach((booking) => {
      const date = new Date(booking.bookingDate || booking.createdAt);
      const month = date.getMonth();
      counts[month]++;
    });
    return months.map((month, i) => ({ month, bookings: counts[i] }));
  }, [bookings]);

  // Booking status distribution
  const bookingStatus = useMemo(() => {
    const statusCount = { pending: 0, confirmed: 0, cancelled: 0 };
    bookings.forEach((booking) => {
      const status = booking.status?.toLowerCase();
      if (status === "pending") statusCount.pending++;
      else if (status === "confirmed") statusCount.confirmed++;
      else if (status === "cancelled") statusCount.cancelled++;
      else statusCount.pending++;
    });
    return [
      { name: "Pending", value: statusCount.pending },
      { name: "Confirmed", value: statusCount.confirmed },
      { name: "Cancelled", value: statusCount.cancelled },
    ];
  }, [bookings]);

  // Monthly reports (optional)
  const monthlyReports = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = new Array(12).fill(0);
    reports.forEach((report) => {
      const date = new Date(report.createdAt);
      const month = date.getMonth();
      counts[month]++;
    });
    return months.map((month, i) => ({ month, reports: counts[i] }));
  }, [reports]);

  // Most booked cars by this user
  const topCars = useMemo(() => {
    const carCount = {};
    bookings.forEach((booking) => {
      const carId = booking.carId;
      carCount[carId] = (carCount[carId] || 0) + 1;
    });
    // We need car names; we'll fetch once or assume booking.carName is stored
    // Actually booking objects already contain carName. So we can use that.
    const carsMap = {};
    bookings.forEach((booking) => {
      if (!carsMap[booking.carId]) {
        carsMap[booking.carId] = { name: booking.carName, count: 0 };
      }
      carsMap[booking.carId].count++;
    });
    return Object.values(carsMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [bookings]);

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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<CalendarCheck className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Favorite Cars"
          value={stats.favoriteCars}
          icon={<Car className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Total Reports"
          value={stats.totalReports}
          icon={<Flag className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Charts Row */}
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

      {/* Second row: Monthly Reports + Top Cars */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Reports Line Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900">Monthly Reports</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyReports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reports"
                stroke={primaryColor}
                strokeWidth={3}
                dot={{ fill: primaryColor }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Most Booked Cars */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900">Most Booked Cars</h3>
          </div>
          <div className="space-y-4">
            {topCars.length > 0 ? (
              topCars.map((car, idx) => (
                <div key={car.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500">#{idx + 1}</span>
                    <span className="font-medium text-slate-900">{car.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-purple-600 font-semibold">{car.count} bookings</span>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(car.count / (topCars[0]?.count || 1)) * 100}%` }}
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
    </div>
  );
}

// Helper component for stat cards
function StatCard({ title, value, icon, bgColor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className={`mb-3 inline-flex rounded-2xl ${bgColor} p-3`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}

export default Dashboard;