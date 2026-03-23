// Settings.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Car, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

const USERS_API = "http://localhost:3001/users";

function Settings() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get current user from localStorage
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to access settings.");
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("User not found. Please login again.");
      navigate("/login");
      return;
    }

    // Validate inputs
    if (!formData.currentPassword.trim() || !formData.newPassword.trim()) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Fetch the user from the API to compare current password
      const response = await fetch(`${USERS_API}/${currentUser.id}`);
      if (!response.ok) throw new Error("User not found");

      const user = await response.json();

      // Compare current password (plain text, as stored in db.json)
      if (user.password !== formData.currentPassword) {
        toast.error("Current password is incorrect.");
        setIsSubmitting(false);
        return;
      }

      // Update password
      const updatedUser = { ...user, password: formData.newPassword };

      const updateResponse = await fetch(`${USERS_API}/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!updateResponse.ok) throw new Error("Failed to update password");

      // Optionally update local storage user object (if you store password, though usually not)
      // const updatedUserForLocal = { ...currentUser, password: formData.newPassword };
      // localStorage.setItem("user", JSON.stringify(updatedUserForLocal));

      toast.success("Password updated successfully!");

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      // Optional: redirect after a short delay
      setTimeout(() => {
        navigate("/profile"); // or dashboard
      }, 1500);
    } catch (err) {
      console.error("Password update error:", err);
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

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
                Account Security
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight">
                Change your password.
              </h1>
              <p className="mt-5 text-purple-200 text-base leading-7 max-w-lg">
                Keep your account secure by updating your password regularly.
                Use a strong, unique password that you don't use elsewhere.
              </p>
            </div>
          </div>

          {/* Stats Grid (optional) */}
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">🔐</p>
              <p className="text-sm text-purple-200">Encrypted</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">⚡</p>
              <p className="text-sm text-purple-200">Instant</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">✅</p>
              <p className="text-sm text-purple-200">Verified</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <p className="text-2xl font-bold">🛡️</p>
              <p className="text-sm text-purple-200">Secure</p>
            </div>
          </div>
        </div>

        {/* Right Side - Password Change Form */}
        <div className="p-6 sm:p-10 lg:p-14 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white shadow-lg">
                <Car className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">RENTEX</h1>
              <p className="text-xs text-purple-600 mt-1 tracking-wider">
                SECURITY
              </p>
            </div>

            <p className="text-sm font-semibold tracking-[0.2em] text-purple-600 uppercase">
              Update Password
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Change your password
            </h2>
            <p className="mt-3 text-slate-500 leading-6">
              Enter your current password and choose a new one.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Password <span className="text-purple-600">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password <span className="text-purple-600">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Create a new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm New Password <span className="text-purple-600">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="Confirm your new password"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Update Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-3.5 font-semibold text-white shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Update Password
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;