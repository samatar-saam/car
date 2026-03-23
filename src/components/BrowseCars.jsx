// src/pages/BrowseCars.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Car,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  MapPin,
  Fuel,
  Gauge,
  Users,
  ArrowRight,
  Heart,
  Crown,
  X,
  SlidersHorizontal,
} from "lucide-react";
import api from "../services/api";

function BrowseCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Kenyan locations
  const kenyanLocations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Malindi", "Diani", "Naivasha"];

  // Fetch cars from database
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await api.getCars();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from cars
  const categories = useMemo(() => {
    const cats = ["all", ...new Set(cars.map(car => car.category))];
    return cats;
  }, [cars]);

  // Get unique locations from cars
  const locations = useMemo(() => {
    const locs = ["all", ...new Set(cars.map(car => car.location))];
    return locs;
  }, [cars]);

  // Filter cars based on user selections
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Search filter
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "all" || car.category === selectedCategory;

      // Location filter
      const matchesLocation = selectedLocation === "all" || car.location === selectedLocation;

      // Price filter (in KES)
      const matchesPrice = car.pricePerDay >= priceRange.min && car.pricePerDay <= priceRange.max;

      // Availability filter
      const matchesAvailability = showAvailableOnly ? car.available === true : true;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesAvailability;
    });
  }, [cars, searchTerm, selectedCategory, selectedLocation, priceRange, showAvailableOnly]);

  // Format currency in KES
  const formatKES = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      {/* Header with Kenyan theme */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold">Our Premium Fleet</h1>
          <p className="text-purple-200 mt-2">Discover luxury vehicles available across Kenya</p>
          <div className="flex items-center gap-2 mt-4 text-purple-200">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Available in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Malindi, Diani, Naivasha</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-sm capitalize">{cat === "all" ? "All Categories" : cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter - Kenyan Cities */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Location</h4>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="location"
                        checked={selectedLocation === loc}
                        onChange={() => setSelectedLocation(loc)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-sm">{loc === "all" ? "All Locations" : loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range in KES */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range (KES per day)</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min KES"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                    className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max KES"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                    className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm">Show available only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Car Grid */}
          <div className="flex-1">
            {/* View Toggle & Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-500">{filteredCars.length} cars found</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-purple-600 text-white" : "bg-slate-100"}`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-purple-600 text-white" : "bg-slate-100"}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Cars Grid/List */}
            {filteredCars.length > 0 ? (
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} viewMode={viewMode} formatKES={formatKES} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl">
                <Car className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-900">No cars found</h3>
                <p className="text-slate-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Same filter content as desktop */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-xl"
                />
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Category</h4>
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 mb-2">
                  <input type="radio" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} />
                  <span className="text-sm capitalize">{cat === "all" ? "All Categories" : cat}</span>
                </label>
              ))}
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Location</h4>
              {locations.map(loc => (
                <label key={loc} className="flex items-center gap-2 mb-2">
                  <input type="radio" checked={selectedLocation === loc} onChange={() => setSelectedLocation(loc)} />
                  <span className="text-sm">{loc === "all" ? "All Locations" : loc}</span>
                </label>
              ))}
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Price Range (KES)</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                  className="w-1/2 px-3 py-2 border rounded-xl text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                  className="w-1/2 px-3 py-2 border rounded-xl text-sm"
                />
              </div>
            </div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Car Card Component
function CarCard({ car, viewMode, formatKES }) {
  if (viewMode === "grid") {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          {car.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${car.available ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
              {car.available ? "Available" : "Booked"}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-slate-900">{car.name}</h3>
          <p className="text-sm text-slate-500">{car.brand} • {car.category}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
            <MapPin className="h-3 w-3" />
            <span>{car.location}</span>
            <Star className="h-3 w-3 text-yellow-400 ml-2" />
            <span>{car.rating || 4.5}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl font-bold text-purple-600">{formatKES(car.pricePerDay)}</span>
              <span className="text-sm text-slate-500">/day</span>
            </div>
            <Link to={`/cars/${car.id}`} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm hover:bg-purple-700 transition">
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        </div>
        <div className="md:w-2/3 p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
              <p className="text-slate-500">{car.brand} • {car.category}</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${car.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {car.available ? "Available" : "Booked"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
            <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{car.location}</div>
            <div className="flex items-center gap-1"><Users className="h-4 w-4" />{car.seats || 4} seats</div>
            <div className="flex items-center gap-1"><Gauge className="h-4 w-4" />{car.transmission || "Auto"}</div>
            <div className="flex items-center gap-1"><Fuel className="h-4 w-4" />{car.fuel || "Petrol"}</div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-purple-600">{formatKES(car.pricePerDay)}</span>
              <span className="text-slate-500">/day</span>
            </div>
            <Link to={`/cars/${car.id}`} className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseCars;