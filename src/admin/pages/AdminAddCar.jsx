// src/pages/admin/AdminAddCar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Car, 
  Image, 
  Tag, 
  DollarSign, 
  MapPin, 
  Users, 
  Gauge, 
  Fuel, 
  X, 
  Plus,
  ArrowLeft
} from "lucide-react";
import api from "../../services/api";

function AdminAddCar() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Luxury",
    pricePerDay: "",
    transmission: "Automatic",
    seats: "",
    fuel: "Petrol",
    location: "Dubai Marina",
    image: "",
    description: "",
    available: true,
    featured: false,
    rating: 4.5,
  });

  const categories = ["Luxury", "SUV", "Sports", "Executive", "Electric", "Convertible"];
  const locations = ["Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Dubai Airport", "Abu Dhabi", "Sharjah"];
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.pricePerDay || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const newCar = {
      id: Date.now().toString(),
      ...formData,
      pricePerDay: Number(formData.pricePerDay),
      seats: Number(formData.seats),
      reviews: 0,
      features: features,
      createdAt: new Date().toISOString(),
    };

    try {
      await api.createCar(newCar);
      toast.success("Car added successfully!");
      setTimeout(() => navigate("/admin/cars"), 1500);
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/cars")}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 mb-4 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cars
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Add New Vehicle</h1>
        <p className="text-slate-500 mt-1">Add a new car to your premium fleet</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        {/* Car Name & Brand */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Car Name *</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
              <Car className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Porsche 911 Turbo S"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Brand *</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
              <Tag className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g., Porsche"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Category & Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price per Day (KES) *</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
              <DollarSign className="w-5 h-5 text-slate-400" />
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="e.g., 25000"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">Amount in Kenyan Shillings (KES)</p>
          </div>
        </div>

        {/* Specs */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Seats</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
              <Users className="w-5 h-5 text-slate-400" />
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                placeholder="4"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Transmission</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            >
              {transmissions.map(trans => (
                <option key={trans}>{trans}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Fuel Type</label>
            <select
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fuelTypes.map(fuel => (
                <option key={fuel}>{fuel}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
            <MapPin className="w-5 h-5 text-slate-400" />
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            >
              {locations.map(loc => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Image URL *</label>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
            <Image className="w-5 h-5 text-slate-400" />
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
          {formData.image && (
            <div className="mt-3">
              <img src={formData.image} alt="Preview" className="h-32 w-48 object-cover rounded-lg" />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe the car..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Features</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="e.g., Leather Seats"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm"
              >
                {feature}
                <button type="button" onClick={() => removeFeature(index)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-slate-700">Available for rent</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-slate-700">Feature this car</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Adding Car...
            </>
          ) : (
            "Add Vehicle to Fleet"
          )}
        </button>
      </form>
    </div>
  );
}

export default AdminAddCar;