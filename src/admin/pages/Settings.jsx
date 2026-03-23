import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Lock,
  Eye,
  EyeOff,
  Key,
  Save,
  Shield,
} from "lucide-react";

const ADMINS_API = "http://localhost:3001/admins";

function Settings() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Get admin data from localStorage on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (!storedAdmin) {
      toast.error("Session expired. Please login again.");
      navigate("/admin/login");
      return;
    }
    try {
      const parsed = JSON.parse(storedAdmin);
      setAdmin(parsed);
    } catch (err) {
      console.error("Error parsing admin data:", err);
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.currentPassword.trim()) {
      setError("Current password is required.");
      toast.error("Current password is required.");
      return false;
    }
    if (!formData.newPassword.trim()) {
      setError("New password is required.");
      toast.error("New password is required.");
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      toast.error("New password must be at least 6 characters long.");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      toast.error("New passwords do not match.");
      return false;
    }
    if (formData.newPassword === formData.currentPassword) {
      setError("New password must be different from current password.");
      toast.error("New password must be different from current password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin) return;
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setError("");

      // Fetch current admin data from API to verify current password
      const response = await fetch(`${ADMINS_API}/${admin.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch admin data");
      }
      const currentAdmin = await response.json();

      // Verify current password
      if (currentAdmin.password !== formData.currentPassword) {
        setError("Current password is incorrect.");
        toast.error("Current password is incorrect.");
        setIsSubmitting(false);
        return;
      }

      // Update password in database
      const updateResponse = await fetch(`${ADMINS_API}/${admin.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.newPassword }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update password");
      }

      const updatedAdmin = await updateResponse.json();

      // Update localStorage with new admin data (excluding password)
      const { password, ...adminWithoutPassword } = updatedAdmin;
      localStorage.setItem("admin", JSON.stringify(adminWithoutPassword));

      toast.success("Password changed successfully!");

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
      setError("An error occurred. Please try again later.");
      toast.error("Failed to change password. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Security Settings</h1>
        <p className="text-slate-500 mt-2">
          Change your password to keep your account secure.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Password Management
              </h2>
              <p className="text-sm text-slate-500">
                Update your password regularly to protect your admin account.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <Lock className="w-5 h-5 text-slate-400" />
              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <Key className="w-5 h-5 text-slate-400" />
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password (min. 6 characters)"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm New Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <Lock className="w-5 h-5 text-slate-400" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;