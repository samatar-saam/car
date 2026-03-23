import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const loginDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setLoginDropdownOpen(false);
  }, [location]);

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
      isActive
        ? "text-purple-600"
        : "text-slate-700 hover:text-purple-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-purple-50 text-purple-600"
        : "text-slate-700 hover:bg-slate-50 hover:text-purple-600"
    }`;

  const dropdownLinkClass = "block rounded-xl px-4 py-3 text-sm text-slate-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:pl-6";

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
    setLoginDropdownOpen(false);
  };

  const handleAdminLogin = () => {
    setLoginDropdownOpen(false);
    navigate("/admin/login");
  };

  const handleUserLogin = () => {
    setLoginDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/95 backdrop-blur-xl shadow-md"
          : "border-slate-100 bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Rentex Home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md transition-transform group-hover:scale-110 group-hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M5.5 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM18.5 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                <path d="M3 13.5V15a1 1 0 0 0 1 1h.55a2.5 2.5 0 0 1 4.9 0h5.1a2.5 2.5 0 0 1 4.9 0H20a1 1 0 0 0 1-1v-2.03a2 2 0 0 0-.42-1.23l-1.54-1.93A3 3 0 0 0 16.7 8H14V6.75A1.75 1.75 0 0 0 12.25 5h-4.1A2.75 2.75 0 0 0 5.7 6.62L4.58 9.14A3 3 0 0 0 3 11.8v1.7Zm3.5-4.5.74-1.7A.75.75 0 0 1 7.93 7h4.57v2H6.5Zm8 0V7h2.2c.3 0 .58.13.77.36L18.8 9H14.5Z" />
              </svg>
            </div>

            <div className="leading-tight">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Rentex
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Drive smarter, rent easier
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            <NavLink to="/" className={navLinkClass}>
              <span className="relative">
                Home
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>

            <NavLink to="/cars" className={navLinkClass}>
              <span className="relative">
                Browse Cars
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>

            <NavLink to="/services" className={navLinkClass}>
              <span className="relative">
                Services
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>

            <NavLink to="/my-rentals" className={navLinkClass}>
              <span className="relative">
                My Rentals
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              <span className="relative">
                About
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              <span className="relative">
                Contact
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
          </nav>

          {/* Desktop Right Side - Login Dropdown */}
          <div className="hidden items-center gap-3 lg:flex">
            <div ref={loginDropdownRef} className="relative">
              <button
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="flex items-center gap-1 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600 hover:shadow-md"
              >
                Login
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${loginDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {loginDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-fade-in z-50">
                  <button
                    onClick={handleUserLogin}
                    className="w-full text-left block rounded-xl px-4 py-3 text-sm text-slate-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-purple-500">👤</span>
                      User Login
                    </span>
                  </button>
                  <button
                    onClick={handleAdminLogin}
                    className="w-full text-left block rounded-xl px-4 py-3 text-sm text-slate-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-purple-500">🛡️</span>
                      Admin Login
                    </span>
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/cars"
              className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:from-purple-600 hover:to-purple-700 hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 hover:shadow-md lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${
            menuOpen ? "max-h-[700px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
            <NavLink to="/" className={mobileLinkClass} onClick={handleMobileLinkClick}>
              <span className="flex items-center gap-2">
                <span className="text-purple-500">🏠</span>
                Home
              </span>
            </NavLink>

            <NavLink to="/cars" className={mobileLinkClass} onClick={handleMobileLinkClick}>
              <span className="flex items-center gap-2">
                <span className="text-purple-500">🚗</span>
                Browse Cars
              </span>
            </NavLink>

            <NavLink to="/services" className={mobileLinkClass} onClick={handleMobileLinkClick}>
              <span className="flex items-center gap-2">
                <span className="text-purple-500">🔧</span>
                Services
              </span>
            </NavLink>

            <NavLink
              to="/my-rentals"
              className={mobileLinkClass}
              onClick={handleMobileLinkClick}
            >
              <span className="flex items-center gap-2">
                <span className="text-purple-500">📋</span>
                My Rentals
              </span>
            </NavLink>

            <NavLink to="/about" className={mobileLinkClass} onClick={handleMobileLinkClick}>
              <span className="flex items-center gap-2">
                <span className="text-purple-500">ℹ️</span>
                About
              </span>
            </NavLink>

            <NavLink
              to="/contact"
              className={mobileLinkClass}
              onClick={handleMobileLinkClick}
            >
              <span className="flex items-center gap-2">
                <span className="text-purple-500">📞</span>
                Contact
              </span>
            </NavLink>

            <div className="mt-3 grid gap-3 border-t border-slate-200 pt-3">
              <Link
                to="/login"
                onClick={handleMobileLinkClick}
                className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
              >
                User Login
              </Link>

              <Link
                to="/admin/login"
                onClick={handleMobileLinkClick}
                className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
              >
                Admin Login
              </Link>

              <Link
                to="/signup"
                onClick={handleMobileLinkClick}
                className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
              >
                Sign Up
              </Link>

              <Link
                to="/cars"
                onClick={handleMobileLinkClick}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:from-purple-600 hover:to-purple-700 hover:shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations to your global CSS */}
    </header>
  );
}

export default Navbar;