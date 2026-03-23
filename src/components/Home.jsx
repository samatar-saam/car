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
      image: "https://images.unsplash.com/photo-1563720223185-11003d0e95c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
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
                    <div className="rounded-2xl bg-white/95 px-4 py-3 text-right shadow-lg backdrop-blur">
                      <div className="text-2xl font-bold text-purple-700">{formatKES(car.price)}</div>
                      <div className="text-xs text-slate-500">per day</div>
                    </div>
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
                    <button onClick={() => handleReserveNow(car)} className="flex-1 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-3.5 font-semibold text-white transition hover:from-purple-700 hover:to-purple-800">
                      Reserve Now
                    </button>
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
                      <button onClick={handleBookNow} className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
                        Book Now
                      </button>
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
                <div className="mb-5 flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div>
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