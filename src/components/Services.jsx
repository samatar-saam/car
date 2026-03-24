import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Calendar, 
  MapPin, 
  Clock, 
  Shield, 
  CreditCard, 
  Star, 
  ChevronRight, 
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Users,
  Wrench,
  Navigation,
  Coffee,
  Award,
  TrendingUp,
  Settings,
  Gift,
  Menu,
  X,
  User,
  Zap,
  ThumbsUp,
  Globe,
  Headphones,
  Camera,
  Gauge,
  Fuel,
  Bluetooth,
  Wind,
  Smartphone,
  Download,
  Share2,
  Heart,
  Filter,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const CarRentalServices = () => {
  const [activeTab, setActiveTab] = useState('rental');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: 'all', label: 'All Services', icon: <Filter className="w-4 h-4" /> },
    { id: 'daily', label: 'Daily Rental', icon: <Calendar className="w-4 h-4" /> },
    { id: 'longterm', label: 'Long Term', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'luxury', label: 'Luxury Fleet', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'business', label: 'Business', icon: <Users className="w-4 h-4" /> }
  ];

  const services = [
    {
      id: 1,
      category: 'daily',
      title: 'Daily Car Rental',
      description: 'Flexible daily rentals perfect for city exploration, business meetings, or weekend getaways. Choose from economy to premium vehicles.',
      price: 'From KES 6,300/day',
      features: ['Free cancellation up to 24h', 'Unlimited mileage', '24/7 roadside assistance', 'Full insurance included'],
      icon: <Car className="w-6 h-6" />,
      popular: true,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
      specs: ['4 seats', 'Auto', 'AC', 'Bluetooth']
    },
    {
      id: 2,
      category: 'longterm',
      title: 'Monthly Subscriptions',
      description: 'Long-term vehicle solutions with no long-term commitment. Swap cars monthly, maintenance included, perfect for temporary relocations.',
      price: 'From KES 125,860/month',
      features: ['Monthly car swaps', 'Maintenance & servicing included', 'No down payment', 'Flexible return policy'],
      icon: <Calendar className="w-6 h-6" />,
      popular: false,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
      specs: ['Flexible terms', 'Full maintenance', 'Insurance included']
    },
    {
      id: 3,
      category: 'luxury',
      title: 'Luxury & Exotic Fleet',
      description: 'Experience premium driving with our curated collection of luxury sedans, sports cars, and SUVs from brands like Mercedes, BMW, and Porsche.',
      price: 'From KES 27,860/day',
      features: ['Premium concierge service', 'Doorstep delivery', 'White-glove treatment', 'VIP support line'],
      icon: <Sparkles className="w-6 h-6" />,
      popular: true,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      specs: ['Premium brands', 'Chauffeur optional', 'VIP experience']
    },
    {
      id: 4,
      category: 'business',
      title: 'Corporate Solutions',
      description: 'Tailored fleet management for businesses of all sizes. From employee transportation to client hospitality vehicles.',
      price: 'Custom pricing',
      features: ['Dedicated account manager', 'Centralized billing', 'Fleet analytics dashboard', 'Priority booking'],
      icon: <Users className="w-6 h-6" />,
      popular: false,
      image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&q=80&w=800',
      specs: ['Volume discounts', 'Custom branding', '24/7 support']
    },
    {
      id: 5,
      category: 'daily',
      title: 'Airport Transfers',
      description: 'Seamless airport pickup and drop-off services. Flight tracking included, meet & greet at arrivals, luggage assistance.',
      price: 'From KES 10,500/trip',
      features: ['Flight tracking', '60 mins free waiting time', 'Professional chauffeurs', 'Meet & greet service'],
      icon: <MapPin className="w-6 h-6" />,
      popular: false,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
      specs: ['Flight tracking', 'Luggage assistance', 'Meet & greet']
    },
    {
      id: 6,
      category: 'business',
      title: 'Chauffeur Services',
      description: 'Professional drivers for your important occasions. Discreet, punctual, and knowledgeable about local routes.',
      price: 'From KES 7,700/hour',
      features: ['Licensed professional drivers', 'Multi-language support', 'Event coordination', 'Hourly or daily rates'],
      icon: <Clock className="w-6 h-6" />,
      popular: false,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
      specs: ['Professional drivers', 'Luxury vehicles', 'Corporate attire']
    }
  ];

  const fleet = [
    { name: 'Toyota Rav4', type: 'SUV', price: 'KES 7,500/day', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800', transmission: 'Automatic', fuel: 'Petrol', seats: 5 },
    { name: 'Mercedes E-Class', type: 'Luxury Sedan', price: 'KES 18,000/day', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800', transmission: 'Auto', fuel: 'Diesel', seats: 5 },
    { name: 'BMW X5', type: 'Luxury SUV', price: 'KES 25,000/day', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800', transmission: 'Auto', fuel: 'Petrol', seats: 5 },
    { name: 'Porsche 911', type: 'Sports Car', price: 'KES 45,000/day', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', transmission: 'Auto', fuel: 'Petrol', seats: 2 }
  ];

  const additionalFeatures = [
    {
      title: 'Comprehensive Insurance',
      description: 'Full coverage including liability, collision, and theft protection. Drive with complete peace of mind.',
      icon: <Shield className="w-8 h-8" />,
      stats: '100% Coverage'
    },
    {
      title: 'Flexible Payment',
      description: 'Pay with credit card, digital wallets, or corporate accounts. Transparent pricing with no hidden fees.',
      icon: <CreditCard className="w-8 h-8" />,
      stats: '0% Interest'
    },
    {
      title: 'Premium Maintenance',
      description: 'Every vehicle undergoes rigorous inspection and sanitization before each rental. Immaculate condition guaranteed.',
      icon: <Wrench className="w-8 h-8" />,
      stats: '200+ Checkpoints'
    },
    {
      title: '24/7 Roadside Assistance',
      description: 'Round-the-clock support wherever you are. Just a call away for any emergency or assistance.',
      icon: <Headphones className="w-8 h-8" />,
      stats: '30min Response'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Business Consultant",
      content: "The monthly subscription service transformed how I handle client meetings. Being able to swap vehicles based on the occasion is brilliant.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "James Chen",
      role: "Travel Blogger",
      content: "Rented a convertible for my coastal road trip. The pickup process was seamless and the car was immaculate. Highly recommend!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Elena Rodriguez",
      role: "Event Planner",
      content: "Their corporate fleet solutions handle all our VIP client transportation. The chauffeur service is consistently exceptional.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Michael Omondi",
      role: "Tech CEO",
      content: "PurpleDrive's luxury fleet is unmatched. The white-glove service and attention to detail make every ride a premium experience.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const stats = [
    { value: '500+', label: 'Vehicles', icon: <Car className="w-6 h-6" /> },
    { value: '10k+', label: 'Happy Clients', icon: <Users className="w-6 h-6" /> },
    { value: '98%', label: 'Satisfaction', icon: <ThumbsUp className="w-6 h-6" /> },
    { value: '24/7', label: 'Support', icon: <Headphones className="w-6 h-6" /> }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 font-sans text-slate-800">
      {/* Hero Section – Image Background with Dark Overlay, No Purple Gradient */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
          src="https://images.unsplash.com/photo-1736426341990-f272d93f7ee7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bHV4dXJ5JTIwY2FyJTIwc2hvd3Jvb218ZW58MHx8MHx8fDA%3D"
            alt="Luxury car showroom" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability (no purple) */}
          <div className=""></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="relative h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-600 px-4 py-2 rounded-full mb-6 border border-purple-300 shadow-md"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-white">Rated 4.9/5 by 2,000+ customers</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Drive Your Dreams <br/>
              <span className="text-white">Without Limits</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white mb-8 max-w-2xl leading-relaxed"
            >
              From daily commutes to luxury experiences, discover our comprehensive range of vehicle solutions designed around your lifestyle and needs.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-purple-50 transition-all shadow-xl flex items-center space-x-2 group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Stats Bar – still using purple accents for consistency */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.6 }}
                  className="text-center text-white"
                >
                  <div className="flex justify-center mb-2 text-purple-300">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-2 flex flex-wrap justify-center gap-2 border border-purple-100"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* Main Services Grid - Removed price and Book Now button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our diverse range of rental solutions, each crafted to provide maximum convenience, flexibility, and value.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service) => (
            <motion.div 
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-purple-200 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    POPULAR
                  </div>
                )}
              </div>
              
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-xl text-purple-600 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex space-x-1">
                    {service.specs?.map((spec, i) => (
                      <span key={i} className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-sm text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Price and Book Now button removed */}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Premium Fleet Showcase - Removed price and Book Now buttons */}
      <section className="bg-gradient-to-br from-slate-900 to-purple-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Premium Fleet</h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Choose from our carefully curated selection of premium vehicles for every occasion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fleet.map((car, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-purple-400 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <p className="text-purple-200 text-sm mb-3">{car.type}</p>
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="flex items-center space-x-1"><Gauge className="w-4 h-4" /> {car.transmission}</span>
                    <span className="flex items-center space-x-1"><Fuel className="w-4 h-4" /> {car.fuel}</span>
                    <span className="flex items-center space-x-1"><Users className="w-4 h-4" /> {car.seats} seats</span>
                  </div>
                  {/* Removed price and Book Now button */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
              The PurpleDrive Advantage
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're not just renting cars—we're delivering peace of mind with every mile.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                <div className="text-purple-600 font-semibold text-sm">{feature.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Get on the road in three simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 -translate-y-1/2 z-0"></div>
            
            {[
              { step: '01', title: 'Choose Your Ride', desc: 'Browse our extensive fleet and select the perfect vehicle for your needs', icon: <Car className="w-8 h-8" /> },
              { step: '02', title: 'Book & Confirm', desc: 'Reserve online or via phone. Instant confirmation with flexible payment options', icon: <CreditCard className="w-8 h-8" /> },
              { step: '03', title: 'Drive Away', desc: 'Pick up at any location or get doorstep delivery. Enjoy the journey!', icon: <Navigation className="w-8 h-8" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 text-center"
              >
                <div className="bg-white w-24 h-24 rounded-full border-4 border-purple-200 flex items-center justify-center mx-auto mb-6 shadow-xl relative">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-lg text-slate-600">Trusted by thousands of satisfied drivers</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Hit the Road?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of satisfied customers. Book your perfect vehicle today and experience the PurpleDrive difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-purple-50 transition-all shadow-lg"
              >
                Browse Fleet
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-800 text-white border border-purple-400 px-8 py-4 rounded-full font-bold hover:bg-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>+254 700 123 456</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* New RENTEX Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">RENTEX</h4>
                  <p className="text-xs uppercase tracking-[0.2em] text-purple-700">Luxury Mobility</p>
                </div>
              </div>
              <p className="mt-6 leading-7 text-slate-600">
                A modern luxury car rental platform built for premium experiences, elegant service, and exceptional delivery.
              </p>
              <div className="mt-6 flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a key={index} href="#" className="rounded-xl bg-white p-3 text-slate-600 shadow-sm transition hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Fleet</h5>
              <ul className="mt-6 space-y-4 text-slate-600">
                {["Luxury Sedans", "Sports Cars", "Executive SUVs", "Electric", "Event Fleet"].map((item) => (
                  <li key={item}><a href="#" className="transition hover:text-purple-700">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Services</h5>
              <ul className="mt-6 space-y-4 text-slate-600">
                {["Airport Transfers", "Wedding Rentals", "Corporate Bookings", "Long-Term Hire", "VIP Concierge"].map((item) => (
                  <li key={item}><a href="#" className="transition hover:text-purple-700">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Contact</h5>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3 text-slate-600">
                  <Phone className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>+254 712 345 678</span>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <Mail className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>concierge@rentex.co.ke</span>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between">
            <p>© {new Date().getFullYear()} Rentex. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-700">Privacy</a>
              <a href="#" className="hover:text-purple-700">Terms</a>
              <a href="#" className="hover:text-purple-700">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Book {selectedService.title}</h3>
                <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input type="tel" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Date</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold mt-4"
                >
                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarRentalServices;