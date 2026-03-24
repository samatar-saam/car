import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Login from "./components/Login";
import BookingPage from "./components/BookingPage";
import BrowseCars from "./components/BrowseCars";
import Signup from "./components/Signup";
import CarDetails from "./components/CarDetails";

// users
import UserDashboard from "./users/layout/UserDashboard";
import Dashboard from "./users/pages/Dashboard";
import FavouriteCars from "./users/pages/FavouriteCars";
import MyBookings from "./users/pages/MyBookings";
import Payment from "./users/pages/Payment";
import Profile from "./users/pages/Profile";
import Setting from "./users/pages/Setting";
import UserReport from "./users/pages/UserReport";

// admin
import AdminDashboard from "./admin/layouts/AdminDashboard";
import DashboardOverview from "./admin/pages/DarshboardOverview";
import ManageCars from "./admin/pages/ManageCars";
import ManageBookings from "./admin/pages/ManageBookings";
import ManageUsers from "./admin/pages/ManageUsers";
import PaymentInvoices from "./admin/pages/PaymentInvoices";
import Reports from "./admin/pages/Reports";
import Reviews from "./admin/pages/Reviews";
import Notifications from "./admin/pages/Notifications";
import Settings from "./admin/pages/Settings";
import AdminAddCar from "./admin/pages/AdminAddCar";
import AdminLogin from "./admin/pages/AdminLogin";

// --- User route guard ---
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const user = localStorage.getItem("user");

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// --- Admin route guard ---
function AdminProtectedRoute({ children }) {
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
  const admin = localStorage.getItem("admin");

  if (!isAdminAuthenticated || !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />
        {/* <Route
          path="/my-rentals"
          element={
            <PublicLayout>
              <MyRentals />
            </PublicLayout>
          }
        /> */}
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/cars"
          element={
            <PublicLayout>
              <BrowseCars />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/bookingpage"
          element={
            <PublicLayout>
              <BookingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />
        <Route path="/cars/:id" element={<CarDetails />} />

        {/* Protected user dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="favorites" element={<FavouriteCars />} />
          <Route path="payments" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user-report" element={<UserReport />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Admin dashboard - protected */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="paymentInvoices" element={<PaymentInvoices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin standalone routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/add-car" element={<AdminAddCar />} />
      </Routes>
    </Router>
  );
}

export default App;