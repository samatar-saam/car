// src/pages/admin/ManageUsers.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  Shield,
  User,
} from "lucide-react";
import api from "../../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionUserId, setActionUserId] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    const actionText = newStatus === "active" ? "activate" : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} user ${user.firstName} ${user.lastName}?`
    );
    if (!confirmed) return;

    setActionUserId(user.id);
    setActionType("status");
    try {
      const updatedUser = { ...user, status: newStatus };
      await api.updateUser(user.id, updatedUser);
      toast.success(`User ${actionText}d successfully`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error(`Failed to ${actionText} user`);
    } finally {
      setActionUserId(null);
      setActionType(null);
    }
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete user ${user.firstName} ${user.lastName}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setActionUserId(user.id);
    setActionType("delete");
    try {
      await api.deleteUser(user.id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setActionUserId(null);
      setActionType(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Users</h1>
          <p className="text-slate-500 mt-1">View, activate, deactivate, or delete users</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">User</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Email</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Phone</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Role</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Joined</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{user.email}</td>
                    <td className="py-3 px-4 text-slate-600">{user.phone || "—"}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {user.role === "admin" ? (
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Admin
                          </span>
                        ) : (
                          "User"
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          disabled={actionUserId === user.id && actionType === "status"}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
                          title={user.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {actionUserId === user.id && actionType === "status" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : user.status === "active" ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={actionUserId === user.id && actionType === "delete"}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Delete"
                        >
                          {actionUserId === user.id && actionType === "delete" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;