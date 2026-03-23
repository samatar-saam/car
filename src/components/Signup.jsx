// Signup.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Car, Mail, Lock, User, Phone, ArrowRight, Sparkles } from "lucide-react";

const USERS_API = "http://localhost:3001/users";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setFormData(prev => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      const checkResponse = await fetch(USERS_API);
      const existingUsers = await checkResponse.json();
      
      const userExists = existingUsers.some(
        user => user.email?.toLowerCase() === formData.email.toLowerCase()
      );

      if (userExists) {
        toast.error("Email already exists. Please login instead.");
        setIsSubmitting(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        firstName: formData.firstName.trim() || "User",
        lastName: formData.lastName.trim() || "",
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || "",
        password: formData.password.trim(),
        role: "user",
        status: "active",
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(USERS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      toast.success("Account created successfully! Please login.");

      // Navigate immediately to login page, passing the email and a success message
      navigate("/login", {
        state: {
          message: "Account created successfully! Please login.",
          email: formData.email,
        },
      });

    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Left Side - Purple Gradient Brand Section */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 p-10 text-white flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/20">
              <Car className="w-6 h-6" />
              <span className="font-semibold text-lg">RENTEX</span>
            </div>

            <div className="mt-16">
              <p className="text-sm uppercase tracking-[0.25em] text-purple-200">
                Join the Club
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight">
                Start your luxury journey today.
              </h1>
              <p className="mt-5 text-purple-200 text-base leading-7 max-w-lg">
                Create an account to access exclusive member benefits, faster bookings, 
                and personalized service.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">5,000+</p>
              <p className="text-sm text-purple-200">Happy Members</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-purple-200">Support</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-sm text-purple-200">Rating</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm text-purple-200">Years</p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="p-6 sm:p-10 lg:p-14 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white shadow-lg">
                <Car className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">RENTEX</h1>
              <p className="text-xs text-purple-600 mt-1 tracking-wider">LUXURY MOBILITY</p>
            </div>

            <p className="text-sm font-semibold tracking-[0.2em] text-purple-600 uppercase">
              Sign Up
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Create your account
            </h2>
            <p className="mt-3 text-slate-500 leading-6">
              Join Rentex to access premium vehicles and exclusive member benefits.
            </p>

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              {/* Name Fields - Optional */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name <span className="text-slate-400 text-xs">(optional)</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                    <User className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder=""
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name <span className="text-slate-400 text-xs">(optional)</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                    <User className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder=""
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field - Required */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address <span className="text-purple-600">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder=""
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Phone Field - Optional */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number <span className="text-slate-400 text-xs">(optional)</span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder=""
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Field - Required */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password <span className="text-purple-600">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Confirm Password Field - Required */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password <span className="text-purple-600">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-3.5 font-semibold text-white shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-sm text-slate-600 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;