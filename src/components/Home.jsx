import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Search,
  Clock,
  Star,
  Phone,
  Mail,
  ChevronRight,
  Car,
  Sparkles,
  Award,
  HeadphonesIcon,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
  Menu,
  Quote,
  Wind,
  Battery,
  Gem,
  TrendingUp,
  Globe,
  ShieldCheck,
  CheckCircle,
  Fuel,
  Gauge,
  Users,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);

  // Format currency in KES (no conversion, prices are already in KES)
  const formatKES = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const featuredCars = [
    {
      id: 1,
      name: "Mercedes-Maybach S680",
      category: "ultra-luxury",
      image: "data:image/jpeg;base64,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",
      price: 2500, // KES per day
      rating: 5.0,
      reviews: 124,
      specs: {
        engine: "6.0L V12",
        power: "621 hp",
        acceleration: "4.4s",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: 5,
      },
      features: [
        "Executive Rear Seats",
        "Burmester 3D Sound",
        "Magic Body Control",
        "Massage Seats",
        "Air Suspension",
      ],
      available: true,
      location: "Nairobi, Westlands",
      description: "The Mercedes-Maybach S680 represents the pinnacle of automotive luxury. With its handcrafted interior, V12 engine, and unparalleled comfort, this vehicle redefines what it means to travel in style."
    },
    {
      id: 2,
      name: "Porsche 911 Turbo S",
      category: "sports",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
      price: 1800,
      rating: 4.9,
      reviews: 98,
      specs: {
        engine: "3.8L Flat-6",
        power: "640 hp",
        acceleration: "2.6s",
        transmission: "PDK",
        fuel: "Petrol",
        seats: 4,
      },
      features: [
        "Active Aerodynamics",
        "Ceramic Brakes",
        "Launch Control",
        "Rear-Wheel Steering",
        "Sport Exhaust",
      ],
      available: true,
      location: "Nairobi, CBD",
      description: "The Porsche 911 Turbo S is the ultimate sports car. With blistering acceleration and precise handling, it delivers an unparalleled driving experience."
    },
    {
      id: 3,
      name: "Range Rover SV",
      category: "suv",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
      price: 2200,
      rating: 4.9,
      reviews: 156,
      specs: {
        engine: "4.4L V8",
        power: "523 hp",
        acceleration: "4.5s",
        transmission: "Automatic",
        fuel: "Diesel",
        seats: 7,
      },
      features: ["Air Suspension", "Meridian Audio", "Terrain Response", "Panoramic Roof", "Executive Seats"],
      available: true,
      location: "Nairobi, Karen",
      description: "The Range Rover SV combines luxury with off-road capability. Perfect for both city driving and adventure trips."
    },
    {
      id: 4,
      name: "Bentley Continental GT",
      category: "ultra-luxury",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
      price: 2800,
      rating: 5.0,
      reviews: 67,
      specs: {
        engine: "6.0L W12",
        power: "650 hp",
        acceleration: "3.5s",
        transmission: "Dual-Clutch",
        fuel: "Petrol",
        seats: 4,
      },
      features: ["Naim Audio", "Diamond Quilting", "Touring Comfort", "Rotating Display", "Carbon Fiber"],
      available: false,
      location: "Nairobi, Lavington",
      description: "The Bentley Continental GT is the epitome of grand touring. Handcrafted luxury meets breathtaking performance."
    },
    {
      id: 5,
      name: "Lamborghini Urus",
      category: "suv",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
      price: 3000,
      rating: 4.9,
      reviews: 43,
      specs: {
        engine: "4.0L V8",
        power: "657 hp",
        acceleration: "3.3s",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: 5,
      },
      features: ["Sport Exhaust", "Carbon Ceramic", "Performance Mode", "Rally Mode", "ANIMA Selector"],
      available: true,
      location: "Nairobi, Kilimani",
      description: "The Lamborghini Urus is the world's first Super SUV. Combining the soul of a supercar with the functionality of an SUV."
    },
    {
      id: 6,
      name: "Tesla Model S Plaid",
      category: "electric",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
      price: 1500,
      rating: 4.8,
      reviews: 89,
      specs: {
        engine: "Tri Motor",
        power: "1,020 hp",
        acceleration: "1.99s",
        transmission: "Single Speed",
        fuel: "Electric",
        seats: 5,
      },
      features: ["Autopilot", "Premium Interior", "Long Range", "Glass Roof", '17" Screen'],
      available: true,
      location: "Nairobi, Upper Hill",
      description: "The Tesla Model S Plaid is the quickest production car ever made. Electric performance redefined."
    },
  ];

  const categories = [
    { id: "all", name: "All Vehicles", count: 24, icon: Car },
    { id: "ultra-luxury", name: "Ultra Luxury", count: 8, icon: Gem },
    { id: "sports", name: "Sports", count: 6, icon: Wind },
    { id: "suv", name: "Luxury SUV", count: 7, icon: TrendingUp },
    { id: "electric", name: "Electric", count: 3, icon: Battery },
  ];

  const stats = [
    { value: "2500+", label: "Luxury Rentals Completed", icon: Car },
    { value: "15+", label: "Years of Premium Service", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: Star },
    { value: "24/7", label: "Concierge Support", icon: HeadphonesIcon },
  ];

  const featuresData = [
    {
      icon: ShieldCheck,
      title: "Verified Premium Fleet",
      description: "Every vehicle is professionally inspected, detailed, and maintained before delivery.",
    },
    {
      icon: Clock,
      title: "Fast Booking Experience",
      description: "Book your preferred car in minutes with a smooth, premium reservation flow.",
    },
    {
      icon: Globe,
      title: "Executive Delivery",
      description: "Private handover at airports, hotels, offices, and premium residential locations.",
    },
    {
      icon: Sparkles,
      title: "Luxury Concierge",
      description: "Need chauffeur service, event support, or VIP arrangements? We handle it.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "James Cordell",
      role: "CEO, Cordell Enterprises",
      content: "Rentex delivered exactly the kind of polished luxury experience we expect at executive level. The booking, delivery, and vehicle quality were exceptional.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Victoria Hamilton",
      role: "Creative Director",
      content: "The interface is elegant, the service is fast, and the quality of the fleet speaks for itself. This is premium car rental done properly.",
      image: "https://images.unsplash.com/photo-1494790108777-5fd3e1f4c7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Alexander Roth",
      role: "Private Aviation Consultant",
      content: "From airport delivery to vehicle condition, everything felt refined and dependable. Rentex clearly understands premium clientele.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const filteredCars = useMemo(() => {
    if (activeCategory === "all") return featuredCars;
    return featuredCars.filter((car) => car.category === activeCategory);
  }, [activeCategory]);

  const openCarModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  const handleBookNow = () => {
    if (selectedCar) {
      closeModal();
      navigate(`/cars/${selectedCar.id}`);
    }
  };

  const handleReserveNow = (car) => {
    navigate(`/cars/${car.id}`);
  };

  const handleExploreFleet = () => {
    navigate("/cars");
  };

  const handleBookNowHero = () => {
    navigate("/cars");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <span className="text-xl font-bold text-slate-900">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="rounded-xl p-2 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-5 p-6">
              <a href="#home" className="block font-medium text-slate-700 hover:text-purple-700">Home</a>
              <a href="#fleet" className="block font-medium text-slate-700 hover:text-purple-700">Fleet</a>
              <a href="#services" className="block font-medium text-slate-700 hover:text-purple-700">Services</a>
              <a href="#testimonials" className="block font-medium text-slate-700 hover:text-purple-700">Testimonials</a>
              <a href="#contact" className="block font-medium text-slate-700 hover:text-purple-700">Contact</a>
              <button onClick={handleExploreFleet} className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 py-3 font-semibold text-white hover:from-purple-700 hover:to-purple-800 transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {!isVideoLoaded && (
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=90" alt="Dubai skyline" className="h-full w-full object-cover" />
          )}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <source src="https://player.vimeo.com/external/371837261.hd.mp4?s=5b9a3b7b5b5b5b5b5b5b5b5b5b5b5b5b&profile_id=175" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        </div>
        <div className="relative z-30 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-semibold text-purple-400 border border-white/20">
              <Sparkles className="h-4 w-4" />
              Premium car rental, redefined
            </div>
            <h2 className="mt-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Drive luxury with a
              <span className="block text-purple-400">strong premium presence</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              From city drives to elite experiences, Rentex delivers excellence at every turn.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={handleExploreFleet} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-7 py-4 font-semibold text-white shadow-xl shadow-purple-600/30 transition hover:scale-105 hover:from-purple-700 hover:to-purple-800">
                Explore Fleet
                <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={handleBookNowHero} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/50">
                Book Now
                <HeadphonesIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-white/60">Scroll to explore</span>
            <div className="h-10 w-5 rounded-full border-2 border-white/30 flex justify-center">
              <div className="h-2 w-1 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-10">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Seamless reservations</p>
              <h3 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Book your next premium drive</h3>
              <p className="mt-4 text-slate-600">Select your city, dates, and preferred category. Our team will handle the rest.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-700" />
                  <select className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100">
                    <option>Select location</option>
                    <option>Nairobi, Westlands</option>
                    <option>Nairobi, CBD</option>
                    <option>Nairobi, Karen</option>
                    <option>Nairobi, Jomo Kenyatta Int'l Airport</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Pickup Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-700" />
                  <input type="date" className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-700" />
                  <input type="date" className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-transparent">&nbsp;</label>
                <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 font-semibold text-white transition hover:from-purple-700 hover:to-purple-800">
                  <Search className="h-5 w-5" />
                  Search Availability
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Westlands", "CBD", "Karen", "Kilimani"].map((item) => (
                <button key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 inline-flex rounded-2xl bg-purple-100 p-4">
                  <stat.icon className="h-6 w-6 text-purple-700" />
                </div>
                <div className="text-4xl font-bold text-slate-900">{stat.value}</div>
                <div className="mt-2 text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Premium fleet</p>
              <h3 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">Luxury vehicles for every elite occasion</h3>
              <p className="mt-5 text-lg text-slate-600">Hand-picked models built for business, prestige, comfort, and unforgettable arrival.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const active = activeCategory === category.id;
                return (
                  <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${active ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-700/20" : "border border-slate-200 bg-white text-slate-700 hover:border-purple-200 hover:text-purple-800"}`}>
                    <Icon className="h-4 w-4" />
                    {category.name}
                    <span className={`${active ? "text-purple-100" : "text-slate-400"}`}>{category.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => (
              <div key={car.id} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                  <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Luxury+Car"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 backdrop-blur">{car.category.replace("-", " ").toUpperCase()}</span>
                  </div>
                  <div className="absolute right-5 top-5">
                    <span className={`rounded-full px-4 py-2 text-xs font-semibold ${car.available ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white" : "bg-slate-800 text-slate-200"}`}>
                      {car.available ? "Available Now" : "On Request"}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <h4 className="text-2xl font-bold text-white">{car.name}</h4>
                      <div className="mt-2 flex items-center gap-2 text-sm text-white/85">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {car.rating}
                        <span className="text-white/60">•</span>
                        {car.reviews} reviews
                      </div>
                    </div>
                    {/* Price removed */}
                  </div>
                </div>
                <div className="p-7">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4 text-center">
                      <Fuel className="mx-auto mb-2 h-5 w-5 text-purple-700" />
                      <div className="text-xs text-slate-500">Engine</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">{car.specs.engine}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 text-center">
                      <Gauge className="mx-auto mb-2 h-5 w-5 text-purple-700" />
                      <div className="text-xs text-slate-500">Power</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">{car.specs.power}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 text-center">
                      <TrendingUp className="mx-auto mb-2 h-5 w-5 text-purple-700" />
                      <div className="text-xs text-slate-500">0-60</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">{car.specs.acceleration}</div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-800">{feature}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    {/* Reserve Now button removed */}
                    <button onClick={() => openCarModal(car)} className="flex-1 rounded-2xl border border-slate-200 px-5 py-3.5 font-semibold text-slate-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button onClick={handleExploreFleet} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-7 py-4 font-semibold text-white shadow-lg transition hover:from-purple-700 hover:to-purple-800">
              Explore Full Collection
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Car Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">{selectedCar.name}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-64 object-cover rounded-2xl" />
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedCar.rating}</span>
                      <span className="text-slate-500">({selectedCar.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedCar.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">{selectedCar.description}</p>
                </div>
                <div>
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <div className="text-center pb-4 border-b border-slate-200">
                      <p className="text-sm text-slate-500">Starting from</p>
                      <p className="text-3xl font-bold text-purple-600">{formatKES(selectedCar.price)}</p>
                      <p className="text-sm text-slate-500">per day</p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div><p className="text-xs text-slate-500">Engine</p><p className="font-semibold">{selectedCar.specs.engine}</p></div>
                        <div><p className="text-xs text-slate-500">Power</p><p className="font-semibold">{selectedCar.specs.power}</p></div>
                        <div><p className="text-xs text-slate-500">0-60 mph</p><p className="font-semibold">{selectedCar.specs.acceleration}</p></div>
                        <div><p className="text-xs text-slate-500">Transmission</p><p className="font-semibold">{selectedCar.specs.transmission}</p></div>
                        <div><p className="text-xs text-slate-500">Fuel</p><p className="font-semibold">{selectedCar.specs.fuel}</p></div>
                        <div><p className="text-xs text-slate-500">Seats</p><p className="font-semibold">{selectedCar.specs.seats}</p></div>
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <h4 className="font-semibold mb-2">Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedCar.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-purple-600" /><span>{feature}</span></div>
                          ))}
                        </div>
                      </div>
                      {/* Book Now button removed */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Why Rentex</p>
            <h3 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">A premium experience beyond the vehicle</h3>
            <p className="mt-5 text-lg text-slate-600">We combine elegant design, luxury support, and operational excellence in every trip.</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {featuresData.map((feature, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:border-purple-200 hover:shadow-xl">
                <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{feature.title}</h4>
                <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium banner */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-10 shadow-2xl lg:grid-cols-2 lg:px-14 lg:py-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200">Executive service</p>
              <h3 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">Designed for business leaders, VIP travel, and special events</h3>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-purple-100">From airport arrivals to wedding fleets and corporate mobility, Rentex delivers premium transport with confidence and style.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => navigate("/contact")} className="rounded-full bg-white px-7 py-4 font-semibold text-purple-700 shadow-lg transition hover:bg-slate-100">Request Consultation</button>
                <button onClick={() => navigate("/services")} className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10">View Brochure</button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-6 backdrop-blur"><Users className="h-8 w-8 text-purple-300" /><h4 className="mt-4 text-xl font-semibold text-white">Corporate Mobility</h4><p className="mt-2 text-sm leading-6 text-purple-200">Premium transport for executives, clients, and special business occasions.</p></div>
              <div className="rounded-3xl bg-white/5 p-6 backdrop-blur"><MapPin className="h-8 w-8 text-purple-300" /><h4 className="mt-4 text-xl font-semibold text-white">Airport Delivery</h4><p className="mt-2 text-sm leading-6 text-purple-200">Direct vehicle handover at premium airport terminals and hotels.</p></div>
              <div className="rounded-3xl bg-white/5 p-6 backdrop-blur"><ShieldCheck className="h-8 w-8 text-purple-300" /><h4 className="mt-4 text-xl font-semibold text-white">Trusted Operations</h4><p className="mt-2 text-sm leading-6 text-purple-200">Reliable service standards, clean process, and premium vehicle preparation.</p></div>
              <div className="rounded-3xl bg-white/5 p-6 backdrop-blur"><Sparkles className="h-8 w-8 text-purple-300" /><h4 className="mt-4 text-xl font-semibold text-white">Luxury Experience</h4><p className="mt-2 text-sm leading-6 text-purple-200">Elegant booking journey and refined brand presentation at every touchpoint.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Client feedback</p>
            <h3 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">Trusted by premium clients</h3>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="relative rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Quote className="absolute right-7 top-7 h-10 w-10 text-purple-100" />
                <div className="mb-5 flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-purple-400 text-yellow-400" />))}</div>
                <p className="text-lg leading-8 text-slate-700">“{testimonial.content}”</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="h-14 w-14 rounded-2xl object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/200x200?text=Client"; }} />
                  <div><p className="font-bold text-slate-900">{testimonial.name}</p><p className="text-sm text-slate-500">{testimonial.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700"><Car className="h-6 w-6 text-white" /></div><div><h4 className="text-2xl font-bold text-slate-900">RENTEX</h4><p className="text-xs uppercase tracking-[0.2em] text-purple-700">Luxury Mobility</p></div></div>
              <p className="mt-6 leading-7 text-slate-600">A modern luxury car rental platform built for premium experiences, elegant service, and exceptional delivery.</p>
              <div className="mt-6 flex gap-3">{ [Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (<a key={index} href="#" className="rounded-xl bg-white p-3 text-slate-600 shadow-sm transition hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white"><Icon className="h-5 w-5" /></a>)) }</div>
            </div>
            <div><h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Fleet</h5><ul className="mt-6 space-y-4 text-slate-600">{["Luxury Sedans", "Sports Cars", "Executive SUVs", "Electric", "Event Fleet"].map((item) => (<li key={item}><a href="#" className="transition hover:text-purple-700">{item}</a></li>))}</ul></div>
            <div><h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Services</h5><ul className="mt-6 space-y-4 text-slate-600">{["Airport Transfers", "Wedding Rentals", "Corporate Bookings", "Long-Term Hire", "VIP Concierge"].map((item) => (<li key={item}><a href="#" className="transition hover:text-purple-700">{item}</a></li>))}</ul></div>
            <div><h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Contact</h5><div className="mt-6 space-y-5"><div className="flex items-start gap-3 text-slate-600"><Phone className="mt-0.5 h-5 w-5 text-purple-700" /><span>+254 712 345 678</span></div><div className="flex items-start gap-3 text-slate-600"><Mail className="mt-0.5 h-5 w-5 text-purple-700" /><span>concierge@rentex.co.ke</span></div><div className="flex items-start gap-3 text-slate-600"><MapPin className="mt-0.5 h-5 w-5 text-purple-700" /><span>Nairobi, Kenya</span></div></div></div>
          </div>
          <div className="mt-16 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between">
            <p>© {new Date().getFullYear()} Rentex. All rights reserved.</p>
            <div className="flex gap-6"><a href="#" className="hover:text-purple-700">Privacy</a><a href="#" className="hover:text-purple-700">Terms</a><a href="#" className="hover:text-purple-700">Accessibility</a></div>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <button onClick={() => navigate("/contact")} className="fixed bottom-7 right-7 z-30 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white shadow-2xl shadow-purple-700/30 transition hover:scale-110 hover:from-purple-700 hover:to-purple-800">
        <HeadphonesIcon className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Home;