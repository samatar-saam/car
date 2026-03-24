import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  BookOpen,
  Users,
  CreditCard,
  BarChart3,
  Star,
  Bell,
  LifeBuoy,
  Settings,
  LogOut,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    // Get admin data from localStorage
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        // Display name if available, otherwise email
        const name = admin.firstName || admin.name || admin.email?.split('@')[0] || "Admin";
        setAdminName(name);
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }
  }, []);

  const navItems = [
    { name: "Dashboard Overview", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Manage Cars", path: "/admin/cars", icon: Car },
    { name: "Manage Bookings", path: "/admin/bookings", icon: BookOpen },
    { name: "Manage Users", path: "/admin/users", icon: Users },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    // Clear admin authentication data
    localStorage.removeItem("admin");
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminLoginTime");
    // Optionally clear user data if needed (but keep separate)
    // Redirect to admin login
    navigate("/admin/login", { replace: true });
  };

  const sidebarWidth = isCollapsed ? "w-20" : "w-72";
  const mainMargin = isCollapsed ? "ml-20" : "ml-72";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - always fixed */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col justify-between bg-slate-950 text-white transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarWidth}`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-6">
            {!isCollapsed && (
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Rentex</h1>
                <p className="mt-1 text-sm text-slate-400">Admin Panel</p>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="rounded-xl p-2 text-slate-300 hover:bg-white/10 transition"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-xl p-2 text-slate-300 hover:bg-white/10 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-purple-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    } ${isCollapsed ? "justify-center" : ""}`
                  }
                  onClick={() => setSidebarOpen(false)}
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className={`mb-4 rounded-2xl bg-white/5 p-4 ${isCollapsed ? "text-center" : ""}`}>
            {!isCollapsed && (
              <>
                <p className="text-sm font-semibold text-white">Logged in as</p>
                <p className="text-sm text-slate-400">{adminName}</p>
              </>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <Users className="h-6 w-6 text-slate-300" />
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${mainMargin}`}>
        <div className="flex min-h-screen flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Admin Dashboard
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage fleet, bookings, users, and payments.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search bookings, users, cars..."
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white sm:w-80"
                  />
                </div>

                <button
                  onClick={() => navigate("/admin/add-car")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Car
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Rentex Admin Dashboard</p>
              <p>Built for premium fleet operations • v1.0</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;