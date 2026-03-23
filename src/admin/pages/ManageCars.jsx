// src/pages/admin/ManageCars.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Car,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  MapPin,
  DollarSign,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../../services/api";

function ManageCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all"); // new filter for featured
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const carsPerPage = 10;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await api.getCars();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: cars.length,
    available: cars.filter(c => c.available === true).length,
    booked: cars.filter(c => c.available === false).length,
    avgRating: cars.length > 0
      ? (cars.reduce((sum, c) => sum + (c.rating || 0), 0) / cars.length).toFixed(1)
      : 0,
    featured: cars.filter(c => c.featured === true).length,
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || car.category === categoryFilter;
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "available" && car.available) ||
                         (statusFilter === "booked" && !car.available);
    const matchesFeatured = featuredFilter === "all" ||
                           (featuredFilter === "featured" && car.featured === true) ||
                           (featuredFilter === "not-featured" && !car.featured);
    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  const categories = ["all", ...new Set(cars.map(car => car.category))];

  const handleEdit = (car) => {
    setSelectedCar(car);
    setEditFormData({
      name: car.name,
      brand: car.brand,
      category: car.category,
      pricePerDay: car.pricePerDay,
      transmission: car.transmission || "Automatic",
      seats: car.seats || 4,
      fuel: car.fuel || "Petrol",
      location: car.location,
      image: car.image,
      description: car.description || "",
      available: car.available,
      featured: car.featured || false,
    });
    setFeatures(car.features || []);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedCar = {
        ...selectedCar,
        ...editFormData,
        pricePerDay: Number(editFormData.pricePerDay),
        seats: Number(editFormData.seats),
        features: features,
      };
      await api.updateCar(selectedCar.id, updatedCar);
      toast.success("Car updated successfully!");
      setShowEditModal(false);
      fetchCars();
    } catch (error) {
      toast.error("Failed to update car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!carToDelete) return;
    try {
      await api.deleteCar(carToDelete.id);
      toast.success("Car deleted successfully!");
      setShowDeleteModal(false);
      setCarToDelete(null);
      fetchCars();
    } catch (error) {
      toast.error("Failed to delete car");
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Fleet</h1>
          <p className="text-slate-500 mt-1">Manage your vehicle inventory, update details, and track fleet performance</p>
        </div>
        <Link
          to="/admin/add-car"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Add New Car
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-purple-100">
              <Car className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{stats.total}</span>
          </div>
          <p className="text-sm text-slate-500">Total Vehicles</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{stats.available}</span>
          </div>
          <p className="text-sm text-slate-500">Available</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{stats.booked}</span>
          </div>
          <p className="text-sm text-slate-500">Currently Booked</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-amber-100">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{stats.avgRating}</span>
          </div>
          <p className="text-sm text-slate-500">Avg Rating</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-purple-100">
              <Star className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{stats.featured}</span>
          </div>
          <p className="text-sm text-slate-500">Featured Cars</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-purple-500 outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-purple-500 outline-none"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
        </select>

        <select
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-purple-500 outline-none"
        >
          <option value="all">All Cars</option>
          <option value="featured">Featured Only</option>
          <option value="not-featured">Not Featured</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Car</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Category</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Price/Day</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Location</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Rating</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Featured</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCars.length > 0 ? (
                paginatedCars.map((car) => (
                  <tr key={car.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={car.image} alt={car.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-slate-900">{car.name}</p>
                          <p className="text-sm text-slate-500">{car.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {car.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">${car.pricePerDay}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="h-4 w-4" />
                        {car.location}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        car.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {car.available ? "Available" : "Booked"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{car.rating || 0}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {car.featured ? (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(car)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setCarToDelete(car);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500">
                    No cars found. Click "Add New Car" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal (unchanged, but featured checkbox already present) */}
      {/* ... same as before ... */}
    </div>
  );
}

export default ManageCars;