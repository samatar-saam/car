import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Crown,
  Gem,
  Globe2,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Waypoints,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

// ========== Data ==========
const values = [
  {
    title: "Excellence",
    icon: Award,
    description:
      "We hold every detail to a premium standard, from vehicle quality to the final handover experience.",
  },
  {
    title: "Trust",
    icon: ShieldCheck,
    description:
      "Transparent pricing, reliable service, and consistent quality create confidence at every step of the journey.",
  },
  {
    title: "Innovation",
    icon: Sparkles,
    description:
      "We use modern digital tools and refined product design to simplify premium mobility for every customer.",
  },
  {
    title: "Comfort",
    icon: HeartHandshake,
    description:
      "Every touchpoint is designed to feel smooth, elegant, and stress-free for leisure and business travelers alike.",
  },
  {
    title: "Performance",
    icon: Car,
    description:
      "Our curated fleet reflects power, prestige, and precision for clients who value presence and driving quality.",
  },
  {
    title: "Customer Obsession",
    icon: Users,
    description:
      "We focus deeply on client expectations, building service experiences that feel personal, responsive, and memorable.",
  },
];

const whyRentex = [
  {
    title: "Curated luxury fleet",
    description:
      "A handpicked collection of executive, performance, and prestige vehicles maintained to premium standards.",
    icon: Crown,
  },
  {
    title: "Transparent booking experience",
    description:
      "A modern digital process with clear pricing, simple reservations, and a smooth customer journey.",
    icon: BadgeCheck,
  },
  {
    title: "Concierge-level service",
    description:
      "Personalized support for airport pickups, executive travel, events, and special customer requirements.",
    icon: Star,
  },
  {
    title: "Safety and quality first",
    description:
      "Every vehicle is inspected, prepared, and presented to reflect reliability, comfort, and brand confidence.",
    icon: ShieldCheck,
  },
  {
    title: "Technology-driven operations",
    description:
      "Rentex combines product design, digital convenience, and operational excellence to deliver smarter mobility.",
    icon: Waypoints,
  },
];

const stats = [
  { label: "Premium Vehicles", value: "2,500+", suffix: "" },
  { label: "Years of Experience", value: "15+", suffix: "" },
  { label: "Client Satisfaction", value: "98", suffix: "%" },
  { label: "Concierge Support", value: "24/7", suffix: "" },
];

const team = [
  {
    name: "Daniel Kareem",
    role: "Founder & CEO",
    bio: "Leads Rentex with a vision to modernize premium car rental through product excellence and elevated customer service.",
    image: "https://media.istockphoto.com/id/1435220822/photo/african-american-software-developer.webp?a=1&b=1&s=612x612&w=0&k=20&c=XETUT5mBrRDzRjXu_D86Q6AVXiqeDI4qTQxgGL_uN8U=",
  },
  {
    name: "Sophia Grant",
    role: "Head of Operations",
    bio: "Oversees service quality, logistics, and city-wide coordination to ensure every rental experience feels effortless.",
    image: "https://images.unsplash.com/photo-1632255658480-3546119b5ec2?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Amir Hassan",
    role: "Customer Experience Lead",
    bio: "Designs high-touch support journeys focused on business travelers, VIP clients, and event-based rentals.",
    image: "https://plus.unsplash.com/premium_photo-1733306644309-90a33768d232?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzaW9uYWwlMjBhZnJpY2FuJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Elena Brooks",
    role: "Fleet Director",
    bio: "Curates and manages the Rentex fleet with a focus on luxury, safety, performance, and presentation.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
];

const testimonials = [
  {
    name: "Kevin Mwangi",
    role: "Investment Analyst, Nairobi",
    quote:
      "Rentex delivers the kind of premium experience that busy professionals actually need. Clean process, exceptional vehicles, and service that feels genuinely high-end. I've used them for client meetings in Westlands and airport pickups—always flawless.",
  },
  {
    name: "Wanjiku Mwaura",
    role: "Event Planner, Karen",
    quote:
      "From booking to delivery, everything felt polished and intentional. The vehicle quality and attention to detail exceeded expectations. I've recommended Rentex to several of my wedding clients, and they've all been impressed.",
  },
  {
    name: "Dr. James Omondi",
    role: "Business Consultant, Upper Hill",
    quote:
      "I needed an executive vehicle with airport delivery and zero friction. Rentex made the entire experience smooth, fast, and professional. Their local knowledge of Nairobi traffic and preferred routes really helped me stay on schedule.",
  },
];

const timeline = [
  {
    year: "2010",
    title: "The Beginning",
    description:
      "Rentex was founded with a single Rolls-Royce and a vision to redefine luxury mobility in the region.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2015",
    title: "Expansion & Recognition",
    description:
      "Expanded fleet to 100+ vehicles and earned 'Best Luxury Car Rental' award at the Middle East Luxury Travel Awards.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Launched our award‑winning booking platform, bringing a seamless online experience to luxury car rental.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2024",
    title: "Global Presence",
    description:
      "Now serving clients in 15 countries with over 2,500 vehicles and a 98% satisfaction rate.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
  },
];

const partners = [
  "Rolls-Royce",
  "Bentley",
  "Lamborghini",
  "Porsche",
  "Mercedes-Benz",
  "BMW",
  "Range Rover",
  "Aston Martin",
];

// ========== Helper Components ==========
function SectionHeader({ badge, title, description, align = "center" }) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {badge && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
          <Sparkles className="h-4 w-4" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function StatCard({ stat, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const target = parseFloat(stat.value);
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <div
      ref={ref}
      className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm text-center"
    >
      <p className="text-4xl font-bold text-white">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-purple-50/90">{stat.label}</p>
    </div>
  );
}

// ========== Main Component ==========
function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Background Accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute right-[-80px] top-24 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-52 w-52 rounded-full bg-purple-200/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-16 pt-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pb-24 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-sm">
              <Gem className="h-4 w-4" />
              Premium Mobility, Thoughtfully Designed
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Redefining <span className="text-purple-600">Premium Mobility</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Rentex is a modern premium car rental platform built for clients
              who value exceptional vehicles, seamless digital booking, and
              concierge-level service. We combine elegant design, reliable
              operations, and curated mobility experiences for business,
              lifestyle, and special occasions.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/cars"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition duration-300 hover:-translate-y-0.5 hover:from-purple-700 hover:to-purple-800"
              >
                Explore Fleet
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:text-purple-700"
              >
                Contact Concierge
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              {stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -left-6 top-12 hidden h-40 w-40 rounded-full bg-purple-100 blur-3xl lg:block" />
            <div className="absolute -right-6 bottom-8 hidden h-44 w-44 rounded-full bg-purple-200/60 blur-3xl lg:block" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="overflow-hidden rounded-[26px]">
                <img
                src="https://images.unsplash.com/photo-1770884570311-48029bcbd394?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1eHVyeSUyMGNhciUyMGxhbWJvcmdoaW4lMjB5ZWxsb3d8ZW58MHx8MHx8fDA%3D"
                  alt="Luxury car experience"
                  className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute left-8 top-8 max-w-xs rounded-3xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Premium Standard</p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Refined service, every trip
                    </h3>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 w-64 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-xl backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Booking Performance</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-3xl font-bold text-slate-900">4.9/5</span>
                  <span className="mb-1 text-sm text-purple-600">Trusted by premium clients</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[88%] rounded-full bg-purple-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Story + Timeline */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <SectionHeader
              badge="Our Story"
              align="left"
              title="A luxury rental brand built for the modern customer"
              description="Rentex was created to close the gap between traditional rental processes and the expectations of today's premium traveler."
            />

            <div className="mt-8 space-y-5 text-slate-600">
              <p className="leading-8">
                We saw an opportunity to transform the rental experience into
                something more elegant, efficient, and trustworthy. Instead of
                outdated systems and inconsistent service, Rentex offers a
                streamlined digital platform backed by a premium operations
                model.
              </p>
              <p className="leading-8">
                Our approach combines technology, elegant design, and curated
                vehicles to create a seamless premium mobility experience. From
                first click to final handover, every interaction is shaped to
                feel smooth, modern, and high-value.
              </p>
              <p className="leading-8">
                Whether a client is booking for executive travel, airport
                transfer, lifestyle use, VIP hosting, or event transportation,
                Rentex is designed to deliver confidence, convenience, and
                refined comfort at every stage.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-bold tracking-[0.2em] text-purple-600">{item.year}</div>
                  <div className="mt-1 h-12 w-px bg-purple-200 mx-auto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionHeader
            badge="Guiding Principles"
            title="A premium brand shaped by purpose"
            description="Everything we build is grounded in a clear mission and a long-term vision for the future of luxury mobility."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-purple-50 p-4 text-purple-600">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">Our Mission</h3>
              <p className="mt-4 leading-8 text-slate-600">
                To deliver luxury mobility with trust, convenience, and style
                through curated vehicles, thoughtful technology, and
                concierge-level customer care that turns every booking into a
                premium experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-purple-50 p-4 text-purple-600">
                <Globe2 className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">Our Vision</h3>
              <p className="mt-4 leading-8 text-slate-600">
                To become the leading premium digital car rental experience
                across major cities worldwide by setting a new benchmark for
                elegance, quality, accessibility, and customer trust in modern
                mobility.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionHeader
            badge="Core Values"
            title="The standards behind every Rentex experience"
            description="Our values shape the way we serve, build, and grow as a premium mobility brand."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
                >
                  <div className="inline-flex rounded-2xl bg-purple-50 p-3 text-purple-600 transition duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-purple-700 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Rentex */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <SectionHeader
              badge="Why Rentex"
              align="left"
              title="A premium platform with clear market distinction"
              description="Rentex is not just a car rental listing experience. It is a refined mobility product designed around trust, quality, and high-end service."
            />
            <div className="mt-8 space-y-5 text-slate-600">
              <p className="leading-8">
                We position Rentex at the intersection of luxury mobility,
                modern technology, and service excellence. That means clients
                receive more than access to vehicles. They receive a polished
                system that removes friction and elevates every journey.
              </p>
              <p className="leading-8">
                From transparent reservations to concierge coordination and
                carefully prepared vehicles, our process is designed to meet the
                expectations of executives, travelers, VIP clients, and modern
                urban professionals.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {whyRentex.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section (animated counters) */}
      {/* <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[36px] border border-purple-100 bg-gradient-to-r from-purple-600 to-purple-700 p-8 shadow-[0_24px_60px_rgba(147,51,234,0.18)] sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Team */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionHeader
            badge="Leadership"
            title="The team shaping the Rentex experience"
            description="A modern premium brand needs strong operations, refined service thinking, and a clear product vision."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-purple-600">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Experience */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <SectionHeader
              badge="Premium Service"
              align="left"
              title="A full-service mobility experience"
              description="Rentex is built to support more than standard rentals. We deliver flexible premium solutions for modern lifestyles and high-value travel needs."
            />

            <div className="mt-8 space-y-4">
              {[
                "Airport delivery and executive pickup coordination",
                "Business travel support for professionals and corporate clients",
                "VIP mobility experiences with elevated service standards",
                "Event transportation for weddings, private occasions, and luxury hosting",
                "Flexible premium rental packages designed around customer needs",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-purple-100 p-1 text-purple-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Executive travel
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    For founders, executives, consultants, and premium
                    travelers, Rentex provides dependable vehicles and refined
                    support that align with professional schedules.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                  <Clock3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Flexible and responsive
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    We support varying schedules, custom requests, and premium
                    expectations with a service model built around speed,
                    clarity, and professionalism.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    A real premium brand
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    Every section of the Rentex journey is designed to feel
                    established, credible, and high-end, making the platform
                    feel like a true luxury mobility company, not a simple demo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      {/* <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionHeader
            badge="Trusted Partners"
            title="Collaborating with the world's finest"
            description="We are proud to work with leading automotive brands to bring you the best in luxury mobility."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-70">
            {partners.map((partner, i) => (
              <span key={i} className="text-lg font-light text-slate-500">{partner}</span>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionHeader
            badge="Reputation"
            title="Trusted by clients who expect more"
            description="Our reputation is built on consistency, polish, and service experiences that feel intentionally premium."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-purple-50 p-3 text-purple-600">
                  <Quote className="h-5 w-5" />
                </div>

                <p className="mt-5 text-base leading-8 text-slate-600">
                  “{testimonial.quote}”
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-12 shadow-[0_24px_70px_rgba(147,51,234,0.22)] sm:px-12 sm:py-16">
            <div className="absolute -left-10 top-0 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-purple-400/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Experience the Rentex Difference
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Premium mobility, designed around you
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-purple-100 sm:text-lg">
                Explore our curated fleet or connect with the Rentex concierge
                team to discover a more refined way to rent, travel, and arrive.
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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Speak to Us
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default AboutPage;