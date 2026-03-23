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
  },
  {
    name: "Sophia Grant",
    role: "Head of Operations",
    bio: "Oversees service quality, logistics, and city-wide coordination to ensure every rental experience feels effortless.",
  },
  {
    name: "Amir Hassan",
    role: "Customer Experience Lead",
    bio: "Designs high-touch support journeys focused on business travelers, VIP clients, and event-based rentals.",
  },
  {
    name: "Elena Brooks",
    role: "Fleet Director",
    bio: "Curates and manages the Rentex fleet with a focus on luxury, safety, performance, and presentation.",
  },
];

const testimonials = [
  {
    name: "Michael Reed",
    role: "Investment Executive",
    quote:
      "Rentex delivers the kind of premium experience that busy professionals actually need. Clean process, exceptional vehicles, and service that feels genuinely high-end.",
  },
  {
    name: "Amina Noor",
    role: "Event Client",
    quote:
      "From booking to delivery, everything felt polished and intentional. The vehicle quality and attention to detail exceeded expectations.",
  },
  {
    name: "James Otieno",
    role: "Business Traveler",
    quote:
      "I needed an executive vehicle with airport delivery and zero friction. Rentex made the entire experience smooth, fast, and professional.",
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
                  src="data:image/jpeg;base64,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"
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
                    src={`https://images.unsplash.com/photo-${
                      index === 0
                        ? "1560250097-0b93528c311a"
                        : index === 1
                        ? "1494790108377-be9c29b29330"
                        : index === 2
                        ? "1573496359142-b8d87734a5a2"
                        : "1500648767791-00dcc994a43e"
                    }?auto=format&fit=crop&w=900&q=80`}
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