import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Crown,
  Plane,
  HeadphonesIcon,
  Briefcase,
  CalendarCheck,
  MapPinned,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  CarFront,
  Star,
  HeartHandshake,
  BadgeCheck,
  Gem,
  Users,
  Route,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Car,
} from "lucide-react";

const services = [
  {
    icon: Crown,
    title: "Luxury Car Rentals",
    description:
      "Choose from a refined fleet of premium vehicles designed for comfort, prestige, and unforgettable travel experiences.",
  },
  {
    icon: Briefcase,
    title: "Corporate Mobility",
    description:
      "Professional rental solutions for executives, meetings, business travel, and client transportation.",
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description:
      "Enjoy smooth airport pickup and drop-off services with elegant vehicles and punctual premium support.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Booking Plans",
    description:
      "Reserve by day, weekend, or extended duration with flexible rental options tailored to your schedule.",
  },
  {
    icon: MapPinned,
    title: "City & Destination Travel",
    description:
      "Move confidently across the city or to your destination with premium comfort, style, and convenience.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Concierge Support",
    description:
      "Our support team is always available to assist with reservations, guidance, and customer care.",
  },
];

const highlights = [
  "Premium vehicles selected for comfort and status",
  "Fast and polished booking experience",
  "Reliable service for business and lifestyle travel",
  "Professional support before and after your reservation",
  "Flexible rental durations and pickup options",
  "High standards of cleanliness, presentation, and care",
];

const process = [
  {
    number: "01",
    title: "Browse the Fleet",
    text: "Explore premium vehicles and choose the one that matches your journey, style, and expectations.",
  },
  {
    number: "02",
    title: "Book in Minutes",
    text: "Reserve your preferred car through a clean and modern flow designed for speed and simplicity.",
  },
  {
    number: "03",
    title: "Confirm Your Schedule",
    text: "Set your pickup and return details, review your plan, and prepare for a seamless rental experience.",
  },
  {
    number: "04",
    title: "Drive With Confidence",
    text: "Enjoy luxury, comfort, and trusted support throughout your Rentex journey.",
  },
];

const stats = [
  { value: "250+", label: "Premium Vehicles", icon: CarFront },
  { value: "24/7", label: "Concierge Support", icon: HeadphonesIcon },
  { value: "98%", label: "Client Satisfaction", icon: BadgeCheck },
  { value: "1,500+", label: "Successful Bookings", icon: Route },
];

const pillars = [
  {
    icon: Gem,
    title: "Premium Presentation",
    text: "Every Rentex experience is designed to feel refined, polished, and truly premium from first impression to final return.",
  },
  {
    icon: Users,
    title: "Customer-First Service",
    text: "We build every touchpoint around convenience, trust, responsive support, and a smooth booking journey.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Quality",
    text: "From reservations to vehicle delivery, we focus on consistency, comfort, and confidence at every step.",
  },
];

const testimonials = [
  {
    name: "James Cordell",
    role: "CEO, Cordell Enterprises",
    content:
      "Rentex delivered exactly the kind of polished luxury experience we expect at executive level. The booking, delivery, and vehicle quality were exceptional.",
    rating: 5,
  },
  {
    name: "Victoria Hamilton",
    role: "Creative Director",
    content:
      "The interface is elegant, the service is fast, and the quality of the fleet speaks for itself. This is premium car rental done properly.",
    rating: 5,
  },
  {
    name: "Alexander Roth",
    role: "Private Aviation Consultant",
    content:
      "From airport delivery to vehicle condition, everything felt refined and dependable. Rentex clearly understands premium clientele.",
    rating: 5,
  },
];

function Services() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section - Large Car Image (No Card, No Background) */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Left content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700"
              >
                <Sparkles className="h-4 w-4" />
                Premium Mobility Services
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-6 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                Rental Services Built for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                  Luxury, Motion, and Style
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 text-lg leading-8 text-slate-600"
              >
                Rentex delivers premium car rental solutions for city travel,
                airport transfers, executive transport, and lifestyle mobility —
                all with refined service, modern booking, and world-class support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <Link
                  to="/cars"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(147,51,234,0.28)] transition duration-300 hover:-translate-y-0.5 hover:from-purple-500 hover:to-purple-400"
                >
                  Explore Fleet
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/BookingPage"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:text-purple-600"
                >
                  Book Now
                </Link>
              </motion.div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-slate-900">250+</p>
                  <p className="mt-1 text-sm text-slate-500">Premium Vehicles</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-slate-900">24/7</p>
                  <p className="mt-1 text-sm text-slate-500">Concierge Support</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-slate-900">98%</p>
                  <p className="mt-1 text-sm text-slate-500">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Right side - Large Car Image */}
            <div className="relative flex justify-center">
              <motion.img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Mercedes-Benz S-Class"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-lg rounded-2xl shadow-2xl border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8 z-10 pb-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-5">
                  <div className="mb-3 inline-flex rounded-2xl bg-white p-3 shadow-sm">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-3xl font-black text-slate-900">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
              <Star className="h-4 w-4" />
              What We Offer
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Premium Services Built Around Your Journey
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              From personal rentals to executive mobility, Rentex provides
              elevated services tailored for convenience, elegance, and trust.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                <CheckCircle2 className="h-4 w-4" />
                Why Choose Us
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                More Than Car Rental — A Refined Service Experience
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                We combine premium vehicles, elegant digital design, and
                customer-first support to make every Rentex journey smooth and
                memorable.
              </p>
              <div className="mt-8 grid gap-4">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-purple-600" />
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">
                Signature Service Highlights
              </h3>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Fast Reservation Flow
                    </h4>
                    <p className="mt-1 text-slate-600">
                      A modern booking experience that makes premium rentals feel
                      quick, clean, and intuitive.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Trusted Customer Care
                    </h4>
                    <p className="mt-1 text-slate-600">
                      Thoughtful support before, during, and after booking for a
                      more confident experience.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                    <CarFront className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Refined Fleet Quality
                    </h4>
                    <p className="mt-1 text-slate-600">
                      Every vehicle is presented to reflect comfort, reliability,
                      and strong premium road presence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
              <ShieldCheck className="h-4 w-4" />
              Our Standard
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Why Rentex Feels Premium at Every Step
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Our service model is built around quality, trust, and a refined
              customer experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
              <CalendarCheck className="h-4 w-4" />
              How It Works
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              A Booking Journey That Feels Effortless
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Rentex simplifies premium mobility through a process built for
              speed, elegance, and confidence.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item) => (
              <div
                key={item.number}
                className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="text-sm font-bold tracking-[0.25em] text-purple-600">
                  {item.number}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
              <Star className="h-4 w-4" />
              Client Feedback
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Premium Clients
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Don't take our word for it — hear from those who've experienced Rentex.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 italic">“{testimonial.content}”</p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-purple-700 to-purple-800 px-8 py-14 shadow-[0_24px_70px_rgba(147,51,234,0.22)] sm:px-12 sm:py-16">
            <div className="absolute -left-10 top-0 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-purple-400/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Premium Travel Starts Here
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Ready to experience the Rentex difference?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-purple-100 sm:text-lg">
                Explore our fleet, reserve your ideal vehicle, and enjoy a
                rental experience built around comfort, trust, and premium
                service.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/cars"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-purple-700 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Browse Cars
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                A modern luxury car rental platform built for premium experiences, elegant service,
                and exceptional delivery.
              </p>
              <div className="mt-6 flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="rounded-xl bg-white p-3 text-slate-600 shadow-sm transition hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Fleet</h5>
              <ul className="mt-6 space-y-4 text-slate-600">
                {["Luxury Sedans", "Sports Cars", "Executive SUVs", "Electric", "Event Fleet"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="transition hover:text-purple-700">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Services</h5>
              <ul className="mt-6 space-y-4 text-slate-600">
                {[
                  "Airport Transfers",
                  "Wedding Rentals",
                  "Corporate Bookings",
                  "Long-Term Hire",
                  "VIP Concierge",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition hover:text-purple-700">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Contact</h5>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3 text-slate-600">
                  <Phone className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>+971 4 123 4567</span>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <Mail className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>concierge@rentex.com</span>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>Dubai, United Arab Emirates</span>
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
    </div>
  );
}

export default Services;