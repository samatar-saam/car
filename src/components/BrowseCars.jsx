// src/pages/BrowseCars.jsx
import { useState, useEffect, useMemo, useCallback } from "react";
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
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";

function BrowseCars() {
  // State
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default"); // default, price-asc, price-desc, rating-desc

  // Derived data from cars
  const categories = useMemo(() => {
    const cats = ["all", ...new Set(cars.map((car) => car.category).filter(Boolean))];
    return cats;
  }, [cars]);

  const locations = useMemo(() => {
    const locs = ["all", ...new Set(cars.map((car) => car.location).filter(Boolean))];
    return locs;
  }, [cars]);

  // Min / Max prices from actual data (for slider limits)
  const priceLimits = useMemo(() => {
    if (cars.length === 0) return { min: 0, max: 50000 };
    const prices = cars.map((c) => c.pricePerDay).filter((p) => typeof p === "number");
    if (prices.length === 0) return { min: 0, max: 50000 };
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [cars]);

  // Reset price range when cars load (if user hasn't set custom)
  useEffect(() => {
    if (cars.length > 0 && priceRange.max === Infinity) {
      setPriceRange({ min: priceLimits.min, max: priceLimits.max });
    }
  }, [cars, priceLimits, priceRange.max]);

  // Fetch cars
  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getCars();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Filter + Sort logic
  const filteredAndSortedCars = useMemo(() => {
    let result = cars.filter((car) => {
      // Search filter
      const matchesSearch =
        car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category?.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "all" || car.category === selectedCategory;

      // Location filter
      const matchesLocation = selectedLocation === "all" || car.location === selectedLocation;

      // Price filter
      const matchesPrice = car.pricePerDay >= priceRange.min && car.pricePerDay <= priceRange.max;

      // Availability filter
      const matchesAvailability = showAvailableOnly ? car.available === true : true;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesAvailability;
    });

    // Sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // default: keep original order or by featured first? We'll keep original order from API
        break;
    }

    return result;
  }, [cars, searchTerm, selectedCategory, selectedLocation, priceRange, showAvailableOnly, sortOption]);

  // Helper: format KES
  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setPriceRange({ min: priceLimits.min, max: priceLimits.max });
    setShowAvailableOnly(false);
    setSortOption("default");
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-purple-700 to-purple-800 pt-24 pb-12" />
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="h-48 bg-slate-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Header with dynamic location info */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold">Our Premium Fleet</h1>
          <p className="text-purple-200 mt-2">
            Discover luxury vehicles available across Kenya
          </p>
          {locations.length > 1 && (
            <div className="flex items-center gap-2 mt-4 text-purple-200">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                Available in{" "}
                {locations
                  .filter((loc) => loc !== "all")
                  .slice(0, 4)
                  .join(", ")}
                {locations.filter((loc) => loc !== "all").length > 4 && " + more"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Clear all
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm capitalize">
                        {cat === "all" ? "All Categories" : cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Location</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {locations.map((loc) => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="location"
                        checked={selectedLocation === loc}
                        onChange={() => setSelectedLocation(loc)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm">{loc === "all" ? "All Locations" : loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range (KES per day)</h4>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500">Min</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      min={priceLimits.min}
                      max={priceLimits.max}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-slate-500">Max</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      min={priceLimits.min}
                      max={priceLimits.max}
                    />
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  Range: {formatKES(priceLimits.min)} - {formatKES(priceLimits.max)}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">Show available only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar: Results, Sort, View Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-slate-500">
                {filteredAndSortedCars.length}{" "}
                {filteredAndSortedCars.length === 1 ? "car" : "cars"} found
              </p>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="default">Sort by: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition ${
                      viewMode === "grid"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition ${
                      viewMode === "list"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Car Grid / List */}
            {filteredAndSortedCars.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredAndSortedCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    viewMode={viewMode}
                    formatKES={formatKES}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl">
                <Car className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-900">No cars found</h3>
                <p className="text-slate-500">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                >
                  Clear all filters
                </button>
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
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Same filter content as desktop, but with some layout adjustments */}
            <div className="space-y-5">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <h4 className="font-semibold mb-2">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                      />
                      <span className="text-sm capitalize">
                        {cat === "all" ? "All Categories" : cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {locations.map((loc) => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-location"
                        checked={selectedLocation === loc}
                        onChange={() => setSelectedLocation(loc)}
                      />
                      <span className="text-sm">{loc === "all" ? "All Locations" : loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-2">Price Range (KES)</h4>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border rounded-xl text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border rounded-xl text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  />
                  <span className="text-sm">Show available only</span>
                </label>
              </div>

              {/* Sort (optional in mobile) */}
              <div>
                <h4 className="font-semibold mb-2">Sort by</h4>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
              </div>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter button (only visible on mobile) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          <SlidersHorizontal className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

// Car Card Component (supports both grid and list views)
function CarCard({ car, viewMode, formatKES }) {
  const {
    name,
    brand,
    category,
    image,
    location,
    pricePerDay,
    available,
    featured,
    rating,
    seats,
    transmission,
    fuel,
    id,
  } = car;

  const ratingValue = rating || 4.5; // fallback

  if (viewMode === "grid") {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || "/placeholder-car.jpg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Crown className="h-3 w-3" /> Featured
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                available ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {available ? "Available" : "Booked"}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-slate-900 text-lg truncate">{name}</h3>
          <p className="text-sm text-slate-500">
            {brand} • {category}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{location}</span>
            <div className="flex items-center ml-auto">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{ratingValue}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl font-bold text-purple-600">
                {formatKES(pricePerDay)}
              </span>
              <span className="text-sm text-slate-500">/day</span>
            </div>
            <Link
              to={`/cars/${id}`}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm hover:bg-purple-700 transition"
            >
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
          <img
            src={image || "/placeholder-car.jpg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
        </div>
        <div className="md:w-2/3 p-5">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{name}</h3>
              <p className="text-slate-500">
                {brand} • {category}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {available ? "Available" : "Booked"}
              </span>
              {featured && (
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Crown className="h-3 w-3" /> Featured
                </span>
              )}
            </div>
          </div>

          {/* Car specs */}
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {location}
              </div>
            )}
            {seats && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {seats} seats
              </div>
            )}
            {transmission && (
              <div className="flex items-center gap-1">
                <Gauge className="h-4 w-4" /> {transmission}
              </div>
            )}
            {fuel && (
              <div className="flex items-center gap-1">
                <Fuel className="h-4 w-4" /> {fuel}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{ratingValue}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-2xl font-bold text-purple-600">
                {formatKES(pricePerDay)}
              </span>
              <span className="text-slate-500">/day</span>
            </div>
            <Link
              to={`/cars/${id}`}
              className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseCars;